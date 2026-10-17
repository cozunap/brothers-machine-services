/**
 * Brothers Machine Services Corp - Shared Components Engine (English Only)
 * High-Precision Marine Navigation, Status Bar, Mobile Drawer, and Shared Footer
 */

(function () {
  'use strict';

  // Determine current active page
  function getCurrentPage() {
    const path = window.location.pathname;
    const page = path.split('/').pop().replace('.html', '') || 'index';
    return page;
  }

  // Inject Header
  function renderHeader() {
    const headerContainer = document.getElementById('header-placeholder');
    if (!headerContainer) return;

    const activePage = getCurrentPage();
    const logoSrc = 'Brothers Machine Services Corp Logo.webp';

    headerContainer.innerHTML = `
      <!-- Top Maritime Status Bar -->
      <div class="header-top-bar">
        <div class="container top-bar-inner">
          <div class="top-bar-left">
            <span class="status-indicator"><span class="status-pulse"></span> STATIONED ON-SITE:</span>
            <span class="station-tag">GMD Navy Shipyard (Brooklyn)</span>
            <span class="divider">/</span>
            <span class="station-tag">Caddell Drydock (Staten Island)</span>
          </div>
          <div class="top-bar-right">
            <span class="station-tag" style="color:var(--steel-300);">Fully Insured Marine Machining</span>
            <span class="divider">/</span>
            <a href="tel:+17185550199" class="phone-link">
              24/7 Dispatch: <strong>(718) 555-0199</strong>
            </a>
          </div>
        </div>
      </div>

      <!-- Main Sticky Navigation Bar -->
      <header class="site-header" id="main-header">
        <div class="container nav-container">
          <a href="index.html" class="brand-wrapper" aria-label="Brothers Machine Services Corp - Home">
            <div class="brand-logo-frame">
              <img src="${logoSrc}" alt="Brothers Machine Services Corp" class="brand-logo-img">
            </div>
          </a>

          <nav class="main-nav" aria-label="Main Navigation">
            <ul class="nav-links">
              <li><a href="index.html" class="nav-link ${activePage === 'index' ? 'active' : ''}">Home</a></li>
              <li><a href="services.html" class="nav-link ${activePage === 'services' ? 'active' : ''}">Outside Machining</a></li>
              <li><a href="shipyards.html" class="nav-link ${activePage === 'shipyards' ? 'active' : ''}">Shipyards & Docks</a></li>
              <li><a href="about.html" class="nav-link ${activePage === 'about' ? 'active' : ''}">History & Heritage</a></li>
              <li><a href="contact.html" class="nav-link ${activePage === 'contact' ? 'active' : ''}">Contact & RFQ</a></li>
            </ul>

            <div class="nav-actions">
              <a href="contact.html" class="nav-cta-btn">
                <span class="cta-pulse-dot"></span>
                <span>24/7 Dispatch</span>
              </a>
              <button class="mobile-menu-toggle" id="mobile-toggle" aria-label="Open Mobile Menu" aria-expanded="false">
                <span class="hamburger-line"></span>
                <span class="hamburger-line"></span>
                <span class="hamburger-line"></span>
              </button>
            </div>
          </nav>
        </div>
      </header>

      <!-- Mobile Navigation Drawer -->
      <div class="mobile-backdrop" id="mobile-backdrop"></div>
      <aside class="mobile-nav-drawer" id="mobile-drawer" aria-label="Mobile Navigation Menu">
        <div>
          <button class="close-btn" id="mobile-close" aria-label="Close Mobile Menu">&times;</button>
          <div style="display:flex; align-items:center; gap:0.85rem; margin-top:1rem; margin-bottom:1.5rem;">
            <img src="${logoSrc}" alt="Brothers Machine Logo" style="height:56px; width:auto;">
            <div>
              <div style="font-family:var(--font-tech); font-size:0.95rem; font-weight:800; color:#fff; letter-spacing:0.06em;">
                BROTHERS MACHINE
              </div>
              <div style="font-family:var(--font-tech); font-size:0.7rem; font-weight:700; color:var(--brand-blue); text-transform:uppercase;">
                Outside Marine Machining
              </div>
            </div>
          </div>

          <ul class="mobile-nav-links">
            <li><a href="index.html" class="${activePage === 'index' ? 'active' : ''}">Home</a></li>
            <li><a href="services.html" class="${activePage === 'services' ? 'active' : ''}">Outside Machining</a></li>
            <li><a href="shipyards.html" class="${activePage === 'shipyards' ? 'active' : ''}">Shipyards & Docks</a></li>
            <li><a href="about.html" class="${activePage === 'about' ? 'active' : ''}">History & Heritage</a></li>
            <li><a href="contact.html" class="${activePage === 'contact' ? 'active' : ''}">Contact & RFQ</a></li>
          </ul>
        </div>

        <div style="display:flex; flex-direction:column; gap:1rem; margin-top:2rem;">
          <a href="tel:+17185550199" class="btn btn-secondary" style="font-size:0.88rem; justify-content:center;">
            📞 Call (718) 555-0199
          </a>
          <a href="contact.html" class="btn btn-accent" style="font-size:0.88rem; justify-content:center;">
            Request Mobilization
          </a>
        </div>
      </aside>
    `;

    // Sticky header scroll behavior
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, { passive: true });

    // Drawer Toggles
    const toggleBtn = document.getElementById('mobile-toggle');
    const closeBtn = document.getElementById('mobile-close');
    const drawer = document.getElementById('mobile-drawer');
    const backdrop = document.getElementById('mobile-backdrop');

    function openDrawer() {
      drawer.classList.add('open');
      backdrop.classList.add('open');
      toggleBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
      drawer.classList.remove('open');
      backdrop.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    if (toggleBtn) toggleBtn.addEventListener('click', openDrawer);
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
    if (backdrop) backdrop.addEventListener('click', closeDrawer);
  }

  // Inject Footer
  function renderFooter() {
    const footerContainer = document.getElementById('footer-placeholder');
    if (!footerContainer) return;

    footerContainer.innerHTML = `
      <footer class="site-footer">
        <div class="container">
          <div class="footer-grid">
            <div class="footer-brand">
              <div style="display:flex; align-items:center; gap:0.85rem;">
                <img src="Brothers Machine Services Corp Logo.webp" alt="Brothers Machine Services Corp" style="height:56px; width:auto;">
                <div>
                  <h4 style="font-size:1.1rem; color:#fff; letter-spacing:0.04em;">BROTHERS MACHINE</h4>
                  <p style="font-size:0.75rem; color:var(--brand-blue); text-transform:uppercase; letter-spacing:0.12em; margin:0;">SERVICES CORP • NYC SHIPYARDS</p>
                </div>
              </div>
              <p>
                Precision outside and on-site machining specialists stationed at GMD Navy Shipyard and Caddell Drydock. Delivering hands-on marine engineering, line boring, flange facing, and shaft alignment with full marine insurance coverage.
              </p>
              <div style="margin-top:1.5rem; display:flex; gap:0.75rem; flex-wrap:wrap;">
                <span class="shipyard-badge" style="color:var(--brand-blue); border-color:rgba(19,158,241,0.35);">GMD Navy Shipyard</span>
                <span class="shipyard-badge" style="color:var(--brand-coral); border-color:rgba(235,80,55,0.35);">Caddell Drydock</span>
                <span class="shipyard-badge" style="color:#38bdf8; border-color:rgba(56,189,248,0.35);">Fully Insured</span>
              </div>
            </div>

            <div>
              <h4 class="footer-title">Navigation</h4>
              <ul class="footer-links">
                <li><a href="index.html">Home</a></li>
                <li><a href="services.html">Outside Machining</a></li>
                <li><a href="shipyards.html">Shipyards & Docks</a></li>
                <li><a href="about.html">History & Heritage</a></li>
                <li><a href="contact.html">Contact & RFQ</a></li>
              </ul>
            </div>

            <div>
              <h4 class="footer-title">Core Capabilities</h4>
              <ul class="footer-links">
                <li><a href="services.html#line-boring">On-Site Line Boring</a></li>
                <li><a href="services.html#flange-facing">Flange Facing & Milling</a></li>
                <li><a href="services.html#shaft-machining">Shaft & Journal Machining</a></li>
                <li><a href="services.html#deck-machinery">Deck Machinery & Winches</a></li>
                <li><a href="services.html#bolt-tensioning">Hydraulic Bolt Tensioning</a></li>
                <li><a href="services.html#optical-alignment">Optical & Laser Alignment</a></li>
              </ul>
            </div>

            <div>
              <h4 class="footer-title">Shipyard Stations</h4>
              <div class="footer-contact-item">
                <span class="footer-contact-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="3"/><line x1="12" y1="22" x2="12" y2="8"/><path d="M5 12H2a10 10 0 0 0 20 0h-3"/></svg>
                </span>
                <div>
                  <strong style="color:#fff;">GMD Shipyard (Brooklyn Navy Yard)</strong>
                  <div style="font-size:0.82rem; color:#94a3b8;">Drydocks 1, 5 & 6 • On-Site Marine Machining</div>
                </div>
              </div>
              <div class="footer-contact-item">
                <span class="footer-contact-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="3"/><line x1="12" y1="22" x2="12" y2="8"/><path d="M5 12H2a10 10 0 0 0 20 0h-3"/></svg>
                </span>
                <div>
                  <strong style="color:#fff;">Caddell Drydock (Staten Island)</strong>
                  <div style="font-size:0.82rem; color:#94a3b8;">Richmond Terrace • Drydock Outside Machining</div>
                </div>
              </div>
              <div class="footer-contact-item">
                <span class="footer-contact-icon" style="color:#38bdf8;">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                </span>
                <div style="font-size:0.85rem; color:#cbd5e1;">
                  Fully Insured: Ship Repairer’s Legal Liability, Marine General Liability & Workers’ Comp.
                </div>
              </div>
            </div>
          </div>

          <div class="footer-bottom">
            <div>
              &copy; <span id="current-year">${new Date().getFullYear()}</span> Brothers Machine Services Corp. All Rights Reserved. Crafted for Heavy Marine Precision.
            </div>
            <div style="display:flex; gap:1.5rem; align-items:center;">
              <a href="contact.html" style="color:var(--color-steel-400); font-size:0.82rem;">Port Security / TWIC Compliant</a>
              <a href="contact.html" style="color:var(--brand-blue); font-size:0.82rem;">Request COI (Certificate of Insurance)</a>
            </div>
          </div>
        </div>
      </footer>
    `;
  }

  // Initialize
  document.addEventListener('DOMContentLoaded', () => {
    renderHeader();
    renderFooter();
  });
})();
