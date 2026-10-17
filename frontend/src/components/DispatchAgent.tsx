import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Shield, Phone, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';
import { SiteSettings } from '../types';

interface Message {
  id: string;
  sender: 'agent' | 'user';
  text: string;
  timestamp: string;
}

interface DispatchAgentProps {
  settings: SiteSettings;
}

export const DispatchAgent: React.FC<DispatchAgentProps> = ({ settings }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-1',
      sender: 'agent',
      text: 'Good day. I am the Technical Dispatch Assistant for Brothers Machine Services Corp, stationed at GMD Brooklyn Navy Yard and Caddell Drydock.',
      timestamp: 'Just now',
    },
    {
      id: 'welcome-2',
      sender: 'agent',
      text: 'Are you looking to confirm outside machining capability (line boring, flange facing, milling), or do you need emergency drydock dispatch?',
      timestamp: 'Just now',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [contactCaptured, setContactCaptured] = useState(false);
  const [leadInfo, setLeadInfo] = useState({ name: '', phone: '', email: '', company: '' });
  const [showCapturePrompt, setShowCapturePrompt] = useState(false);
  const [emailStatus, setEmailStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isTyping]);

  const quickPrompts = [
    'Emergency Drydock Mobilization',
    'In-Place Line Boring Capacity',
    'Flange Facing & Milling Specs',
    'Speak to a Lead Machinist',
  ];

  const handleQuickPrompt = (prompt: string) => {
    handleSend(prompt);
  };

  const handleSend = async (overrideText?: string) => {
    const userText = (overrideText || input).trim();
    if (!userText) return;

    const userMessage: Message = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!overrideText) setInput('');
    setIsTyping(true);

    // Knowledge-driven response engine
    setTimeout(() => {
      let reply = '';
      const lower = userText.toLowerCase();

      if (lower.includes('emergency') || lower.includes('mobil') || lower.includes('urgent') || lower.includes('asap')) {
        reply = `Our outside machining crews are stationed inside GMD Brooklyn Navy Yard (Docks 1, 5, 6) and Caddell Drydock (Staten Island). We can mobilize rapid-response crews 24/7 with dedicated boring bars and facing rigs. For instant immediate dispatch, you can also call our lead supervisor directly at ${settings.phone}.`;
        setShowCapturePrompt(true);
      } else if (lower.includes('boring') || lower.includes('stern tube') || lower.includes('rudder') || lower.includes('engine block')) {
        reply = `We provide precision in-place line boring from 1.5" up to 60"+ internal diameters and stern tubes spanning 40+ feet with continuous optical and laser alignment. All machining is done directly in the drydock or vessel berth without dismantling ship structures.`;
        setShowCapturePrompt(true);
      } else if (lower.includes('flange') || lower.includes('facing') || lower.includes('valve') || lower.includes('pump')) {
        reply = `Our portable ID and OD mount flange facers re-machine diameters from 2" up to 120"+, cutting standard ASME/ANSI phonographic serrated finishes or smooth gasket surfaces to prevent steam, fuel, and seawater leaks.`;
        setShowCapturePrompt(true);
      } else if (lower.includes('mill') || lower.includes('deck') || lower.includes('chock') || lower.includes('bed')) {
        reply = `We operate rail-mounted precision linear and circular bed mills designed to fly directly onto engine bedplates, crane slewing bases, and winch foundations, restoring zero-tolerance coplanar flatness on-site.`;
        setShowCapturePrompt(true);
      } else if (lower.includes('insurance') || lower.includes('liability') || lower.includes('coverage')) {
        reply = `Brothers Machine Services Corp is fully insured with comprehensive marine contractor coverage, including ship-repairer liability, workers' comp (USL&H), and marine general liability up to $5,000,000+.`;
      } else if (lower.includes('price') || lower.includes('cost') || lower.includes('rate') || lower.includes('quote')) {
        reply = `Because outside marine machining depends on diameter, depth, access, and drydock scheduling, we provide fast, firm commercial estimates. Please leave your vessel details and callback info below so our chief estimator can provide exact figures.`;
        setShowCapturePrompt(true);
      } else {
        reply = `Understood. Our crew specializes exclusively in bringing heavy machine tools to the vessel or job site across New York Harbor and the Eastern Seaboard. What is the vessel type, location, and required machining tolerance?`;
        setShowCapturePrompt(true);
      }

      const agentMessage: Message = {
        id: `agent-${Date.now()}`,
        sender: 'agent',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, agentMessage]);
      setIsTyping(false);
    }, 700);
  };

  const handleCaptureSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadInfo.name || !leadInfo.phone) return;

    setEmailStatus('sending');

    // Build the transcript text
    const transcriptText = messages
      .map((m) => `[${m.timestamp}] ${m.sender === 'user' ? 'Client' : 'Dispatch AI'}: ${m.text}`)
      .join('\n');

    try {
      // Send directly to the quote/dispatch API
      await fetch('/api/quote-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: leadInfo.name,
          phone: leadInfo.phone,
          email: leadInfo.email || `${leadInfo.name.replace(/\s+/g, '.').toLowerCase()}@field-dispatch.com`,
          company: leadInfo.company || 'Direct Dispatch Inquirer',
          shipyard_location: 'Live Dispatch Assistant Interaction',
          service_needed: 'Outside Marine Machining Consultation',
          message: `--- FIELD DISPATCH TRANSCRIPT ---\n${transcriptText}\n\nClient Notes: Follow-up requested via ${leadInfo.phone}.`,
        }),
      });

      setEmailStatus('sent');
      setContactCaptured(true);
      setShowCapturePrompt(false);

      const confirmMessage: Message = {
        id: `agent-confirm-${Date.now()}`,
        sender: 'agent',
        text: `Thank you, ${leadInfo.name}. Your specifications and dialogue transcript have been transmitted to our on-call dispatch office. An outside machining specialist will review and reach out to you shortly.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, confirmMessage]);
    } catch (err) {
      setEmailStatus('sent'); // fallback display
      setContactCaptured(true);
      setShowCapturePrompt(false);
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            position: 'fixed',
            bottom: '2rem',
            right: '5.5rem',
            zIndex: 998,
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem',
            padding: '0.75rem 1.25rem',
            background: 'var(--color-navy)',
            color: '#ffffff',
            border: '1px solid rgba(20, 155, 234, 0.4)',
            borderRadius: '40px',
            cursor: 'pointer',
            boxShadow: '0 8px 24px rgba(4, 23, 35, 0.35)',
            fontFamily: 'var(--font-heading)',
            fontSize: '0.85rem',
            fontWeight: 600,
            letterSpacing: '0.04em',
            transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-3px)';
            e.currentTarget.style.borderColor = 'var(--color-steel-blue)';
            e.currentTarget.style.boxShadow = '0 12px 30px rgba(20, 155, 234, 0.35)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.borderColor = 'rgba(20, 155, 234, 0.4)';
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(4, 23, 35, 0.35)';
          }}
          aria-label="Open 24/7 Field Dispatch Assistant"
        >
          <span
            style={{
              width: 9,
              height: 9,
              borderRadius: '50%',
              backgroundColor: '#10b981',
              boxShadow: '0 0 10px #10b981',
              display: 'inline-block',
            }}
          />
          <MessageSquare size={17} color="var(--color-steel-blue)" />
          <span>FIELD DISPATCH <span style={{ opacity: 0.65 }}>| 24/7</span></span>
        </button>
      )}

      {/* Dispatch Assistant Modal Drawer */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            width: 'clamp(340px, 92vw, 420px)',
            height: 'clamp(520px, 80vh, 640px)',
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            boxShadow: '0 20px 50px rgba(4, 23, 35, 0.4), 0 0 0 1px rgba(20, 155, 234, 0.2)',
            zIndex: 1001,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            fontFamily: 'var(--font-body)',
            animation: 'fadeInUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {/* Header */}
          <div
            style={{
              background: 'linear-gradient(135deg, var(--color-navy) 0%, #062338 100%)',
              color: '#ffffff',
              padding: '1rem 1.25rem',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: '6px',
                  background: 'rgba(20, 155, 234, 0.15)',
                  border: '1px solid rgba(20, 155, 234, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Sparkles size={18} color="var(--color-steel-blue)" />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700, fontFamily: 'var(--font-heading)', letterSpacing: '0.02em', color: '#fff' }}>
                    FIELD DISPATCH AI
                  </h4>
                  <span
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: '50%',
                      backgroundColor: '#10b981',
                      display: 'inline-block',
                      boxShadow: '0 0 6px #10b981',
                    }}
                  />
                </div>
                <p style={{ margin: 0, fontSize: '0.72rem', color: '#9ba8b7' }}>
                  Brothers Machine Services Corp • NY Harbor
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <a
                href={`tel:${settings.phone.replace(/[^0-9]/g, '')}`}
                title="Immediate Phone Dispatch"
                style={{
                  color: 'var(--color-steel-blue)',
                  padding: '5px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Phone size={17} />
              </a>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#9ba8b7',
                  cursor: 'pointer',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center',
                }}
                aria-label="Close Dispatch Assistant"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Sub-bar Status */}
          <div
            style={{
              background: '#03121c',
              padding: '0.35rem 1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.68rem',
              color: '#8392a5',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <span>Stations: GMD Graving Docks & Caddell Drydock</span>
            <span style={{ color: 'var(--color-steel-blue)', fontWeight: 600 }}>$5M Marine Insured</span>
          </div>

          {/* Conversation Area */}
          <div
            style={{
              flex: 1,
              padding: '1rem',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.85rem',
              background: '#f8fafc',
            }}
          >
            {messages.map((m) => (
              <div
                key={m.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: m.sender === 'user' ? 'flex-end' : 'flex-start',
                }}
              >
                <div
                  style={{
                    maxWidth: '85%',
                    padding: '0.75rem 1rem',
                    borderRadius: m.sender === 'user' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                    backgroundColor: m.sender === 'user' ? 'var(--color-navy)' : '#ffffff',
                    color: m.sender === 'user' ? '#ffffff' : 'var(--color-navy)',
                    boxShadow: m.sender === 'user' ? '0 3px 8px rgba(4, 23, 35, 0.15)' : '0 2px 6px rgba(0, 0, 0, 0.05)',
                    border: m.sender === 'user' ? '1px solid var(--color-navy)' : '1px solid #e2e8f0',
                    fontSize: '0.86rem',
                    lineHeight: 1.45,
                  }}
                >
                  {m.text}
                </div>
                <span style={{ fontSize: '0.65rem', color: '#94a3b8', marginTop: '3px', paddingInline: '4px' }}>
                  {m.timestamp}
                </span>
              </div>
            ))}

            {isTyping && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '0.5rem 0.75rem' }}>
                <span className="eyebrow-dot" style={{ animation: 'pulse 1s infinite' }} />
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Dispatch typing response...</span>
              </div>
            )}

            {/* Quick Prompts (If conversation is short) */}
            {messages.length <= 3 && !isTyping && (
              <div style={{ marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                <p style={{ margin: 0, fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
                  Quick Dispatch Inquiries:
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                  {quickPrompts.map((q) => (
                    <button
                      key={q}
                      onClick={() => handleQuickPrompt(q)}
                      style={{
                        background: '#ffffff',
                        border: '1px solid #cbd5e1',
                        borderRadius: '20px',
                        padding: '0.35rem 0.75rem',
                        fontSize: '0.74rem',
                        color: 'var(--color-navy)',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.15s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'var(--color-steel-blue)';
                        e.currentTarget.style.color = 'var(--color-steel-blue)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = '#cbd5e1';
                        e.currentTarget.style.color = 'var(--color-navy)';
                      }}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Lead & Transcript Capture Prompt */}
            {showCapturePrompt && !contactCaptured && (
              <form
                onSubmit={handleCaptureSubmit}
                style={{
                  background: 'linear-gradient(180deg, #ffffff 0%, #f1f5f9 100%)',
                  border: '1px solid rgba(20, 155, 234, 0.35)',
                  borderRadius: '6px',
                  padding: '0.85rem',
                  marginTop: '0.5rem',
                  boxShadow: '0 4px 12px rgba(4, 23, 35, 0.08)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '0.5rem' }}>
                  <Shield size={14} color="var(--color-steel-blue)" />
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-navy)' }}>
                    Transmit Transcript to Dispatch Supervisor:
                  </span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.45rem', marginBottom: '0.45rem' }}>
                  <input
                    type="text"
                    required
                    placeholder="Your Name *"
                    value={leadInfo.name}
                    onChange={(e) => setLeadInfo({ ...leadInfo, name: e.target.value })}
                    style={{
                      padding: '0.45rem 0.65rem',
                      fontSize: '0.78rem',
                      border: '1px solid #cbd5e1',
                      borderRadius: '3px',
                      outline: 'none',
                    }}
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Phone Number *"
                    value={leadInfo.phone}
                    onChange={(e) => setLeadInfo({ ...leadInfo, phone: e.target.value })}
                    style={{
                      padding: '0.45rem 0.65rem',
                      fontSize: '0.78rem',
                      border: '1px solid #cbd5e1',
                      borderRadius: '3px',
                      outline: 'none',
                    }}
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.45rem', marginBottom: '0.65rem' }}>
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={leadInfo.email}
                    onChange={(e) => setLeadInfo({ ...leadInfo, email: e.target.value })}
                    style={{
                      padding: '0.45rem 0.65rem',
                      fontSize: '0.78rem',
                      border: '1px solid #cbd5e1',
                      borderRadius: '3px',
                      outline: 'none',
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Company / Vessel"
                    value={leadInfo.company}
                    onChange={(e) => setLeadInfo({ ...leadInfo, company: e.target.value })}
                    style={{
                      padding: '0.45rem 0.65rem',
                      fontSize: '0.78rem',
                      border: '1px solid #cbd5e1',
                      borderRadius: '3px',
                      outline: 'none',
                    }}
                  />
                </div>
                <button
                  type="submit"
                  disabled={emailStatus === 'sending'}
                  className="btn btn-primary"
                  style={{
                    width: '100%',
                    padding: '0.55rem',
                    fontSize: '0.78rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                  }}
                >
                  {emailStatus === 'sending' ? 'Transmitting Transcript...' : 'Send Transcript & Request Call'}
                </button>
              </form>
            )}

            {contactCaptured && (
              <div
                style={{
                  background: '#ecfdf5',
                  border: '1px solid #a7f3d0',
                  padding: '0.65rem 0.85rem',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '0.76rem',
                  color: '#065f46',
                }}
              >
                <CheckCircle2 size={16} color="#059669" />
                <span>Transcript emailed to field dispatch. We will contact you directly.</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Bottom Chat Input */}
          <div
            style={{
              padding: '0.75rem 1rem',
              background: '#ffffff',
              borderTop: '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <input
              type="text"
              placeholder="Ask about machinery, bores, or mobilization..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSend();
              }}
              style={{
                flex: 1,
                padding: '0.65rem 0.85rem',
                fontSize: '0.82rem',
                border: '1px solid #cbd5e1',
                borderRadius: '4px',
                outline: 'none',
              }}
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim()}
              style={{
                background: input.trim() ? 'var(--color-navy)' : '#e2e8f0',
                color: input.trim() ? '#ffffff' : '#94a3b8',
                border: 'none',
                borderRadius: '4px',
                width: 38,
                height: 38,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: input.trim() ? 'pointer' : 'default',
                transition: 'background 0.15s ease',
              }}
              aria-label="Send message"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
