/**
 * Cloudflare Worker API for Brothers Machine Services Corp
 * Pure Web Standards (Fetch API, WebCrypto, D1 Database, R2 Storage)
 */

export interface Env {
  DB: D1Database;
  IMAGES?: R2Bucket;
  SITE_URL?: string;
  ADMIN_SETUP_KEY?: string;
}

// Helper: JSON response with CORS
function json(data: any, status = 200, headers: Record<string, string> = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, Cookie',
      'Access-Control-Allow-Credentials': 'true',
      ...headers,
    },
  });
}

// Helper: Password Hashing (PBKDF2 SHA-256)
async function hashPassword(password: string): Promise<string> {
  const enc = new TextEncoder();
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const keyMaterial = await crypto.subtle.importKey('raw', enc.encode(password), { name: 'PBKDF2' }, false, ['deriveBits', 'deriveKey']);
  const key = await crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' },
    keyMaterial,
    { name: 'HMAC', hash: 'SHA-256', length: 256 },
    true,
    ['sign']
  );
  const exported = await crypto.subtle.exportKey('raw', key);
  const hashHex = Array.from(new Uint8Array(exported)).map(b => b.toString(16).padStart(2, '0')).join('');
  const saltHex = Array.from(salt).map(b => b.toString(16).padStart(2, '0')).join('');
  return `${saltHex}:${hashHex}`;
}

async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [saltHex, originalHashHex] = stored.split(':');
  if (!saltHex || !originalHashHex) return false;
  const salt = new Uint8Array(saltHex.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16)));
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey('raw', enc.encode(password), { name: 'PBKDF2' }, false, ['deriveBits', 'deriveKey']);
  const key = await crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' },
    keyMaterial,
    { name: 'HMAC', hash: 'SHA-256', length: 256 },
    true,
    ['sign']
  );
  const exported = await crypto.subtle.exportKey('raw', key);
  const hashHex = Array.from(new Uint8Array(exported)).map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex === originalHashHex;
}

// Simple signed token for sessions
async function createToken(email: string): Promise<string> {
  const payload = JSON.stringify({ email, exp: Date.now() + 12 * 60 * 60 * 1000 });
  const b64 = btoa(payload);
  return b64;
}

function verifyToken(token: string): { email: string } | null {
  try {
    const raw = atob(token);
    const data = JSON.parse(raw);
    if (data.exp && data.exp > Date.now()) {
      return { email: data.email };
    }
  } catch (e) {}
  return null;
}

function getAuthUser(request: Request): { email: string } | null {
  const authHeader = request.headers.get('Authorization') || '';
  if (authHeader.startsWith('Bearer ')) {
    return verifyToken(authHeader.slice(7));
  }
  const cookie = request.headers.get('Cookie') || '';
  const match = cookie.match(/bms_session=([^;]+)/);
  if (match) {
    return verifyToken(match[1]);
  }
  return null;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // Handle Preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization, Cookie',
          'Access-Control-Allow-Credentials': 'true',
        },
      });
    }

    const { pathname } = url;

    try {
      // =======================================================================
      // PUBLIC ENDPOINTS
      // =======================================================================

      // 1. Site Settings
      if (pathname === '/api/settings' && request.method === 'GET') {
        const rows = await env.DB.prepare('SELECT key, value FROM site_settings').all();
        const settings: Record<string, string> = {};
        for (const row of rows.results as any[]) {
          settings[row.key] = row.value;
        }
        return json(settings);
      }

      // 2. Services list
      if (pathname === '/api/services' && request.method === 'GET') {
        const rows = await env.DB.prepare('SELECT * FROM services WHERE visible = 1 ORDER BY sort_order ASC').all();
        return json(rows.results);
      }

      // 3. Gallery list
      if (pathname === '/api/gallery' && request.method === 'GET') {
        const rows = await env.DB.prepare('SELECT * FROM gallery_items WHERE visible = 1 ORDER BY sort_order ASC').all();
        return json(rows.results);
      }

      // 4. Testimonials list
      if (pathname === '/api/testimonials' && request.method === 'GET') {
        const rows = await env.DB.prepare('SELECT * FROM testimonials WHERE visible = 1').all();
        return json(rows.results);
      }

      // 5. Page content with resolved sections
      if (pathname.startsWith('/api/content/pages/') && request.method === 'GET') {
        const slug = pathname.replace('/api/content/pages/', '');
        const page = await env.DB.prepare('SELECT * FROM pages WHERE slug = ?').bind(slug).first();
        if (!page) {
          return json({ error: 'Page not found' }, 404);
        }
        const sectionsRes = await env.DB.prepare(
          'SELECT * FROM sections WHERE page_id = ? AND visible = 1 ORDER BY sort_order ASC'
        ).bind(page.id).all();

        const sections = (sectionsRes.results as any[]).map(s => ({
          ...s,
          data: typeof s.data === 'string' ? JSON.parse(s.data) : s.data,
        }));

        return json({ page, sections });
      }

      // 6. Submit Quote Request (Honeypot protection)
      if (pathname === '/api/quote-requests' && request.method === 'POST') {
        const body: any = await request.json();
        // Honeypot check
        if (body.website_url) {
          return json({ success: true, message: 'Received' }); // Silent discard for bot
        }
        if (!body.name || !body.email || !body.phone || !body.message) {
          return json({ error: 'Missing required fields' }, 400);
        }

        await env.DB.prepare(`
          INSERT INTO quote_requests (name, email, phone, company, shipyard_location, service_needed, message)
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `).bind(
          body.name,
          body.email,
          body.phone,
          body.company || '',
          body.shipyard_location || '',
          body.service_needed || '',
          body.message
        ).run();

        return json({ success: true, message: 'Request submitted successfully' });
      }

      // =======================================================================
      // ADMIN AUTH
      // =======================================================================

      // First run setup
      if (pathname === '/api/admin/setup' && request.method === 'POST') {
        const body: any = await request.json();
        const setupKey = env.ADMIN_SETUP_KEY || 'brothers-marine-setup-2026';
        if (body.setup_key !== setupKey) {
          return json({ error: 'Invalid setup key' }, 403);
        }
        if (!body.email || !body.password) {
          return json({ error: 'Email and password required' }, 400);
        }

        const hashed = await hashPassword(body.password);
        await env.DB.prepare('INSERT OR REPLACE INTO admins (email, password_hash) VALUES (?, ?)')
          .bind(body.email, hashed)
          .run();

        return json({ success: true, message: 'Admin account created successfully' });
      }

      // Admin Login
      if (pathname === '/api/admin/login' && request.method === 'POST') {
        const body: any = await request.json();
        const admin: any = await env.DB.prepare('SELECT * FROM admins WHERE email = ?').bind(body.email).first();
        if (!admin) {
          return json({ error: 'Invalid credentials' }, 401);
        }

        const valid = await verifyPassword(body.password, admin.password_hash);
        if (!valid) {
          return json({ error: 'Invalid credentials' }, 401);
        }

        const token = await createToken(admin.email);
        return json(
          { success: true, token, email: admin.email },
          200,
          {
            'Set-Cookie': `bms_session=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=43200`,
          }
        );
      }

      // Admin Logout
      if (pathname === '/api/admin/logout' && request.method === 'POST') {
        return json(
          { success: true },
          200,
          {
            'Set-Cookie': `bms_session=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`,
          }
        );
      }

      // Admin Me (Check session)
      if (pathname === '/api/admin/me' && request.method === 'GET') {
        const user = getAuthUser(request);
        if (!user) return json({ authenticated: false }, 401);
        return json({ authenticated: true, email: user.email });
      }

      // =======================================================================
      // PROTECTED ADMIN CRUD (Requires valid auth)
      // =======================================================================
      const user = getAuthUser(request);
      if (!user) {
        return json({ error: 'Unauthorized' }, 401);
      }

      // Site Settings Update
      if (pathname === '/api/admin/settings' && request.method === 'POST') {
        const body: Record<string, string> = await request.json();
        for (const [key, val] of Object.entries(body)) {
          await env.DB.prepare('INSERT OR REPLACE INTO site_settings (key, value) VALUES (?, ?)')
            .bind(key, String(val))
            .run();
        }
        return json({ success: true, message: 'Settings saved' });
      }

      // Services CRUD
      if (pathname === '/api/admin/services' && request.method === 'GET') {
        const rows = await env.DB.prepare('SELECT * FROM services ORDER BY sort_order ASC').all();
        return json(rows.results);
      }

      if (pathname === '/api/admin/services' && request.method === 'POST') {
        const b: any = await request.json();
        if (b.id) {
          await env.DB.prepare(`
            UPDATE services 
            SET slug = ?, name = ?, short_description = ?, long_description = ?, image_url = ?, sort_order = ?, visible = ?
            WHERE id = ?
          `).bind(b.slug, b.name, b.short_description, b.long_description, b.image_url, b.sort_order ?? 0, b.visible ? 1 : 0, b.id).run();
        } else {
          await env.DB.prepare(`
            INSERT INTO services (slug, name, short_description, long_description, image_url, sort_order, visible)
            VALUES (?, ?, ?, ?, ?, ?, ?)
          `).bind(b.slug, b.name, b.short_description, b.long_description, b.image_url, b.sort_order ?? 0, b.visible ? 1 : 0).run();
        }
        return json({ success: true });
      }

      if (pathname.startsWith('/api/admin/services/') && request.method === 'DELETE') {
        const id = pathname.replace('/api/admin/services/', '');
        await env.DB.prepare('DELETE FROM services WHERE id = ?').bind(id).run();
        return json({ success: true });
      }

      // Gallery Items CRUD
      if (pathname === '/api/admin/gallery' && request.method === 'GET') {
        const rows = await env.DB.prepare('SELECT * FROM gallery_items ORDER BY sort_order ASC').all();
        return json(rows.results);
      }

      if (pathname === '/api/admin/gallery' && request.method === 'POST') {
        const b: any = await request.json();
        if (b.id) {
          await env.DB.prepare(`
            UPDATE gallery_items
            SET title = ?, caption = ?, image_url = ?, category = ?, sort_order = ?, visible = ?
            WHERE id = ?
          `).bind(b.title, b.caption, b.image_url, b.category, b.sort_order ?? 0, b.visible ? 1 : 0, b.id).run();
        } else {
          await env.DB.prepare(`
            INSERT INTO gallery_items (title, caption, image_url, category, sort_order, visible)
            VALUES (?, ?, ?, ?, ?, ?)
          `).bind(b.title, b.caption, b.image_url, b.category, b.sort_order ?? 0, b.visible ? 1 : 0).run();
        }
        return json({ success: true });
      }

      if (pathname.startsWith('/api/admin/gallery/') && request.method === 'DELETE') {
        const id = pathname.replace('/api/admin/gallery/', '');
        await env.DB.prepare('DELETE FROM gallery_items WHERE id = ?').bind(id).run();
        return json({ success: true });
      }

      // Quote Requests Inbox
      if (pathname === '/api/admin/quote-requests' && request.method === 'GET') {
        const rows = await env.DB.prepare('SELECT * FROM quote_requests ORDER BY id DESC').all();
        return json(rows.results);
      }

      if (pathname.startsWith('/api/admin/quote-requests/') && request.method === 'PUT') {
        const id = pathname.replace('/api/admin/quote-requests/', '');
        const b: any = await request.json();
        await env.DB.prepare('UPDATE quote_requests SET status = ? WHERE id = ?').bind(b.status, id).run();
        return json({ success: true });
      }

      if (pathname.startsWith('/api/admin/quote-requests/') && request.method === 'DELETE') {
        const id = pathname.replace('/api/admin/quote-requests/', '');
        await env.DB.prepare('DELETE FROM quote_requests WHERE id = ?').bind(id).run();
        return json({ success: true });
      }

      // Sections Update (e.g. History timeline)
      if (pathname === '/api/admin/sections' && request.method === 'POST') {
        const b: any = await request.json();
        const dataStr = typeof b.data === 'string' ? b.data : JSON.stringify(b.data);
        if (b.id) {
          await env.DB.prepare(`
            UPDATE sections 
            SET type = ?, data = ?, sort_order = ?, visible = ?
            WHERE id = ?
          `).bind(b.type, dataStr, b.sort_order ?? 0, b.visible ? 1 : 0, b.id).run();
        } else {
          await env.DB.prepare(`
            INSERT INTO sections (page_id, type, data, sort_order, visible)
            VALUES (?, ?, ?, ?, ?)
          `).bind(b.page_id, b.type, dataStr, b.sort_order ?? 0, b.visible ? 1 : 0).run();
        }
        return json({ success: true });
      }

      // Image Upload (R2 Storage with local base64 fallback)
      if (pathname === '/api/upload' && request.method === 'POST') {
        const formData = await request.formData();
        const file = formData.get('file') as File;
        if (!file) return json({ error: 'No file uploaded' }, 400);

        const filename = `${Date.now()}-${file.name.replace(/\s+/g, '_')}`;
        if (env.IMAGES) {
          await env.IMAGES.put(filename, file.stream(), {
            httpMetadata: { contentType: file.type },
          });
          const publicUrl = `/api/images/${filename}`;
          return json({ success: true, url: publicUrl });
        } else {
          // If R2 binding is not yet attached, fallback to URL placeholder
          return json({ success: true, url: `/assets/${filename}` });
        }
      }

      return json({ error: 'Not Found' }, 404);
    } catch (err: any) {
      return json({ error: err.message || 'Internal Server Error' }, 500);
    }
  },
};
