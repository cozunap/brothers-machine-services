import React, { useState } from 'react';
import { SiteSettings } from '../types';
import { submitQuote } from '../api';
import { Shield, Phone, Mail, MapPin, CheckCircle, Clock, Wrench, Send } from 'lucide-react';

interface ComingSoonProps {
  settings: SiteSettings;
}

export const ComingSoon: React.FC<ComingSoonProps> = ({ settings }) => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    shipyard_location: 'GMD Navy Shipyard',
    service_needed: 'Emergency Outside Machining',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    const res = await submitQuote({
      ...formData,
      message: `[COMING SOON RFQ] ${formData.message}`,
    });
    setSubmitting(false);

    if (res.success) {
      setSubmitted(true);
    } else {
      setError(res.message || 'Submission failed. Please call our 24/7 dispatch phone.');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--color-navy)', color: '#ffffff' }}>
      {/* Top Station Telemetry Strip */}
      <div className="header-top-bar" style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
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
            <a href={`tel:${settings.phone.replace(/[^0-9]/g, '')}`} style={{ color: '#fff', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '5px', textDecoration: 'none' }}>
              <Phone size={13} color="var(--color-orange)" />
              24/7 Field Dispatch: <span style={{ color: 'var(--color-steel-blue)' }}>{settings.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Coming Soon Hero */}
      <main style={{ flex: 1, position: 'relative', overflow: 'hidden' }} className="blueprint-grid">
        {/* Background photo with subtle navy gradient */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/assets/Brothers-Machine-Services-Corp-Photo-17.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%',
          opacity: 0.16,
          zIndex: 0,
        }} />

        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 50% 25%, rgba(4, 23, 35, 0.7) 0%, rgba(4, 23, 35, 0.98) 100%)',
          zIndex: 1,
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 2, paddingBlock: 'clamp(3.5rem, 6vw, 5.5rem)' }}>
          {/* Header Brand Badge */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '2.5rem' }}>
            <img
              src="/logo.png"
              alt="Brothers Machine Services Corp Logo"
              style={{ height: 'clamp(64px, 10vw, 92px)', width: 'auto', marginBottom: '1.5rem', filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.6))' }}
            />

            <div className="eyebrow" style={{ marginInline: 'auto', marginBottom: '1.25rem' }}>
              <span className="eyebrow-dot"></span>
              <span>NEW DIGITAL PLATFORM UNDER CONSTRUCTION • OFFICIAL LAUNCH COMING SOON</span>
            </div>

            <h1 style={{ color: '#ffffff', fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', lineHeight: 1.15, marginBottom: '1.25rem', maxWidth: '850px' }}>
              We Bring The Machine Shop <br />
              <span style={{ color: 'var(--color-steel-blue)' }}>Directly To Your Vessel.</span>
            </h1>

            <p style={{ color: '#cbd5e1', fontSize: 'clamp(1.05rem, 1.8vw, 1.25rem)', maxWidth: '780px', lineHeight: 1.6, marginBottom: '2rem' }}>
              Our master machinists and heavy mobile field bars are actively operating 24/7 across GMD Brooklyn Navy Yard, Caddell Drydock, and throughout New York Harbor. Our new digital portal is launching soon.
            </p>

            {/* Quick Contact Action Pills */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '3.5rem' }}>
              <a
                href={`tel:${settings.phone.replace(/[^0-9]/g, '')}`}
                className="btn btn-primary"
                style={{ padding: '0.85rem 1.85rem', fontSize: '1rem', letterSpacing: '0.04em', textTransform: 'uppercase' }}
              >
                <Phone size={18} />
                Call 24/7 Dispatch: {settings.phone}
              </a>
              <a
                href={`mailto:${settings.email}`}
                className="btn btn-secondary"
                style={{ padding: '0.85rem 1.85rem', fontSize: '1rem', letterSpacing: '0.04em', textTransform: 'uppercase' }}
              >
                <Mail size={18} />
                Email: {settings.email}
              </a>
            </div>
          </div>

          {/* Two-Column Grid: Left = Capabilities & Yard Presence, Right = Immediate RFQ Dispatch */}
          <div className="grid-2" style={{ alignItems: 'stretch', gap: '2.5rem' }}>
            {/* Left Column: Field Readiness & Stations */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div className="card card-dark" style={{ borderLeft: '4px solid var(--color-steel-blue)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <Wrench size={22} color="var(--color-steel-blue)" />
                  <h3 style={{ margin: 0, fontSize: '1.25rem', color: '#fff' }}>Full Field Operations Active</h3>
                </div>
                <p style={{ fontSize: '0.95rem', color: '#cbd5e1', marginBottom: '1.25rem', lineHeight: 1.6 }}>
                  Our website is being upgraded, but our mobile crews and portable machine tools are fully deployed on vessel repairs daily.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', fontSize: '0.9rem', color: '#e2e8f0' }}>
                    <CheckCircle size={16} color="var(--color-steel-blue)" style={{ flexShrink: 0, marginTop: 3 }} />
                    <span><strong>In-Place Line Boring:</strong> Stern tubes, rudder trunks, & engine blocks (1.5" to 60"+ ID).</span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', fontSize: '0.9rem', color: '#e2e8f0' }}>
                    <CheckCircle size={16} color="var(--color-steel-blue)" style={{ flexShrink: 0, marginTop: 3 }} />
                    <span><strong>In-Situ Flange Facing:</strong> High-pressure steam, valves, & manways up to 120"+.</span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', fontSize: '0.9rem', color: '#e2e8f0' }}>
                    <CheckCircle size={16} color="var(--color-steel-blue)" style={{ flexShrink: 0, marginTop: 3 }} />
                    <span><strong>Rail Bed Milling & Drilling:</strong> Coplanar engine chocks, crane rings, & stud extraction.</span>
                  </div>
                </div>
              </div>

              {/* Stationed Yards Card */}
              <div className="card card-dark" style={{ borderLeft: '4px solid var(--color-orange)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <MapPin size={22} color="var(--color-orange)" />
                  <h3 style={{ margin: 0, fontSize: '1.25rem', color: '#fff' }}>Dedicated Shipyard Stations</h3>
                </div>
                <p style={{ fontSize: '0.92rem', color: '#cbd5e1', marginBottom: '1rem', lineHeight: 1.6 }}>
                  Stationed equipment and credentialed personnel already inside the gates:
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                  <div style={{ background: 'rgba(255,255,255,0.04)', padding: '0.85rem', borderRadius: 4, border: '1px solid rgba(255,255,255,0.08)' }}>
                    <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.92rem' }}>{settings.shipyard_1}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--color-steel-blue)', marginTop: 2 }}>Brooklyn Navy Yard • Graving Docks 1, 5 & 6</div>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.04)', padding: '0.85rem', borderRadius: 4, border: '1px solid rgba(255,255,255,0.08)' }}>
                    <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.92rem' }}>{settings.shipyard_2}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--color-orange)', marginTop: 2 }}>Staten Island • 6 Floating Drydocks</div>
                  </div>
                </div>
              </div>

              {/* Trust Metric Banner */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem',
                background: 'rgba(20, 155, 234, 0.08)',
                border: '1px solid rgba(20, 155, 234, 0.25)',
                borderRadius: 4,
                padding: '1.1rem',
                textAlign: 'center',
              }}>
                <div>
                  <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff', fontFamily: 'var(--font-heading)' }}>
                    {settings.years_experience}+ Years
                  </div>
                  <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-steel-blue)' }}>
                    Hands-On Marine Machining
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff', fontFamily: 'var(--font-heading)' }}>
                    $5,000,000+
                  </div>
                  <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-steel-blue)' }}>
                    Full Marine Liability Insured
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Direct Dispatch & Emergency RFQ Form */}
            <div className="card" style={{ background: '#ffffff', color: 'var(--color-text-dark)', padding: 'clamp(1.75rem, 3vw, 2.5rem)', borderRadius: 6, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem' }}>
                <Clock size={20} color="var(--color-orange)" />
                <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-orange)' }}>
                  DIRECT FIELD DISPATCH
                </span>
              </div>

              <h2 style={{ fontSize: '1.8rem', color: 'var(--color-navy)', marginBottom: '0.5rem' }}>
                Request Work / Mobilization
              </h2>

              <p style={{ fontSize: '0.92rem', color: 'var(--color-steel-gray)', marginBottom: '1.75rem', lineHeight: 1.5 }}>
                Need emergency line boring, flange facing, or drydock machining? Submit your parameters below for immediate response from our superintendents.
              </p>

              {submitted ? (
                <div style={{ background: '#e6f5fd', border: '1px solid var(--color-steel-blue)', padding: '2rem', borderRadius: 4, textAlign: 'center' }}>
                  <CheckCircle size={46} color="var(--color-steel-blue)" style={{ margin: '0 auto 1rem auto' }} />
                  <h3 style={{ color: 'var(--color-navy)', marginBottom: '0.5rem' }}>Request Transmitted</h3>
                  <p style={{ color: 'var(--color-text-dark)', fontSize: '0.95rem', marginBottom: '1.25rem' }}>
                    Thank you. Our on-call machining superintendent will review your job scope and contact you promptly. For immediate emergencies, call {settings.phone}.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setFormData({ ...formData, message: '' }); }}
                    className="btn btn-outline-dark"
                    style={{ fontSize: '0.85rem' }}
                  >
                    Send Another Dispatch Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.85rem' }}>
                    <div>
                      <label style={{ display: 'block', fontWeight: 600, fontSize: '0.8rem', marginBottom: 4, textTransform: 'uppercase' }}>
                        Your Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Capt. / Eng. Name"
                        style={{ width: '100%', padding: '0.75rem 0.9rem', border: '1px solid var(--color-border)', borderRadius: 3, fontSize: '0.9rem' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontWeight: 600, fontSize: '0.8rem', marginBottom: 4, textTransform: 'uppercase' }}>
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="(718) 555-0199"
                        style={{ width: '100%', padding: '0.75rem 0.9rem', border: '1px solid var(--color-border)', borderRadius: 3, fontSize: '0.9rem' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.85rem' }}>
                    <div>
                      <label style={{ display: 'block', fontWeight: 600, fontSize: '0.8rem', marginBottom: 4, textTransform: 'uppercase' }}>
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="engineer@vessel.com"
                        style={{ width: '100%', padding: '0.75rem 0.9rem', border: '1px solid var(--color-border)', borderRadius: 3, fontSize: '0.9rem' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontWeight: 600, fontSize: '0.8rem', marginBottom: 4, textTransform: 'uppercase' }}>
                        Company / Vessel
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Vessel or Towing Co."
                        style={{ width: '100%', padding: '0.75rem 0.9rem', border: '1px solid var(--color-border)', borderRadius: 3, fontSize: '0.9rem' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.85rem' }}>
                    <div>
                      <label style={{ display: 'block', fontWeight: 600, fontSize: '0.8rem', marginBottom: 4, textTransform: 'uppercase' }}>
                        Location / Drydock
                      </label>
                      <select
                        name="shipyard_location"
                        value={formData.shipyard_location}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '0.75rem 0.9rem', border: '1px solid var(--color-border)', borderRadius: 3, fontSize: '0.9rem', background: '#fff' }}
                      >
                        <option value="GMD Navy Shipyard">GMD Navy Shipyard (Brooklyn)</option>
                        <option value="Caddell Drydock">Caddell Drydock (Staten Island)</option>
                        <option value="Other Drydock / Slipway">Other Slipway / Drydock</option>
                        <option value="Pier / Anchorage">Waterborne Pier / Anchorage</option>
                        <option value="Industrial Plant">Industrial Facility</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontWeight: 600, fontSize: '0.8rem', marginBottom: 4, textTransform: 'uppercase' }}>
                        Machining Needed
                      </label>
                      <select
                        name="service_needed"
                        value={formData.service_needed}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '0.75rem 0.9rem', border: '1px solid var(--color-border)', borderRadius: 3, fontSize: '0.9rem', background: '#fff' }}
                      >
                        <option value="In-Place Line Boring">In-Place Line Boring (Stern Tube / Rudder)</option>
                        <option value="Flange Facing">In-Situ Flange Facing (Steam / Valve / Piping)</option>
                        <option value="Portable Bed Milling">Portable Bed Milling (Engine Chocks / Foundation)</option>
                        <option value="Drilling & Stud Extraction">Heavy Drilling / Stud Extraction</option>
                        <option value="Emergency Drydock Mobilization">Emergency Drydock Mobilization</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontWeight: 600, fontSize: '0.8rem', marginBottom: 4, textTransform: 'uppercase' }}>
                      Job Parameters / Bore Dimensions *
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={3}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Specify bore diameter, length, vessel schedule, or immediate repair scope..."
                      style={{ width: '100%', padding: '0.75rem 0.9rem', border: '1px solid var(--color-border)', borderRadius: 3, fontSize: '0.9rem' }}
                    />
                  </div>

                  {error && (
                    <div style={{ color: 'var(--color-orange)', fontSize: '0.85rem', fontWeight: 600 }}>
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn btn-primary"
                    style={{ width: '100%', padding: '0.9rem', fontSize: '0.95rem', letterSpacing: '0.04em', textTransform: 'uppercase' }}
                  >
                    <Send size={16} />
                    {submitting ? 'Transmitting Request...' : 'Send Immediate Dispatch Request'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Simplified Premium Footer for Coming Soon */}
      <footer style={{ background: 'var(--color-navy-dark)', borderTop: '1px solid rgba(255,255,255,0.08)', paddingBlock: '35px', color: '#9ba8b7', fontSize: '0.85rem' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.25rem' }}>
          <div>
            <div style={{ color: '#fff', fontWeight: 700, fontSize: '1rem', marginBottom: 2 }}>
              BROTHERS MACHINE SERVICES CORP
            </div>
            <div style={{ fontSize: '10px', color: '#64748b' }}>
              &copy; {new Date().getFullYear()} Brothers Machine Services Corp. All Rights Reserved. Hands-on outside machining. Design by <a href="https://cozuna.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-steel-blue)', textDecoration: 'none' }}>cozuna</a>.
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <a
              href="https://www.bbb.org/us/ny"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                padding: '0.35rem 0.65rem',
                borderRadius: 2,
                textDecoration: 'none',
              }}
            >
              <span style={{ fontWeight: 900, fontFamily: 'var(--font-heading)', color: '#ffffff', background: '#005a70', padding: '0.1rem 0.35rem', borderRadius: 2, fontSize: '0.72rem' }}>
                BBB
              </span>
              <span style={{ fontSize: '0.75rem', color: '#cbd5e1' }}>
                Better Business Bureau&reg; NY
              </span>
            </a>
            <span style={{ fontSize: '0.78rem', color: '#64748b' }}>TWIC Credentialed • ABS / USCG Class Compliant</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
