import React, { useEffect, useRef } from 'react';
import { waLink, phoneLink } from '../data/clinicData';

export default function HomePhysio({ onOpenBooking }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('in')),
      { threshold: 0.1 }
    );
    section.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section" id="homecare" aria-labelledby="homecareHeading" ref={sectionRef}>
      <div className="wrap">
        <div className="hc-grid">
          <div className="hc-copy reveal-left">
            <span className="eyebrow eyebrow-light">Home Physiotherapy</span>
            <h2 id="homecareHeading">Expert physiotherapy — delivered to your home.</h2>
            <p>Can't travel to the clinic? We bring professional, evidence-based rehabilitation directly to your doorstep — the same standard of clinical care, in the comfort of your home.</p>
            <div className="hc-who">
              <span className="hc-tag">Elderly &amp; limited mobility</span>
              <span className="hc-tag">Post-surgery</span>
              <span className="hc-tag">Stroke recovery</span>
              <span className="hc-tag">Parkinson's</span>
              <span className="hc-tag">Joint replacement</span>
              <span className="hc-tag">Bedridden patients</span>
              <span className="hc-tag">Post-discharge rehab</span>
            </div>
            <div className="hc-actions">
              <a href={waLink('Hello, I am interested in your home physiotherapy service. Please share details.')} target="_blank" rel="noopener noreferrer" className="btn btn-wa">Enquire About Home Physio</a>
              <button className="btn btn-white" onClick={() => onOpenBooking('Home Visit')} aria-haspopup="dialog">Book a Home Visit</button>
            </div>
          </div>
          <div className="hc-visual reveal-right">
            <div className="photo-frame hc-photo">
              <img src="/Clinic_Images/bed1.png" alt="Treatment bed with electrotherapy equipment at Physio Sthira" width="900" height="1200" loading="lazy" decoding="async" />
            </div>
            <div className="hc-panel">
              <h4>Why patients choose home physiotherapy</h4>
              <div className="hc-benefit">
                <span className="hc-tick"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg></span>
                <span>Personalised one-to-one treatment in a familiar and comfortable space</span>
              </div>
              <div className="hc-benefit">
                <span className="hc-tick"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg></span>
                <span>No travel stress, no waiting — and no fall risk during transit</span>
              </div>
              <div className="hc-benefit">
                <span className="hc-tick"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg></span>
                <span>Family and caregivers can stay actively involved in recovery</span>
              </div>
              <div className="hc-benefit">
                <span className="hc-tick"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg></span>
                <span>Flexible scheduling to fit around your needs and daily routine</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
