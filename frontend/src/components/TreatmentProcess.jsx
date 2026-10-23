import React, { useEffect, useRef } from 'react';

export default function TreatmentProcess({ onOpenBooking }) {
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
    <section className="section" id="process" aria-labelledby="processHeading" ref={sectionRef}>
      <div className="wrap">
        <div className="process-layout">
          <div className="photo-frame process-photo reveal-left">
            <img
              src="/Clinic_Images/bed2.png"
              alt="Modern treatment cubicle at Physio Sthira with privacy curtains and therapeutic equipment"
              width="900"
              height="1200"
              loading="lazy"
              decoding="async"
            />
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
            <button
              className="btn btn-primary"
              onClick={() => onOpenBooking && onOpenBooking()}
              style={{ marginTop: 28 }}
              aria-haspopup="dialog"
            >
              Book Your Assessment
            </button>
            <div className="first-visit-note reveal" style={{ marginTop: 28 }}>
              <h4>What to expect at your first visit</h4>
              <ul>
                <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg> Detailed discussion of your symptoms &amp; history</li>
                <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg> Physical assessment of movement and function</li>
                <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg> Clear explanation of findings and treatment options</li>
                <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg> Initial treatment if appropriate on the day</li>
                <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg> A personalised plan for next steps</li>
              </ul>
              <p style={{ marginTop: 12, fontSize: '.8rem', color: 'var(--muted)' }}>
                Your first visit may include the above — specific assessment and treatment will be adapted to your individual needs and condition.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
