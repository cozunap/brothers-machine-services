import React from 'react';
import { Link } from 'react-router-dom';
import { SiteSettings } from '../types';
import { Shield, Anchor, Phone, Mail, MapPin } from 'lucide-react';

interface FooterProps {
  settings: SiteSettings;
}

export const Footer: React.FC<FooterProps> = ({ settings }) => {
  return (
    <footer className="site-footer" style={{ background: 'var(--color-navy)', color: '#ffffff', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '50px', paddingBottom: '2.5rem' }}>
      <div className="container">
        <div className="footer-grid" style={{ marginBottom: '3.5rem' }}>
          {/* Col 1: Brand & Credentials */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1.25rem' }}>
              <img src="/logo.png" alt="Brothers Machine Services logo" style={{ height: 54, width: 'auto' }} />
              <div>
                <h4 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: 2 }}>BROTHERS MACHINE</h4>
                <div style={{ color: 'var(--color-steel-blue)', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.1em' }}>
                  OUTSIDE MACHINING SERVICES
                </div>
              </div>
            </div>
            <p style={{ fontSize: '0.92rem', color: '#9ba8b7', marginBottom: '1.5rem' }}>
              {settings.footer_note}
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.78rem', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', padding: '0.35rem 0.65rem', borderRadius: 2, color: '#e1e6eb' }}>
                {settings.shipyard_1}
              </span>
              <span style={{ fontSize: '0.78rem', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', padding: '0.35rem 0.65rem', borderRadius: 2, color: '#e1e6eb' }}>
                {settings.shipyard_2}
              </span>
              <span style={{ fontSize: '0.78rem', background: 'rgba(20, 155, 234, 0.15)', border: '1px solid var(--color-steel-blue)', padding: '0.35rem 0.65rem', borderRadius: 2, color: 'var(--color-steel-blue)' }}>
                {settings.years_experience}+ Years
              </span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 style={{ color: '#fff', fontSize: '1rem', marginBottom: '1.25rem', borderBottom: '2px solid var(--color-steel-blue)', paddingBottom: '0.4rem', display: 'inline-block' }}>
              NAVIGATION
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.92rem' }}>
              <Link to="/" style={{ color: '#cbd5e1' }}>Home</Link>
              <Link to="/about" style={{ color: '#cbd5e1' }}>About & History</Link>
              <Link to="/services" style={{ color: '#cbd5e1' }}>Outside Machining Services</Link>
              <Link to="/shipyards" style={{ color: '#cbd5e1' }}>Where We Work</Link>
              <Link to="/gallery" style={{ color: '#cbd5e1' }}>Work Gallery</Link>
              <Link to="/contact" style={{ color: '#cbd5e1' }}>Request a Quote</Link>
              <Link to="/admin" style={{ color: 'var(--color-steel-blue)', fontSize: '0.8rem', marginTop: '0.5rem' }}>Shop Office (Admin)</Link>
            </div>
          </div>

          {/* Col 3: Outside Machining Disciplines */}
          <div>
            <h4 style={{ color: '#fff', fontSize: '1rem', marginBottom: '1.25rem', borderBottom: '2px solid var(--color-steel-blue)', paddingBottom: '0.4rem', display: 'inline-block' }}>
              CAPABILITIES
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.92rem', color: '#cbd5e1' }}>
              <div>• In-Place Line Boring</div>
              <div>• Portable Flange Facing</div>
              <div>• Foundation & Rail Milling</div>
              <div>• Precision Drilling & Tapping</div>
              <div>• Shaft & Rudder Turning</div>
              <div>• 24/7 Drydock Emergency Service</div>
            </div>
          </div>

          {/* Col 4: Stations & Insurance */}
          <div>
            <h4 style={{ color: '#fff', fontSize: '1rem', marginBottom: '1.25rem', borderBottom: '2px solid var(--color-steel-blue)', paddingBottom: '0.4rem', display: 'inline-block' }}>
              DISPATCH & STATIONS
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.9rem', color: '#cbd5e1' }}>
              <div style={{ display: 'flex', gap: '0.65rem' }}>
                <Anchor size={18} color="var(--color-steel-blue)" style={{ flexShrink: 0, marginTop: 2 }} />
                <div>
                  <strong style={{ color: '#fff' }}>{settings.shipyard_1}</strong>
                  <div style={{ fontSize: '0.82rem', color: '#9ba8b7' }}>Brooklyn Navy Yard • Graving Docks 1, 5 & 6</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.65rem' }}>
                <Anchor size={18} color="var(--color-steel-blue)" style={{ flexShrink: 0, marginTop: 2 }} />
                <div>
                  <strong style={{ color: '#fff' }}>{settings.shipyard_2}</strong>
                  <div style={{ fontSize: '0.82rem', color: '#9ba8b7' }}>Staten Island • 6 Floating Drydocks</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.65rem' }}>
                <Shield size={18} color="var(--color-orange)" style={{ flexShrink: 0, marginTop: 2 }} />
                <div style={{ fontSize: '0.84rem', color: '#e1e6eb' }}>
                  {settings.insurance_line}
                </div>
              </div>
              <div style={{ marginTop: '0.5rem', paddingTop: '0.85rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                <a
                  href="https://www.bbb.org/us/ny"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.55rem',
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    padding: '0.45rem 0.75rem',
                    borderRadius: 2,
                    textDecoration: 'none',
                    transition: 'var(--transition)'
                  }}
                  className="bbb-badge-link"
                >
                  <span style={{ fontWeight: 900, fontFamily: 'var(--font-heading)', letterSpacing: '0.06em', color: '#ffffff', background: '#005a70', padding: '0.15rem 0.4rem', borderRadius: 2, fontSize: '0.75rem' }}>
                    BBB
                  </span>
                  <div style={{ fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.2 }}>
                    <strong style={{ color: '#ffffff', display: 'block' }}>Better Business Bureau&reg;</strong>
                    <span>Serving New York</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.08)',
          paddingTop: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.84rem',
          color: '#64748b'
        }}>
          <div>
            &copy; {new Date().getFullYear()} Brothers Machine Services Corp. All Rights Reserved. Hands-on outside machining. Design by <a href="https://cozuna.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-steel-blue)', textDecoration: 'none', fontWeight: 500 }}>cozuna</a>.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <a href="https://www.bbb.org/us/ny" target="_blank" rel="noopener noreferrer" style={{ color: '#9ba8b7', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ fontWeight: 800, color: 'var(--color-steel-blue)' }}>BBB</span> New York Verified
            </a>
            <span>•</span>
            <span>TWIC Compliant Field Crews</span>
            <span>•</span>
            <Link to="/contact" style={{ color: 'var(--color-steel-blue)' }}>COI Issued Upon Request</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
