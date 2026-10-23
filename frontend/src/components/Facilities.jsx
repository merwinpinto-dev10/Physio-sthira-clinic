import React, { useEffect, useRef } from 'react';

// This component is now merged into WhyChooseUs (process section was in original index.html)
// Keeping as a separate Process section component matching original exactly

export default function Facilities({ onOpenBooking }) {
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
    <>
      {/* TREATMENT PROCESS */}
      <section className="section" id="process" aria-labelledby="processHeading" ref={sectionRef}>
        <div className="wrap">
          <div className="process-layout">
            <div className="photo-frame process-photo reveal-left">
              <img src="/Clinic_Images/bed2.png" alt="Modern treatment cubicle at Physio Sthira with privacy curtains and therapeutic equipment" width="900" height="1200" loading="lazy" decoding="async" />
            </div>
            <div className="process-aside reveal-right">
              <span className="eyebrow">Our Approach</span>
              <h2 id="processHeading">A steady path back to strength</h2>
              <p>Recovery isn't guesswork. Every patient follows five deliberate stages — designed to get you back to full function safely and sustainably.</p>
              <div className="process-visual" style={{ marginTop: 32 }}>
                {[
                  { n: 1, title: 'Assess', body: "A detailed clinical evaluation to understand your condition, movement patterns and the root cause of your pain — not just where it hurts." },
                  { n: 2, title: 'Plan', body: "A personalised treatment plan built around your specific goals, daily life and recovery timeline. Clear, measurable and realistic." },
                  { n: 3, title: 'Treat', body: "Hands-on therapy, targeted exercises and evidence-based techniques to relieve pain and restore function — adapted as you progress." },
                  { n: 4, title: 'Rebuild', body: "Progressive rehabilitation to restore strength, flexibility, confidence and full movement — returning you to your activities." },
                  { n: 5, title: 'Prevent', body: "Education, home exercise strategies and lifestyle guidance to reduce future injury risk and maintain long-term health." }
                ].map(step => (
                  <div className="proc-step" key={step.n}>
                    <div className="proc-num" aria-hidden="true">{step.n}</div>
                    <div className="proc-step-body">
                      <h3>{step.title}</h3>
                      <p>{step.body}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="btn btn-primary" onClick={() => onOpenBooking && onOpenBooking()} style={{ marginTop: 28 }} aria-haspopup="dialog">Book Your Assessment</button>
              <div className="first-visit-note reveal" style={{ marginTop: 28 }}>
                <h4>What to expect at your first visit</h4>
                <ul>
                  <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg> Detailed discussion of your symptoms &amp; history</li>
                  <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg> Physical assessment of movement and function</li>
                  <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg> Clear explanation of findings and treatment options</li>
                  <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg> Initial treatment if appropriate on the day</li>
                  <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg> A personalised plan for next steps</li>
                </ul>
                <p style={{ marginTop: 12, fontSize: '.8rem', color: 'var(--muted)' }}>Your first visit may include the above — specific assessment and treatment will be adapted to your individual needs and condition.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CLINIC EXPERIENCE */}
      <section className="section" id="clinic-experience" aria-labelledby="clinicExpHeading">
        <div className="wrap">
          <div className="clinic-exp-grid">
            <div className="clinic-exp-photo reveal-left">
              <img src="/Clinic_Images/bed3.png" alt="Dual treatment bays with privacy curtains at Physio Sthira clinic" width="900" height="1200" loading="lazy" decoding="async" />
            </div>
            <div className="reveal-right">
              <span className="eyebrow">Your Clinic Environment</span>
              <h2 id="clinicExpHeading" className="clinic-exp-copy">A clean, modern space designed for your recovery</h2>
              <div className="clinic-exp-copy">
                <p>Our clinic is purpose-built for physiotherapy — with private treatment bays, modern equipment and a spacious exercise rehabilitation area. Everything is maintained to the highest clinical standards.</p>
              </div>
              <div className="clinic-exp-features">
                <div className="clinic-exp-feat">
                  <div className="cef-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div>
                  <div><h4>Private Treatment Bays</h4><p>Curtained treatment areas ensure comfort and privacy during your sessions.</p></div>
                </div>
                <div className="clinic-exp-feat">
                  <div className="cef-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg></div>
                  <div><h4>Modern Equipment</h4><p>Therapeutic and electrotherapy equipment to support your treatment plan.</p></div>
                </div>
                <div className="clinic-exp-feat">
                  <div className="cef-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 20V10 M12 20V4 M6 20v-6"/></svg></div>
                  <div><h4>Exercise Rehabilitation Area</h4><p>Dedicated gym space with specialist equipment for progressive rehabilitation.</p></div>
                </div>
              </div>
              <a href="#gallery" className="btn btn-primary" style={{ marginTop: 28 }}>View Our Gallery</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
