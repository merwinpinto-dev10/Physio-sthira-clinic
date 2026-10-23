import React, { useState, useEffect, useRef } from 'react';
import { CONDITIONS } from '../data/clinicData';

export default function ConcernSelector({ onOpenBooking }) {
  const [selectedList, setSelectedList] = useState([]);
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

  const toggleCondition = (cond) => {
    setSelectedList(prev => {
      const exists = prev.some(item => item.label === cond.label);
      if (exists) {
        return prev.filter(item => item.label !== cond.label);
      } else {
        return [...prev, cond];
      }
    });
  };

  const isSelected = (cond) => selectedList.some(item => item.label === cond.label);

  const handleBook = () => {
    if (selectedList.length === 0) {
      onOpenBooking([]);
    } else {
      onOpenBooking(selectedList.map(item => item.label));
    }
  };

  const uniqueServices = Array.from(new Set(selectedList.map(item => item.service)));
  const selectedLabels = selectedList.map(item => item.label).join(', ');

  return (
    <section className="section" id="conditions" aria-labelledby="condHeading" ref={sectionRef}>
      <div className="wrap">
        <div className="cond-grid">
          <div>
            <div className="section-head reveal">
              <span className="eyebrow">What brings you here?</span>
              <h2 id="condHeading">Select your concern to learn how we can help</h2>
              <p>Every recovery starts with understanding. Select your primary concern(s) and we'll explain how PhysioSthira can help assess and support your recovery.</p>
            </div>
            <div className="cond-pills reveal" role="listbox" aria-multiselectable="true" aria-label="Condition selector">
              {CONDITIONS.map((cond) => {
                const active = isSelected(cond);
                return (
                  <button
                    key={cond.label}
                    type="button"
                    className={`cond-btn${active ? ' active' : ''}`}
                    role="option"
                    aria-selected={active}
                    onClick={() => toggleCondition(cond)}
                  >
                    {cond.label}
                  </button>
                );
              })}
            </div>
            <p className="cond-note reveal">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="16" x2="12" y2="12"/>
                <line x1="12" y1="8" x2="12.01" y2="8"/>
              </svg>
              {' '}Don't see your concern? We treat many more conditions — get in touch.
            </p>
          </div>

          <div className="cond-panel reveal" role="region" aria-live="polite" aria-atomic="true" aria-label="Condition information">
            {selectedList.length === 0 ? (
              <div className="cond-panel-empty">
                <div className="big-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14.5 10c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5z"/>
                    <path d="M20.5 10H19V8.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
                    <path d="M9.5 14c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5S8 21.33 8 20.5v-5c0-.83.67-1.5 1.5-1.5z"/>
                    <path d="M3.5 14H5v1.5c0 .83-.67 1.5-1.5 1.5S2 16.33 2 15.5 2.67 14 3.5 14z"/>
                    <path d="M14 14.5c0-.83.67-1.5 1.5-1.5h5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-5c-.83 0-1.5-.67-1.5-1.5z"/>
                    <path d="M15.5 19H14v1.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z"/>
                    <path d="M10 9.5C10 8.67 9.33 8 8.5 8h-5C2.67 8 2 8.67 2 9.5S2.67 11 3.5 11h5c.83 0 1.5-.67 1.5-1.5z"/>
                    <path d="M8.5 5H10V3.5C10 2.67 9.33 2 8.5 2S7 2.67 7 3.5 7.67 5 8.5 5z"/>
                  </svg>
                </div>
                <p>Select one or more conditions from the list to see how Physio Sthira can help with your recovery.</p>
              </div>
            ) : (
              <div className="cond-info show">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <span className="eyebrow" style={{ margin: 0 }}>
                    {selectedList.length === 1 ? selectedList[0].label : `${selectedList.length} Concerns Selected`}
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedList([])}
                    style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', fontSize: '.8rem', padding: '4px 8px' }}
                    aria-label="Clear selected concerns"
                  >
                    Clear
                  </button>
                </div>

                <h3>We can help with {selectedLabels}</h3>

                <p>
                  {selectedList.length === 1
                    ? selectedList[0].desc
                    : `Our physiotherapists provide thorough clinical assessment and an integrated, personalized recovery plan tailored to your symptoms and recovery goals.`
                  }
                </p>

                <div className="cond-service-tags" style={{ display: 'flex', flexWrap: 'wrap', gap: 6, margin: '12px 0 16px' }}>
                  {uniqueServices.map(svc => (
                    <span key={svc} className="service-tag" style={{ margin: 0 }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 13, height: 13 }} aria-hidden="true">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                      {' '}{svc}
                    </span>
                  ))}
                </div>

                <button
                  type="button"
                  className="btn btn-primary cond-book-btn"
                  onClick={handleBook}
                  aria-haspopup="dialog"
                >
                  Book an Appointment
                </button>

                <div className="disclaimer">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                  Assessment and treatment recommendations are personalised to each patient. This is general guidance, not a clinical diagnosis.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
