import React from 'react';
import { CLINIC, phoneLink, waLink } from '../data/clinicData';

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <div className="brand">
              <img src="/assets/logo.png" alt="PhysioSthira" width="44" height="44" style={{ objectFit: 'contain' }} />
              <span className="brand-text">
                <span className="brand-name"><span className="bn-s" style={{ color: '#fff' }}>PHYSIO</span><span className="bn-p" style={{ color: 'var(--teal-bright)' }}>STHIRA</span></span>
                <small>Empowering and Inspiring Lives</small>
              </span>
            </div>
            <p className="foot-desc">Evidence-based physiotherapy, sports rehabilitation, pain management and home physiotherapy — personalised to you.</p>
            <p className="foot-tag">"Every movement brings you closer to recovery."</p>
            <div className="foot-social" style={{ marginTop: 20 }} aria-label="Social media links">
              <a href={CLINIC.instagram} id="footInsta" target="_blank" rel="noopener noreferrer" aria-label="Physio Sthira on Instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href={CLINIC.facebook} id="footFb" target="_blank" rel="noopener noreferrer" aria-label="Physio Sthira on Facebook">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href={waLink()} id="footWa" aria-label="Contact Physio Sthira on WhatsApp">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
              </a>
            </div>
          </div>
          <div className="foot-col">
            <h4>Explore</h4>
            <a href="#services">Services</a>
            <a href="#why">Why Us</a>
            <a href="#process">Our Approach</a>
            <a href="#gallery">Gallery</a>
            <a href="#homecare">Home Physiotherapy</a>
            <a href="#testimonials">Reviews</a>
            <a href="#faq">FAQ</a>
            <a href="#contact">Contact</a>
          </div>
          <div className="foot-col">
            <h4>Services</h4>
            <a href="#services">Pain Management</a>
            <a href="#services">Sports Physiotherapy</a>
            <a href="#services">Orthopaedic Rehab</a>
            <a href="#services">Post-Surgical Rehab</a>
            <a href="#services">Neurological Rehab</a>
            <a href="#homecare">Home Physiotherapy</a>
            <a href="#services">Geriatric Physiotherapy</a>
          </div>
          <div className="foot-col">
            <h4>Visit Us</h4>
            <span id="footAddr">{CLINIC.address}</span>
            <span id="footCity">{CLINIC.city}</span>
            <a href={phoneLink()} id="footPhone">{CLINIC.phoneDisplay}</a>
            <a href="tel:08042135387" style={{ color: 'var(--muted)', fontSize: '.88rem' }}>080 42135387 (Landline)</a>
            <a href={`mailto:${CLINIC.email}`} id="footEmail">{CLINIC.email}</a>
            <span style={{ marginTop: 6 }}>Mon–Sat: 8 AM – 8 PM</span>
            <span style={{ color: 'var(--muted)' }}>Sunday: 9 AM – 12 PM</span>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© {new Date().getFullYear()} PhysioSthira. All rights reserved.</span>
          <div className="foot-legal">
            <a href="/privacy-policy.html">Privacy Policy</a>
            <a href="/terms-and-conditions.html">Terms &amp; Conditions</a>
          </div>
        </div>
      </div>
      <div className="emergency-note" role="note">
        <div className="wrap">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          If you are experiencing a medical emergency, please seek emergency medical care immediately. Physiotherapy is not a substitute for emergency medical treatment.
        </div>
      </div>
    </footer>
  );
}
