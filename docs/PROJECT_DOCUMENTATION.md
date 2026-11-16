# Academic Registration Planning Portal - Y23

## System Overview
The Academic Registration Planning Portal is a Next.js web application designed for Y23 Computer Science & Engineering students to plan academic subjects, verify bucket allocations, select faculty preferences, and export finalized registration schedules.

## Architectural Architecture
- **Framework:** Next.js (App Router, Turbopack)
- **Database:** Embedded SQLite (`.data/academic_portal.sqlite`) managed via `@libsql/client` / `node:sqlite`
- **Frontend Stack:** React, Tailwind CSS v4, Lucide React icons, html2canvas (schedule exports)
- **Authentication:** Student ID and Password authentication with custom password reset capabilities and role-based access for administration.

## Key Features
1. **Academic Overview:** Real-time visibility into assigned academic credits, CGPA, semester status, and enrolled specialization cohort.
2. **Cluster Selection:** Direct cohort cluster assignment (Cluster 1 vs Cluster 2) based on specialization requirements.
3. **Subject & Bucket Selection:** Prescribed and elective course selection with rigorous validation against university curriculum rules.
4. **Faculty Preferences:** Prioritized faculty selection for lecture, practical, and skill course components.
5. **My Preferences:** Real-time preference persistence, draft management, finalization locks, and printable/PNG export.
6. **Admin Management:** Comprehensive administrative tools for overseeing student rosters, courses, buckets, faculty assignments, and password resets.

## Getting Started

### Prerequisites
- Node.js >= 20.0.0
- npm or pnpm

### Installation & Run
```bash
# Install dependencies
npm install

# Run local development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```
