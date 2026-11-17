# KLEF Academic Registration Portal (Y23)

[![Next.js](https://img.shields.io/badge/Next.js-16.4.2-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.3.1-61dafb?style=flat&logo=react)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4.0-38bdf8?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![SQLite](https://img.shields.io/badge/SQLite-Native_Node.js-003B57?style=flat&logo=sqlite)](https://nodejs.org/api/sqlite.html)
[![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen?style=flat)]()
[![License](https://img.shields.io/badge/License-KLEF_Proprietary-red?style=flat)]()

An enterprise-grade, multi-dimensional academic course registration and faculty allocation preference platform architected for **Koneru Lakshmaiah Education Foundation (KLEF Deemed-to-be University)**, tailored specifically for the **Y23 Batch (2026–27 ODD Semester / Semester 8)**.

---

## 📑 Table of Contents

- [System Architecture](#-system-architecture)
- [Multi-Dimensional Cohort Engine](#-multi-dimensional-cohort-engine)
- [Domain Model & Data Architecture](#-domain-model--data-architecture)
- [Key Modules & User Workflows](#-key-modules--user-workflows)
  - [Student Portal](#1-student-portal)
  - [Admin Executive Suite](#2-admin-executive-suite)
- [API & Integration Specifications](#-api--integration-specifications)
- [Directory Layout](#-directory-layout)
- [Local Engineering Setup](#-local-engineering-setup)
- [Production Deployment](#-production-deployment)
- [Security & Data Integrity Guarantees](#-security--data-integrity-guarantees)

---

## 🏛️ System Architecture

The portal is built around a decoupled yet cohesive architecture that balances low-latency interactions on the client side with deterministic rule resolution on the server runtime.

```
                           +----------------------------------------+
                           |           Client Entry Point           |
                           |   (Next.js App Router / Turbopack)     |
                           +-------------------+--------------------+
                                               |
                                               v
                        +---------------------------------------------+
                        |             Authentication Guard            |
                        |      (Session / Role / Token Context)       |
                        +----------------------+----------------------+
                                               |
                     +-------------------------+-------------------------+
                     |                                                   |
                     v                                                   v
     +-------------------------------+                   +-------------------------------+
     |         Student Portal        |                   |          Admin Suite          |
     | - Academic Dashboard          |                   | - Executive KPIs & Metrics    |
     | - Subject / Bucket Selection  |                   | - Faculty Allocation Grid     |
     | - Component Preferences       |                   | - 1,159 Student Directory     |
     | - Scoped Faculty Directory    |                   | - Course & Bucket Controls    |
     | - PDF Generation Engine       |                   | - Credential Management       |
     +---------------+---------------+                   +---------------+---------------+
                     |                                                   |
                     +-------------------------+-------------------------+
                                               |
                                               v
                            +-------------------------------------+
                            |        RESTful API Endpoints        |
                            |       /portal-api/[resource]        |
                            |       /portal-api/auth              |
                            +------------------+------------------+
                                               |
                                               v
                            +-------------------------------------+
                            |   Authoritative Eligibility Engine  |
                            |    (Multi-Dimensional Rule Matrix)  |
                            +------------------+------------------+
                                               |
                                               v
                            +-------------------------------------+
                            |       Zero-Dependency SQLite        |
                            |    Native Node.js SQLite Driver     |
                            |      academic_portal.sqlite         |
                            +-------------------------------------+
```

---

## 🎯 Multi-Dimensional Cohort Engine

Course registration at institutional scale involves complex intersecting constraints. Rather than flat rules, the eligibility engine (`src/lib/db/eligibilityEngine.js`) evaluates student access dynamically across 5 distinct axes:

```
                          [ 1. CLUSTER ]
                     Cluster-1 (S1 - S50)  <--->  Cluster-2 (S51 - S100)
                                    |
                                    v
                        [ 2. STUDENT TRACK ]
          CRT / NonCRT / NonCRT-PS (Practice School) / ICP (Dual Degree)
                                    |
                                    v
                     [ 3. PLACEMENT CLASSIFICATION ]
             Placed (S11 - S20)  <--->  Yet To Be Placed (YTB)
                                    |
                                    v
                       [ 4. SPECIALIZATION ]
                29 Engineering Specialization Streams
                                    |
                                    v
                       [ 5. CURRICULUM BUCKETS ]
                C0 (Core/Project) through C8 (Electives)
```

### Institutional Allocation Rules Resolved:

| Constraint Dimension | Evaluated Context | Target Assignment / Section Boundaries |
| :--- | :--- | :--- |
| **Science Electives (C4)** | `Cluster-1` + `CRT` | `23CY1001` (S1–S9), `22PH4101` (S1–S5), `22PH4102` (S8–S11) |
| **Science Electives (C4)** | `Cluster-1` + `NonCRT` | `23CY1001` (S10–S13), `22PH4101` (S6–S7), `22PH4102` (S12–S13) |
| **Science Electives (C4)** | `Cluster-2` + `CRT` | `23CY1001` (S51–S59), `22PH4101` (S51–S54), `22PH4102` (S57–S61) |
| **Science Electives (C4)** | `Cluster-2` + `NonCRT`| `23CY1001` (S60–S63), `22PH4101` (S55–S56), `22PH4102` (S62–S63) |
| **Indian Constitution (C5)**| `Placed` Cohort | Dedicated cohort sections `S11–S20` in Cluster-1 |
| **Indian Constitution (C5)**| `YTB Placed CRT` | `S1–S2` (Cluster-1) / `S51–S52` (Cluster-2) |
| **Indian Constitution (C5)**| `YTB Placed NonCRT` | `S3–S8` (Cluster-1) / `S53–S58` (Cluster-2) |
| **Ecology & Env (C6)** | `CRT` | `S1–S2` (Cluster-1) / `S51–S52` (Cluster-2) |
| **Ecology & Env (C6)** | `NonCRT` | `S3–S9` (Cluster-1) / `S53–S59` (Cluster-2) |
| **Practice School (`NonCRT-PS`)** | PS Internship Track | Enrolled in `23IE4050` with fixed institutional `S1` sections |
| **International Program (`ICP`)** | Credit Transfer Track | Enrolled in `23IE4051` / `23IE4042` with dedicated `S1` sections |

---

## 🗄️ Domain Model & Data Architecture

The underlying database (`.data/academic_portal.sqlite`) holds production records fully reconciled with official university master option sheets:

- **1,159 Verified Students**: Mapped across all 29 department specializations.
- **426 Active Faculty Members**: Complete with employee IDs, designations, and department affiliations.
- **682 Component Allocations**: Lecture (L), Tutorial (T), Practical (P), and Skilling (S) distributions.
- **102 Academic Courses**: Configured across curriculum buckets C0 through C8.
- **11,227 Student Bucket Enrollments**: Pre-populated individual section allocations.

### Relational Schema Design:
```sql
-- Students Master
CREATE TABLE students (
  id TEXT PRIMARY KEY,
  student_id TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  university_email TEXT NOT NULL,
  cluster_id TEXT NOT NULL,
  student_type TEXT NOT NULL,         -- CRT, NonCRT, NonCRT-PS, CRT-ICP, etc.
  placement_status TEXT NOT NULL,     -- Placed, YTB Placed, etc.
  specialization TEXT NOT NULL,
  addon_status TEXT NOT NULL,
  counselor_name TEXT,
  counselor_id TEXT,
  counselor_email TEXT
);

-- Individual Student Pre-Assigned Buckets (Source of Truth)
CREATE TABLE student_assigned_buckets (
  id TEXT PRIMARY KEY,
  student_id TEXT NOT NULL,
  bucket_id TEXT NOT NULL,
  default_course_code TEXT NOT NULL,
  default_course_desc TEXT NOT NULL,
  lec_section TEXT,
  prac_section TEXT,
  skill_section TEXT,
  is_mandatory INTEGER NOT NULL DEFAULT 1,
  term_id TEXT NOT NULL
);

-- Faculty Allocations by Section & Delivery Component
CREATE TABLE faculty_allocations (
  id TEXT PRIMARY KEY,
  faculty_id TEXT NOT NULL,
  course_code TEXT NOT NULL,
  section_id TEXT NOT NULL,
  component TEXT NOT NULL,            -- 'L', 'T', 'P', 'S'
  sub_section TEXT,
  term_id TEXT NOT NULL
);
```

---

## 🖥️ Key Modules & User Workflows

### 1. Student Portal

- **Academic Overview Dashboard**:
  - Live visual audit of student cohort classification (`Cluster 1` vs `Cluster 2`), track status (`CRT`, `NonCRT`, `PS`), and placement state.
  - Credit progress meter with real-time target validation (25 credit semester threshold).
- **Subject & Elective Selection (`/subject-selection`)**:
  - Interactive bucket navigation (C0 through C8).
  - Enforces mandatory course constraints while allowing elective choices in permitted buckets (Open Electives 1 & 2, Science Electives).
  - Clear selection reset controls per bucket and across entire session.
- **Faculty Preference Matrix (`/faculty-preferences`)**:
  - Single-component filtering: If a course only has a Practical component, only Practical selectors render.
  - Clean component nomenclature (`Lecture`, `Practical`, `Skill`) eliminating internal development jargon.
  - Automatic dropdown pruning: Students only see faculty allocated to their authorized section boundaries.
  - Multi-tier preference ordering (Rank 1, Rank 2, Rank 3) preventing duplicate faculty selections.
- **Personalized Faculty Directory (`/faculty-directory`)**:
  - Strict 7-column institutional layout:
    ```
    | BUCKET NO. | COURSE CODE | NAME OF THE COURSE | SECTION NUMBER | DELIVERY COMPONENT | EMP ID | NAME OF THE FACULTY |
    ```
  - Ordered deterministically by: `Bucket No.` &rarr; `Section Number` &rarr; `Delivery Component` &rarr; `Faculty Name`.
  - Zero cross-cohort noise: Students only see faculty who teach courses and sections relevant to their own curriculum.
  - **Client-Side PDF Generator**: Uses `jspdf` and `jspdf-autotable` to generate official branded audit sheets for offline verification.
- **Submission Confirmation (`/my-preferences`)**:
  - Read-only review matrix showing chosen electives, verified section IDs, and ordered faculty rankings.

### 2. Admin Executive Suite

- **Executive Analytics Dashboard (`/admin/dashboard`)**:
  - Real-time KPIs: Registered student counts, cluster distributions, allocation coverage, and unverified edge-case tracking.
- **Live Faculty Registry (`/admin/faculty`)**:
  - Strict administrative grid:
    ```
    | SL NO | EMP ID | EMP NAME | ASSIGNED COURSE CODE | ASSIGNED COURSE NAME | SECTION | COMPONENT | ACTIONS |
    ```
  - Live database-bound search across faculty names, employee IDs, course codes, and section numbers.
  - Real-time filtering by component (`L`, `T`, `P`, `S`) and individual course codes.
  - Modal-driven record editing and manual allocation capabilities.
- **Student Cohort Directory (`/admin/students`)**:
  - Tabulated overview of all 1,159 students with immediate visibility into their cohort, counselor allocations, and academic buckets.
- **Curriculum Controls (`/admin/buckets` & `/admin/courses`)**:
  - Direct administrative controls over credit limits, course codes, syllabus component breakdowns, and catalog visibility.

---

## 🔌 API & Integration Specifications

The backend exposes clean, unified REST endpoints backed by parameterized SQLite statements:

### Authentication Endpoints
- `POST /portal-api/auth`
  - Action: `login` | Validates student ID or administrative credentials against secure session context.
  - Action: `logout` | Clears active authentication tokens.

### Data Endpoints (`/portal-api/[resource]`)
- `GET /portal-api/student-profile?studentId={id}`: Resolves full demographic, cohort, and cluster metadata.
- `GET /portal-api/student-subjects?studentId={id}`: Resolves personalized bucket courses, individual section mappings, and elective alternatives.
- `GET /portal-api/student-faculty-directory?studentId={id}`: Returns the sorted, filtered faculty directory tailored strictly to that student's cohort.
- `GET /portal-api/faculty-options?courseCode={code}&component={c}&cluster={cluster}&sectionFilter={filter}`: Returns eligible faculty candidates for preference selection.
- `GET /portal-api/students`: Returns paginated student records for administrative search.
- `GET /portal-api/faculty`: Returns comprehensive faculty allocations for the administrative registry.
- `GET /portal-api/stats`: Serves aggregated summary metrics for the executive dashboard.

---

## 📁 Directory Layout

```text
Academic-Registration-Portal-Y23/
├── .data/
│   └── academic_portal.sqlite       # Production SQLite database (1,159 students, 426 faculty)
├── .figma/                          # Platform runtime and route deployment manifests
├── public/
│   ├── assets/                      # University emblem and high-resolution brand assets
│   ├── favicon.ico
│   └── favicon.png
├── src/
│   ├── app/                         # Next.js 16 App Router
│   │   └── (frontend)/
│   │       ├── portal-api/          # Next.js dynamic API routes (Edge-ready handlers)
│   │       │   ├── [resource]/route.js
│   │       │   └── auth/route.js
│   │       ├── styles/              # Scoped CSS modules (Design-system tokens, transitions)
│   │       ├── layout.jsx           # Global document shell, fonts, and meta-tags
│   │       ├── page.jsx             # Root routing entry point
│   │       └── PortalMount.jsx      # Client-side portal mounting wrapper
│   ├── lib/
│   │   ├── db/
│   │   │   ├── client.js            # Node native SQLite connection singleton
│   │   │   ├── eligibilityEngine.js # Multi-dimensional cohort eligibility processor
│   │   │   ├── optionSheetRules.json# Specialized cohort matrix rules
│   │   │   └── schema.sql           # Database DDL & relational definitions
│   │   └── portal-auth.js           # Session and authentication token utilities
│   └── portal/                      # React 19 Application Core
│       ├── app/                     # Route definitions and page providers
│       ├── components/              # Modular UI components (Selects, Modals, Headers)
│       │   ├── academic/            # Preference selectors and guidelines modals
│       │   ├── common/              # Passwords, DatePickers, Heading wrappers
│       │   └── layout/              # Portal headers, navigation rails, and footers
│       ├── context/                 # AuthContext & Session management
│       ├── hooks/                   # Custom business hooks (useAuth, useSubjects, useFaculty)
│       ├── pages/                   # User-facing views (Student & Admin pages)
│       │   ├── admin/               # Dedicated admin sub-pages (Dashboard, Faculty, Students)
│       │   ├── AcademicOverview.jsx
│       │   ├── FacultyDirectory.jsx
│       │   ├── FacultyPreferences.jsx
│       │   ├── MyPreferences.jsx
│       │   └── SubjectSelection.jsx
│       ├── services/                # API client services & data abstraction layer
│       └── utils/                   # Form validation, formatting, and route constants
├── jsconfig.json                    # Path alias configuration (@/*)
├── next.config.mjs                  # Next.js build pipeline configuration
├── package.json                     # Project manifest and dependency declarations
├── package-lock.json                # Locked dependency tree
├── postcss.config.mjs               # PostCSS & Tailwind v4 plugin integration
└── README.md                        # Project documentation and engineering manual
```

---

## 💻 Local Engineering Setup

### Prerequisites
- **Node.js**: `v22.x` or `v24.x` (Engine leverages Node's built-in SQLite engine via `node:sqlite`)
- **Package Manager**: `npm` (v10+)

### Installation & Run

1. **Clone the repository:**
   ```bash
   git clone https://github.com/BhaanuG/Academic-Registration-Portal-Y23.git
   cd Academic-Registration-Portal-Y23
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Launch local development server:**
   ```bash
   npm run dev
   ```
   Access the portal at `http://localhost:3000`.

4. **Verify production compilation:**
   ```bash
   npm run build
   ```

---

## 🚀 Production Deployment

### Automated Cloud Deployment (Netlify)

This repository is optimized for deployment via Netlify's modern Next.js Runtime:

- **Build Command**: `npm run build`
- **Publish Directory**: `.next`
- **Node Version**: `>= 22.0.0`
- **Environment Variables**:
  - `NEXT_PUBLIC_SITE_URL`: Base domain (e.g., `https://klef-y23-registration.netlify.app`)

### Standalone Docker / Containerized Deployment

Because `next.config.mjs` specifies `output: 'standalone'`, the application can be packaged into an ultra-lightweight Docker container:

```dockerfile
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY .next/standalone ./
COPY .next/static ./.next/static
COPY public ./public
COPY .data ./.data
EXPOSE 3000
CMD ["node", "server.js"]
```

---

## 🔒 Security & Data Integrity Guarantees

1. **SQL Injection Immunization**: All SQLite queries within `eligibilityEngine.js`, `queries.js`, and API routes utilize strictly parameterized statements.
2. **Deterministic Section Isolation**: Student preferences cannot select sections outside their approved specialization cohort, preventing timetable collisions.
3. **No Phantom Faculty**: Dropdown lists are dynamically validated against active teaching assignments in `faculty_allocations`.
4. **Air-Gapped Data Store**: `.data/academic_portal.sqlite` functions locally without reliance on third-party cloud database latencies, guaranteeing millisecond response times under peak registration loads.

---

## 📄 License & Attribution

Developed for and maintained by the **Department of Computer Science & Engineering, Koneru Lakshmaiah Education Foundation (KLEF)**. All proprietary institutional workflows, course catalogs, and allocation matrices are protected under university copyright.
