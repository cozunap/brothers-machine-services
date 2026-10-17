-- 0001_init.sql
-- Brothers Machine Services Corp D1 Database Schema & Seed Data

CREATE TABLE IF NOT EXISTS pages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  meta_title TEXT NOT NULL,
  meta_description TEXT NOT NULL,
  status TEXT DEFAULT 'published'
);

CREATE TABLE IF NOT EXISTS sections (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  page_id INTEGER NOT NULL,
  sort_order INTEGER DEFAULT 0,
  type TEXT NOT NULL,
  data TEXT NOT NULL, -- JSON string
  visible INTEGER DEFAULT 1,
  FOREIGN KEY (page_id) REFERENCES pages(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS services (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  short_description TEXT NOT NULL,
  long_description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  visible INTEGER DEFAULT 1
);

CREATE TABLE IF NOT EXISTS gallery_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  caption TEXT NOT NULL,
  image_url TEXT NOT NULL,
  category TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  visible INTEGER DEFAULT 1
);

CREATE TABLE IF NOT EXISTS testimonials (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  quote TEXT NOT NULL,
  author TEXT NOT NULL,
  company TEXT NOT NULL,
  visible INTEGER DEFAULT 1
);

CREATE TABLE IF NOT EXISTS quote_requests (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  company TEXT,
  shipyard_location TEXT,
  service_needed TEXT,
  message TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now')),
  status TEXT DEFAULT 'new' -- 'new', 'contacted', 'quoted', 'closed'
);

CREATE TABLE IF NOT EXISTS site_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS admins (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now'))
);

-- =========================================================================
-- SEED DATA
-- =========================================================================

-- Site Settings
INSERT OR REPLACE INTO site_settings (key, value) VALUES
('years_experience', '25'),
('phone', '(718) 555-0199'),
('email', 'info@brothersmachineservices.com'),
('tagline', 'Precision outside machining — at your shipyard, on your schedule.'),
('insurance_line', 'Fully insured — including marine insurance.'),
('work_style', 'Hands-on. We bring the machines to the work.'),
('shipyard_1', 'GMD Navy Shipyard'),
('shipyard_2', 'Caddell Drydock'),
('footer_note', 'Delivering outside machining with zero-tolerance precision across the Port of New York & New Jersey.');

-- Default Pages
INSERT OR IGNORE INTO pages (id, slug, title, meta_title, meta_description) VALUES
(1, 'home', 'Home', 'Outside Machining & On-Site Machine Services – Brothers Machine Services', 'Precision line boring, flange facing, milling, and drilling — performed on-site at your drydock or facility, on your schedule. Stationed at GMD Navy Yard and Caddell Drydock.'),
(2, 'about', 'About Us', 'About Us – Brothers Machine Services', 'Hands-on marine machinists. Decades of outside machining heritage, fully insured including marine insurance, stationed at GMD Navy Yard and Caddell Drydock.'),
(3, 'services', 'Services', 'Outside Machining Services – Brothers Machine Services', 'Precision in-situ line boring, flange facing, portable milling, drilling & tapping, shaft & rudder repair, and emergency marine service.'),
(4, 'shipyards', 'Where We Work', 'Shipyards & Docks – Brothers Machine Services', 'Stationed inside GMD Navy Shipyard (Brooklyn Navy Yard) and Caddell Drydock (Staten Island). Credentialed TWIC dockside and onboard access.'),
(5, 'gallery', 'Work Gallery', 'Project Gallery – Brothers Machine Services', 'Field photography of portable outside machining: stern tubes, rudders, shaft couplings, and heavy drydock machinery.'),
(6, 'contact', 'Contact & RFQ', 'Request a Quote – Brothers Machine Services', 'Request mobilization or quote for outside machining, line boring, flange facing, or emergency drydock dispatch.');

-- Default Services (6 Standard Outside Machining Disciplines)
INSERT OR IGNORE INTO services (id, slug, name, short_description, long_description, image_url, sort_order, visible) VALUES
(1, 'line-boring', 'Line Boring', 'In-place precision boring of stern tubes, rudder trunks, and engine blocks without dismantling.', 'Our heavy portable boring bars restore factory diameters, concentricity, and fit tolerances directly inside the drydock slipway or vessel hull. Accommodates stern tubes up to 40+ feet with continuous optical centerline verification.', '/assets/Brothers-Machine-Services-Corp-Photo-1.webp', 1, 1),
(2, 'flange-facing', 'Flange Facing', 'In-situ facing and re-machining of high-pressure marine flanges, valves, and pump bases.', 'Eliminate dangerous steam, fuel, and seawater leaks. We mount ID- and OD-mount portable flange facers directly onto vessels, cutting phonographic spiral grooves (ASME/ANSI standard) or smooth gasket faces up to 120+ inches.', '/assets/Brothers-Machine-Services-Corp-Photo-18.webp', 2, 1),
(3, 'portable-milling', 'Portable Milling', 'Rail-mounted precision linear and circular bed milling on vessel decks and foundations.', 'In-place linear and circular bed milling for main engine foundations, thruster wells, winch bedplates, and crane slewing rings, eliminating heavy cutting and torch work.', '/assets/Brothers-Machine-Services-Corp-Photo-10.webp', 3, 1),
(4, 'drilling-tapping', 'Drilling & Tapping', 'Precision heavy hole drilling, reaming, stud removal, and tapping on assembled assemblies.', 'High-torque magnetic and pneumatic drills mounted directly on hull plates, engine blocks, and deck machinery for broken stud extraction, line reaming, and thread restoration in confined spaces.', '/assets/Brothers-Machine-Services-Corp-Photo-16.webp', 4, 1),
(5, 'shaft-rudder-repair', 'Shaft & Rudder Repair', 'Orbital journal turning, rudder pintle boring, and coupling fitment in drydock.', 'Comprehensive propulsion shafting and steering gear repair. In-place orbital turning of scored journals, keyway cutting, rudder carrier machining, and hydraulic bolt tensioning.', '/assets/Brothers-Machine-Services-Corp-Photo-3.webp', 5, 1),
(6, 'emergency-field-service', 'Emergency Field Service', 'Rapid mobilization for unscheduled breakdowns during critical docking availabilities.', '24/7 rapid response across the Port of New York & New Jersey. Fully equipped mobile machining trailers with generators, tooling bars, and seasoned crews deployable within hours.', '/assets/Brothers-Machine-Services-Corp-Photo-17.webp', 6, 1);

-- Default Gallery Items
INSERT OR IGNORE INTO gallery_items (id, title, caption, image_url, category, sort_order, visible) VALUES
(1, 'Stern Tube Sleeve & Bore', 'Finish-machined stern tube sleeve showing internal bearing bore geometry and keyway detail.', '/assets/Brothers-Machine-Services-Corp-Photo-1.webp', 'Line Boring', 1, 1),
(2, 'Prussian Blue Contact Check', 'Precision bearing sleeve contact pattern inspection with 90%+ dyestuff verification.', '/assets/Brothers-Machine-Services-Corp-Photo-2.webp', 'Line Boring', 2, 1),
(3, 'Engine Room Shaft Coupling', 'Precision dialed coupling alignment between reduction gear and propulsion shaft in shaft alley.', '/assets/Brothers-Machine-Services-Corp-Photo-3.webp', 'Milling', 3, 1),
(4, 'Caddell Deck Winch Overhaul', 'Heavy marine winch disassembly and on-deck bearing boring at Caddell Drydock.', '/assets/Brothers-Machine-Services-Corp-Photo-5.webp', 'Drydock', 4, 1),
(5, 'Shaft Alley Rigging Team', 'Brothers Machine team coordinating propulsion shafting and bearing alignment under dock deadlines.', '/assets/Brothers-Machine-Services-Corp-Photo-10.webp', 'Drydock', 5, 1),
(6, 'Heavy Propeller Lift', 'Heavy 4-blade propeller rigging and bore taper preparation at shipyard slipway.', '/assets/Brothers-Machine-Services-Corp-Photo-14.webp', 'Drydock', 6, 1),
(7, 'Hydraulic Flange Bolt Tensioning', 'Multi-cylinder calibrated hydraulic tensioning for uniform clamp load on main shaft flange.', '/assets/Brothers-Machine-Services-Corp-Photo-16.webp', 'Flange Facing', 7, 1),
(8, 'GMD Shipyard Stern Overhaul', 'Commercial vessel in Drydock 1 at GMD Shipyard undergoing stern tube line boring.', '/assets/Brothers-Machine-Services-Corp-Photo-17.webp', 'Drydock', 8, 1),
(9, 'Safety-Wired Marine Fasteners', 'High-spec marine safety wiring securing fasteners against heavy hull vibration.', '/assets/Brothers-Machine-Services-Corp-Photo-18.webp', 'Shop', 9, 1),
(10, 'Composite Stern Tube Bearing', 'Water-lubricated Thordon composite bearing installed and line-checked in ship stern frame.', '/assets/Brothers-Machine-Services-Corp-Photo-21.webp', 'Line Boring', 10, 1);

-- Default Testimonials (Sample entries)
INSERT OR IGNORE INTO testimonials (id, quote, author, company, visible) VALUES
(1, 'Brothers Machine mobilized their boring bar to Drydock 1 within hours. Their crew bored our stern tube to within .0005" and had us out of dock three days ahead of schedule.', 'Chief Port Engineer', 'Northeast Articulated Tug Fleet [SAMPLE]', 1),
(2, 'Finding an outside machining company that actually shows up with master machinists who do the work themselves is rare. Brothers Machine is our first call for in-place flange facing and rudder work.', 'General Superintendent', 'Commercial Ship Repair Yard [SAMPLE]', 1);

-- Seed History Section for About Page
INSERT OR IGNORE INTO sections (id, page_id, sort_order, type, data, visible) VALUES
(1, 2, 1, 'history_timeline', '{
  "badge": "Company Heritage",
  "title": "Born in the Shipyard, Proven on the Water",
  "rich_text": "[DRAFT — replace with client history]\n\nBrothers Machine Services was founded on a simple, uncompromising idea: the most critical machining jobs don''t happen in a comfortable shop — they happen on the vessel, inside the drydock, against the clock.\n\nRather than forcing shipyards and vessel superintendents to torch-cut decks and crane 20-ton propulsion shafts away for offsite repair, our founders built the company with their hands on the dials, indicators, and heavy portable boring bars.\n\nToday, operating full-time inside GMD Navy Shipyard (Brooklyn Navy Yard) and Caddell Drydock (Staten Island), Brothers Machine Services delivers master outside machining backed by complete marine insurance coverage and zero subcontractor risk.",
  "timeline": [
    {"year": "Founding", "event": "Master marine machinists establish dedicated mobile line boring service for NY/NJ harbor tugs and workboats."},
    {"year": "Integration", "event": "Stationed full-time inside Caddell Drydock and GMD Navy Shipyard, supporting graving docks and floating docks."},
    {"year": "Expansion", "event": "Acquisition of optical laser collimators, long-span 40ft boring bars, and hydraulic tensioning tooling."},
    {"year": "Present", "event": "Harbor-wide leader in outside marine machining, serving naval architects, commercial fleets, and shipyards."}
  ]
}', 1);
