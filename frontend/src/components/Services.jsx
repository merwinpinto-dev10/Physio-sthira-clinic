import React, { useState, useEffect, useRef } from 'react';
import { SERVICES } from '../data/clinicData';

export default function Services({ onOpenBooking }) {
  const [expanded, setExpanded] = useState({});
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

  const toggleDetail = (i) => {
    setExpanded(prev => ({ ...prev, [i]: !prev[i] }));
  };

  return (
    <section className="section" id="services" aria-labelledby="servicesHeading" ref={sectionRef}>
      <div className="wrap">
        <div className="section-head reveal">
          <span className="eyebrow">What we do</span>
          <h2 id="servicesHeading">Our Services</h2>
          <p>Focused, evidence-based care across the conditions that keep people from moving well. Expand any service for more detail, or book directly.</p>
        </div>

        {/* Services feature image */}
        <div className="svc-feature reveal">
          <div className="photo-frame svc-feature-photo">
            <img src="/Clinic_Images/gym.png" alt="Physio Sthira exercise and rehabilitation area with specialist equipment" width="900" height="675" loading="lazy" decoding="async" />
          </div>
          <div className="svc-feature-copy">
            <span className="eyebrow">Specialist Facilities</span>
            <h3>Fully equipped for your recovery</h3>
            <p>Our clinic includes dedicated treatment rooms and a comprehensive exercise rehabilitation area — with equipment and space designed to support every stage of your recovery, from pain relief to full function.</p>
            <button className="btn btn-primary" onClick={() => onOpenBooking()} style={{ marginTop: 24 }} aria-haspopup="dialog">Book Your Assessment</button>
          </div>
        </div>

        <div className="svc-list" id="servicesGrid">
          {SERVICES.map((s, i) => (
            <article className="svc-item reveal" key={s.title} style={{ transitionDelay: `${(i % 2) * 0.07}s` }}>
              <div className="svc-num">{String(i + 1).padStart(2, '0')}</div>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ width: 20, height: 20, color: 'var(--teal)', marginBottom: 4 }}>
                <path d={s.icon} />
              </svg>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <div className="svc-for">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 13, height: 13, color: 'var(--teal)' }} aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
                {' '}{s.forWhom}
              </div>
              <div className="svc-detail" id={`sdet${i}`} role="region" style={{ maxHeight: expanded[i] ? '400px' : '0' }}>
                <div className="svc-detail-inner">
                  <p dangerouslySetInnerHTML={{ __html: s.detail }} />
                  <p style={{ marginTop: 10, fontSize: '.82rem', color: 'var(--muted)' }}><em>Assessment and treatment recommendations are personalised to each patient.</em></p>
                </div>
              </div>
              <div className="svc-foot">
                <button
                  className="svc-more"
                  aria-expanded={!!expanded[i]}
                  aria-controls={`sdet${i}`}
                  onClick={() => toggleDetail(i)}
                >
                  Learn more{' '}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                </button>
                <button className="svc-book" onClick={() => onOpenBooking(s.title)}>
                  Book{' '}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
