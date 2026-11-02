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
        height: '100vh',
        maxHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: 'var(--color-navy)',
        color: '#ffffff',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center',
        padding: 'clamp(1rem, 3vh, 2.5rem) 1.5rem clamp(0.75rem, 2vh, 1.5rem)',
        boxSizing: 'border-box',
      }}
      className="blueprint-grid"
    >
      {/* Background Ambient Glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at 50% 45%, rgba(20, 155, 234, 0.12) 0%, rgba(4, 23, 35, 0.95) 75%)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      {/* Top Spacer / Brand Anchor */}
      <div style={{ position: 'relative', zIndex: 1, minHeight: '10px' }} />

      {/* Center Main Coming Soon Content (Strictly fits 100vh) */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '720px',
          marginInline: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Emblem Logo */}
        <img
          src="/logo.png"
          alt="Brothers Machine Services Corp Logo"
          style={{
            height: 'clamp(110px, 20vh, 180px)',
            width: 'auto',
            marginBottom: 'clamp(1rem, 2.5vh, 1.75rem)',
            filter: 'drop-shadow(0 12px 35px rgba(0, 0, 0, 0.7))',
          }}
        />

        <div
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(0.75rem, 1.4vw, 0.95rem)',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'var(--color-steel-blue)',
            fontWeight: 700,
            marginBottom: 'clamp(0.4rem, 1vh, 0.75rem)',
          }}
        >
          Brothers Machine Services Corp
        </div>

        <h1
          style={{
            fontSize: 'clamp(2.2rem, 5.5vw, 3.8rem)',
            fontWeight: 800,
            lineHeight: 1.1,
            color: '#ffffff',
            letterSpacing: '-0.02em',
            marginBottom: 'clamp(0.75rem, 1.8vh, 1.25rem)',
            fontFamily: 'var(--font-heading)',
          }}
        >
          Website Coming Soon
        </h1>

        <p
          style={{
            fontSize: 'clamp(0.95rem, 1.6vw, 1.15rem)',
            color: '#94a3b8',
            lineHeight: 1.55,
            maxWidth: '540px',
            marginInline: 'auto',
            marginBottom: 'clamp(1.25rem, 3vh, 2rem)',
          }}
        >
          Our new digital experience is on its way. In the meantime, our outside marine machining crews are fully operational 24/7.
        </p>

        {/* Clean Contact Action Pills */}
        <div
          style={{
            display: 'flex',
            gap: '0.85rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <a
            href={`tel:${settings.phone.replace(/[^0-9]/g, '')}`}
            className="btn btn-primary"
            style={{
              padding: 'clamp(0.7rem, 1.5vh, 0.85rem) 1.6rem',
              fontSize: '0.9rem',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              textDecoration: 'none',
            }}
          >
            <Phone size={16} />
            Call: {settings.phone}
          </a>
          <a
            href={`mailto:${settings.email}`}
            className="btn btn-secondary"
            style={{
              padding: 'clamp(0.7rem, 1.5vh, 0.85rem) 1.6rem',
              fontSize: '0.9rem',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              textDecoration: 'none',
            }}
          >
            <Mail size={16} />
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
          paddingTop: 'clamp(0.75rem, 1.5vh, 1.2rem)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.75rem',
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
