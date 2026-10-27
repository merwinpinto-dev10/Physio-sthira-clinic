const https = require('https');

// In-memory fallback if Upstash credentials are missing or unreachable
const memoryStore = new Map();
let connected = false;

const getCredentials = () => {
  let url = process.env.UPSTASH_REDIS_REST_URL?.trim();
  let token = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();

  // If REST variables are not explicitly set, auto-derive from REDIS_URL / UPSTASH_REDIS_URL
  if ((!url || !token) && (process.env.REDIS_URL || process.env.UPSTASH_REDIS_URL)) {
    let raw = (process.env.REDIS_URL || process.env.UPSTASH_REDIS_URL).trim();
    // Normalize typo dis:// -> rediss://
    if (raw.startsWith('dis://')) {
      raw = raw.replace(/^dis:\/\//, 'rediss://');
    }
    try {
      const parsed = new URL(raw);
      if (parsed.hostname && !url) {
        url = `https://${parsed.hostname}`;
      }
      if (parsed.password && !token) {
        token = decodeURIComponent(parsed.password);
      }
    } catch (e) {
      // URL parse error; credentials stay as configured
    }
  }

  return { url, token };
};

const isConfigured = () => {
  const { url, token } = getCredentials();
  return Boolean(url && token);
};

// Raw REST command to Upstash
const sendCommand = (command, ...args) => {
  return new Promise((resolve, reject) => {
    if (!isConfigured()) {
      return resolve(null);
    }

    try {
      const { url, token } = getCredentials();
      const urlObj = new URL(url);
      const req = https.request({
        hostname: urlObj.hostname,
        path: '/',
        method: 'POST',
        rejectUnauthorized: false,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        timeout: 5000
      }, (res) => {
        let data = '';
        res.on('data', chunk => { data += chunk; });
        res.on('end', () => {
          try {
            if (res.statusCode >= 400) return reject(new Error(data));
            const json = JSON.parse(data);
            if (json.error) return reject(new Error(json.error));
            resolve(json.result);
          } catch (e) {
            reject(e);
          }
        });
      });

      req.on('error', (err) => {
        console.warn('Upstash Redis request warning:', err.message);
        resolve(null);
      });

      req.on('timeout', () => {
        req.destroy();
        resolve(null);
      });

      req.write(JSON.stringify([command, ...args]));
      req.end();
    } catch (e) {
      resolve(null);
    }
  });
};

const redisClient = {
  isConfigured,
  isConnected: () => connected,

  connect: async () => {
    if (isConfigured()) {
      try {
        const ping = await sendCommand('PING');
        if (ping === 'PONG') {
          connected = true;
          console.log('✅ Connected to Upstash Redis via HTTP REST API');
          return;
        }
      } catch (err) {
        connected = false;
        console.warn('⚠️ Upstash initial ping error, fallback active:', err.message);
      }
    }
    connected = false;
    console.log('ℹ️ Using in-memory fallback for caching & rate-limiting');
  },

  set: async (key, val, options) => {
    if (isConfigured()) {
      const args = [key, typeof val === 'object' ? JSON.stringify(val) : String(val)];
      if (options && options.EX) {
        args.push('EX', options.EX);
      }
      const res = await sendCommand('SET', ...args);
      if (res !== null) return res;
    }
    memoryStore.set(key, val);
    if (options && options.EX) {
      setTimeout(() => memoryStore.delete(key), options.EX * 1000);
    }
    return 'OK';
  },

  get: async (key) => {
    if (isConfigured()) {
      const res = await sendCommand('GET', key);
      if (res !== null) return res;
    }
    return memoryStore.get(key) || null;
  },

  incr: async (key) => {
    if (isConfigured()) {
      const res = await sendCommand('INCR', key);
      if (res !== null) return res;
    }
    const current = (memoryStore.get(key) || 0) + 1;
    memoryStore.set(key, current);
    return current;
  },

  expire: async (key, seconds) => {
    if (isConfigured()) {
      const res = await sendCommand('EXPIRE', key, seconds);
      if (res !== null) return res;
    }
    setTimeout(() => memoryStore.delete(key), seconds * 1000);
    return 1;
  },

  del: async (key) => {
    if (isConfigured()) {
      const res = await sendCommand('DEL', key);
      if (res !== null) return res;
    }
    memoryStore.delete(key);
    return 1;
  }
};

module.exports = redisClient;
