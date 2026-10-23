import React, { useState, useEffect } from 'react';
import { waLink } from '../data/clinicData';

const SERVICE_NAMES = [
  'Pain Management',
  'Sports Physiotherapy',
  'Orthopaedic Rehabilitation',
  'Post-Surgical Rehab',
  'Neurological Rehabilitation',
  'Home Physiotherapy',
  'Geriatric Physiotherapy',
  'Not sure yet'
];

const VISIT_OPTS = [
  {
    type: 'Clinic Visit',
    subtitle: 'Visit our clinic',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    )
  },
  {
    type: 'Home Visit',
    subtitle: 'We come to you',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="1" y="3" width="15" height="13"/>
        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
        <circle cx="5.5" cy="18.5" r="2.5"/>
        <circle cx="18.5" cy="18.5" r="2.5"/>
      </svg>
    )
  },
];

export default function BookingModal({ isOpen, onClose, initialConcerns = [], onShowToast }) {
  const [step, setStep] = useState(1);
  const [selectedServices, setSelectedServices] = useState([]);
  const [visitType, setVisitType] = useState('Clinic Visit');
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setErrorMsg('');
      setBookingSuccess(null);
      
      if (initialConcerns && initialConcerns.length > 0) {
        // Map initial concerns to services if applicable or keep concern names
        const matched = [];
        initialConcerns.forEach(c => {
          const match = SERVICE_NAMES.find(s => s.toLowerCase().includes(c.toLowerCase()) || c.toLowerCase().includes(s.toLowerCase()));
          if (match && !matched.includes(match)) {
            matched.push(match);
          } else if (!matched.includes(c)) {
            matched.push(c);
          }
        });
        setSelectedServices(matched.length > 0 ? matched : initialConcerns);
      } else {
        setSelectedServices([]);
      }
    }
  }, [isOpen, initialConcerns]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape' && isOpen) onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleInput = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const toggleService = (name) => {
    setSelectedServices(prev => {
      if (prev.includes(name)) {
        return prev.filter(s => s !== name);
      } else {
        return [...prev, name];
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.name.trim()) { setErrorMsg('Please enter your full name.'); return; }
    const cleanPhone = formData.phone.trim().replace(/[^0-9]/g, '');
    if (!cleanPhone || cleanPhone.length < 10) { setErrorMsg('Please enter a valid phone number (at least 10 digits).'); return; }

    setLoading(true);
    try {
      const apiBase = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001';
      const res = await fetch(`${apiBase}/api/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim(),
          services: selectedServices.length > 0 ? selectedServices : ['General Assessment'],
          visitType,
          message: formData.message.trim(),
          source: 'booking-modal',
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setBookingSuccess(data.data || { reference: data.reference });
        if (onShowToast) onShowToast('Booking request received!', 'success');
      } else {
        setErrorMsg(data.error || 'Failed to submit. Please contact us directly.');
        if (onShowToast) onShowToast(data.error || 'Booking error', 'error');
      }
    } catch {
      setErrorMsg('Network error. Please message us on WhatsApp.');
      if (onShowToast) onShowToast('Network error — please use WhatsApp.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="modal-overlay show"
      id="modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modalTitle"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="modal-box">
        <button className="modal-close" id="modalClose" onClick={onClose} aria-label="Close booking form">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        {!bookingSuccess && (
          <div className="modal-steps" id="modalSteps">
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div className={`modal-step-dot${step >= 1 ? ' active' : ''}`} id="sdot1">1</div>
              <div className="modal-step-label">Service</div>
            </div>
            <div className={`modal-step-line${step >= 2 ? ' done' : ''}`} id="sline1"></div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div className={`modal-step-dot${step >= 2 ? ' active' : ''}`} id="sdot2">2</div>
              <div className="modal-step-label">Visit Type</div>
            </div>
            <div className={`modal-step-line${step >= 3 ? ' done' : ''}`} id="sline2"></div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div className={`modal-step-dot${step >= 3 ? ' active' : ''}`} id="sdot3">3</div>
              <div className="modal-step-label">Details</div>
            </div>
          </div>
        )}

        <div className="modal-content">
          {/* STEP 1 — Service */}
          {!bookingSuccess && step === 1 && (
            <div className="modal-view active">
              <h3 id="modalTitle">What brings you in?</h3>
              <p>Select one or more services or conditions you need help with.</p>
              <div className="modal-service-tiles" id="modalTiles" role="listbox" aria-multiselectable="true">
                {SERVICE_NAMES.map(name => {
                  const isSelected = selectedServices.includes(name);
                  return (
                    <button
                      key={name}
                      type="button"
                      className={`modal-tile${isSelected ? ' selected' : ''}`}
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => toggleService(name)}
                    >
                      {name}
                    </button>
                  );
                })}
              </div>
              <div className="modal-nav">
                <button type="button" className="btn btn-primary" onClick={() => setStep(2)}>
                  Next →
                </button>
              </div>
            </div>
          )}

          {/* STEP 2 — Visit Type */}
          {!bookingSuccess && step === 2 && (
            <div className="modal-view active">
              <h3>Clinic or Home Visit?</h3>
              <p>Choose where you'd like to receive treatment.</p>
              <div className="modal-visit-opts">
                {VISIT_OPTS.map(v => (
                  <div
                    key={v.type}
                    className={`modal-visit-opt${visitType === v.type ? ' selected' : ''}`}
                    onClick={() => setVisitType(v.type)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={e => { if (e.key === 'Enter') setVisitType(v.type); }}
                  >
                    {v.icon}
                    <b>{v.type}</b>
                    <small>{v.subtitle}</small>
                  </div>
                ))}
              </div>
              <div className="modal-nav">
                <button type="button" className="btn btn-ghost" onClick={() => setStep(1)}>← Back</button>
                <button type="button" className="btn btn-primary" onClick={() => setStep(3)}>Next →</button>
              </div>
            </div>
          )}

          {/* STEP 3 — Details */}
          {!bookingSuccess && step === 3 && (
            <div className="modal-view active">
              <h3>Your Details</h3>
              <p>We'll contact you to confirm your appointment.</p>
              {errorMsg && (
                <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c', padding: '10px 14px', borderRadius: 8, fontSize: '.88rem', marginBottom: 16 }}>
                  {errorMsg}
                </div>
              )}
              <form onSubmit={handleSubmit} noValidate>
                <div className="field">
                  <label htmlFor="bName">Full Name <span style={{ color: '#d94b3e' }}>*</span></label>
                  <input type="text" id="bName" name="name" placeholder="Patient full name" value={formData.name} onChange={handleInput} required />
                </div>
                <div className="field">
                  <label htmlFor="bPhone">Phone Number <span style={{ color: '#d94b3e' }}>*</span></label>
                  <input type="tel" id="bPhone" name="phone" placeholder="+91 98765 43210" value={formData.phone} onChange={handleInput} required />
                </div>
                <div className="field">
                  <label htmlFor="bEmail">Email Address (optional)</label>
                  <input type="email" id="bEmail" name="email" placeholder="your@email.com" value={formData.email} onChange={handleInput} />
                </div>
                <div className="field">
                  <label htmlFor="bMsg">Symptoms or Notes (optional)</label>
                  <textarea id="bMsg" name="message" rows={2} placeholder="Any specific symptoms, previous treatments..." value={formData.message} onChange={handleInput}></textarea>
                </div>
                <div className="modal-nav">
                  <button type="button" className="btn btn-ghost" onClick={() => setStep(2)} disabled={loading}>← Back</button>
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Submitting...' : 'Request Appointment'}
                  </button>
                </div>
                <p style={{ fontSize: '.78rem', color: 'var(--muted)', marginTop: 12, textAlign: 'center' }}>
                  By submitting, you consent to our clinic contacting you to confirm your appointment.
                </p>
              </form>
            </div>
          )}

          {/* SUCCESS */}
          {bookingSuccess && (
            <div className="modal-success">
              <div className="success-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <h3 id="modalTitle">Appointment Requested!</h3>
              <p>Thank you — your request is received and our team will get back to you shortly to confirm.</p>
              {bookingSuccess.reference && (
                <p style={{ fontSize: '.84rem', background: 'var(--teal-tint)', padding: '8px 14px', borderRadius: 8, marginBottom: 16 }}>
                  Reference: <strong>{bookingSuccess.reference}</strong>
                </p>
              )}
              <a
                href={waLink(`Hi PhysioSthira, I just requested an appointment${bookingSuccess.reference ? ` (${bookingSuccess.reference})` : ''}. Can you confirm my time?`)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-wa"
                style={{ width: '100%', justifyContent: 'center', marginBottom: 10 }}
              >
                Fast-Track on WhatsApp
              </a>
              <button className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center' }} onClick={onClose}>
                Done & Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
