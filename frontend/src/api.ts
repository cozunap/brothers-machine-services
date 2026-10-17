import { SiteSettings, ServiceItem, GalleryItem, PageContent, QuoteRequest } from '../types';

const API_BASE = '/api';

export const fallbackSettings: SiteSettings = {
  years_experience: '25',
  phone: '(718) 555-0199',
  email: 'info@brothersmachineservices.com',
  tagline: 'Precision outside machining — at your shipyard, on your schedule.',
  insurance_line: 'Fully insured — including marine insurance.',
  work_style: 'Hands-on. We bring the machines to the work.',
  shipyard_1: 'GMD Navy Shipyard',
  shipyard_2: 'Caddell Drydock',
  footer_note: 'Delivering outside machining with zero-tolerance precision across the Port of New York & New Jersey.',
};

export const fallbackServices: ServiceItem[] = [
  {
    id: 1,
    slug: 'line-boring',
    name: 'Line Boring',
    short_description: 'In-place precision boring of stern tubes, rudder trunks, and engine blocks without dismantling.',
    long_description: 'Our heavy portable boring bars restore factory diameters, concentricity, and fit tolerances directly inside the drydock slipway or vessel hull. Accommodates stern tubes up to 40+ feet with continuous optical centerline verification.',
    image_url: '/assets/Brothers-Machine-Services-Corp-Photo-1.webp',
    sort_order: 1,
    visible: 1,
  },
  {
    id: 2,
    slug: 'flange-facing',
    name: 'Flange Facing',
    short_description: 'In-situ facing and re-machining of high-pressure marine flanges, valves, and pump bases.',
    long_description: 'Eliminate dangerous steam, fuel, and seawater leaks. We mount ID- and OD-mount portable flange facers directly onto vessels, cutting phonographic spiral grooves (ASME/ANSI standard) or smooth gasket faces up to 120+ inches.',
    image_url: '/assets/Brothers-Machine-Services-Corp-Photo-18.webp',
    sort_order: 2,
    visible: 1,
  },
  {
    id: 3,
    slug: 'portable-milling',
    name: 'Portable Milling',
    short_description: 'Rail-mounted precision linear and circular bed milling on vessel decks and foundations.',
    long_description: 'In-place linear and circular bed milling for main engine foundations, thruster wells, winch bedplates, and crane slewing rings, eliminating heavy cutting and torch work.',
    image_url: '/assets/Brothers-Machine-Services-Corp-Photo-10.webp',
    sort_order: 3,
    visible: 1,
  },
  {
    id: 4,
    slug: 'drilling-tapping',
    name: 'Drilling & Tapping',
    short_description: 'Precision heavy hole drilling, reaming, stud removal, and tapping on assembled assemblies.',
    long_description: 'High-torque magnetic and pneumatic drills mounted directly on hull plates, engine blocks, and deck machinery for broken stud extraction, line reaming, and thread restoration in confined spaces.',
    image_url: '/assets/Brothers-Machine-Services-Corp-Photo-16.webp',
    sort_order: 4,
    visible: 1,
  },
  {
    id: 5,
    slug: 'shaft-rudder-repair',
    name: 'Shaft & Rudder Repair',
    short_description: 'Orbital journal turning, rudder pintle boring, and coupling fitment in drydock.',
    long_description: 'Comprehensive propulsion shafting and steering gear repair. In-place orbital turning of scored journals, keyway cutting, rudder carrier machining, and hydraulic bolt tensioning.',
    image_url: '/assets/Brothers-Machine-Services-Corp-Photo-3.webp',
    sort_order: 5,
    visible: 1,
  },
  {
    id: 6,
    slug: 'emergency-field-service',
    name: 'Emergency Field Service',
    short_description: 'Rapid mobilization for unscheduled breakdowns during critical docking availabilities.',
    long_description: '24/7 rapid response across the Port of New York & New Jersey. Fully equipped mobile machining trailers with generators, tooling bars, and seasoned crews deployable within hours.',
    image_url: '/assets/Brothers-Machine-Services-Corp-Photo-17.webp',
    sort_order: 6,
    visible: 1,
  },
];

export const fallbackGallery: GalleryItem[] = [
  { id: 1, title: 'Stern Tube Sleeve & Bore', caption: 'Finish-machined stern tube sleeve showing internal bearing bore geometry and keyway detail.', image_url: '/assets/Brothers-Machine-Services-Corp-Photo-1.webp', category: 'Line Boring', sort_order: 1, visible: 1 },
  { id: 2, title: 'Prussian Blue Contact Check', caption: 'Precision bearing sleeve contact pattern inspection with 90%+ dyestuff verification.', image_url: '/assets/Brothers-Machine-Services-Corp-Photo-2.webp', category: 'Line Boring', sort_order: 2, visible: 1 },
  { id: 3, title: 'Engine Room Shaft Coupling', caption: 'Precision dialed coupling alignment between reduction gear and propulsion shaft in shaft alley.', image_url: '/assets/Brothers-Machine-Services-Corp-Photo-3.webp', category: 'Milling', sort_order: 3, visible: 1 },
  { id: 4, title: 'Caddell Deck Winch Overhaul', caption: 'Heavy marine winch disassembly and on-deck bearing boring at Caddell Drydock.', image_url: '/assets/Brothers-Machine-Services-Corp-Photo-5.webp', category: 'Drydock', sort_order: 4, visible: 1 },
  { id: 5, title: 'Shaft Alley Rigging Team', caption: 'Brothers Machine team coordinating propulsion shafting and bearing alignment under dock deadlines.', image_url: '/assets/Brothers-Machine-Services-Corp-Photo-10.webp', category: 'Drydock', sort_order: 5, visible: 1 },
  { id: 6, title: 'Heavy Propeller Lift', caption: 'Heavy 4-blade propeller rigging and bore taper preparation at shipyard slipway.', image_url: '/assets/Brothers-Machine-Services-Corp-Photo-14.webp', category: 'Drydock', sort_order: 6, visible: 1 },
];

export async function fetchSettings(): Promise<SiteSettings> {
  try {
    const res = await fetch(`${API_BASE}/settings`);
    if (res.ok) {
      const data = await res.json();
      return { ...fallbackSettings, ...data };
    }
  } catch (err) {}
  return fallbackSettings;
}

export async function fetchServices(): Promise<ServiceItem[]> {
  try {
    const res = await fetch(`${API_BASE}/services`);
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) return data;
    }
  } catch (err) {}
  return fallbackServices;
}

export async function fetchGallery(): Promise<GalleryItem[]> {
  try {
    const res = await fetch(`${API_BASE}/gallery`);
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) return data;
    }
  } catch (err) {}
  return fallbackGallery;
}

export async function fetchPageContent(slug: string): Promise<PageContent | null> {
  try {
    const res = await fetch(`${API_BASE}/content/pages/${slug}`);
    if (res.ok) return await res.json();
  } catch (err) {}
  return null;
}

export async function submitQuote(quote: QuoteRequest): Promise<{ success: boolean; message?: string }> {
  try {
    const res = await fetch(`${API_BASE}/quote-requests`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(quote),
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, message: err.message || 'Submission failed' };
  }
}
