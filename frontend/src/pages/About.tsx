import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SiteSettings, PageContent } from '../types';
import { fetchPageContent } from '../api';
import { Shield, Award, Wrench, CheckCircle } from 'lucide-react';

interface AboutProps {
  settings: SiteSettings;
}

export const About: React.FC<AboutProps> = ({ settings }) => {
  const [content, setContent] = useState<PageContent | null>(null);

  useEffect(() => {
    fetchPageContent('about').then(setContent);
  }, []);

  const historySection = content?.sections?.find(s => s.type === 'history_timeline')?.data;

  const defaultDraftCopy = `[DRAFT — replace with client history]

Brothers Machine Services was founded on a simple idea: the hardest machining jobs aren't in a shop — they're on the ship, in the drydock, against the clock.

Rather than forcing shipyards and vessel superintendents to torch-cut decks and crane 20-ton propulsion shafts away for offsite repair, our founders built the company with their hands on the dials, indicators, and heavy portable boring bars.

Through decades of service at GMD Navy Shipyard (Brooklyn Navy Yard) and Caddell Drydock (Staten Island), Brothers Machine Services has earned the trust of port engineers, tug fleet operators, and ship repair facilities across the Eastern Seaboard.`;

  const timelineItems = historySection?.timeline || [
    { year: "Founding", event: "Master marine machinists establish dedicated mobile line boring service for NY/NJ harbor tugs and workboats." },
    { year: "First Shipyard Contract", event: "Stationed full-time inside Caddell Drydock and GMD Navy Shipyard, supporting graving docks and floating docks." },
    { year: "Tooling Expansion", event: "Acquisition of optical laser collimators, long-span 40ft boring bars, and hydraulic tensioning tooling." },
    { year: "Present Day", event: "Harbor-wide leader in outside marine machining, serving naval architects, commercial fleets, and shipyards." }
  ];

  return (
    <div>
      {/* Hero Banner */}
      <section className="section-dark blueprint-grid" style={{ paddingBlock: 'clamp(4rem, 6vw, 6rem)', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: 820 }}>
          <div className="eyebrow" style={{ marginInline: 'auto' }}>
            <span className="eyebrow-dot"></span>
            <span>Heritage • Craft • Results</span>
          </div>
          <h1 style={{ color: '#ffffff', marginBottom: '1rem' }}>
            The Brothers Behind The Machines.
          </h1>
          <p style={{ color: '#cbd5e1', fontSize: '1.2rem' }}>
            {settings.years_experience}+ years of hands-on marine engineering. We do the work ourselves, bringing precision machine tools directly to the hull.
          </p>
        </div>
      </section>

      {/* Company History Section with Faded Ship Emblem Watermark */}
      <section className="section section-white" style={{ position: 'relative', overflow: 'hidden' }}>
        {/* Refined Faded Ship Emblem Watermark */}
        <div style={{
          position: 'absolute',
          right: '-5%',
          top: '10%',
          width: '500px',
          height: '500px',
          backgroundImage: 'url(/logo.png)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
          opacity: 0.04,
          pointerEvents: 'none',
          zIndex: 0
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="grid-2">
            <div>
              <div className="eyebrow">
                <span className="eyebrow-dot"></span>
                <span>{historySection?.badge || 'Company Heritage'}</span>
              </div>
              <h2 style={{ marginBottom: '1.5rem' }}>
                {historySection?.title || 'Born in the Shipyard, Proven on the Water'}
              </h2>
              <div style={{ color: 'var(--color-steel-gray)', whiteSpace: 'pre-line', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '2rem' }}>
                {historySection?.rich_text || defaultDraftCopy}
              </div>

              <div style={{ background: 'var(--color-off-white)', borderLeft: '4px solid var(--color-steel-blue)', padding: '1.25rem 1.5rem' }}>
                <p style={{ fontStyle: 'italic', color: 'var(--color-navy)', margin: 0, fontWeight: 500 }}>
                  "{settings.tagline}"
                </p>
              </div>
            </div>

            {/* Editable Timeline Block */}
            <div className="card" style={{ padding: '2rem' }}>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '1.5rem', borderBottom: '2px solid var(--color-steel-blue)', paddingBottom: '0.5rem' }}>
                Milestones & Timeline
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'relative', paddingLeft: '1.5rem', borderLeft: '2px solid var(--color-border)' }}>
                {timelineItems.map((item: any, idx: number) => (
                  <div key={idx} style={{ position: 'relative' }}>
                    <div style={{
                      position: 'absolute',
                      left: 'calc(-1.5rem - 7px)',
                      top: '0.2rem',
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      background: 'var(--color-steel-blue)',
                      border: '2px solid #ffffff'
                    }} />
                    <div style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-steel-blue)', fontWeight: 700, fontSize: '0.95rem' }}>
                      {item.year}
                    </div>
                    <div style={{ fontSize: '0.92rem', color: 'var(--color-text-dark)', marginTop: 2 }}>
                      {item.event}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Us & Credentials */}
      <section className="section section-light">
        <div className="container">
          <div className="section-header">
            <div className="eyebrow">
              <span className="eyebrow-dot"></span>
              <span>Why Brothers Machine</span>
            </div>
            <h2>Why Fleets & Shipyards Rely On Us</h2>
            <p>Hands-on field execution with zero subcontractor risk.</p>
          </div>

          <div className="grid-3">
            <div className="card">
              <Wrench size={32} color="var(--color-steel-blue)" style={{ marginBottom: '1rem' }} />
              <h3 style={{ marginBottom: '0.5rem' }}>Hands-On Field Crews</h3>
              <p style={{ fontSize: '0.95rem' }}>
                We do the machining ourselves. When you call Brothers Machine, master machinists with decades of experience arrive with the boring bars and facing rigs.
              </p>
            </div>

            <div className="card">
              <Shield size={32} color="var(--color-orange)" style={{ marginBottom: '1rem' }} />
              <h3 style={{ marginBottom: '0.5rem' }}>Full Marine Insurance</h3>
              <p style={{ fontSize: '0.95rem' }}>
                {settings.insurance_line} Complete coverage including Ship Repairer’s Legal Liability (SRLL), Marine General Liability, and USL&H workers’ comp.
              </p>
            </div>

            <div className="card">
              <Award size={32} color="var(--color-steel-blue)" style={{ marginBottom: '1rem' }} />
              <h3 style={{ marginBottom: '0.5rem' }}>Inside The Yards</h3>
              <p style={{ fontSize: '0.95rem' }}>
                Active daily at {settings.shipyard_1} and {settings.shipyard_2}. Credentialed TWIC access, ready for drydock docking periods and emergency layberths.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Safety & Insurance Block */}
      <section className="section section-white">
        <div className="container">
          <div className="card" style={{ borderLeft: '4px solid var(--color-orange)', padding: '2.5rem' }}>
            <h3 style={{ marginBottom: '1rem' }}>Safety, Port Clearance & Insurance Standards</h3>
            <p style={{ fontSize: '1.05rem', color: 'var(--color-text-dark)', marginBottom: '1rem' }}>
              <strong>{settings.insurance_line}</strong>
            </p>
            <p style={{ fontSize: '0.95rem', marginBottom: '1.5rem' }}>
              All technicians carry valid Transportation Worker Identification Credentials (TWIC) for immediate unescorted entry to port terminals, drydocks, and naval facilities. Certificates of Insurance (COI) naming your vessel or facility as Additional Insured are available upon request.
            </p>
            <Link to="/contact" className="btn btn-primary" style={{ padding: '0.75rem 1.6rem', fontSize: '0.95rem' }}>
              Request COI / Quote
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
