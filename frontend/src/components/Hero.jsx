import React, { useEffect, useRef } from 'react';
import { phoneLink, waLink } from '../data/clinicData';

export default function Hero({ onOpenBooking }) {
  const revealRef = useRef(null);

  useEffect(() => {
    const el = revealRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('in')),
      { threshold: 0.1 }
    );
    el.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="hero" id="top" aria-labelledby="heroHeading" ref={revealRef}>
      <div className="wrap hero-grid">
        <div className="reveal">
          <div className="hero-eyebrow-row">
            <span className="eyebrow">Evidence-Based Physiotherapy</span>
            <span className="hero-badge">
              <span className="dot">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
              </span>
              1-on-1 personalised care
            </span>
          </div>
          <h1 id="heroHeading">Get back to doing<br /><em>what you love.</em></h1>
          <p className="hero-lead">PhysioSthira helps people reduce pain, restore movement and return to everyday life, sport and activity — with care built around you, not a generic protocol.</p>
          <div className="hero-actions">
            <button className="btn btn-primary btn-lg" onClick={() => onOpenBooking()} aria-haspopup="dialog">
              Book an Appointment{' '}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </button>
            <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn btn-wa">WhatsApp Us</a>
          </div>
          <div className="hero-trust" role="list">
            <div className="trust-chip reveal" style={{ transitionDelay: '.1s' }} role="listitem">
              <div className="tc-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg></div>
              <div><b>1-on-1</b><span>Personal sessions</span></div>
            </div>
            <div className="trust-chip reveal" style={{ transitionDelay: '.2s' }} role="listitem">
              <div className="tc-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div>
              <div><b>Evidence-Based</b><span>Clinical approach</span></div>
            </div>
            <div className="trust-chip reveal" style={{ transitionDelay: '.3s' }} role="listitem">
              <div className="tc-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></div>
              <div><b>Home Visits</b><span>We come to you</span></div>
            </div>
          </div>
        </div>
        <div className="hero-visual reveal-right" style={{ transitionDelay: '.18s' }}>
          <div className="hero-img-wrap">
            <img src="/Clinic_Images/reception1.png" alt="PhysioSthira reception and waiting area with brand signage" width="860" height="1075" loading="eager" fetchPriority="high" />
          </div>
        </div>
      </div>
    </section>
  );
}
