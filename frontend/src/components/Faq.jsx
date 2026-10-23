import React, { useState, useEffect, useRef } from 'react';
import { FAQS, waLink, phoneLink } from '../data/clinicData';

export default function Faq() {
  const [openIdx, setOpenIdx] = useState(null);
  const sectionRef = useRef(null);
  const ansRefs = useRef([]);

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

  const toggle = (i) => {
    setOpenIdx(prev => prev === i ? null : i);
  };

  return (
    <section className="section" id="faq" aria-labelledby="faqHeading" ref={sectionRef}>
      <div className="wrap">
        <div className="section-head reveal">
          <span className="eyebrow">Good to Know</span>
          <h2 id="faqHeading">Frequently asked questions</h2>
          <p>Common questions about appointments, treatment and what to expect at Physio Sthira.</p>
        </div>
        <div className="faq-inner reveal" id="faqWrap">
          {FAQS.map((f, i) => (
            <div className={`faq-item${openIdx === i ? ' open' : ''}`} key={i}>
              <button
                className="faq-q"
                aria-expanded={openIdx === i}
                aria-controls={`faqA${i}`}
                id={`faqQ${i}`}
                onClick={() => toggle(i)}
              >
                <span>{f.q}</span>
                <span className="faq-plus">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                </span>
              </button>
              <div
                className="faq-a"
                id={`faqA${i}`}
                role="region"
                aria-labelledby={`faqQ${i}`}
                style={{ maxHeight: openIdx === i ? '400px' : '0' }}
                ref={el => ansRefs.current[i] = el}
              >
                <p>{f.a}</p>
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 32 }} className="reveal">
          <p style={{ color: 'var(--muted)', marginBottom: 14, fontSize: '.95rem' }}>Have a question not answered here?</p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn btn-wa btn-sm">Ask on WhatsApp</a>
            <a href={phoneLink()} className="btn btn-ghost btn-sm">Call the Clinic</a>
          </div>
        </div>
      </div>
    </section>
  );
}
