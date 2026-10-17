import React from 'react';
import { Link } from 'react-router-dom';
import { SiteSettings } from '../types';
import { Anchor, Shield, MapPin, CheckCircle } from 'lucide-react';

interface ShipyardsProps {
  settings: SiteSettings;
}

export const Shipyards: React.FC<ShipyardsProps> = ({ settings }) => {
  return (
    <div>
      {/* Page Hero */}
      <section className="section-dark blueprint-grid" style={{ paddingBlock: 'clamp(4rem, 6vw, 6rem)', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: 820 }}>
          <div className="eyebrow" style={{ marginInline: 'auto' }}>
            <span className="eyebrow-dot"></span>
            <span>Stationed Field Presence</span>
          </div>
          <h1 style={{ color: '#ffffff', marginBottom: '1rem' }}>
            Inside The Yards.
          </h1>
          <p style={{ color: '#cbd5e1', fontSize: '1.2rem' }}>
            Operating daily at {settings.shipyard_1} and {settings.shipyard_2}. Credentialed access for dockside and onboard outside machining.
          </p>
        </div>
      </section>

      {/* Shipyards Feature Grid */}
      <section className="section section-white">
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
            {/* Yard 1: GMD */}
            <div className="grid-2">
              <div>
                <div className="eyebrow">
                  <span className="eyebrow-dot"></span>
                  <span>Brooklyn, NY • East River</span>
                </div>
                <h2>{settings.shipyard_1}</h2>
                <p style={{ fontSize: '1.05rem', color: 'var(--color-text-dark)', marginBottom: '1.25rem' }}>
                  The largest full-service ship repair yard in New York City. Operating Graving Docks 1, 5, and 6 to service deep-draft commercial ships, Military Sealift Command vessels, and high-speed passenger ferries.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2rem' }}>
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <CheckCircle size={18} color="var(--color-steel-blue)" style={{ flexShrink: 0, marginTop: 3 }} />
                    <span style={{ fontSize: '0.95rem' }}><strong>Graving Dock Support:</strong> In-place stern tube line boring, shaft alignment, and rudder stock turning.</span>
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <CheckCircle size={18} color="var(--color-steel-blue)" style={{ flexShrink: 0, marginTop: 3 }} />
                    <span style={{ fontSize: '0.95rem' }}><strong>Dockside & Onboard:</strong> Portable tooling mounted directly within hull compartments while vessel is drydocked.</span>
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <CheckCircle size={18} color="var(--color-steel-blue)" style={{ flexShrink: 0, marginTop: 3 }} />
                    <span style={{ fontSize: '0.95rem' }}><strong>Class Society Inspection:</strong> Fits coordinated directly with ABS, USCG, and DNV surveyors.</span>
                  </div>
                </div>

                <Link to="/contact" className="btn btn-primary">
                  Mobilize to {settings.shipyard_1}
                </Link>
              </div>

              <div>
                <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                  <img src="/assets/Brothers-Machine-Services-Corp-Photo-17.webp" alt={settings.shipyard_1} style={{ width: '100%', height: '360px', objectFit: 'cover' }} />
                </div>
              </div>
            </div>

            {/* Yard 2: Caddell */}
            <div className="grid-2">
              <div style={{ order: 2 }}>
                <div className="eyebrow">
                  <span className="eyebrow-dot"></span>
                  <span>Staten Island, NY • Kill Van Kull</span>
                </div>
                <h2>{settings.shipyard_2}</h2>
                <p style={{ fontSize: '1.05rem', color: 'var(--color-text-dark)', marginBottom: '1.25rem' }}>
                  A cornerstone of East Coast maritime repair with over a century of continuous service. Operating 6 floating drydocks with lifting capacity up to 7,300 tons.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2rem' }}>
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <CheckCircle size={18} color="var(--color-steel-blue)" style={{ flexShrink: 0, marginTop: 3 }} />
                    <span style={{ fontSize: '0.95rem' }}><strong>Tug & Workboat Specialization:</strong> Fast-turnaround rudder trunk boring, strut reconditioning, and pintle sleeve machining.</span>
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <CheckCircle size={18} color="var(--color-steel-blue)" style={{ flexShrink: 0, marginTop: 3 }} />
                    <span style={{ fontSize: '0.95rem' }}><strong>Deck Machinery Overhaul:</strong> In-situ re-machining of heavy towing winches, capstans, and brake drums.</span>
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <CheckCircle size={18} color="var(--color-steel-blue)" style={{ flexShrink: 0, marginTop: 3 }} />
                    <span style={{ fontSize: '0.95rem' }}><strong>Availability Scheduling:</strong> Working 24/7 during scheduled drydock cycles to beat departure deadlines.</span>
                  </div>
                </div>

                <Link to="/contact" className="btn btn-primary">
                  Mobilize to {settings.shipyard_2}
                </Link>
              </div>

              <div style={{ order: 1 }}>
                <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                  <img src="/assets/Brothers-Machine-Services-Corp-Photo-5.webp" alt={settings.shipyard_2} style={{ width: '100%', height: '360px', objectFit: 'cover' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Other Facilities Note */}
          <div style={{ marginTop: '5rem', background: 'var(--color-off-white)', padding: '2.5rem', borderRadius: 3, borderLeft: '4px solid var(--color-steel-blue)' }}>
            <h3 style={{ marginBottom: '0.75rem' }}>Working in Another Yard, Slipway, or Plant?</h3>
            <p style={{ fontSize: '1.05rem', color: 'var(--color-text-dark)', marginBottom: '1.25rem' }}>
              If the job needs machines brought to it, that's our specialty. Our mobile machining rigs deploy across the Eastern Seaboard and anywhere heavy machinery cannot be dismantled.
            </p>
            <Link to="/contact" className="btn btn-outline-dark" style={{ padding: '0.65rem 1.4rem' }}>
              Contact Field Superintendent &rarr;
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
