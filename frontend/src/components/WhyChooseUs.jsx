import React, { useEffect, useRef } from 'react';

export default function WhyChooseUs({ onOpenBooking }) {
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
    <section className="section" id="why" aria-labelledby="whyHeading" ref={sectionRef}>
      <div className="wrap">
        <div className="why-grid">
          <div className="why-intro reveal-left">
            <span className="eyebrow eyebrow-light">Why Physio Sthira</span>
            <h2 id="whyHeading">A different kind of physiotherapy practice.</h2>
            <div className="why-intro-rule" aria-hidden="true"></div>
            <p>We don't offer generic protocols or rushed sessions. Every patient receives a plan built specifically around their condition, their goals and their life.</p>
            <div className="why-items" style={{ marginTop: 24 }}>
              <div className="why-item">
                <span className="why-num" aria-hidden="true">01</span>
                <div>
                  <h3>Thorough Initial Assessment</h3>
                  <p>Your first appointment involves a detailed evaluation — not a rushed intake. We take time to understand your condition, history and goals fully.</p>
                </div>
              </div>
              <div className="why-item">
                <span className="why-num" aria-hidden="true">02</span>
                <div>
                  <h3>Individualised Treatment Plans</h3>
                  <p>No two people are the same. Your plan is tailored specifically to you — your diagnosis, your body and your recovery timeline.</p>
                </div>
              </div>
              <div className="why-item">
                <span className="why-num" aria-hidden="true">03</span>
                <div>
                  <h3>Progressive Rehabilitation</h3>
                  <p>Treatment evolves as you improve. We progressively challenge you to restore strength, function and confidence — at the right pace.</p>
                </div>
              </div>
              <div className="why-item">
                <span className="why-num" aria-hidden="true">04</span>
                <div>
                  <h3>Education &amp; Self-Management</h3>
                  <p>We explain your condition clearly and equip you with home exercise programs and tools to manage your recovery between sessions.</p>
                </div>
              </div>
              <div className="why-item">
                <span className="why-num" aria-hidden="true">05</span>
                <div>
                  <h3>Focus on Long-Term Recovery</h3>
                  <p>Our goal is addressing root causes and reducing recurrence — not just temporary symptom relief.</p>
                </div>
              </div>
            </div>
            <button className="btn btn-white" onClick={() => onOpenBooking()} style={{ marginTop: 32 }} aria-haspopup="dialog">Start Your Recovery</button>
          </div>
          <div className="why-photo photo-frame reveal-right">
            <img src="/Clinic_Images/reception2.png" alt="Physio Sthira reception area with brand signage — Empowering and Inspiring Lives" width="900" height="675" loading="lazy" decoding="async" />
          </div>
        </div>
      </div>
    </section>
  );
}
