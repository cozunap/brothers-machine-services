import React from 'react';
import { SiteSettings } from '../types';
import { Phone, Mail } from 'lucide-react';

interface ComingSoonProps {
  settings: SiteSettings;
}

export const ComingSoon: React.FC<ComingSoonProps> = ({ settings }) => {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: 'var(--color-navy)',
        color: '#ffffff',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center',
        padding: 'clamp(2rem, 5vw, 4rem) 1.5rem',
      }}
      className="blueprint-grid"
    >
      {/* Background Ambient Glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at 50% 40%, rgba(20, 155, 234, 0.12) 0%, rgba(4, 23, 35, 0.95) 75%)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      {/* Top Bar / Minimal Brand Tag */}
      <div style={{ position: 'relative', zIndex: 1, maxWidth: '600px', marginInline: 'auto' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.78rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--color-steel-blue)',
            fontWeight: 700,
            padding: '0.4rem 1rem',
            background: 'rgba(20, 155, 234, 0.08)',
            border: '1px solid rgba(20, 155, 234, 0.25)',
            borderRadius: '999px',
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: '50%',
              backgroundColor: '#10b981',
              boxShadow: '0 0 8px #10b981',
            }}
          />
          <span>Stationed at GMD Navy Yard & Caddell Drydock</span>
        </div>
      </div>

      {/* Center Main Coming Soon Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '720px',
          marginInline: 'auto',
          paddingBlock: '2rem',
        }}
      >
        {/* Emblem Logo */}
        <img
          src="/logo.png"
          alt="Brothers Machine Services Corp Logo"
          style={{
            height: 'clamp(80px, 14vw, 120px)',
            width: 'auto',
            marginInline: 'auto',
            marginBottom: '2rem',
            filter: 'drop-shadow(0 10px 30px rgba(0, 0, 0, 0.6))',
          }}
        />

        <div
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(0.85rem, 1.6vw, 1.05rem)',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'var(--color-steel-blue)',
            fontWeight: 700,
            marginBottom: '1rem',
          }}
        >
          Brothers Machine Services Corp
        </div>

        <h1
          style={{
            fontSize: 'clamp(2.5rem, 6.5vw, 4.5rem)',
            fontWeight: 800,
            lineHeight: 1.08,
            color: '#ffffff',
            letterSpacing: '-0.02em',
            marginBottom: '1.5rem',
            fontFamily: 'var(--font-heading)',
          }}
        >
          Website Coming Soon
        </h1>

        <p
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            color: '#94a3b8',
            lineHeight: 1.6,
            maxWidth: '560px',
            marginInline: 'auto',
            marginBottom: '2.5rem',
          }}
        >
          Our new digital experience is on its way. In the meantime, our outside marine machining crews are fully operational 24/7.
        </p>

        {/* Clean Contact Action Pills */}
        <div
          style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <a
            href={`tel:${settings.phone.replace(/[^0-9]/g, '')}`}
            className="btn btn-primary"
            style={{
              padding: '0.9rem 1.8rem',
              fontSize: '0.95rem',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              textDecoration: 'none',
            }}
          >
            <Phone size={17} />
            Call: {settings.phone}
          </a>
          <a
            href={`mailto:${settings.email}`}
            className="btn btn-secondary"
            style={{
              padding: '0.9rem 1.8rem',
              fontSize: '0.95rem',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              textDecoration: 'none',
            }}
          >
            <Mail size={17} />
            Email Us
          </a>
        </div>
      </div>

      {/* Clean Bottom Minimal Footer */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '800px',
          marginInline: 'auto',
          width: '100%',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          paddingTop: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '10px',
          color: '#64748b',
        }}
      >
        <div>
          &copy; {new Date().getFullYear()} Brothers Machine Services Corp. Hands-on outside machining. Design by{' '}
          <a
            href="https://cozuna.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--color-steel-blue)', textDecoration: 'none' }}
          >
            cozuna
          </a>
          .
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <a
            href="https://www.bbb.org/us/ny"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#94a3b8',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <span style={{ fontWeight: 800, color: 'var(--color-steel-blue)' }}>BBB</span> New York Verified
          </a>
          <span>•</span>
          <span>$5M Marine Insured</span>
        </div>
      </div>
    </div>
  );
};
