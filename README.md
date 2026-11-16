# KLEF Academic Registration Portal (Y23)

An enterprise-grade, multi-dimensional academic course registration and faculty preference management portal developed for **Koneru Lakshmaiah Education Foundation (KLEF)** for the **Y23 Batch (2026-27 ODD Semester / Semester 8)**.

---

## 🌟 Overview

The portal manages individualized course eligibility, bucket assignments, section allocations, and faculty preference selection for all **1,159 registered students** and **426 faculty members** across **102 courses** in Computer Science & Engineering.

### Multi-Dimensional Cohort Architecture:
- **Cluster Division**: Cluster 1 and Cluster 2 cohort routing.
- **Student Types**:
  - `CRT` (Campus Recruitment Training - Placed & Yet To Be Placed)
  - `NonCRT` (Regular non-training stream)
  - `NonCRT-PS` (Practice School students with fixed S1 allocations)
  - `ICP` (`CRT-ICP`, `NonCRT-ICP`, `CRT-ICP1` International Credit / Internship Programs)
- **Placement Statuses**: Placed and Yet To Be Placed (YTB Placed).
- **Specializations**: Covers all 29 engineering specializations (Data Science, Cloud Native, Data Engineering for AI, Language Technologies, Visual Intelligence, etc.).
- **Academic Buckets (C0 – C8)**:
  - `C0`: Capstone Project (`23IE4053A`), Practice School (`23IE4050`), Industrial Internship (`23IE4051`)
  - `C1` & `C2`: Open Electives 1 & 2 (`OE1`, `OE2`)
  - `C3`: Professional Elective 5 (`PE5`)
  - `C4`: Science Electives (`23CY1001`, `22PH4101`, `22PH4102`)
  - `C5`: Universal Human Values & Constitution (`23UC0008`)
  - `C6`: Ecology & Environment (`23UC0009`)
  - `C7`: Professional Elective 4 (`PE4`)
  - `C8`: Open Elective 3 (`OE3`)

---

## 🚀 Key Features

### 👨‍🎓 Student Portal
- **Secure Authentication**: Student login with student ID and date of birth/password verification.
- **Academic Overview**: Interactive progress tracker, cohort classification, and credit status.
- **Course Selection**: Bucket-wise elective selection with credit limits, mandatory rules, and real-time validation.
- **Faculty Preferences**:
  - Dynamically displays required teaching components (`Lecture`, `Practical`, `Skill`).
  - Dropdowns strictly scoped to each student's assigned sections from institutional data.
  - Multi-tier preference ordering (Rank 1, Rank 2, Rank 3).
- **Personalized Faculty Directory**:
  - Formatted strictly as: `BUCKET NO.` | `COURSE CODE` | `NAME OF THE COURSE` | `SECTION NUMBER` | `DELIVERY COMPONENT` | `EMP ID` | `NAME OF THE FACULTY`.
  - Ordered by Bucket No &rarr; Section Number &rarr; Delivery Component &rarr; Faculty Name.
  - PDF export for offline verification.
- **Submission Confirmation**: Comprehensive read-only overview of submitted choices.

### 🛡️ Admin Portal
- **Executive Dashboard**: Real-time metrics on student registrations, cluster distributions, and faculty allocation health.
- **Faculty Directory Management**:
  - Formatted as: `SL NO` | `EMP ID` | `EMP NAME` | `ASSIGNED COURSE CODE` | `ASSIGNED COURSE NAME` | `SECTION` | `COMPONENT` | `ACTIONS`.
  - Live data synchronization directly with SQLite backend.
  - Real-time search, filter by component/course, and sortable columns.
- **Student Management**: Filterable directory of all 1,159 students with individual bucket assignments, sections, and counselor tracking.
- **Course & Bucket Catalog**: Management interface for curriculum buckets and credit constraints.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (Turbopack, App Router)
- **Frontend**: React 19, Tailwind CSS v4, Lucide React
- **Database**: SQLite with native Node.js SQLite integration (`node:sqlite`)
- **PDF Generation**: jsPDF & jsPDF-AutoTable
- **Styling**: Tailwind CSS v4 & custom scoped responsive CSS modules

---

## 📂 Project Structure

```text
Academic-Registration-Portal-Y23/
├── .data/
│   └── academic_portal.sqlite      # SQLite database with all cohort data
├── public/
│   ├── assets/                     # KLEF logos and branding
│   └── favicon.ico
├── src/
│   ├── app/
│   │   └── (frontend)/             # Next.js App Router root & API routes
│   │       ├── portal-api/         # REST API endpoints for students, faculty & courses
│   │       ├── styles/             # Modular stylesheet components
│   │       └── layout.jsx
│   ├── lib/
│   │   └── db/
│   │       ├── client.js           # Database connection & initialization
│   │       ├── eligibilityEngine.js# Multi-dimensional academic eligibility rules
│   │       ├── optionSheetRules.json# Institutional cohort rules
│   │       └── schema.sql          # Database schema
│   └── portal/
│       ├── components/             # Reusable UI components (Modals, Selectors, Shell)
│       ├── context/                # Authentication context
│       ├── pages/                  # Student & Admin pages
│       │   ├── admin/              # Admin pages (Dashboard, Faculty, Students, etc.)
│       │   ├── AcademicOverview.jsx
│       │   ├── FacultyDirectory.jsx
│       │   ├── FacultyPreferences.jsx
│       │   ├── MyPreferences.jsx
│       │   └── SubjectSelection.jsx
│       └── services/               # API clients & client-side data helpers
├── package.json
└── next.config.mjs
```

---

## 💻 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the portal.

### 3. Production Build
```bash
npm run build
npm start
```

---

## 📜 License
Developed for Koneru Lakshmaiah Education Foundation (KLEF). All rights reserved.
