import React, { useEffect, useRef } from 'react';

const MARQUEE_ITEMS = ['Pain Management','Sports Physiotherapy','Orthopaedic Rehab','Post-Surgical Rehab','Neurological Rehab','Home Physiotherapy','Evidence-Based Care','1-on-1 Sessions'];

export default function TrustMarquee() {
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const items = MARQUEE_ITEMS;
    let html = '';
    items.forEach(t => {
      html += `<span class="strip-item">${t}</span><span class="strip-sep">◆</span>`;
    });
    track.innerHTML = html + html; // doubled for seamless loop
  }, []);

  return (
    <div className="trust-bar" aria-hidden="true">
      <div className="strip-track" id="stripTrack" ref={trackRef}></div>
    </div>
  );
}
