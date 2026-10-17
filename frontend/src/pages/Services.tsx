import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ServiceItem } from '../types';
import { CheckCircle2, Shield, Wrench, Compass, Ruler, Gauge, FileCheck } from 'lucide-react';

interface ServicesProps {
  services: ServiceItem[];
}

export const Services: React.FC<ServicesProps> = ({ services }) => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location.hash, services]);
  return (
    <div>
      {/* Page Hero */}
      <section className="section-dark blueprint-grid" style={{ paddingBlock: 'clamp(4rem, 6vw, 6rem)', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: 820 }}>
          <div className="eyebrow" style={{ marginInline: 'auto' }}>
            <span className="eyebrow-dot"></span>
            <span>Portable Machine Tools • On-Site Precision</span>
          </div>
          <h1 style={{ color: '#ffffff', marginBottom: '1rem' }}>
            Outside Machining Services.
          </h1>
          <p style={{ color: '#cbd5e1', fontSize: '1.2rem' }}>
            High-torque line boring, flange facing, milling, and drilling brought directly to your vessel or facility, eliminating heavy dismantling demurrage.
          </p>
        </div>
      </section>

      {/* Services List (One full section per service from services table) */}
      <div className="section section-white">
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5rem' }}>
            {services.map((service, index) => {
              const isEven = index % 2 === 1;
              return (
                <div
                  key={service.id}
                  id={service.slug}
                  className="grid-2"
                  style={{
                    alignItems: 'center',
                    paddingBottom: '3.5rem',
                    borderBottom: index < services.length - 1 ? '1px solid var(--color-border)' : 'none'
                  }}
                >
                  <div style={{ order: isEven ? 2 : 1 }}>
                    <div className="eyebrow">
                      <span className="eyebrow-dot"></span>
                      <span>Discipline 0{index + 1}</span>
                    </div>
                    <h2 style={{ marginBottom: '1.25rem' }}>{service.name}</h2>
                    <p style={{ fontSize: '1.05rem', marginBottom: '1.25rem', color: 'var(--color-text-dark)', fontWeight: 500 }}>
                      {service.short_description}
                    </p>
                    <p style={{ fontSize: '0.98rem', marginBottom: '1.5rem', lineHeight: 1.7 }}>
                      {service.long_description}
                    </p>

                    <div style={{ background: 'var(--color-off-white)', padding: '1rem 1.25rem', borderRadius: 2, marginBottom: '1.75rem', borderLeft: '3px solid var(--color-steel-blue)' }}>
                      <span style={{ fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--color-navy)', letterSpacing: '0.05em' }}>
                        TOLERANCE & QUALITY STANDARD:
                      </span>
                      <div style={{ fontSize: '0.9rem', color: 'var(--color-steel-gray)', marginTop: 2 }}>
                        Measured with calibrated micrometers, laser alignment documented, built to exact naval/class spec.
                      </div>
                    </div>

                    <Link
                      to={`/contact?service=${encodeURIComponent(service.name)}`}
                      className="btn btn-primary"
                      style={{ padding: '0.75rem 1.6rem', fontSize: '0.95rem' }}
                    >
                      Get a Quote for this Service
                    </Link>
                  </div>

                  <div style={{ order: isEven ? 1 : 2 }}>
                    <div className="card" style={{ padding: 0, overflow: 'hidden', boxShadow: '0 8px 24px rgba(4, 23, 35, 0.1)' }}>
                      <img
                        src={service.image_url}
                        alt={service.name}
                        style={{ width: '100%', height: '380px', objectFit: 'cover' }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Interactive Tolerance & Machining Capacity Matrix (For Port Engineers & Superintendents) */}
      <section className="section-dark blueprint-grid" style={{ paddingBlock: 'clamp(4.5rem, 7vw, 7rem)', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: 840, marginInline: 'auto', marginBottom: '3.5rem' }}>
            <div className="eyebrow" style={{ marginInline: 'auto' }}>
              <span className="eyebrow-dot"></span>
              <span>Engineering Specifications • Field Verification</span>
            </div>
            <h2 style={{ color: '#ffffff', marginBottom: '1rem' }}>
              Field Machining Capacity Matrix.
            </h2>
            <p style={{ color: '#cbd5e1', fontSize: '1.15rem' }}>
              Verified portable machine tool working ranges, optical alignment tolerances, and class society compliance standards.
            </p>
          </div>

          {/* Technical Spec Matrix Table */}
          <div style={{
            background: 'var(--color-navy-surface)',
            border: '1px solid rgba(20, 155, 234, 0.3)',
            borderRadius: '6px',
            overflow: 'hidden',
            boxShadow: '0 12px 36px rgba(4, 23, 35, 0.6)'
          }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '700px' }}>
                <thead>
                  <tr style={{ background: '#03121c', borderBottom: '1px solid rgba(255, 255, 255, 0.12)' }}>
                    <th style={{ padding: '1.1rem 1.5rem', color: 'var(--color-steel-blue)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      Machining Discipline
                    </th>
                    <th style={{ padding: '1.1rem 1.5rem', color: 'var(--color-steel-blue)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      Working Range / Capacity
                    </th>
                    <th style={{ padding: '1.1rem 1.5rem', color: 'var(--color-steel-blue)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      Precision Tolerance
                    </th>
                    <th style={{ padding: '1.1rem 1.5rem', color: 'var(--color-steel-blue)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      Metrology & Verification
                    </th>
                  </tr>
                </thead>
                <tbody style={{ fontSize: '0.92rem', color: '#e2e8f0' }}>
                  <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
                    <td style={{ padding: '1.25rem 1.5rem', fontWeight: 700, color: '#ffffff' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Compass size={17} color="var(--color-steel-blue)" />
                        In-Place Line Boring
                      </div>
                      <span style={{ fontSize: '0.78rem', color: '#94a3b8', display: 'block', marginTop: '2px' }}>
                        Stern tubes, struts, rudder trunks
                      </span>
                    </td>
                    <td style={{ padding: '1.25rem 1.5rem' }}>
                      <strong>1.5" to 60"+ ID</strong> (spans up to 45 ft continuous)
                    </td>
                    <td style={{ padding: '1.25rem 1.5rem', color: '#38bdf8', fontWeight: 600 }}>
                      ± 0.0005" (0.012 mm) runout & concentricity
                    </td>
                    <td style={{ padding: '1.25rem 1.5rem', color: '#cbd5e1' }}>
                      Laser collimator & precision bore micrometer
                    </td>
                  </tr>

                  <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.06)', background: 'rgba(255, 255, 255, 0.02)' }}>
                    <td style={{ padding: '1.25rem 1.5rem', fontWeight: 700, color: '#ffffff' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Gauge size={17} color="var(--color-steel-blue)" />
                        Portable Flange Facing
                      </div>
                      <span style={{ fontSize: '0.78rem', color: '#94a3b8', display: 'block', marginTop: '2px' }}>
                        High-pressure steam, valves, manways
                      </span>
                    </td>
                    <td style={{ padding: '1.25rem 1.5rem' }}>
                      <strong>2" to 120"+ OD</strong> (ID & OD mount)
                    </td>
                    <td style={{ padding: '1.25rem 1.5rem', color: '#38bdf8', fontWeight: 600 }}>
                      ASME B16.5 phonographic spiral (125–250 Ra)
                    </td>
                    <td style={{ padding: '1.25rem 1.5rem', color: '#cbd5e1' }}>
                      Surface profilometer & dial test indicator
                    </td>
                  </tr>

                  <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
                    <td style={{ padding: '1.25rem 1.5rem', fontWeight: 700, color: '#ffffff' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Ruler size={17} color="var(--color-steel-blue)" />
                        Rail-Mounted Bed Milling
                      </div>
                      <span style={{ fontSize: '0.78rem', color: '#94a3b8', display: 'block', marginTop: '2px' }}>
                        Engine chocks, winch pads, crane rings
                      </span>
                    </td>
                    <td style={{ padding: '1.25rem 1.5rem' }}>
                      <strong>Up to 30 ft Linear</strong> / Circular up to 25 ft dia.
                    </td>
                    <td style={{ padding: '1.25rem 1.5rem', color: '#38bdf8', fontWeight: 600 }}>
                      Coplanar flatness within 0.002" over span
                    </td>
                    <td style={{ padding: '1.25rem 1.5rem', color: '#cbd5e1' }}>
                      Precision optical level & precision gauge blocks
                    </td>
                  </tr>

                  <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.06)', background: 'rgba(255, 255, 255, 0.02)' }}>
                    <td style={{ padding: '1.25rem 1.5rem', fontWeight: 700, color: '#ffffff' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Wrench size={17} color="var(--color-steel-blue)" />
                        Drilling & Stud Extraction
                      </div>
                      <span style={{ fontSize: '0.78rem', color: '#94a3b8', display: 'block', marginTop: '2px' }}>
                        Fitted coupling bolts, thread repair
                      </span>
                    </td>
                    <td style={{ padding: '1.25rem 1.5rem' }}>
                      <strong>Holes up to 4.5" dia.</strong> / Studs up to 6" dia.
                    </td>
                    <td style={{ padding: '1.25rem 1.5rem', color: '#38bdf8', fontWeight: 600 }}>
                      Class 3B fit / H7 tolerance for fitted bolts
                    </td>
                    <td style={{ padding: '1.25rem 1.5rem', color: '#cbd5e1' }}>
                      Go/No-Go thread gauges & internal micrometers
                    </td>
                  </tr>

                  <tr>
                    <td style={{ padding: '1.25rem 1.5rem', fontWeight: 700, color: '#ffffff' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <FileCheck size={17} color="var(--color-steel-blue)" />
                        Orbital Shaft Journal Turning
                      </div>
                      <span style={{ fontSize: '0.78rem', color: '#94a3b8', display: 'block', marginTop: '2px' }}>
                        Tailshafts, intermediate journals, pins
                      </span>
                    </td>
                    <td style={{ padding: '1.25rem 1.5rem' }}>
                      <strong>4" to 36"+ Journal Diameter</strong>
                    </td>
                    <td style={{ padding: '1.25rem 1.5rem', color: '#38bdf8', fontWeight: 600 }}>
                      Roundness within 0.0004", Ra &lt; 0.8 µm
                    </td>
                    <td style={{ padding: '1.25rem 1.5rem', color: '#cbd5e1' }}>
                      Electronic dial indicator with full runout chart
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Quality Standard Bar */}
            <div style={{
              background: '#041723',
              padding: '1.25rem 1.5rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '1rem',
              fontSize: '0.85rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', color: '#cbd5e1' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle2 size={16} color="#10b981" />
                  ABS / USCG / DNV Class Compliant
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <Shield size={16} color="var(--color-steel-blue)" />
                  Calibration Certs Furnished on Every Job
                </span>
              </div>
              <Link to="/contact" className="btn btn-primary" style={{ padding: '0.55rem 1.25rem', fontSize: '0.85rem' }}>
                Request Tolerance Review
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
