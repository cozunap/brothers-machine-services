import React from 'react';
import { Link } from 'react-router-dom';
import { SiteSettings, ServiceItem, GalleryItem } from '../types';
import { Shield, Anchor, Wrench, CheckCircle, ArrowRight, Clock, Award } from 'lucide-react';

interface HomeProps {
  settings: SiteSettings;
  services: ServiceItem[];
  gallery: GalleryItem[];
}

export const Home: React.FC<HomeProps> = ({ settings, services, gallery }) => {
  return (
    <div>
      {/* 1. Hero Section (Full viewport, deep navy, subtle blueprint grid) */}
      <section className="section-dark blueprint-grid" style={{
        position: 'relative',
        minHeight: 'calc(85vh - 110px)',
        display: 'flex',
        alignItems: 'center',
        paddingBlock: 'clamp(5rem, 8vw, 7.5rem)',
        overflow: 'hidden',
        textAlign: 'center'
      }}>
        {/* Subtle background photo at 25% opacity */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/assets/Brothers-Machine-Services-Corp-Photo-17.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 35%',
          opacity: 0.25,
          zIndex: 0
        }} />

        {/* Navy Gradient Overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 50% 30%, rgba(4, 23, 35, 0.75) 0%, rgba(4, 23, 35, 0.96) 100%)',
          zIndex: 1
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 2, maxWidth: 960 }}>
          <div className="eyebrow" style={{ marginInline: 'auto' }}>
            <span className="eyebrow-dot"></span>
            <span>OUTSIDE MACHINING · ONSITE · SHIPYARDS & HEAVY INDUSTRY</span>
          </div>

          <h1 style={{ color: '#ffffff', marginBottom: '1.5rem', lineHeight: 1.15 }}>
            We Bring The Machine Shop <br />
            <span style={{ color: 'var(--color-steel-blue)' }}>To Your Vessel.</span>
          </h1>

          <p style={{
            fontSize: 'clamp(1.1rem, 2vw, 1.35rem)',
            color: '#cbd5e1',
            maxWidth: 820,
            marginInline: 'auto',
            marginBottom: '2.5rem',
            lineHeight: 1.6
          }}>
            Precision line boring, flange facing, milling, and drilling — performed on-site at your drydock or facility, on your schedule.
          </p>

          <div style={{ display: 'flex', gap: '1.25rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '3.5rem' }}>
            <Link to="/contact" className="btn btn-primary">
              Request a Quote
            </Link>
            <Link to="/services" className="btn btn-secondary">
              Our Services
            </Link>
          </div>

          {/* 2. Trust Band (Steel-blue on navy, 4 stats reading from Site Settings) */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem',
            paddingTop: '2.5rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.15)',
            maxWidth: 900,
            marginInline: 'auto'
          }}>
            <div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '30px', fontWeight: 800, color: '#ffffff', lineHeight: 1.2, whiteSpace: 'nowrap' }}>
                {settings.years_experience}+ Years
              </div>
              <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#9ba8b7', marginTop: 4 }}>
                Of Outside Experience
              </div>
            </div>

            <div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '30px', fontWeight: 800, color: '#ffffff', lineHeight: 1.2, whiteSpace: 'nowrap' }}>
                100% Insured
              </div>
              <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#9ba8b7', marginTop: 4 }}>
                {settings.insurance_line}
              </div>
            </div>

            <div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '30px', fontWeight: 800, color: '#ffffff', lineHeight: 1.2, whiteSpace: 'nowrap' }}>
                Hands-On
              </div>
              <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#9ba8b7', marginTop: 4 }}>
                {settings.work_style}
              </div>
            </div>

            <div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '30px', fontWeight: 800, color: '#ffffff', lineHeight: 1.2, whiteSpace: 'nowrap' }}>
                2 Shipyards
              </div>
              <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#9ba8b7', marginTop: 4 }}>
                {settings.shipyard_1} & {settings.shipyard_2}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Services Overview Grid (6 cards from services table) */}
      <section className="section section-light">
        <div className="container">
          <div className="section-header">
            <div className="eyebrow">
              <span className="eyebrow-dot"></span>
              <span>Field Capabilities</span>
            </div>
            <h2>Specialized Outside Machining Services</h2>
            <p>
              When massive propulsion shafts, rudder bores, and hull foundations cannot leave the drydock, our portable tooling machines them in place to factory tolerances.
            </p>
          </div>

          <div className="grid-3">
            {services.slice(0, 6).map((service) => (
              <div key={service.id} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ width: '100%', height: 200, overflow: 'hidden', borderRadius: 2, marginBottom: '1.25rem', backgroundColor: 'var(--color-navy)' }}>
                    <img src={service.image_url} alt={service.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <h3 style={{ marginBottom: '0.65rem' }}>{service.name}</h3>
                  <p style={{ fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                    {service.short_description}
                  </p>
                </div>
                <div>
                  <Link
                    to={`/services#${service.slug}`}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 700,
                      fontSize: '0.95rem',
                      color: 'var(--color-steel-blue)',
                      textTransform: 'uppercase'
                    }}
                  >
                    Service Details &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
            <Link to="/services" className="btn btn-outline-dark">
              View All Machining Services
            </Link>
          </div>
        </div>
      </section>

      {/* 4. "Where We Work" Band (GMD Navy Yard and Caddell Drydock) */}
      <section className="section section-white">
        <div className="container">
          <div className="section-header">
            <div className="eyebrow">
              <span className="eyebrow-dot"></span>
              <span>Dedicated Yard Stations</span>
            </div>
            <h2>Where We Work</h2>
            <p>
              We're already inside the gates — our crews work dockside and onboard, during dockings and availabilities.
            </p>
          </div>

          <div className="grid-2">
            {/* Card 1: GMD */}
            <div className="card" style={{ borderLeft: '4px solid var(--color-steel-blue)' }}>
              <div style={{ width: '100%', height: 220, overflow: 'hidden', borderRadius: 2, marginBottom: '1.25rem' }}>
                <img src="/assets/Brothers-Machine-Services-Corp-Photo-17.webp" alt={settings.shipyard_1} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <h3 style={{ marginBottom: '0.5rem' }}>{settings.shipyard_1}</h3>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-steel-blue)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '1rem' }}>
                Brooklyn Navy Yard • Graving Docks 1, 5 & 6
              </div>
              <p style={{ marginBottom: '1.25rem', fontSize: '0.95rem' }}>
                Large-bore stern tube line boring, shaft alignment, and rudder work for commercial vessels, passenger ferries, and Military Sealift Command ships.
              </p>
              <Link to="/shipyards" className="btn btn-outline-dark" style={{ fontSize: '0.85rem', padding: '0.65rem 1.25rem' }}>
                Explore Yard Operations &rarr;
              </Link>
            </div>

            {/* Card 2: Caddell */}
            <div className="card" style={{ borderLeft: '4px solid var(--color-orange)' }}>
              <div style={{ width: '100%', height: 220, overflow: 'hidden', borderRadius: 2, marginBottom: '1.25rem' }}>
                <img src="/assets/Brothers-Machine-Services-Corp-Photo-5.webp" alt={settings.shipyard_2} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <h3 style={{ marginBottom: '0.5rem' }}>{settings.shipyard_2}</h3>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-orange)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '1rem' }}>
                Staten Island • 6 Floating Drydocks
              </div>
              <p style={{ marginBottom: '1.25rem', fontSize: '0.95rem' }}>
                Rapid-turnaround line boring and deck machinery machining for harbor tugs, petroleum barges, dredges, and municipal ferries.
              </p>
              <Link to="/shipyards" className="btn btn-outline-dark" style={{ fontSize: '0.85rem', padding: '0.65rem 1.25rem' }}>
                Explore Yard Operations &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. How It Works (4 Steps) */}
      <section className="section section-dark">
        <div className="container">
          <div className="section-header">
            <div className="eyebrow">
              <span className="eyebrow-dot"></span>
              <span>Our Field Process</span>
            </div>
            <h2>How It Works</h2>
            <p>Fast, disciplined mobilization from engineering inquiry to drydock completion.</p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '2rem'
          }}>
            <div className="card card-dark">
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', color: 'var(--color-steel-blue)', fontWeight: 800, lineHeight: 1, marginBottom: '0.75rem' }}>
                01
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Send Drawings</h3>
              <p style={{ fontSize: '0.9rem' }}>
                Describe the job, send tolerances or blueprints, or call our 24/7 dispatch superintendent.
              </p>
            </div>

            <div className="card card-dark">
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', color: 'var(--color-steel-blue)', fontWeight: 800, lineHeight: 1, marginBottom: '0.75rem' }}>
                02
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Mobilize Tooling</h3>
              <p style={{ fontSize: '0.9rem' }}>
                We transport high-torque portable boring bars, facing heads, and optical alignment scopes directly to your drydock.
              </p>
            </div>

            <div className="card card-dark">
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', color: 'var(--color-steel-blue)', fontWeight: 800, lineHeight: 1, marginBottom: '0.75rem' }}>
                03
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Precision Machining</h3>
              <p style={{ fontSize: '0.9rem' }}>
                In-situ machining executed to ±.0005" tolerances, verified by inside micrometers and documented for class inspection.
              </p>
            </div>

            <div className="card card-dark">
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', color: 'var(--color-steel-blue)', fontWeight: 800, lineHeight: 1, marginBottom: '0.75rem' }}>
                04
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>You Sail / You Run</h3>
              <p style={{ fontSize: '0.9rem' }}>
                Zero offsite shipping delay. Assembly fits immediately and your vessel returns to service on schedule.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5B. Emergency Turnaround Case Logs (Proof of Execution in Field) */}
      <section className="section section-white" style={{ background: '#ffffff', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container">
          <div className="section-header">
            <div className="eyebrow">
              <span className="eyebrow-dot"></span>
              <span>Documented Field Turnarounds</span>
            </div>
            <h2>Emergency Turnaround Logs</h2>
            <p>Real-world outside machining operations executed under critical docking deadlines.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            {/* Case 01 */}
            <div className="card" style={{ borderTop: '4px solid var(--color-steel-blue)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-steel-blue)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  CASE LOG 01 • LINE BORING
                </span>
                <span style={{ fontSize: '0.75rem', background: '#e0f2fe', color: '#0369a1', padding: '2px 8px', borderRadius: 2, fontWeight: 700 }}>
                  36 HR TURNAROUND
                </span>
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', lineHeight: 1.3 }}>
                38-Foot Harbor Tug Stern Tube Re-Bore
              </h3>
              <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600, marginBottom: '1rem' }}>
                Location: Caddell Drydock Dock #4 • Staten Island, NY
              </div>
              <p style={{ fontSize: '0.92rem', color: 'var(--color-text-dark)', marginBottom: '1.25rem', lineHeight: 1.6 }}>
                <strong>The Challenge:</strong> Severe scoring on forward and aft cutless bearing carriers caused by salt-slurry ingress, threatening a 3-day drydock overstay.
              </p>
              <div style={{ background: '#f8fafc', padding: '0.85rem 1rem', borderRadius: 2, marginBottom: '1.5rem', borderLeft: '3px solid var(--color-steel-blue)' }}>
                <div style={{ fontSize: '0.82rem', color: 'var(--color-navy)', fontWeight: 700 }}>
                  EXECUTED TOLERANCE:
                </div>
                <div style={{ fontSize: '0.84rem', color: '#475569' }}>
                  Single-setup continuous optical alignment over 38 ft; restored concentricity within <strong>0.0004" TIR</strong> for ABS surveyor approval.
                </div>
              </div>
              <Link to="/contact?service=Line%20Boring" className="btn btn-outline-dark" style={{ marginTop: 'auto', fontSize: '0.85rem', padding: '0.65rem 1rem', textAlign: 'center' }}>
                Mobilize Similar Operation &rarr;
              </Link>
            </div>

            {/* Case 02 */}
            <div className="card" style={{ borderTop: '4px solid var(--color-orange)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-orange)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  CASE LOG 02 • FLANGE FACING
                </span>
                <span style={{ fontSize: '0.75rem', background: '#ffedd5', color: '#c2410c', padding: '2px 8px', borderRadius: 2, fontWeight: 700 }}>
                  24 HR DISPATCH
                </span>
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', lineHeight: 1.3 }}>
                72" Main Steam Valve Flange In-Situ Facing
              </h3>
              <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600, marginBottom: '1rem' }}>
                Location: GMD Brooklyn Navy Yard (Graving Dock 6)
              </div>
              <p style={{ fontSize: '0.92rem', color: 'var(--color-text-dark)', marginBottom: '1.25rem', lineHeight: 1.6 }}>
                <strong>The Challenge:</strong> High-pressure boiler steam valve flange suffered erosion wire-drawing across gasket face. Dismantling the 14-ton body was physically impossible.
              </p>
              <div style={{ background: '#f8fafc', padding: '0.85rem 1rem', borderRadius: 2, marginBottom: '1.5rem', borderLeft: '3px solid var(--color-orange)' }}>
                <div style={{ fontSize: '0.82rem', color: 'var(--color-navy)', fontWeight: 700 }}>
                  EXECUTED TOLERANCE:
                </div>
                <div style={{ fontSize: '0.84rem', color: '#475569' }}>
                  ID-mounted portable facer cut fresh ASME B16.5 phonographic spiral finish (125–250 Ra) with <strong>100% hydro-test signoff</strong>.
                </div>
              </div>
              <Link to="/contact?service=Flange%20Facing" className="btn btn-outline-dark" style={{ marginTop: 'auto', fontSize: '0.85rem', padding: '0.65rem 1rem', textAlign: 'center' }}>
                Mobilize Similar Operation &rarr;
              </Link>
            </div>

            {/* Case 03 */}
            <div className="card" style={{ borderTop: '4px solid #10b981', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#059669', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  CASE LOG 03 • BED MILLING
                </span>
                <span style={{ fontSize: '0.75rem', background: '#dcfce7', color: '#15803d', padding: '2px 8px', borderRadius: 2, fontWeight: 700 }}>
                  WATERBORNE BERTH
                </span>
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', lineHeight: 1.3 }}>
                Gantry Crane Pedestal Bedplate Restoration
              </h3>
              <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600, marginBottom: '1rem' }}>
                Location: Red Hook Marine Container Terminal • Brooklyn, NY
              </div>
              <p style={{ fontSize: '0.92rem', color: 'var(--color-text-dark)', marginBottom: '1.25rem', lineHeight: 1.6 }}>
                <strong>The Challenge:</strong> Heavy container impact warped slewing ring foundation pads by 0.045", preventing crane slewing rotation and blocking ship discharge.
              </p>
              <div style={{ background: '#f8fafc', padding: '0.85rem 1rem', borderRadius: 2, marginBottom: '1.5rem', borderLeft: '3px solid #10b981' }}>
                <div style={{ fontSize: '0.82rem', color: 'var(--color-navy)', fontWeight: 700 }}>
                  EXECUTED TOLERANCE:
                </div>
                <div style={{ fontSize: '0.84rem', color: '#475569' }}>
                  Rail-mounted 3-axis portable bed mill planed 8 mounting pads simultaneously to <strong>0.0018" coplanar flatness</strong>.
                </div>
              </div>
              <Link to="/contact?service=Portable%20Milling" className="btn btn-outline-dark" style={{ marginTop: 'auto', fontSize: '0.85rem', padding: '0.65rem 1rem', textAlign: 'center' }}>
                Mobilize Similar Operation &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Gallery Strip (6 items) */}
      <section className="section section-light">
        <div className="container">
          <div className="section-header">
            <div className="eyebrow">
              <span className="eyebrow-dot"></span>
              <span>Field Proof</span>
            </div>
            <h2>Field Work Gallery</h2>
            <p>Authentic jobsite photography from drydocks, shaft alleys, and shipyard slipways across NY/NJ.</p>
          </div>

          <div className="grid-3">
            {gallery.slice(0, 6).map((item) => (
              <div key={item.id} className="card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div style={{ width: '100%', aspectRatio: '4 / 3', overflow: 'hidden', position: 'relative', background: 'var(--color-navy)' }}>
                  <img src={item.image_url} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </div>
                <div style={{ padding: '1.25rem 1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-steel-blue)', textTransform: 'uppercase', marginBottom: 4 }}>
                    {item.category}
                  </div>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '0.35rem' }}>{item.title}</h4>
                  <p style={{ fontSize: '0.88rem', marginTop: 'auto' }}>{item.caption}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link to="/gallery" className="btn btn-outline-dark">
              View Complete Gallery &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* 8. CTA Band (Safety orange button) */}
      <section className="section-dark" style={{ background: 'var(--color-navy)', borderTop: '1px solid rgba(255,255,255,0.08)', paddingBlock: '50px' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: 840 }}>
          <div className="eyebrow" style={{ marginInline: 'auto' }}>
            <span className="eyebrow-dot"></span>
            <span>Zero-Delay Mobilization</span>
          </div>
          <h2 style={{ color: '#ffffff', marginBottom: '1.25rem' }}>
            Downtime is expensive. Let's talk.
          </h2>
          <p style={{ color: '#cbd5e1', fontSize: '1.15rem', marginBottom: '2.5rem' }}>
            Whether you are coordinating an upcoming shipyard drydock period or facing an unscheduled breakdown in the harbor, our master machinists are on call.
          </p>
          <div style={{ display: 'flex', gap: '1.25rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact" className="btn btn-primary" style={{ padding: '1rem 2.25rem', fontSize: '1.1rem' }}>
              Request a Quote
            </Link>
            <a href={`tel:${settings.phone.replace(/[^0-9]/g, '')}`} className="btn btn-secondary" style={{ padding: '1rem 2.25rem', fontSize: '1.1rem' }}>
              Call Dispatch: {settings.phone}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
