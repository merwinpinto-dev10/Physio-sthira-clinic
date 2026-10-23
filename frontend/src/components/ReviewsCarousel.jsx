import React, { useState, useEffect, useRef } from 'react';
import { REVIEWS } from '../data/clinicData';

const AVATAR_COLORS = ['#098699','#011C47','#076B77','#2B3351','#0A8291','#C4A35A'];

export default function ReviewsCarousel() {
  const [current, setCurrent] = useState(0);
  const sectionRef = useRef(null);
  const total = REVIEWS.length;

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

  const prev = () => setCurrent(c => (c - 1 + total) % total);
  const next = () => setCurrent(c => (c + 1) % total);

  // Get 5 indices for queue carousel: farLeft, left, center, right, farRight
  const getIdx = (offset) => (current + offset + total) % total;

  const positions = [
    { key: 'farLeft',  offset: -2, style: { transform: 'translateX(-600px) scale(0.75)', opacity: 0.35, zIndex: 1 } },
    { key: 'left',     offset: -1, style: { transform: 'translateX(-290px) scale(0.88)', opacity: 0.65, zIndex: 2 } },
    { key: 'center',   offset:  0, style: { transform: 'translateX(0) scale(1)',        opacity: 1,    zIndex: 5 } },
    { key: 'right',    offset:  1, style: { transform: 'translateX(290px) scale(0.88)', opacity: 0.65, zIndex: 2 } },
    { key: 'farRight', offset:  2, style: { transform: 'translateX(600px) scale(0.75)', opacity: 0.35, zIndex: 1 } },
  ];

  return (
    <section className="section" id="testimonials" aria-labelledby="testimonialsHeading" ref={sectionRef}>
      <div className="wrap">
        <div className="section-head center reveal">
          <span className="eyebrow">Patient Voices</span>
          <h2 id="testimonialsHeading">What our patients say</h2>
          <p>Genuine feedback from real patients — sourced directly from Google.</p>
        </div>

        <div className="gr-carousel" id="grCarousel" role="region" aria-label="Patient reviews carousel" aria-roledescription="carousel">
          <div className="gr-carousel-stage" id="grCarouselStage">
            {positions.map(({ key, offset, style }) => {
              const rev = REVIEWS[getIdx(offset)];
              const colorIdx = getIdx(offset) % AVATAR_COLORS.length;
              return (
                <div
                  key={key}
                  className="gr-carousel-card"
                  data-front={key === 'center' ? 'true' : undefined}
                  data-pos={key}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`Review by ${rev.name}`}
                  style={{
                    ...style,
                    visibility: 'visible',
                    pointerEvents: key === 'center' ? 'auto' : 'auto',
                  }}
                  onClick={() => {
                    if (key === 'left' || key === 'farLeft') prev();
                    else if (key === 'right' || key === 'farRight') next();
                  }}
                >
                  {rev.dp ? (
                    <img src={`/${rev.dp}`} alt={rev.name} className="gr-card-avatar" loading="lazy" />
                  ) : (
                    <div className="gr-card-initials" style={{ background: AVATAR_COLORS[colorIdx] }}>
                      {rev.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="gr-card-stars" aria-label={`${rev.rating} stars`}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} className={`gr-card-star${i >= rev.rating ? ' gr-card-star-empty' : ''}`}>
                        <svg viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 0 0-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 0 0 .951-.69l1.07-3.292z"/></svg>
                      </span>
                    ))}
                  </div>
                  <div className="gr-card-name">{rev.name}</div>
                  <p className="gr-card-text">{rev.review}</p>
                </div>
              );
            })}
          </div>
          <button className="gr-nav gr-nav-prev" id="grPrev" onClick={prev} aria-label="Previous review">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <button className="gr-nav gr-nav-next" id="grNext" onClick={next} aria-label="Next review">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="9 6 15 12 9 18"/></svg>
          </button>
          <div className="gr-sr-live" id="grSrLive" aria-live="polite" aria-atomic="true">
            Review {current + 1} of {total} by {REVIEWS[current].name}
          </div>
        </div>

        <div className="gr-more-reviews reveal" id="grMoreReviews">
          <p className="gr-more-text">For more reviews</p>
          <a href="https://maps.app.goo.gl/GVh1un9evzGuRD2A7" className="btn btn-primary" target="_blank" rel="noopener noreferrer">View all the reviews on Google</a>
        </div>
      </div>
    </section>
  );
}
