import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustMarquee from './components/TrustMarquee';
import ConcernSelector from './components/ConcernSelector';
import Services from './components/Services';
import WhyChooseUs from './components/WhyChooseUs';
import TreatmentProcess from './components/TreatmentProcess';
import HomePhysio from './components/HomePhysio';
import ClinicExperience from './components/ClinicExperience';
import ReviewsCarousel from './components/ReviewsCarousel';
import Gallery from './components/Gallery';
import Faq from './components/Faq';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import BackToTop from './components/BackToTop';
import Toast from './components/Toast';
import { waLink, phoneLink } from './data/clinicData';

// Progress bar component
function ProgressBar() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const pct = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100;
      setProgress(Math.min(pct, 100));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return <div className="progress" id="progress" role="progressbar" aria-hidden="true" style={{ width: `${progress}%` }} />;
}

// Global reveal animation observer
function useRevealObserver() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('in')),
      { threshold: 0.1 }
    );
    const observe = () => {
      document.querySelectorAll('.reveal:not(.in), .reveal-left:not(.in), .reveal-right:not(.in)').forEach(el => observer.observe(el));
    };
    observe();
    const t = setTimeout(observe, 100);
    return () => { observer.disconnect(); clearTimeout(t); };
  });
}

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingConcerns, setBookingConcerns] = useState([]);
  const [toast, setToast] = useState({ message: '', type: 'info' });

  useRevealObserver();

  const handleOpenBooking = (concerns = []) => {
    if (typeof concerns === 'string') {
      setBookingConcerns([concerns]);
    } else if (Array.isArray(concerns)) {
      setBookingConcerns(concerns);
    } else {
      setBookingConcerns([]);
    }
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => setIsBookingOpen(false);

  const handleShowToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: '', type: 'info' }), 4500);
  };

  return (
    <>
      <ProgressBar />
      <Navbar onOpenBooking={handleOpenBooking} />

      <main>
        <Hero onOpenBooking={handleOpenBooking} />
        <TrustMarquee />
        <ConcernSelector onOpenBooking={handleOpenBooking} />
        <Services onOpenBooking={handleOpenBooking} />
        <WhyChooseUs onOpenBooking={handleOpenBooking} />
        <TreatmentProcess onOpenBooking={handleOpenBooking} />
        <HomePhysio onOpenBooking={handleOpenBooking} />
        <ClinicExperience />
        <ReviewsCarousel />
        <Gallery />

        {/* CTA BANNER */}
        <section className="section" id="cta-banner" aria-labelledby="ctaHeading">
          <div className="wrap reveal">
            <div className="cta-rule" aria-hidden="true"></div>
            <h2 id="ctaHeading">Ready to begin your recovery?</h2>
            <p>Don't let pain limit your life. Take the first step toward better movement, improved strength and a more active tomorrow.</p>
            <div className="cta-actions">
              <button className="btn btn-white btn-lg" onClick={() => handleOpenBooking()} aria-haspopup="dialog">Book Your Appointment</button>
              <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn btn-outline-light btn-lg">WhatsApp Us</a>
              <a href={phoneLink()} className="btn btn-outline-light btn-lg">Call the Clinic</a>
            </div>
          </div>
        </section>

        <Faq />
        <ContactSection onShowToast={handleShowToast} />
      </main>

      <Footer />

      <FloatingWhatsApp />
      <BackToTop />

      <BookingModal
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
        initialConcerns={bookingConcerns}
        onShowToast={handleShowToast}
      />

      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: '', type: 'info' })}
      />
    </>
  );
}
