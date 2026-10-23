import React, { useState } from 'react';
import { CLINIC, phoneLink, waLink, SERVICES } from '../data/clinicData';

export default function ContactSection({ onShowToast }) {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', service: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [nameErr, setNameErr] = useState(false);
  const [phoneErr, setPhoneErr] = useState(false);
  const [emailErr, setEmailErr] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setNameErr(false); setPhoneErr(false); setEmailErr(false); setShowError(false);

    let valid = true;
    if (!formData.name.trim()) { setNameErr(true); valid = false; }
    if (!formData.phone.trim() || formData.phone.trim().replace(/[^0-9]/g, '').length < 10) { setPhoneErr(true); valid = false; }
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) { setEmailErr(true); valid = false; }
    if (!valid) return;

    setLoading(true);
    try {
      const apiBase = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001';
      const res = await fetch(`${apiBase}/api/enquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim(),
          service: formData.service || 'General Enquiry',
          message: formData.message.trim(),
          source: 'contact-form',
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setShowSuccess(true);
        if (onShowToast) onShowToast('Enquiry sent! We will contact you shortly.', 'success');
      } else {
        setShowError(true);
        if (onShowToast) onShowToast(data.error || 'Submission failed.', 'error');
      }
    } catch {
      setShowError(true);
      if (onShowToast) onShowToast('Network error — please use WhatsApp.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section" id="contact" aria-labelledby="contactHeading">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="eyebrow">Get in Touch</span>
          <h2 id="contactHeading">Visit us or send an enquiry</h2>
          <p>No doctor's referral needed. Contact us directly to book. We'll get back to you promptly.</p>
        </div>
        <div className="contact-layout">
          <div className="reveal-left">
            <div className="contact-info-row">
              <div className="ci-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></div>
              <div>
                <div className="ci-label">Address</div>
                <div className="ci-val">{CLINIC.address}</div>
                <div className="ci-sub">{CLINIC.city}</div>
              </div>
            </div>
            <div className="contact-info-row">
              <div className="ci-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg></div>
              <div>
                <div className="ci-label">Phone</div>
                <div className="ci-val"><a href={phoneLink()} id="contactPhone">{CLINIC.phoneDisplay}</a></div>
                <div className="ci-sub"><a href="tel:08042135387" style={{ color: 'var(--muted)', textDecoration: 'none' }}>080 42135387</a> <span style={{ fontSize: '.8em', color: 'var(--muted)' }}>(Landline)</span></div>
              </div>
            </div>
            <div className="contact-info-row">
              <div className="ci-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></div>
              <div>
                <div className="ci-label">Email</div>
                <div className="ci-val"><a href={`mailto:${CLINIC.email}`}>{CLINIC.email}</a></div>
              </div>
            </div>
            <div className="contact-info-row">
              <div className="ci-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></div>
              <div>
                <div className="ci-label">Clinic Hours</div>
                <div className="ci-val">Mon – Sat: 8:00 AM – 8:00 PM</div>
                <div className="ci-sub">Sunday: 9:00 AM – 12:00 PM</div>
              </div>
            </div>
            <div className="map-wrap">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.277884841968!2d77.5594226!3d13.0816219!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae230625e6e095%3A0xbe3839d3ba3153f6!2sPhysiosthira%20physiotherapy%20clinic!5e0!3m2!1sen!2sin!4v1727475500000!5m2!1sen!2sin"
                width="100%" height="200"
                style={{ border: 0, display: 'block' }}
                allowFullScreen loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="PhysioSthira — 13th Cross Rd, HMT Layout, Vidyaranyapura, Bengaluru"
              />
            </div>
            <div className="contact-links">
              <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn btn-wa btn-sm">WhatsApp</a>
              <a href={phoneLink()} className="btn btn-ghost btn-sm">Call</a>
            </div>
          </div>

          <div className="contact-form-card reveal-right">
            <h3>Send an Enquiry</h3>
            <p>Fill in your details and we'll get back to you shortly to confirm a time.</p>

            {!showSuccess ? (
              <form id="contactForm" onSubmit={handleSubmit} noValidate aria-label="Contact enquiry form">
                <div className="field">
                  <label htmlFor="cName">Full Name <span aria-hidden="true" style={{ color: '#d94b3e' }}>*</span></label>
                  <input type="text" id="cName" name="name" placeholder="Your full name" required autoComplete="name" value={formData.name} onChange={handleChange} />
                  {nameErr && <div className="field-error" role="alert">Please enter your name.</div>}
                </div>
                <div className="field">
                  <label htmlFor="cPhone">Phone Number <span aria-hidden="true" style={{ color: '#d94b3e' }}>*</span></label>
                  <input type="tel" id="cPhone" name="phone" placeholder="+91 XXXXX XXXXX" required autoComplete="tel" value={formData.phone} onChange={handleChange} />
                  {phoneErr && <div className="field-error" role="alert">Please enter a valid phone number.</div>}
                </div>
                <div className="field">
                  <label htmlFor="cEmail">Email Address</label>
                  <input type="email" id="cEmail" name="email" placeholder="your@email.com" autoComplete="email" value={formData.email} onChange={handleChange} />
                  {emailErr && <div className="field-error" role="alert">Please enter a valid email address.</div>}
                </div>
                <div className="field">
                  <label htmlFor="cService">What do you need help with?</label>
                  <select id="cService" name="service" value={formData.service} onChange={handleChange}>
                    <option value="">Select a service...</option>
                    <option>Pain Management</option>
                    <option>Sports Physiotherapy</option>
                    <option>Orthopaedic Rehabilitation</option>
                    <option>Post-Surgical Rehabilitation</option>
                    <option>Neurological Rehabilitation</option>
                    <option>Home Physiotherapy</option>
                    <option>Geriatric Physiotherapy</option>
                    <option>Women's Health</option>
                    <option>Not sure yet</option>
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="cMsg">Tell us about your symptoms (optional)</label>
                  <textarea id="cMsg" name="message" placeholder="Briefly describe your condition..." rows="3" value={formData.message} onChange={handleChange}></textarea>
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={loading} id="contactSubmit">
                  {loading ? 'Sending...' : <>Send Enquiry <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg></>}
                </button>
                <p className="form-note">Your information is kept private and used only to respond to your enquiry.</p>
              </form>
            ) : (
              <div style={{ textAlign: 'center', padding: '16px 0' }} aria-live="polite">
                <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--teal-tint)', color: 'var(--teal-deep)', display: 'grid', placeItems: 'center', margin: '0 auto 14px' }} aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 26, height: 26 }}><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <h4 style={{ fontSize: '1.15rem', color: 'var(--teal-deep)', marginBottom: 8 }}>Enquiry Received</h4>
                <p style={{ color: 'var(--body)', fontSize: '.92rem' }}>Thank you — we've received your message and will get back to you shortly.</p>
              </div>
            )}

            {showError && !showSuccess && (
              <div style={{ textAlign: 'center', padding: '16px 0' }} aria-live="polite">
                <h4 style={{ fontSize: '1.05rem', color: '#d94b3e', marginBottom: 8 }}>Something went wrong</h4>
                <p style={{ color: 'var(--body)', fontSize: '.9rem', marginBottom: 14 }}>Please try again, or reach us on WhatsApp or phone.</p>
                <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
                  <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn btn-wa btn-sm">WhatsApp Us</a>
                  <a href={phoneLink()} className="btn btn-ghost btn-sm">Call Us</a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
