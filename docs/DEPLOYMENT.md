# Deployment Guide

## Production Environment Requirements
- **Runtime:** Node.js 20 LTS or later
- **Storage:** Writable filesystem directory for `.data/academic_portal.sqlite` (or cloud-managed DB adapter when migrating to remote Supabase/PostgreSQL)
- **Port:** Configurable via `$PORT` environment variable (defaults to 3000)

## Build & Run

### 1. Standalone Next.js Node.js Deployment
```bash
# Clean install
npm ci --production=false

# Build application bundle
npm run build

# Start production server
npm start
```

### 2. Standalone Output Mode
The project build creates optimized standalone server bundles in `.next/standalone/`.
```bash
cd .next/standalone
node server.js
```

### 3. Environment Variables
Refer to `.env.example`:
- `PORT`: Server port (e.g., 3000)
- `NEXT_PUBLIC_APP_URL`: Public host domain URL
- `SQLITE_DB_PATH`: Optional custom path to SQLite database (defaults to `.data/academic_portal.sqlite`)
