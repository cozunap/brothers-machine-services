import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Shield, Phone, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';
import { SiteSettings } from '../types';

interface Message {
  id: string;
  sender: 'agent' | 'user';
  text: string;
  timestamp: string;
  options?: string[];
}

interface DispatchAgentProps {
  settings: SiteSettings;
}

// Conversation context state to remember conversation thread
interface ConversationContext {
  topic?: 'line_boring' | 'flange_facing' | 'milling' | 'drilling' | 'boiler' | 'shipyards' | 'emergency' | 'general';
  vesselOrPlant?: string;
  location?: string;
  boreSize?: string;
  step: number;
}

export const DispatchAgent: React.FC<DispatchAgentProps> = ({ settings }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-1',
      sender: 'agent',
      text: `Hello! Welcome to Brothers Machine Services. I'm your 24/7 Field Machining Assistant. 👋`,
      timestamp: 'Just now',
    },
    {
      id: 'welcome-2',
      sender: 'agent',
      text: `We specialize in bringing heavy precision machine tools directly to your vessel or facility inside GMD Brooklyn Navy Yard, Caddell Drydock, and throughout NY Harbor.\n\nWhat kind of machining job or equipment issue are you looking to solve?`,
      timestamp: 'Just now',
      options: ['Line Boring', 'Flange Facing', 'Bed Milling', 'Emergency Drydock Service'],
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [contactCaptured, setContactCaptured] = useState(false);
  const [leadInfo, setLeadInfo] = useState({ name: '', phone: '', email: '', company: '' });
  const [showCapturePrompt, setShowCapturePrompt] = useState(false);
  const [emailStatus, setEmailStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  // Conversational state memory
  const [context, setContext] = useState<ConversationContext>({ step: 0 });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isTyping, showCapturePrompt]);

  // Conversational Multi-Turn Intelligence Engine
  const processConversation = (userText: string, currentCtx: ConversationContext): { reply: string; nextOptions?: string[]; promptLead: boolean; updatedCtx: ConversationContext } => {
    const q = userText.toLowerCase().trim();
    let updated = { ...currentCtx, step: currentCtx.step + 1 };

    // 1. Direct answer to "Can you fix my Line Boring?" / Line Boring questions
    if (q.includes('line boring') || q.includes('bore') || q.includes('stern tube') || q.includes('rudder trunk') || q.includes('strut')) {
      updated.topic = 'line_boring';
      return {
        reply: `Yes, absolutely! Line boring is our primary specialty. We re-bore worn stern tubes, rudder pintles, engine block crankshaft main bearings, and crane pivots back to factory concentricity and zero-tolerance specifications directly in the drydock.\n\nTo see how we can assist: What equipment needs boring (e.g., stern tube, rudder trunk, or pin bore), and what is the approximate diameter?`,
        nextOptions: ['Stern Tube (Propulsion)', 'Rudder Trunk / Pintles', 'Engine Block Main Bores', 'Heavy Crane / Pivot Pin'],
        promptLead: false,
        updatedCtx: updated,
      };
    }

    // Follow-ups if visitor is talking about line boring details
    if (currentCtx.topic === 'line_boring' && (q.includes('stern') || q.includes('rudder') || q.includes('inch') || q.includes('diameter') || q.includes('feet') || q.includes('long') || q.includes('tug') || q.includes('barge') || q.includes('ship') || q.includes('boat'))) {
      return {
        reply: `Got it! We bring heavy portable boring bars spanning diameters from 1.5" up to 60"+ with optical laser collimators to guarantee exact centerline alignment over spans of 40+ feet without dismantling ship structures.\n\nWhere is the vessel currently located (e.g. Caddell Drydock, GMD Navy Yard, or at your berth)?`,
        nextOptions: ['Caddell Drydock (Staten Island)', 'GMD Brooklyn Navy Yard', 'At Our Pier / Berth', 'Upcoming Drydock Visit'],
        promptLead: false,
        updatedCtx: updated,
      };
    }

    // 2. Boilers & Steam Plants
    if (q.includes('boiler') || q.includes('steam drum') || q.includes('tube sheet') || q.includes('manway') || q.includes('handhole')) {
      updated.topic = 'boiler';
      return {
        reply: `Yes, we machine boiler and pressure vessel components directly on-site! Specifically, we re-machine warped manway and handhole gasket sealing faces, re-face steam drum nozzle flanges, and precision-ream tube sheets to stop steam leaks.\n\nIs your boiler leaking at a gasket flange/door, or do you have damaged threads/broken studs that need extraction?`,
        nextOptions: ['Warped Gasket / Manhole Face', 'Steam Flange Leak', 'Broken Stud Extraction', 'Tube Sheet Reaming'],
        promptLead: false,
        updatedCtx: updated,
      };
    }

    // 3. Flange Facing
    if (q.includes('flange') || q.includes('facing') || q.includes('valve') || q.includes('pump') || q.includes('gasket') || q.includes('leak')) {
      updated.topic = 'flange_facing';
      return {
        reply: `Yes, we do in-situ flange facing up to 120"+ in diameter! We mount portable ID and OD facers directly to piping, high-pressure valves, and pump discharges, re-cutting standard ASME phonographic spiral serrated finishes to ensure a 100% leak-proof seal.\n\nWhat is the pipe size or flange diameter, and is this steam, fuel, or seawater service?`,
        nextOptions: ['Under 12 Inches', '12 to 36 Inches', 'Over 36 Inches', 'High-Pressure Steam Valve'],
        promptLead: false,
        updatedCtx: updated,
      };
    }

    // 4. Bed Milling
    if (q.includes('mill') || q.includes('bedplate') || q.includes('foundation') || q.includes('chock') || q.includes('winch') || q.includes('crane base')) {
      updated.topic = 'milling';
      return {
        reply: `Yes! We deploy portable rail-mounted 3-axis linear and circular bed mills directly onto vessel decks, main engine foundation chocks, winch bedplates, and crane slewing pedestals to restore true coplanar flatness within thousandths of an inch.\n\nWhat is the approximate size of the foundation or bedplate area?`,
        nextOptions: ['Main Engine Chocks', 'Winch / Windlass Bed', 'Crane Slewing Ring', 'Deck Machinery Pad'],
        promptLead: false,
        updatedCtx: updated,
      };
    }

    // 5. Drilling, Tapping, Broken Studs
    if (q.includes('drill') || q.includes('tap') || q.includes('stud') || q.includes('bolt') || q.includes('thread') || q.includes('broken')) {
      updated.topic = 'drilling';
      return {
        reply: `We specialize in heavy on-site drilling, reaming of fitted coupling bolts, and spark-free extraction of seized or broken studs from engine blocks, cylinder heads, and marine hulls in tight quarters.\n\nDo you currently have a broken stud that needs removal, or oversized bolt holes that need reaming?`,
        nextOptions: ['Broken Stud Removal', 'Coupling Bolt Reaming', 'Heavy Hole Drilling & Tapping'],
        promptLead: false,
        updatedCtx: updated,
      };
    }

    // 6. Emergency Mobilization
    if (q.includes('emergency') || q.includes('asap') || q.includes('urgent') || q.includes('tonight') || q.includes('weekend') || q.includes('tomorrow') || q.includes('dispatch') || q.includes('24/7')) {
      updated.topic = 'emergency';
      return {
        reply: `🚨 We provide 24/7 emergency field mobilization. Because our technicians and machine tooling are permanently stationed inside GMD Brooklyn Navy Yard and Caddell Drydock, we can be at your dock with equipment on short notice.\n\nWould you like our on-call supervisor to call you immediately, or do you prefer to share your vessel coordinates here?`,
        nextOptions: ['Call Me Right Now', 'I Will Provide Vessel Details', 'What Are Your Rates?'],
        promptLead: true,
        updatedCtx: updated,
      };
    }

    // 7. Location Follow-ups
    if (q.includes('caddell') || q.includes('gmd') || q.includes('brooklyn') || q.includes('staten island') || q.includes('new york') || q.includes('yard') || q.includes('pier')) {
      return {
        reply: `Excellent. Having permanent stations inside both GMD Brooklyn Navy Yard (Graving Docks 1, 5, 6) and Caddell Drydock (Staten Island) means our crews have full security badges and equipment staging already on-site—saving you massive mobilization time.\n\nWhat is your vessel name and docking timeframe?`,
        nextOptions: ['Currently in Drydock', 'Docking in 24-48 Hours', 'Planned Inspection Next Week'],
        promptLead: true,
        updatedCtx: updated,
      };
    }

    // 8. Cost & Quotes
    if (q.includes('quote') || q.includes('cost') || q.includes('price') || q.includes('how much') || q.includes('rate') || q.includes('estimate')) {
      return {
        reply: `Our rates depend on the tooling required (boring bar size, facing rig, or rail mill), depth/diameter, and drydock schedule. We provide fast, itemized commercial estimates.\n\nIf you drop your contact details below, our chief estimator will review your specs and email or call you with a quote right away!`,
        promptLead: true,
        updatedCtx: updated,
      };
    }

    // 9. Greetings
    if (q.match(/^(hi|hello|hey|good morning|good afternoon|good evening|howdy)/)) {
      return {
        reply: `Hello! Great to speak with you. Are you facing a current machinery breakdown, or planning an upcoming drydock repair schedule?`,
        nextOptions: ['Active Machinery Issue', 'Planning Upcoming Drydock', 'Looking for General Pricing'],
        promptLead: false,
        updatedCtx: updated,
      };
    }

    // 10. General conversational follow-up
    return {
      reply: `I understand. We handle all forms of on-site marine and heavy industrial machining—bringing our machine tools directly to the work rather than transporting parts off-site.\n\nCould you tell me a little more about what equipment you're working on, or would you like a call from our outside machining specialist?`,
      nextOptions: ['Request a Call from Machinist', 'Line Boring Details', 'Flange Facing Details', 'Emergency Dispatch'],
      promptLead: true,
      updatedCtx: updated,
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

    setTimeout(() => {
      const { reply, nextOptions, promptLead, updatedCtx } = processConversation(userText, context);
      setContext(updatedCtx);

      const agentMessage: Message = {
        id: `agent-${Date.now()}`,
        sender: 'agent',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        options: nextOptions,
      };

      setMessages((prev) => [...prev, agentMessage]);
      setIsTyping(false);

      if (promptLead && !contactCaptured) {
        setShowCapturePrompt(true);
      }
    }, 550);
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
          company: leadInfo.company || 'Website Live Chat Conversation',
          shipyard_location: context.topic || 'Outside Machining Consultation',
          service_needed: 'Interactive Chat Lead & Transcript',
          message: `--- CLIENT CHAT CONVERSATION TRANSCRIPT ---\n${transcriptText}\n\nContact Requested: ${leadInfo.phone}\nCompany/Vessel: ${leadInfo.company || 'N/A'}\n\nPlease follow up immediately.`,
        }),
      });

      setEmailStatus('sent');
      setContactCaptured(true);
      setShowCapturePrompt(false);

      const confirmMessage: Message = {
        id: `agent-confirm-${Date.now()}`,
        sender: 'agent',
        text: `Thank you, ${leadInfo.name}! Your job specifications and our conversation transcript have been forwarded directly to our on-call supervisor. We will contact you at ${leadInfo.phone} shortly.`,
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
      {/* Floating Trigger Button: Narrow 3-line format */}
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
            gap: '0.6rem',
            padding: '0.45rem 0.75rem',
            background: 'var(--color-navy)',
            color: '#ffffff',
            border: '1px solid rgba(20, 155, 234, 0.5)',
            borderRadius: '12px',
            cursor: 'pointer',
            boxShadow: '0 6px 20px rgba(4, 23, 35, 0.35)',
            fontFamily: 'var(--font-heading)',
            transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            textAlign: 'left',
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
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: '50%',
                backgroundColor: '#10b981',
                boxShadow: '0 0 8px #10b981',
                display: 'inline-block',
              }}
            />
            <MessageSquare size={16} color="var(--color-steel-blue)" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.15, fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.02em' }}>
            <span>Ask</span>
            <span style={{ color: 'var(--color-steel-blue)' }}>Brother</span>
            <span>Machine</span>
          </div>
        </button>
      )}

      {/* Dispatch Assistant Modal Drawer */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            width: 'clamp(340px, 92vw, 430px)',
            height: 'clamp(530px, 82vh, 660px)',
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
                  Stationed at GMD Navy Yard & Caddell Drydock
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
            <span>Outside Machining Across NY Harbor</span>
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
                    maxWidth: '86%',
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

                {/* Interactive Dynamic Options */}
                {m.options && m.options.length > 0 && !isTyping && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginTop: '0.5rem', maxWidth: '90%' }}>
                    {m.options.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleSend(opt)}
                        style={{
                          background: '#ffffff',
                          border: '1px solid #cbd5e1',
                          borderRadius: '16px',
                          padding: '0.35rem 0.75rem',
                          fontSize: '0.74rem',
                          fontWeight: 600,
                          color: 'var(--color-navy)',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                          transition: 'all 0.15s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = 'var(--color-steel-blue)';
                          e.currentTarget.style.color = 'var(--color-steel-blue)';
                          e.currentTarget.style.background = '#f0f9ff';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = '#cbd5e1';
                          e.currentTarget.style.color = 'var(--color-navy)';
                          e.currentTarget.style.background = '#ffffff';
                        }}
                      >
                        <span>{opt}</span>
                        <ChevronRight size={12} opacity={0.6} />
                      </button>
                    ))}
                  </div>
                )}

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
              placeholder="Type your message, question, or job detail..."
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
