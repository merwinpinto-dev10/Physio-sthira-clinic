import React, { useState, useEffect } from 'react';
import { CLINIC, phoneLink, waLink } from '../data/clinicData';

const NAV_ITEMS = [
  { href: '#services', label: 'Services' },
  { href: '#why', label: 'Why Us' },
  { href: '#process', label: 'Approach' },
  { href: '#homecare', label: 'Home Physio' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#faq', label: 'FAQ' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar({ onOpenBooking }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  // Handle scroll for sticky header state and active section highlighting
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Scroll spy for current section on large screen
      const pos = window.scrollY + 180;
      let current = '';
      for (const item of NAV_ITEMS) {
        const el = document.querySelector(item.href);
        if (el && el.offsetTop <= pos) {
          current = item.href;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Automatically close mobile menu when screen size increases
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900) {
        setMobileOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const closeMobile = () => setMobileOpen(false);
  const toggleMobile = () => setMobileOpen(prev => !prev);

  return (
    <>
      {/* TOP INFO BAR */}
      <div className="topbar" role="complementary" aria-label="Clinic information">
        <div className="wrap">
          <div className="topbar-left">
            <span className="tb-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              Mon–Sat: 8 AM – 8 PM · Sun: 9 AM – 12 PM
            </span>
            <span className="tb-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span>Vidyaranyapura, Bengaluru</span>
            </span>
          </div>
          <div className="topbar-right">
            <span className="tb-badge">Home Visits Available</span>
            <a href={phoneLink()} className="tb-link">Call Us</a>
          </div>
        </div>
      </div>

      {/* HEADER */}
      <header id="siteHeader" className={scrolled ? 'scrolled' : ''}>
        <div className="wrap nav">
          <a href="#top" className="brand" aria-label="Physio Sthira Home">
            <img src="/assets/logo.png" alt="Physio Sthira logo" className="brand-logo" width="48" height="48" />
            <span className="brand-text">
              <span className="brand-name"><span className="bn-p">PHYSIO</span><span className="bn-s">STHIRA</span></span>
              <small>Empowering and Inspiring Lives</small>
            </span>
          </a>

          {/* Desktop Navlinks with Active Section indicator */}
          <nav className="navlinks" aria-label="Primary navigation">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={activeSection === item.href ? 'active' : ''}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="nav-cta">
            <a href={phoneLink()} className="btn btn-ghost btn-sm" id="navCallBtn" aria-label="Call the clinic">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              Call
            </a>
            <button className="btn btn-primary btn-sm" onClick={() => onOpenBooking()} aria-haspopup="dialog">
              Book Appointment
            </button>
            <button
              className="hamburger"
              aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobileMenu"
              id="hamburger"
              onClick={toggleMobile}
            >
              {mobileOpen ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <line x1="4" y1="7" x2="20" y2="7"/>
                  <line x1="4" y1="12" x2="20" y2="12"/>
                  <line x1="4" y1="17" x2="20" y2="17"/>
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      <div
        className={`mobile-menu${mobileOpen ? ' show' : ''}`}
        id="mobileMenu"
        aria-hidden={!mobileOpen}
        role="dialog"
        aria-label="Navigation menu"
      >
        {/* Explicit Close Button inside Drawer */}
        <button
          className="mobile-close-btn"
          onClick={closeMobile}
          aria-label="Close navigation menu"
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            width: 44,
            height: 44,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'none',
            border: 'none',
            color: 'var(--navy)',
            cursor: 'pointer',
            borderRadius: 8,
            padding: 8,
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ width: 26, height: 26 }} aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>


        {NAV_ITEMS.map((item) => (
          <a
            key={item.href}
            href={item.href}
            onClick={closeMobile}
            className={activeSection === item.href ? 'active' : ''}
          >
            {item.label}
          </a>
        ))}

        <div className="mobile-menu-actions">
          <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn btn-wa" onClick={closeMobile}>
            WhatsApp Us
          </a>
          <button
            className="btn btn-primary"
            onClick={() => { closeMobile(); onOpenBooking(); }}
            aria-haspopup="dialog"
          >
            Book Appointment
          </button>
        </div>
      </div>
    </>
  );
}
