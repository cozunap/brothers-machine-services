import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ServiceItem } from '../types';

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
    </div>
  );
};
