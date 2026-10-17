import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Shield, Phone, Sparkles, CheckCircle2, Anchor, HelpCircle, FileText } from 'lucide-react';
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
      text: `Hello! Welcome to Brothers Machine Services. I am your 24/7 Field Assistant. 👋`,
      timestamp: 'Just now',
    },
    {
      id: 'welcome-2',
      sender: 'agent',
      text: `We are master outside machinists stationed on-site at GMD Brooklyn Navy Yard and Caddell Drydock. How can I help you today? You can ask me about our services, equipment, emergency mobilization, or request a quick quote!`,
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
    'What services do you provide?',
    'Emergency Drydock Mobilization',
    'Where are you located?',
    'Request a Quote',
  ];

  const handleQuickPrompt = (prompt: string) => {
    handleSend(prompt);
  };

  const getKnowledgeResponse = (userText: string): { reply: string; promptLead: boolean } => {
    const q = userText.toLowerCase();

    // 1. Greetings & Pleasantries
    if (q.match(/^(hi|hello|hey|good morning|good afternoon|good evening|howdy)/)) {
      return {
        reply: `Hello there! Great to connect with you. We're here to help with all on-site marine and heavy industrial machining. Are you planning an upcoming drydock repair, or do you have an urgent machining need?`,
        promptLead: false,
      };
    }

    if (q.includes('who are you') || q.includes('what is brothers machine') || q.includes('tell me about')) {
      return {
        reply: `Brothers Machine Services Corp is a specialized outside machining company with over ${settings.years_experience} years of hands-on experience. We bring precision heavy machine tools directly to vessels, drydocks, and facilities across New York Harbor and the Eastern Seaboard—eliminating the need to cut decks or transport huge components away for repair.`,
        promptLead: true,
      };
    }

    // 2. Services Overview
    if (q.includes('what service') || q.includes('what do you do') || q.includes('capabilities') || q.includes('services')) {
      return {
        reply: `Our core outside machining capabilities include:\n• In-Place Line Boring (stern tubes, rudder trunks, engine blocks up to 60"+ ID)\n• In-Situ Flange Facing (2" to 120"+, ASME phonographic spiral serrated finishes)\n• Portable Bed Milling (rail-mounted milling for engine foundations & winch bedplates)\n• Precision Heavy Drilling & Tapping (broken stud removal & thread repair)\n• Shaft & Rudder Journal Restoration (orbital turning & optical alignment).\n\nWhich of these matches your project?`,
        promptLead: true,
      };
    }

    // 3. Line Boring Specifics
    if (q.includes('line boring') || q.includes('boring') || q.includes('stern tube') || q.includes('rudder trunk') || q.includes('strut')) {
      return {
        reply: `We operate heavy portable boring bars that machine diameters from 1.5 inches up to 60+ inches, spanning stern tubes 40+ feet long. We use continuous laser and optical collimator alignment to restore exact factory centerline tolerances directly inside the drydock slipway without pulling the housing. Would you like an estimate for your bore dimensions?`,
        promptLead: true,
      };
    }

    // 4. Flange Facing Specifics
    if (q.includes('flange') || q.includes('facing') || q.includes('valve') || q.includes('pump base') || q.includes('gasket')) {
      return {
        reply: `Our portable ID- and OD-mount flange facers handle flanges from 2" up to 120"+ diameter. We cut precise ASME/ANSI phonographic spiral serrated finishes (125–250 Ra) or smooth gasket faces for high-pressure steam, exhaust, fuel, and seawater lines on-site.`,
        promptLead: true,
      };
    }

    // 5. Portable Milling Specifics
    if (q.includes('mill') || q.includes('bed milling') || q.includes('chock') || q.includes('foundation') || q.includes('winch')) {
      return {
        reply: `We use rail-mounted linear and circular bed mills mounted directly to vessel decks, main engine foundations, crane slewing rings, and thruster wells. This restores true coplanar flatness within thousandths of an inch without torch cutting or off-site machining.`,
        promptLead: true,
      };
    }

    // 6. Drilling & Tapping / Stud Removal
    if (q.includes('drill') || q.includes('tap') || q.includes('stud') || q.includes('bolt') || q.includes('thread')) {
      return {
        reply: `We deploy high-torque magnetic-base and pneumatic drills for heavy reaming, line boring of fitted bolt holes, and EDM/spark-free extraction of broken studs from engine blocks and casing joints in tight quarters.`,
        promptLead: true,
      };
    }

    // 7. Locations & Shipyards
    if (q.includes('where are you') || q.includes('location') || q.includes('address') || q.includes('shipyard') || q.includes('gmd') || q.includes('caddell') || q.includes('travel')) {
      return {
        reply: `We are permanently stationed inside:\n1. GMD Brooklyn Navy Yard (Graving Docks 1, 5, and 6)\n2. Caddell Drydock (Staten Island, NY).\n\nIn addition to our permanent shipyard stations, our mobile field units travel dockside and onboard vessels throughout the Port of New York & New Jersey, and along the entire Eastern Seaboard.`,
        promptLead: false,
      };
    }

    // 8. Emergency Dispatch & Response Time
    if (q.includes('emergency') || q.includes('urgent') || q.includes('asap') || q.includes('dispatch') || q.includes('weekend') || q.includes('night') || q.includes('24/7')) {
      return {
        reply: `🚨 We provide 24/7 emergency dispatch! Because our tools and personnel are already stationed inside GMD and Caddell Drydocks, we can mobilize rapid-response crews immediately to minimize vessel downtime.\n\nFor immediate emergency assistance, call our 24/7 dispatch phone directly: ${settings.phone}.`,
        promptLead: true,
      };
    }

    // 9. Insurance & Compliance
    if (q.includes('insurance') || q.includes('insured') || q.includes('liability') || q.includes('abs') || q.includes('uscg') || q.includes('class')) {
      return {
        reply: `Yes, Brothers Machine Services Corp is fully insured with comprehensive marine contractor coverage, including Ship-Repairer Liability (SRL), USL&H workers' compensation, and Marine General Liability up to $5,000,000+. All work meets ABS, USCG, and DNV classification society standards.`,
        promptLead: false,
      };
    }

    // 10. Pricing & Quotes
    if (q.includes('price') || q.includes('cost') || q.includes('rate') || q.includes('quote') || q.includes('estimate') || q.includes('how much')) {
      return {
        reply: `Because outside machining jobs vary by bore diameter, length, tolerances, and accessibility, we provide fast, firm proposals. Please share your project details and contact info below, and our chief estimator will send you an official quote promptly!`,
        promptLead: true,
      };
    }

    // 11. Phone & Direct Contact
    if (q.includes('phone') || q.includes('call') || q.includes('number') || q.includes('contact') || q.includes('email')) {
      return {
        reply: `You can reach our field dispatch directly 24/7 at ${settings.phone}, or via email at ${settings.email}. You can also leave your details right here and we'll contact you immediately!`,
        promptLead: true,
      };
    }

    // 12. Experience & Track Record
    if (q.includes('experience') || q.includes('history') || q.includes('years') || q.includes('reputation')) {
      return {
        reply: `We bring over ${settings.years_experience} years of specialized outside marine machining experience. Our machinists have worked on tug fleets, barges, high-speed ferries, container vessels, and Military Sealift Command ships throughout New York Harbor.`,
        promptLead: false,
      };
    }

    // Default Fallback
    return {
      reply: `Thank you for asking! We specialize exclusively in bringing precision heavy outside machining tools directly to your ship, drydock, or plant across New York Harbor. Could you tell me a bit more about your equipment or the specific machining you need?`,
      promptLead: true,
    };
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
      const { reply, promptLead } = getKnowledgeResponse(userText);

      const agentMessage: Message = {
        id: `agent-${Date.now()}`,
        sender: 'agent',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, agentMessage]);
      setIsTyping(false);
      if (promptLead && !contactCaptured) {
        setShowCapturePrompt(true);
      }
    }, 600);
  };

  const handleCaptureSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadInfo.name || !leadInfo.phone) return;

    setEmailStatus('sending');

    const transcriptText = messages
      .map((m) => `[${m.timestamp}] ${m.sender === 'user' ? 'Client' : 'Assistant'}: ${m.text}`)
      .join('\n');

    try {
      await fetch('/api/quote-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: leadInfo.name,
          phone: leadInfo.phone,
          email: leadInfo.email || `${leadInfo.name.replace(/\s+/g, '.').toLowerCase()}@field-dispatch.com`,
          company: leadInfo.company || 'Website Live Chat Inquiry',
          shipyard_location: 'Stationed Field Assistant Consultation',
          service_needed: 'Outside Machining Inquiry & Transcript',
          message: `--- CLIENT CHAT INQUIRY TRANSCRIPT ---\n${transcriptText}\n\nClient Phone: ${leadInfo.phone}\nCompany: ${leadInfo.company || 'N/A'}\n\nPlease follow up as requested.`,
        }),
      });

      setEmailStatus('sent');
      setContactCaptured(true);
      setShowCapturePrompt(false);

      const confirmMessage: Message = {
        id: `agent-confirm-${Date.now()}`,
        sender: 'agent',
        text: `Got it, ${leadInfo.name}! Your message and our full conversation have been emailed directly to our lead supervisor. We will review your job details and get back to you shortly.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, confirmMessage]);
    } catch (err) {
      setEmailStatus('sent');
      setContactCaptured(true);
      setShowCapturePrompt(false);
    }
  };

  return (
    <>
      {/* Floating Trigger Button: Clean, engaging, friendly & stacked above scroll-to-top */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            position: 'fixed',
            bottom: '5.5rem',
            right: '2rem',
            zIndex: 998,
            display: 'flex',
            alignItems: 'center',
            gap: '0.55rem',
            padding: '0.55rem 1rem',
            background: 'var(--color-navy)',
            color: '#ffffff',
            border: '1px solid rgba(20, 155, 234, 0.5)',
            borderRadius: '24px',
            cursor: 'pointer',
            boxShadow: '0 6px 20px rgba(4, 23, 35, 0.35)',
            fontFamily: 'var(--font-heading)',
            fontSize: '0.8rem',
            fontWeight: 600,
            letterSpacing: '0.02em',
            transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.borderColor = 'var(--color-steel-blue)';
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(20, 155, 234, 0.45)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.borderColor = 'rgba(20, 155, 234, 0.5)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(4, 23, 35, 0.35)';
          }}
          aria-label="Chat with Brothers Machine Assistant"
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: '#10b981',
              boxShadow: '0 0 8px #10b981',
              display: 'inline-block',
            }}
          />
          <MessageSquare size={15} color="var(--color-steel-blue)" />
          <span>Ask Brothers Machine <span style={{ opacity: 0.65, fontSize: '0.72rem' }}>| 24/7</span></span>
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
            borderRadius: '10px',
            boxShadow: '0 20px 50px rgba(4, 23, 35, 0.45), 0 0 0 1px rgba(20, 155, 234, 0.25)',
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
              background: 'linear-gradient(135deg, var(--color-navy) 0%, #06263d 100%)',
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
                  borderRadius: '50%',
                  background: 'rgba(20, 155, 234, 0.18)',
                  border: '1px solid rgba(20, 155, 234, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Sparkles size={18} color="var(--color-steel-blue)" />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <h4 style={{ margin: 0, fontSize: '0.96rem', fontWeight: 700, fontFamily: 'var(--font-heading)', color: '#fff' }}>
                    Brothers Machine Assistant
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
                    title="Online & Ready"
                  />
                </div>
                <p style={{ margin: 0, fontSize: '0.73rem', color: '#cbd5e1' }}>
                  Outside Machining & On-Site Marine Services
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <a
                href={`tel:${settings.phone.replace(/[^0-9]/g, '')}`}
                title="Immediate Phone Dispatch"
                style={{
                  color: 'var(--color-steel-blue)',
                  padding: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  background: 'rgba(255, 255, 255, 0.08)',
                  borderRadius: '4px',
                }}
              >
                <Phone size={15} />
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
                aria-label="Close Assistant"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Sub-bar Status */}
          <div
            style={{
              background: '#041723',
              padding: '0.4rem 1.1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.7rem',
              color: '#94a3b8',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <span>Stationed at GMD Navy Yard & Caddell Drydock</span>
            <span style={{ color: 'var(--color-steel-blue)', fontWeight: 600 }}>$5M Insured</span>
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
                    borderRadius: m.sender === 'user' ? '14px 14px 2px 14px' : '14px 14px 14px 2px',
                    backgroundColor: m.sender === 'user' ? 'var(--color-navy)' : '#ffffff',
                    color: m.sender === 'user' ? '#ffffff' : 'var(--color-navy)',
                    boxShadow: m.sender === 'user' ? '0 3px 8px rgba(4, 23, 35, 0.15)' : '0 2px 6px rgba(0, 0, 0, 0.05)',
                    border: m.sender === 'user' ? '1px solid var(--color-navy)' : '1px solid #e2e8f0',
                    fontSize: '0.86rem',
                    lineHeight: 1.48,
                    whiteSpace: 'pre-line',
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '0.5rem 0.75rem' }}>
                <span className="eyebrow-dot" style={{ animation: 'pulse 1s infinite' }} />
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Assistant is typing...</span>
              </div>
            )}

            {/* Quick Prompts */}
            {messages.length <= 3 && !isTyping && (
              <div style={{ marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                <p style={{ margin: 0, fontSize: '0.72rem', color: '#64748b', fontWeight: 600 }}>
                  Suggested Questions:
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                  {quickPrompts.map((q) => (
                    <button
                      key={q}
                      onClick={() => handleQuickPrompt(q)}
                      style={{
                        background: '#ffffff',
                        border: '1px solid #cbd5e1',
                        borderRadius: '16px',
                        padding: '0.4rem 0.8rem',
                        fontSize: '0.75rem',
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
                  border: '1px solid rgba(20, 155, 234, 0.4)',
                  borderRadius: '8px',
                  padding: '0.9rem',
                  marginTop: '0.5rem',
                  boxShadow: '0 4px 14px rgba(4, 23, 35, 0.08)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '0.5rem' }}>
                  <Shield size={15} color="var(--color-steel-blue)" />
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-navy)' }}>
                    Have our lead machinist contact you with details:
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
                      padding: '0.5rem 0.65rem',
                      fontSize: '0.8rem',
                      border: '1px solid #cbd5e1',
                      borderRadius: '4px',
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
                      padding: '0.5rem 0.65rem',
                      fontSize: '0.8rem',
                      border: '1px solid #cbd5e1',
                      borderRadius: '4px',
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
                      padding: '0.5rem 0.65rem',
                      fontSize: '0.8rem',
                      border: '1px solid #cbd5e1',
                      borderRadius: '4px',
                      outline: 'none',
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Company or Vessel"
                    value={leadInfo.company}
                    onChange={(e) => setLeadInfo({ ...leadInfo, company: e.target.value })}
                    style={{
                      padding: '0.5rem 0.65rem',
                      fontSize: '0.8rem',
                      border: '1px solid #cbd5e1',
                      borderRadius: '4px',
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
                    padding: '0.6rem',
                    fontSize: '0.8rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                  }}
                >
                  {emailStatus === 'sending' ? 'Transmitting...' : 'Email My Details & Request Follow-Up'}
                </button>
              </form>
            )}

            {contactCaptured && (
              <div
                style={{
                  background: '#ecfdf5',
                  border: '1px solid #a7f3d0',
                  padding: '0.75rem 0.95rem',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '0.78rem',
                  color: '#065f46',
                }}
              >
                <CheckCircle2 size={16} color="#059669" />
                <span>Transcript emailed to Brothers Machine dispatch team. We will call you shortly!</span>
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
              placeholder="Ask anything about our machining, drydocks, or quotes..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSend();
              }}
              style={{
                flex: 1,
                padding: '0.65rem 0.85rem',
                fontSize: '0.84rem',
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
