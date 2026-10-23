import React, { useState, useEffect, useRef } from 'react';

const galleryImages = [
  { src: '/Clinic_Images/reception1.png', label: 'Reception & Waiting Area', wide: true, tall: false },
  { src: '/Clinic_Images/bed2.png',       label: 'Treatment Cubicle',        wide: false, tall: true },
  { src: '/Clinic_Images/gym.png',        label: 'Exercise & Rehab Area',    wide: false, tall: false },
  { src: '/Clinic_Images/reception2.png', label: 'Reception Desk',           wide: false, tall: false },
  { src: '/Clinic_Images/bed3.png',       label: 'Treatment Bays',           wide: true,  tall: false },
  { src: '/Clinic_Images/bed1.png',       label: 'Treatment Equipment',      wide: false, tall: false },
];

export default function Gallery() {
  const [lightboxIdx, setLightboxIdx] = useState(-1);
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

  useEffect(() => {
    const handleKey = (e) => {
      if (lightboxIdx < 0) return;
      if (e.key === 'Escape') setLightboxIdx(-1);
      if (e.key === 'ArrowLeft') setLightboxIdx(i => (i - 1 + galleryImages.length) % galleryImages.length);
      if (e.key === 'ArrowRight') setLightboxIdx(i => (i + 1) % galleryImages.length);
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [lightboxIdx]);

  useEffect(() => {
    document.body.style.overflow = lightboxIdx >= 0 ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightboxIdx]);

  return (
    <>
      <section className="section" id="gallery" aria-labelledby="galleryHeading" ref={sectionRef}>
        <div className="wrap">
          <div className="section-head reveal">
            <span className="eyebrow">Our Clinic</span>
            <h2 id="galleryHeading">A professional environment built for your recovery</h2>
            <p>A clean, comfortable and well-equipped clinic space for your treatment and rehabilitation.</p>
          </div>
          <div className="gallery-grid reveal" id="galleryGrid" aria-label="Clinic gallery">
            {galleryImages.map((img, idx) => (
              <div
                key={img.src}
                className={`g-item${img.wide ? ' g-wide' : ''}${img.tall ? ' g-tall' : ''}`}
                tabIndex={0}
                role="button"
                aria-label={`View: ${img.label}`}
                data-gallery={idx}
                onClick={() => setLightboxIdx(idx)}
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setLightboxIdx(idx); } }}
              >
                <img src={img.src} alt={img.label} loading="lazy" decoding="async" />
                <div className="g-label" aria-hidden="true">{img.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LIGHTBOX */}
      {lightboxIdx >= 0 && (
        <div
          className="lightbox show"
          id="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          onClick={e => { if (e.target.classList.contains('lightbox')) setLightboxIdx(-1); }}
        >
          <div className="lightbox-inner">
            <img src={galleryImages[lightboxIdx].src} alt={galleryImages[lightboxIdx].label} id="lbImg" />
            <p className="lb-caption" id="lbCaption">{galleryImages[lightboxIdx].label}</p>
            <button className="lb-close" id="lbClose" aria-label="Close image viewer" onClick={() => setLightboxIdx(-1)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
            <button className="lb-nav lb-prev" id="lbPrev" aria-label="Previous image" onClick={() => setLightboxIdx(i => (i - 1 + galleryImages.length) % galleryImages.length)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <button className="lb-nav lb-next" id="lbNext" aria-label="Next image" onClick={() => setLightboxIdx(i => (i + 1) % galleryImages.length)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="9 6 15 12 9 18"/></svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
