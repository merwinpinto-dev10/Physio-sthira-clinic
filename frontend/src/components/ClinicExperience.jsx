import React, { useEffect, useRef } from 'react';

export default function ClinicExperience() {
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
    <section className="section" id="clinic-experience" aria-labelledby="clinicExpHeading" ref={sectionRef}>
      <div className="wrap">
        <div className="clinic-exp-grid">
          <div className="clinic-exp-photo reveal-left">
            <img
              src="/Clinic_Images/bed3.png"
              alt="Dual treatment bays with privacy curtains at Physio Sthira clinic"
              width="900"
              height="1200"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="reveal-right">
            <span className="eyebrow">Your Clinic Environment</span>
            <h2 id="clinicExpHeading" className="clinic-exp-copy">A clean, modern space designed for your recovery</h2>
            <div className="clinic-exp-copy">
              <p>Our clinic is purpose-built for physiotherapy — with private treatment bays, modern equipment and a spacious exercise rehabilitation area. Everything is maintained to the highest clinical standards.</p>
            </div>
            <div className="clinic-exp-features">
              <div className="clinic-exp-feat">
                <div className="cef-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                </div>
                <div>
                  <h4>Private Treatment Bays</h4>
                  <p>Curtained treatment areas ensure comfort and privacy during your sessions.</p>
                </div>
              </div>
              <div className="clinic-exp-feat">
                <div className="cef-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                    <line x1="8" y1="21" x2="16" y2="21"/>
                    <line x1="12" y1="17" x2="12" y2="21"/>
                  </svg>
                </div>
                <div>
                  <h4>Modern Equipment</h4>
                  <p>Therapeutic and electrotherapy equipment to support your treatment plan.</p>
                </div>
              </div>
              <div className="clinic-exp-feat">
                <div className="cef-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M18 20V10 M12 20V4 M6 20v-6"/>
                  </svg>
                </div>
                <div>
                  <h4>Exercise Rehabilitation Area</h4>
                  <p>Dedicated gym space with specialist equipment for progressive rehabilitation.</p>
                </div>
              </div>
            </div>
            <a href="#gallery" className="btn btn-primary" style={{ marginTop: 28 }}>View Our Gallery</a>
          </div>
        </div>
      </div>
    </section>
  );
}
