# Brothers Machine Services Corp — Full-Stack Platform

Enterprise-grade marketing website & headless CMS for **Brothers Machine Services Corp**, outside marine & on-site heavy industrial machining specialists stationed at **GMD Navy Shipyard** and **Caddell Drydock**.

## Monorepo Architecture

```
/
├── frontend/          # React (Vite) Single Page Application + Shop Office Admin
├── worker/            # Cloudflare Worker REST API (WebCrypto, Session Tokens)
├── migrations/        # Cloudflare D1 SQL schema and seeds (0001_init.sql)
├── wrangler.toml      # Cloudflare D1, R2, Worker & Pages bindings
├── DEPLOY.md          # Complete GitHub → Cloudflare production deployment pipeline
└── README.md          # Project overview & local setup
```

## Technology Stack

- **Frontend**: React 19, TypeScript, React Router 7, Vite 8, Lucide React
- **Design System**: Industrial Navy (`#041723`), Steel Blue (`#149BEA`), Safety Orange (`#EC5138`), Off-White (`#F7F9FB`), Oswald / Inter typography
- **Backend**: Cloudflare Worker, D1 SQLite Database, R2 Object Storage
- **Admin Backend ("Shop Office")**: Full-control visual inspector, instant publishing, autosave status pills, zero-loss persistence contract

## Getting Started Locally

```bash
# Install dependencies
cd frontend && npm install && cd ..

# Run Vite dev server
cd frontend && npm run dev
```

See [DEPLOY.md](DEPLOY.md) for full Cloudflare deployment steps.
