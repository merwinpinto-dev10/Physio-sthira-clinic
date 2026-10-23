import React from 'react';

export default function Toast({ message }) {
  return (
    <div className={`toast ${message ? 'show' : ''}`} id="toast" role="status" aria-live="polite">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
        <polyline points="20 6 9 17 4 12" />
      </svg>
      <span id="toastMsg">{message}</span>
    </div>
  );
}
