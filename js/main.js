/**
 * Brothers Machine Services Corp - Interactive Controller
 * Lightbox Gallery, Form Handlers, and UI Micro-interactions
 */

(function () {
  'use strict';

  // Lightbox Modal Setup
  function initLightbox() {
    let modal = document.getElementById('lightbox-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'lightbox-modal';
      modal.className = 'lightbox-modal';
      modal.innerHTML = `
        <div class="lightbox-content">
          <button class="lightbox-close" id="lightbox-close" aria-label="Close Lightbox">&times;</button>
          <img src="" alt="" class="lightbox-img" id="lightbox-img">
          <div class="lightbox-caption" id="lightbox-caption"></div>
        </div>
      `;
      document.body.appendChild(modal);

      const closeBtn = document.getElementById('lightbox-close');
      const closeHandler = () => modal.classList.remove('active');
      closeBtn.addEventListener('click', closeHandler);
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeHandler();
      });
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeHandler();
      });
    }

    const galleryItems = document.querySelectorAll('[data-lightbox-src]');
    galleryItems.forEach(item => {
      item.style.cursor = 'pointer';
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const src = item.getAttribute('data-lightbox-src');
        const caption = item.getAttribute('data-lightbox-caption') || '';
        const modalImg = document.getElementById('lightbox-img');
        const modalCaption = document.getElementById('lightbox-caption');
        if (modalImg) modalImg.src = src;
        if (modalCaption) modalCaption.textContent = caption;
        modal.classList.add('active');
      });
    });
  }

  // Interactive RFQ / Mobilization Form
  function initContactForm() {
    const form = document.getElementById('rfq-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>⏳ Processing Mobilization Request...</span>`;

      setTimeout(() => {
        form.innerHTML = `
          <div style="text-align:center; padding: 2.5rem 1rem;">
            <div style="font-size:3rem; margin-bottom:1rem;">✅</div>
            <h3 style="color:#ffffff; margin-bottom:0.75rem;">Mobilization Request Received</h3>
            <p style="color:var(--color-steel-300); max-width:520px; margin:0 auto 1.5rem;">
              Thank you. Our on-call shipyard outside machining superintendent has received your specifications and will contact you immediately to coordinate tooling and site arrival.
            </p>
            <div style="display:inline-block; padding:0.75rem 1.5rem; background:rgba(19,158,241,0.15); border:1px solid var(--brand-blue); border-radius:4px; color:var(--brand-blue-light); font-family:var(--font-tech); font-size:0.9rem;">
              Emergency On-Site Hotline: <strong style="color:#fff;">(718) 555-0199</strong> (24/7 Drydock Dispatch)
            </div>
          </div>
        `;
      }, 1200);
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initLightbox();
    initContactForm();
  });
})();
