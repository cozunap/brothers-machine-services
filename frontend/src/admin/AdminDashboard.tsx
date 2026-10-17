import React, { useState, useEffect } from 'react';
import { SiteSettings, ServiceItem, GalleryItem, QuoteRequest } from '../types';
import { fetchSettings, fetchServices, fetchGallery } from '../api';
import { Wrench, Settings, Image, MessageSquare, LogOut, Check, AlertCircle, Save } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('bms_admin_token'));
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [setupKey, setSetupKey] = useState('');
  const [isSetup, setIsSetup] = useState(false);
  const [authError, setAuthError] = useState('');

  // Active Tab
  const [tab, setTab] = useState<'settings' | 'history' | 'services' | 'gallery' | 'inbox'>('settings');

  // CMS State
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [historyText, setHistoryText] = useState('');
  const [historyBadge, setHistoryBadge] = useState('Company Heritage');
  const [historyTitle, setHistoryTitle] = useState('Born in the Shipyard, Proven on the Water');

  // Persistence Status Pill ("Saving… / Saved ✓ / Error — retry")
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  // Load Data
  useEffect(() => {
    if (token) {
      loadAllData();
    }
  }, [token]);

  const loadAllData = async () => {
    try {
      const [s, srv, gal, qRes, hRes] = await Promise.all([
        fetchSettings(),
        fetchServices(),
        fetchGallery(),
        fetch('/api/admin/quote-requests', { headers: { Authorization: `Bearer ${token}` } }).then(r => r.ok ? r.json() : []),
        fetch('/api/content/pages/about').then(r => r.ok ? r.json() : null)
      ]);

      setSettings(s);
      setServices(srv);
      setGallery(gal);
      setQuotes(Array.isArray(qRes) ? qRes : []);

      if (hRes && hRes.sections) {
        const sec = hRes.sections.find((sec: any) => sec.type === 'history_timeline');
        if (sec && sec.data) {
          setHistoryText(sec.data.rich_text || '');
          setHistoryBadge(sec.data.badge || 'Company Heritage');
          setHistoryTitle(sec.data.title || 'Born in the Shipyard, Proven on the Water');
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Auth: Setup / Login
  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    try {
      if (isSetup) {
        const res = await fetch('/api/admin/setup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password, setup_key: setupKey }),
        });
        const d = await res.json();
        if (res.ok) {
          alert('Account created! Please log in.');
          setIsSetup(false);
        } else {
          setAuthError(d.error || 'Setup failed');
        }
      } else {
        const res = await fetch('/api/admin/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
        const d = await res.json();
        if (res.ok && d.token) {
          localStorage.setItem('bms_admin_token', d.token);
          setToken(d.token);
        } else {
          setAuthError(d.error || 'Login failed');
        }
      }
    } catch (err: any) {
      setAuthError(err.message || 'Network error');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('bms_admin_token');
    setToken(null);
  };

  // Save Settings with Autosave Status Pill
  const saveSettings = async (newSettings: SiteSettings) => {
    setSaveStatus('saving');
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newSettings),
      });
      if (res.ok) {
        setSettings(newSettings);
        setSaveStatus('saved');
        setTimeout(() => setSaveStatus('idle'), 2500);
      } else {
        setSaveStatus('error');
      }
    } catch (e) {
      setSaveStatus('error');
    }
  };

  // Save History (About Page)
  const saveHistory = async () => {
    setSaveStatus('saving');
    try {
      const res = await fetch('/api/admin/sections', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: 1,
          page_id: 2,
          type: 'history_timeline',
          visible: 1,
          data: {
            badge: historyBadge,
            title: historyTitle,
            rich_text: historyText,
          },
        }),
      });
      if (res.ok) {
        setSaveStatus('saved');
        setTimeout(() => setSaveStatus('idle'), 2500);
      } else {
        setSaveStatus('error');
      }
    } catch (e) {
      setSaveStatus('error');
    }
  };

  // Save Service
  const handleSaveService = async (service: ServiceItem) => {
    setSaveStatus('saving');
    try {
      const res = await fetch('/api/admin/services', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(service),
      });
      if (res.ok) {
        await loadAllData();
        setSaveStatus('saved');
        setTimeout(() => setSaveStatus('idle'), 2500);
      } else {
        setSaveStatus('error');
      }
    } catch (e) {
      setSaveStatus('error');
    }
  };

  // Login View
  if (!token) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div className="card" style={{ maxWidth: 440, width: '100%', padding: '2.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <img src="/logo.png" alt="Brothers Machine" style={{ height: 50, margin: '0 auto 1rem auto' }} />
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.35rem' }}>Shop Office Login</h2>
            <p style={{ fontSize: '0.9rem' }}>Brothers Machine Services CMS</p>
          </div>

          {authError && (
            <div style={{ background: '#fef2f2', border: '1px solid #f87171', color: '#b91c1c', padding: '0.75rem', borderRadius: 2, marginBottom: '1rem', fontSize: '0.88rem' }}>
              {authError}
            </div>
          )}

          <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 4 }}>Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@brothersmachineservices.com"
                style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--color-border)', borderRadius: 2 }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 4 }}>Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--color-border)', borderRadius: 2 }}
              />
            </div>

            {isSetup && (
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 4 }}>Setup Key</label>
                <input
                  type="password"
                  required
                  value={setupKey}
                  onChange={e => setSetupKey(e.target.value)}
                  placeholder="Secret setup key"
                  style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--color-border)', borderRadius: 2 }}
                />
              </div>
            )}

            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>
              {isSetup ? 'Create Admin Account' : 'Sign In to Shop Office'}
            </button>

            <button
              type="button"
              onClick={() => setIsSetup(!isSetup)}
              style={{ background: 'transparent', border: 'none', color: 'var(--color-steel-blue)', fontSize: '0.85rem', cursor: 'pointer', marginTop: '0.5rem' }}
            >
              {isSetup ? 'Back to Login' : 'First time? Setup Admin Account'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-off-white)' }}>
      {/* Admin Top Navigation */}
      <div style={{ background: 'var(--color-navy)', color: '#fff', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <img src="/logo.png" alt="Logo" style={{ height: 38 }} />
          <div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 700 }}>SHOP OFFICE</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-steel-blue)' }}>Brothers Machine Services CMS</div>
          </div>
        </div>

        {/* Persistence Status Pill */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {saveStatus === 'saving' && (
            <span style={{ background: '#fef3c7', color: '#92400e', padding: '0.3rem 0.75rem', borderRadius: 12, fontSize: '0.82rem', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              Saving…
            </span>
          )}
          {saveStatus === 'saved' && (
            <span style={{ background: '#dcfce7', color: '#166534', padding: '0.3rem 0.75rem', borderRadius: 12, fontSize: '0.82rem', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              <Check size={14} /> Saved ✓ (Live)
            </span>
          )}
          {saveStatus === 'error' && (
            <span style={{ background: '#fee2e2', color: '#991b1b', padding: '0.3rem 0.75rem', borderRadius: 12, fontSize: '0.82rem', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              <AlertCircle size={14} /> Error — retry
            </span>
          )}

          <button
            onClick={handleLogout}
            className="btn btn-secondary"
            style={{ padding: '0.4rem 0.85rem', fontSize: '0.85rem' }}
          >
            <LogOut size={14} /> Log Out
          </button>
        </div>
      </div>

      {/* Admin Main Layout */}
      <div className="container" style={{ paddingBlock: '2.5rem' }}>
        {/* Navigation Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.5rem' }}>
          {[
            { id: 'settings', label: 'Site Settings', icon: Settings },
            { id: 'history', label: 'Company History (About)', icon: Wrench },
            { id: 'services', label: 'Services Manager', icon: Wrench },
            { id: 'gallery', label: 'Work Gallery', icon: Image },
            { id: 'inbox', label: `Quote Inbox (${quotes.filter(q => q.status === 'new').length})`, icon: MessageSquare },
          ].map(t => {
            const Icon = t.icon;
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id as any)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.65rem 1.25rem',
                  borderRadius: 2,
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.95rem',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: active ? '1px solid var(--color-steel-blue)' : '1px solid transparent',
                  background: active ? '#ffffff' : 'transparent',
                  color: active ? 'var(--color-navy)' : 'var(--color-steel-gray)',
                  boxShadow: active ? '0 1px 3px rgba(0,0,0,0.05)' : 'none'
                }}
              >
                <Icon size={16} color={active ? 'var(--color-steel-blue)' : 'currentColor'} />
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Tab 1: Site Settings */}
        {tab === 'settings' && settings && (
          <div className="card" style={{ maxWidth: 840, padding: '2.5rem' }}>
            <h2 style={{ fontSize: '1.6rem', marginBottom: '0.5rem' }}>Global Site Settings</h2>
            <p style={{ marginBottom: '2rem', fontSize: '0.92rem' }}>
              Every value here flows directly to headlines, trust badges, phone links, and shipyard cards across the website.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                saveSettings(settings);
              }}
              style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: 4 }}>
                    Years of Experience (Reads site-wide)
                  </label>
                  <input
                    type="text"
                    value={settings.years_experience}
                    onChange={e => setSettings({ ...settings, years_experience: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--color-border)', borderRadius: 2 }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: 4 }}>
                    Dispatch Phone Number
                  </label>
                  <input
                    type="text"
                    value={settings.phone}
                    onChange={e => setSettings({ ...settings, phone: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--color-border)', borderRadius: 2 }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: 4 }}>
                    Direct Email
                  </label>
                  <input
                    type="email"
                    value={settings.email}
                    onChange={e => setSettings({ ...settings, email: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--color-border)', borderRadius: 2 }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: 4 }}>
                    Work Style Motto
                  </label>
                  <input
                    type="text"
                    value={settings.work_style}
                    onChange={e => setSettings({ ...settings, work_style: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--color-border)', borderRadius: 2 }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: 4 }}>
                    Shipyard Station 1
                  </label>
                  <input
                    type="text"
                    value={settings.shipyard_1}
                    onChange={e => setSettings({ ...settings, shipyard_1: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--color-border)', borderRadius: 2 }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: 4 }}>
                    Shipyard Station 2
                  </label>
                  <input
                    type="text"
                    value={settings.shipyard_2}
                    onChange={e => setSettings({ ...settings, shipyard_2: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--color-border)', borderRadius: 2 }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: 4 }}>
                  Insurance Line
                </label>
                <input
                  type="text"
                  value={settings.insurance_line}
                  onChange={e => setSettings({ ...settings, insurance_line: e.target.value })}
                  style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--color-border)', borderRadius: 2 }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: 4 }}>
                  Company Tagline
                </label>
                <input
                  type="text"
                  value={settings.tagline}
                  onChange={e => setSettings({ ...settings, tagline: e.target.value })}
                  style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--color-border)', borderRadius: 2 }}
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start', marginTop: '1rem' }}>
                <Save size={16} /> Save Settings (Live)
              </button>
            </form>
          </div>
        )}

        {/* Tab 2: History Editor */}
        {tab === 'history' && (
          <div className="card" style={{ maxWidth: 840, padding: '2.5rem' }}>
            <h2 style={{ fontSize: '1.6rem', marginBottom: '0.5rem' }}>Company History Editor</h2>
            <p style={{ marginBottom: '1.5rem', fontSize: '0.92rem' }}>
              When the client provides the official company history text, paste it directly into this field. It updates the About page immediately with zero code changes.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: 4 }}>
                  Section Badge
                </label>
                <input
                  type="text"
                  value={historyBadge}
                  onChange={e => setHistoryBadge(e.target.value)}
                  style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--color-border)', borderRadius: 2 }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: 4 }}>
                  Headline Title
                </label>
                <input
                  type="text"
                  value={historyTitle}
                  onChange={e => setHistoryTitle(e.target.value)}
                  style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--color-border)', borderRadius: 2 }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: 4 }}>
                  History Story Text (Multi-paragraph rich text)
                </label>
                <textarea
                  rows={12}
                  value={historyText}
                  onChange={e => setHistoryText(e.target.value)}
                  style={{ width: '100%', padding: '0.85rem', border: '1px solid var(--color-border)', borderRadius: 2, fontFamily: 'monospace', fontSize: '0.95rem' }}
                />
              </div>

              <button onClick={saveHistory} className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
                <Save size={16} /> Publish History to About Page
              </button>
            </div>
          </div>
        )}

        {/* Tab 3: Services Manager */}
        {tab === 'services' && (
          <div>
            <h2 style={{ fontSize: '1.6rem', marginBottom: '1.5rem' }}>Services Manager</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
              {services.map(s => (
                <div key={s.id} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <img src={s.image_url} alt={s.name} style={{ width: '100%', height: 160, objectFit: 'cover', borderRadius: 2, marginBottom: '1rem' }} />
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '0.35rem' }}>{s.name}</h3>
                    <p style={{ fontSize: '0.88rem', marginBottom: '1rem' }}>{s.short_description}</p>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid var(--color-border)' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.85rem', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={Boolean(s.visible)}
                        onChange={() => handleSaveService({ ...s, visible: s.visible ? 0 : 1 })}
                      />
                      Visible on Site
                    </label>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-steel-blue)' }}>Order #{s.sort_order}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Gallery Manager */}
        {tab === 'gallery' && (
          <div>
            <h2 style={{ fontSize: '1.6rem', marginBottom: '1.5rem' }}>Work Gallery Manager</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
              {gallery.map(item => (
                <div key={item.id} className="card" style={{ padding: 0, overflow: 'hidden' }}>
                  <img src={item.image_url} alt={item.title} style={{ width: '100%', height: 180, objectFit: 'cover' }} />
                  <div style={{ padding: '1rem' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-steel-blue)' }}>{item.category}</div>
                    <h4 style={{ fontSize: '1rem', marginTop: 2 }}>{item.title}</h4>
                    <p style={{ fontSize: '0.82rem', marginTop: 4 }}>{item.caption}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: Quote Inbox */}
        {tab === 'inbox' && (
          <div className="card" style={{ padding: '2rem' }}>
            <h2 style={{ fontSize: '1.6rem', marginBottom: '1.5rem' }}>Quote Requests Inbox</h2>
            {quotes.length === 0 ? (
              <p style={{ color: 'var(--color-steel-gray)' }}>No quote requests received yet.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {quotes.map(q => (
                  <div key={q.id} style={{ border: '1px solid var(--color-border)', padding: '1.25rem', borderRadius: 3, background: '#fff' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                      <strong style={{ fontSize: '1.1rem', color: 'var(--color-navy)' }}>{q.name} ({q.company || 'Private'})</strong>
                      <span style={{ fontSize: '0.8rem', color: 'var(--color-steel-gray)' }}>{q.created_at}</span>
                    </div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--color-steel-blue)', marginBottom: '0.75rem' }}>
                      📞 {q.phone} • ✉️ {q.email} • ⚓ {q.shipyard_location} • ⚙️ {q.service_needed}
                    </div>
                    <p style={{ fontSize: '0.95rem', color: 'var(--color-text-dark)', background: 'var(--color-off-white)', padding: '0.75rem', borderRadius: 2 }}>
                      {q.message}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
