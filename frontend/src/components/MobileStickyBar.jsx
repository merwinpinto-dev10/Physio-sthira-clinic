import React from 'react';
import { waLink } from '../data/clinicData';

export default function MobileStickyBar({ onOpenBooking }) {
  return (
    <div className="sticky-mobile" id="stickyBar" role="navigation" aria-label="Quick mobile actions">
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => onOpenBooking()}
        style={{ flex: 1, justifyContent: 'center' }}
      >
        Book Appointment
      </button>
      <a
        href={waLink()}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-wa"
        style={{ flex: 1, justifyContent: 'center' }}
      >
        WhatsApp
      </a>
    </div>
  );
}
