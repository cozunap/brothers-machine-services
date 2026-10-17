import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { SiteSettings, ServiceItem, QuoteRequest } from '../types';
import { submitQuote } from '../api';
import { Phone, Mail, Shield, Anchor, CheckCircle, FileText, UploadCloud, X } from 'lucide-react';

interface ContactProps {
  settings: SiteSettings;
  services: ServiceItem[];
}

export const Contact: React.FC<ContactProps> = ({ settings, services }) => {
  const query = new URLSearchParams(useLocation().search);
  const prefillService = query.get('service') || '';

  const [formData, setFormData] = useState<QuoteRequest>({
    name: '',
    company: '',
    email: '',
    phone: '',
    shipyard_location: 'GMD Navy Shipyard',
    service_needed: prefillService || 'Line Boring',
    message: '',
  });

  const [attachedFile, setAttachedFile] = useState<{ name: string; size: string; dataUrl: string } | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (file: File) => {
    if (file.size > 15 * 1024 * 1024) {
      setError('File size exceeds 15MB limit. Please upload a smaller file or send via email.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      const sizeStr = (file.size / (1024 * 1024)).toFixed(2) + ' MB';
      setAttachedFile({ name: file.name, size: sizeStr, dataUrl });
      setError('');
    };
    reader.readAsDataURL(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    const payload: QuoteRequest = {
      ...formData,
      file_name: attachedFile?.name,
      file_data: attachedFile?.dataUrl,
    };

    const res = await submitQuote(payload);
    setSubmitting(false);

    if (res.success) {
      setSubmitted(true);
      setAttachedFile(null);
    } else {
      setError(res.message || 'Submission failed. Please call our direct line.');
    }
  };

  return (
    <div>
      {/* Page Hero */}
      <section className="section-dark blueprint-grid" style={{ paddingBlock: 'clamp(4rem, 6vw, 6rem)', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: 820 }}>
          <div className="eyebrow" style={{ marginInline: 'auto' }}>
            <span className="eyebrow-dot"></span>
            <span>24/7 Field Dispatch & RFQ</span>
          </div>
          <h1 style={{ color: '#ffffff', marginBottom: '1rem' }}>
            Request A Quote.
          </h1>
          <p style={{ color: '#cbd5e1', fontSize: '1.2rem' }}>
            Direct mobilization to your vessel, dockside or onboard. Upload drawings or job scopes for immediate review.
          </p>
        </div>
      </section>

      {/* Main Form & Details */}
      <div className="section section-white">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'flex-start' }}>
            {/* Form */}
            <div className="card" style={{ padding: '2.5rem' }}>
              <h2 style={{ fontSize: '1.8rem', marginBottom: '0.75rem' }}>Send Project Details</h2>
              <p style={{ marginBottom: '2rem', fontSize: '0.95rem' }}>
                Fill in your project requirements below. Our machining superintendents respond within one business day.
              </p>

              {submitted ? (
                <div style={{ background: '#e6f5fd', border: '1px solid var(--color-steel-blue)', padding: '2rem', borderRadius: 3, textAlign: 'center' }}>
                  <CheckCircle size={48} color="var(--color-steel-blue)" style={{ margin: '0 auto 1rem auto' }} />
                  <h3 style={{ color: 'var(--color-navy)', marginBottom: '0.5rem' }}>Request Received</h3>
                  <p style={{ color: 'var(--color-text-dark)', marginBottom: '1rem' }}>
                    Thank you — we'll get back to you within one business day. For emergencies, call {settings.phone}.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setFormData({ ...formData, message: '' }); }}
                    className="btn btn-outline-dark"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {/* Honeypot field for bot spam */}
                  <input type="text" name="website_url" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: 4, textTransform: 'uppercase' }}>
                        Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        style={{ width: '100%', padding: '0.8rem 1rem', border: '1px solid var(--color-border)', borderRadius: 2 }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: 4, textTransform: 'uppercase' }}>
                        Company
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Vessel Operating Co."
                        style={{ width: '100%', padding: '0.8rem 1rem', border: '1px solid var(--color-border)', borderRadius: 2 }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: 4, textTransform: 'uppercase' }}>
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@company.com"
                        style={{ width: '100%', padding: '0.8rem 1rem', border: '1px solid var(--color-border)', borderRadius: 2 }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: 4, textTransform: 'uppercase' }}>
                        Phone *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="(718) 555-0199"
                        style={{ width: '100%', padding: '0.8rem 1rem', border: '1px solid var(--color-border)', borderRadius: 2 }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: 4, textTransform: 'uppercase' }}>
                        Shipyard / Location
                      </label>
                      <select
                        name="shipyard_location"
                        value={formData.shipyard_location}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '0.8rem 1rem', border: '1px solid var(--color-border)', borderRadius: 2, background: '#fff' }}
                      >
                        <option value="GMD Navy Shipyard">GMD Navy Shipyard (Brooklyn)</option>
                        <option value="Caddell Drydock">Caddell Drydock (Staten Island)</option>
                        <option value="Other Drydock / Slipway">Other Drydock / Slipway</option>
                        <option value="Pier / Anchorage">Pier / Waterborne Anchorage</option>
                        <option value="Industrial Plant">Industrial Facility</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: 4, textTransform: 'uppercase' }}>
                        Service Needed
                      </label>
                      <select
                        name="service_needed"
                        value={formData.service_needed}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '0.8rem 1rem', border: '1px solid var(--color-border)', borderRadius: 2, background: '#fff' }}
                      >
                        {services.map(s => (
                          <option key={s.id} value={s.name}>{s.name}</option>
                        ))}
                        <option value="Other / Emergency Dispatch">Other / Emergency Dispatch</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: 4, textTransform: 'uppercase' }}>
                      Project Details *
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Specify bore diameters, flange sizes, access limitations, or docking schedule..."
                      style={{ width: '100%', padding: '0.8rem 1rem', border: '1px solid var(--color-border)', borderRadius: 2 }}
                    />
                  </div>

                  {/* Technical Blueprint & Inspection Report File Attachment */}
                  <div>
                    <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: 4, textTransform: 'uppercase' }}>
                      Attach Blueprints / Bore Inspection Sheets <span style={{ textTransform: 'none', color: '#64748b', fontWeight: 400 }}>(Optional - PDF, DWG, PNG, JPG up to 15MB)</span>
                    </label>

                    {!attachedFile ? (
                      <label
                        style={{
                          border: '2px dashed var(--color-border)',
                          borderRadius: '4px',
                          padding: '1.25rem',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.5rem',
                          cursor: 'pointer',
                          background: '#f8fafc',
                          transition: 'all 0.2s ease',
                        }}
                        onDragOver={(e) => {
                          e.preventDefault();
                          e.currentTarget.style.borderColor = 'var(--color-steel-blue)';
                          e.currentTarget.style.background = '#f0f9ff';
                        }}
                        onDragLeave={(e) => {
                          e.preventDefault();
                          e.currentTarget.style.borderColor = 'var(--color-border)';
                          e.currentTarget.style.background = '#f8fafc';
                        }}
                        onDrop={(e) => {
                          e.preventDefault();
                          e.currentTarget.style.borderColor = 'var(--color-border)';
                          e.currentTarget.style.background = '#f8fafc';
                          if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                            handleFileChange(e.dataTransfer.files[0]);
                          }
                        }}
                      >
                        <input
                          type="file"
                          accept=".pdf,.dwg,.dxf,.png,.jpg,.jpeg,.doc,.docx,.xlsx"
                          style={{ display: 'none' }}
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              handleFileChange(e.target.files[0]);
                            }
                          }}
                        />
                        <UploadCloud size={28} color="var(--color-steel-blue)" />
                        <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-navy)' }}>
                          Click to browse or drag & drop project drawings
                        </span>
                        <span style={{ fontSize: '0.78rem', color: '#64748b' }}>
                          Upload CAD drawings, runout logs, or damaged component photos for immediate review
                        </span>
                      </label>
                    ) : (
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '0.75rem 1rem',
                          background: '#ecfdf5',
                          border: '1px solid #a7f3d0',
                          borderRadius: '4px',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <FileText size={20} color="#059669" />
                          <div>
                            <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#065f46' }}>
                              {attachedFile.name}
                            </div>
                            <div style={{ fontSize: '0.75rem', color: '#047857' }}>
                              {attachedFile.size} • Attached to RFQ
                            </div>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setAttachedFile(null)}
                          style={{
                            background: 'transparent',
                            border: 'none',
                            color: '#991b1b',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            padding: '4px',
                          }}
                          aria-label="Remove attached file"
                        >
                          <X size={18} />
                        </button>
                      </div>
                    )}
                  </div>

                  {error && (
                    <div style={{ color: 'var(--color-orange)', fontSize: '0.9rem', fontWeight: 600 }}>
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn btn-primary"
                    style={{ width: '100%', padding: '1rem', fontSize: '1.05rem', marginTop: '0.5rem' }}
                  >
                    {submitting ? 'Sending Request...' : 'Send Request'}
                  </button>
                </form>
              )}
            </div>

            {/* Side Panel */}
            <div>
              <div className="card" style={{ padding: '2rem', marginBottom: '2rem', borderTop: '4px solid var(--color-orange)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1.25rem' }}>
                  <Phone size={24} color="var(--color-orange)" />
                  <div>
                    <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--color-steel-blue)', fontWeight: 700 }}>
                      24/7 EMERGENCY DISPATCH
                    </div>
                    <a href={`tel:${settings.phone.replace(/[^0-9]/g, '')}`} style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-navy)', fontFamily: 'var(--font-heading)' }}>
                      {settings.phone}
                    </a>
                  </div>
                </div>
                <p style={{ fontSize: '0.92rem' }}>
                  Direct line to our on-call field machining superintendent. For urgent breakdowns during drydock layovers.
                </p>
              </div>

              <div className="card" style={{ padding: '2rem', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1.25rem' }}>
                  <Mail size={24} color="var(--color-steel-blue)" />
                  <div>
                    <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--color-steel-blue)', fontWeight: 700 }}>
                      DIRECT EMAIL
                    </div>
                    <a href={`mailto:${settings.email}`} style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-navy)' }}>
                      {settings.email}
                    </a>
                  </div>
                </div>
                <p style={{ fontSize: '0.92rem' }}>
                  Send blueprints, tolerance sheets, and formal RFQ packages.
                </p>
              </div>

              <div className="card" style={{ padding: '2rem' }}>
                <h4 style={{ marginBottom: '1rem', borderBottom: '2px solid var(--color-steel-blue)', paddingBottom: '0.4rem', display: 'inline-block' }}>
                  ACTIVE YARDS SERVED
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.92rem' }}>
                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <Anchor size={18} color="var(--color-steel-blue)" />
                    <div>
                      <strong>{settings.shipyard_1}</strong>
                      <div style={{ color: 'var(--color-steel-gray)' }}>Brooklyn Navy Yard • Drydocks 1, 5 & 6</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <Anchor size={18} color="var(--color-steel-blue)" />
                    <div>
                      <strong>{settings.shipyard_2}</strong>
                      <div style={{ color: 'var(--color-steel-gray)' }}>Staten Island • 6 Floating Drydocks</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <Shield size={18} color="var(--color-orange)" />
                    <div>
                      <strong>Insurance Protection</strong>
                      <div style={{ color: 'var(--color-steel-gray)' }}>{settings.insurance_line}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
