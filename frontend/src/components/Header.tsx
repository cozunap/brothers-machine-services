import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SiteSettings } from '../types';
import { Phone, Menu, X, Shield, Anchor } from 'lucide-react';

interface HeaderProps {
  settings: SiteSettings;
}

export const Header: React.FC<HeaderProps> = ({ settings }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Shipyards', path: '/shipyards' },
    { name: 'Gallery', path: '/gallery' },
  ];

  return (
    <header className="site-header" style={{ position: 'sticky', top: 0, zIndex: 1000 }}>
      {/* Top Telemetry Strip: Live Field Mobilization Status */}
      <div className="header-top-bar">
        <div className="container top-bar-inner">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: '50%',
                  backgroundColor: '#10b981',
                  boxShadow: '0 0 6px #10b981',
                  display: 'inline-block',
                }}
              />
              <span style={{ color: '#ffffff', fontWeight: 600 }}>{settings.shipyard_1}:</span>
              <span style={{ color: '#10b981', fontWeight: 700, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                ACTIVE ON-SITE
              </span>
            </div>

            <span style={{ opacity: 0.25 }}>|</span>

            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: '50%',
                  backgroundColor: '#10b981',
                  boxShadow: '0 0 6px #10b981',
                  display: 'inline-block',
                }}
              />
              <span style={{ color: '#ffffff', fontWeight: 600 }}>{settings.shipyard_2}:</span>
              <span style={{ color: '#10b981', fontWeight: 700, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                ACTIVE ON-SITE
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
              <Shield size={13} color="var(--color-steel-blue)" />
              <span style={{ color: '#cbd5e1' }}>$5M Marine Insured</span>
            </span>
            <span style={{ opacity: 0.25 }}>|</span>
            <a href={`tel:${settings.phone.replace(/[^0-9]/g, '')}`} style={{ color: '#fff', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
              <Phone size={13} color="var(--color-orange)" />
              24/7 Field Dispatch: <span style={{ color: 'var(--color-steel-blue)' }}>{settings.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Navigation */}
      <div className="container nav-container">
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <img src="/logo.png" alt="Brothers Machine Services logo" className="brand-logo-img" />
        </Link>

        {/* Desktop Nav */}
        <nav className="nav-links">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`nav-link ${isActive ? 'active' : ''}`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Header Action Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link to="/contact" className="btn btn-primary" style={{ padding: '0.65rem 1.45rem', fontSize: '0.85rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Request a Quote
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ display: 'none', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--color-navy)' }}
            className="mobile-toggle-btn"
            aria-label="Toggle Navigation"
          >
            {mobileOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(4, 23, 35, 0.95)',
          zIndex: 1100,
          padding: '2.5rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <img src="/logo.png" alt="Brothers Machine Logo" style={{ height: 48 }} />
              <button onClick={() => setMobileOpen(false)} style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer' }}>
                <X size={32} />
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.4rem',
                    color: '#ffffff',
                    textTransform: 'uppercase',
                    borderBottom: '1px solid rgba(255,255,255,0.1)',
                    paddingBottom: '0.5rem'
                  }}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <a href={`tel:${settings.phone.replace(/[^0-9]/g, '')}`} className="btn btn-blue" style={{ width: '100%', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.85rem' }}>
              Call {settings.phone}
            </a>
            <Link to="/contact" onClick={() => setMobileOpen(false)} className="btn btn-primary" style={{ width: '100%', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.85rem' }}>
              Request a Quote
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
