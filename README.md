<div align="center">

<a href="https://github.com/BhaanuG/Academic-Registration-Portal-Y23">
  <img src="public/assets/klef-logo.png" alt="KLEF University Logo" width="380" style="object-fit: contain; border-radius: 12px; box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);" />
</a>

# ACADEMIC REGISTRATION PORTAL · Y23

### Enterprise Multi-Dimensional Course Registration & Faculty Allocation Platform
**Koneru Lakshmaiah Education Foundation (KLEF Deemed-to-be University)**  
*Department of Computer Science & Engineering · Year 2023 Cohort (Y23)*

<p align="center">
  <b>Architected, Engineered & Authored Solely by <a href="mailto:Bhaanugali@gmail.com">Bhaanu G (Bhaanu Gali)</a></b><br/>
  <code>Principal Systems Architect & Lead Software Engineer</code><br/>
  <a href="mailto:Bhaanugali@gmail.com">Bhaanugali@gmail.com</a> &bull; <a href="mailto:2400030952@kluniversity.in">2400030952@kluniversity.in</a> &bull; <a href="https://github.com/BhaanuG/Academic-Registration-Portal-Y23">GitHub Repository</a>
</p>

---

<p align="center">
  <a href="#-system-architecture--technical-topology"><img src="https://img.shields.io/badge/Architecture-Deterministic%20Eligibility%20Engine-blueviolet?style=for-the-badge" alt="Architecture" /></a>
  <a href="#-scale--institutional-benchmarks"><img src="https://img.shields.io/badge/Scale-1%2C159%20Students-blue?style=for-the-badge" alt="Students" /></a>
  <a href="#-scale--institutional-benchmarks"><img src="https://img.shields.io/badge/Faculty%20Roster-426%20Professors-indigo?style=for-the-badge" alt="Faculty" /></a>
  <a href="#-scale--institutional-benchmarks"><img src="https://img.shields.io/badge/Course%20Catalog-102%20Courses-orange?style=for-the-badge" alt="Courses" /></a>
  <a href="#-technology-stack--runtime-specifications"><img src="https://img.shields.io/badge/Next.js-16.4.6%20(Turbopack)-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js 16" /></a>
  <a href="#-technology-stack--runtime-specifications"><img src="https://img.shields.io/badge/React-19.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 19" /></a>
  <a href="#-technology-stack--runtime-specifications"><img src="https://img.shields.io/badge/React%20Router-8.5.1-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white" alt="React Router 8" /></a>
  <a href="#-technology-stack--runtime-specifications"><img src="https://img.shields.io/badge/TailwindCSS-v4.0-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="TailwindCSS v4" /></a>
  <a href="#-technology-stack--runtime-specifications"><img src="https://img.shields.io/badge/SQLite-Native%20Node.js%20(node%3Asqlite)-003B57?style=for-the-badge&logo=sqlite&logoColor=white" alt="SQLite Engine" /></a>
  <a href="#-technology-stack--runtime-specifications"><img src="https://img.shields.io/badge/Node.js-22.x%20%2F%2024.x%20LTS-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js LTS" /></a>
</p>

</div>

---

## 📑 Table of Contents
1. [Executive Overview & Why This Portal Exists](#-executive-overview--why-this-portal-exists)
2. [Scale & Institutional Benchmarks](#-scale--institutional-benchmarks)
3. [Specialization-to-Cluster Locking Architecture](#-specialization-to-cluster-locking-architecture)
4. [Curricular Framework & 7-Bucket Structure](#-curricular-framework--7-bucket-structure)
5. [Multi-Tier Faculty Preference Engine](#-multi-tier-faculty-preference-engine)
6. [Zero-UI Silent Auto-Save & State Persistence](#-zero-ui-silent-auto-save--state-persistence)
7. [Deterministic URL Taxonomy & Routing System](#-deterministic-url-taxonomy--routing-system)
8. [Comprehensive Technology Stack & Specifications](#-comprehensive-technology-stack--specifications)
9. [Detailed Project Directory Map](#-detailed-project-directory-map)
10. [Local Engineering Setup & Build Runbook](#-local-engineering-setup--build-runbook)
11. [Author Attribution & Open-Source Governance](#-author-attribution--open-source-governance)

---

## 🎯 Executive Overview & Why This Portal Exists

In tier-one engineering universities like **KLEF (KL Deemed to be University)**, academic course registration has historically faced significant logistical hurdles:
- **Overcrowded Sections & Section Clashes:** Thousands of students selecting electives concurrently without cohort boundaries causes timetable conflicts.
- **Accidental Enrollment in Wrong Cohorts:** Students inadvertently enrolling in section ranges designated for a different specialization track.
- **Lost Preference Data:** Traditional multi-step forms frequently drop student selections when sessions expire, connections drop, or students switch devices.
- **Complex Hierarchical Faculty Rankings:** Selecting a lecture professor should automatically bind and unlock valid sub-sections for lab experiments, tutorial drills, and practical problem-solving sessions.

### The Purpose of This Platform
The **KLEF Academic Registration Portal (Y23)** resolves these challenges end-to-end:
1. **Guarantees Section Integrity:** Automatically assigns and locks students into their rightful section cohort based on their verified academic specialization.
2. **Coordinates Multi-Bucket Registrations:** Guides each student across 7 distinct curriculum buckets, ensuring correct prerequisite validations and credit quotas (minimum 18 to 26+ credits).
3. **Captures Multi-Tier Preferences:** Enforces 3 distinct faculty preferences for Lecture components and unlocks linked sub-section rankings for Tutorial, Practical, and Skill tracks.
4. **Delivers Zero-Data-Loss Reliability:** Every click, course toggle, and ranking instantly auto-saves in the background, persisting seamlessly across refreshes, logouts, and new browser tabs.

---

## 📊 Scale & Institutional Benchmarks

The portal manages the entire undergraduate engineering registration lifecycle for the Y23 cohort across multiple engineering disciplines:

| Metric | Measured Volume | Description |
| :--- | :--- | :--- |
| **Enrolled Students** | **1,159 Students** | Verified active student population in the Y23 cohort with complete institutional profiles. |
| **Faculty Mentors** | **426 Professors** | Professors, Associate Professors, and Assistant Professors mapped to academic departments. |
| **Teaching Allocations** | **682 Allocations** | Concrete section-level course assignments across Lecture, Practical, Tutorial, and Skill components. |
| **Course Catalog** | **102 Courses** | Rigorous engineering subjects spanning Core Engineering, Professional Electives, and Open Electives. |
| **Curricular Buckets** | **9 Buckets (C0–C8)** | Structured academic clusters ranging from Capstone Projects to Audit and Skill courses. |
| **Specialization Tracks** | **17 Specializations** | Advanced technology tracks across AI, Cloud Architecture, DevOps, Cybersecurity, and Robotics. |
| **Section Clusters** | **2 Main Cohorts** | `Cluster 1` (Sections `S1 — S50`) and `Cluster 2` (Sections `S51 — S100`). |

---

## 🔒 Specialization-to-Cluster Locking Architecture

To prevent section collisions and balance laboratory capacity, the university partitions registrations into two major cohorts. The portal reads the student's registered specialization and automatically locks them into their prescribed cluster:

```
                                  ┌──────────────────────────────────────────────┐
                                  │           Student Registration ID            │
                                  └──────────────────────┬───────────────────────┘
                                                         │
                                           Resolves Student Specialization
                                                         │
                         ┌───────────────────────────────┴───────────────────────────────┐
                         ▼                                                               ▼
        ┌─────────────────────────────────┐                             ┌─────────────────────────────────┐
        │            CLUSTER 1            │                             │            CLUSTER 2            │
        │      Sections S1 through S50    │                             │     Sections S51 through S100   │
        └────────────────┬────────────────┘                             └────────────────┬────────────────┘
                         │                                                               │
        • Data Science & Big Data Analytics                             • AI for Computational Intelligence
        • Cloud Native Software Engineering                             • AI Systems for Visual Intelligence
        • Cyber Security & Blockchain Tech                              • AI-Driven Language Technologies
        • Data Engineering for AI                                       • Generative AI & Multi-Modal Intelligence
        • Software Modelling & DevOps                                   • Gen AI and Machine Learning
        • Cloud Infrastructure Design                                   • AI & Autonomous Systems
        • Blockchain Engineering for Web3                               • AI-Driven Edge Architectures
        • Cloud and Edge Computing                                      • Robotics and Automation
        • Distributed Ledger Analytics                                  • VLSI & Embedded Systems
        • Social and Digital Media Analytics                            • 5G/6G Wireless Technologies
        • Game Development & UX Design                                  • Smart Manufacturing & Green Energy
```

### Deterministic Rules:
- **Zero Student Ambiguity:** Students cannot manually pick or alter their cluster. The assigned cohort is permanently displayed as **Assigned Cohort**, and the alternative is marked as **Locked to Other Cohort**.
- **Dynamic Scope Enforcement:** All course bucket dropdowns and faculty directory searches automatically filter down to show *only* the teaching staff and sections allocated within that student's designated cluster.

---

## 📚 Curricular Framework & 7-Bucket Structure

The semester registration is structured into credit-bearing buckets designed to satisfy institutional graduation criteria:

1. **Bucket C0 — Capstone Project I (`23IE4053A` / `23IE4053R`)**:
   - Compulsory final-year technical research and implementation project (3–4 credits, Practical & Skill components).
2. **Bucket C1 — Open Elective I (OE-1)**:
   - Interdisciplinary coursework outside the core department (e.g. *Bio-informatics*, *Operations Research*, *Green Building Technology*).
3. **Bucket C2 — Open Elective II (OE-2)**:
   - Societal and management electives (e.g. *Intellectual Property Rights*, *Engineering Economics*, *Disaster Management*).
4. **Bucket C3 — Professional Elective IV (PE-4)**:
   - Domain-specific advanced elective tailored directly to the student's specialization.
5. **Bucket C4 — Professional Elective V (PE-5)**:
   - Deep-dive technical track (e.g. *Deep Reinforcement Learning*, *Cloud Security Governance*, *Microservices Architecture*).
6. **Bucket C5 — Skill Course / Audit Course I (AUC-1)**:
   - Industry-aligned employability courses and CRT (Campus Recruitment Training) modules.
7. **Bucket C6 — Audit Course II (AUC-2)**:
   - Universal Human Values, Indian Constitution, and Professional Ethics.

---

## 🎓 Multi-Tier Faculty Preference Engine

The portal introduces a hierarchical preference matrix that models real-world university teaching arrangements:

1. **3-Rank Lecture Preferences:**
   - For every selected subject, the student ranks their top 3 preferences (`Preference 1`, `Preference 2`, and `Preference 3`) for the Lecture (L) professor.
2. **Cascading Sub-Section Unlocking:**
   - Once a Lecture faculty member is ranked, their assigned section (e.g., `S-58`) immediately unlocks dedicated sub-ranking tables for associated components:
     - **Tutorial (T)**: Small-group problem solving sub-sections (`A`, `B`, `C`).
     - **Practical (P)**: Laboratory mentors and experiment slots.
     - **Skill (S)**: Hands-on implementation instructors.
3. **Downloadable Verification Proofs:**
   - **PDF Faculty Directory**: Instantly compiles and downloads an official KLEF-branded tabular roster of all eligible professors for the student's cohort.
   - **PNG Preference Record**: Renders and downloads a cryptographic-style graphical summary card of all recorded faculty choices for student audit trails.

---

## ⚡ Zero-UI Silent Auto-Save & State Persistence

A key design requirement is **complete invisibility of persistence operations**:
- **No Intrusive Toasts:** No "Saving...", "Saved!", or modal popups interrupt the student.
- **Immediate Local Synchonization:** Every selection in [useSubjects.js](file:///d:/Academic%20Registration%20Portal/Academic%20Registration%20Portal%20-%20Y23/src/portal/hooks/useSubjects.js) writes to localized storage key `klef-subject-selections-{studentId}`.
- **Granular Preference Storage:** Every sub-section dropdown change writes to `klef-faculty-preferences-{studentId}`.
- **Multi-Account Browser Hygiene:** When multiple students log in on the same physical computer or kiosk, their data is strictly isolated by their 10-digit Registration ID.

---

## 🌐 Deterministic URL Taxonomy & Routing System

To align with official institutional requirements, the entire portal uses clean, deterministic `.php`-terminated endpoints handled by React Router inside the Next.js App Router:

| View / Function | Clean Production URL | Access Role | Description |
| :--- | :--- | :--- | :--- |
| **Sign-In Gateway** | `/KLEF/8-2/GBS.php` | Public | Authentication portal with 10-digit ID and Date of Birth verification. |
| **Student Overview** | `/KLEF/8-2/{studentId}/{studentName}/Academic-Overview.php` | Student | Credit accumulator, registration status, counselor details. |
| **Cluster Selection** | `/KLEF/8-2/{studentId}/{studentName}/Cluster-Selection.php` | Student | Specialization-locked cohort confirmation view. |
| **Course Selection** | `/KLEF/8-2/{studentId}/{studentName}/Subject-Selection.php` | Student | 7-bucket course selection workspace. |
| **Faculty Preferences**| `/KLEF/8-2/{studentId}/{studentName}/Faculty-Preferences.php`| Student | Multi-tier lecture and sub-section ranking tables. |
| **Faculty Directory** | `/KLEF/8-2/{studentId}/{studentName}/Faculty-Directory.php` | Student | Searchable teaching staff roster with PDF download. |
| **My Preferences** | `/KLEF/8-2/{studentId}/{studentName}/My-Preference.php` | Student | Complete preference review grid with PNG snapshot export. |
| **Student Profile** | `/KLEF/8-2/{studentId}/{studentName}/My-Profile.php` | Student | Personal info, Aadhaar, APAAR, parent phone, and password management. |
| **Admin Console** | `/KLEF/8-2/Admin/G-Bhaanu-Sai/Dashboard.php` | Admin | Executive summary, cohort distribution, quick record creation. |
| **Admin Students** | `/KLEF/8-2/Admin/G-Bhaanu-Sai/Students.php` | Admin | Full CRUD search table for all 1,159 student profiles. |
| **Admin Faculty** | `/KLEF/8-2/Admin/G-Bhaanu-Sai/Faculty.php` | Admin | Full CRUD search table for all 426 faculty members. |
| **Admin Buckets** | `/KLEF/8-2/Admin/G-Bhaanu-Sai/Buckets.php` | Admin | Curricular bucket configuration and credit constraints. |
| **Admin Courses** | `/KLEF/8-2/Admin/G-Bhaanu-Sai/Courses.php` | Admin | Course catalog management across buckets. |
| **Developer Bio** | `/KLEF/8-2/Developer/G-Bhaanu-Sai.php` | Public | Systems architect attribution, portfolio links, and technical story. |

---

## 💻 Comprehensive Technology Stack & Specifications

### 1. Frontend Architecture
- **React 19 (`19.3.1`)**: Component architecture leveraging latest concurrent rendering features and hooks.
- **Next.js 16 (`16.4.6`)**: Turbo-bundled App Router architecture configured with `output: 'standalone'` for zero-overhead container deployment.
- **React Router (`8.5.1`)**: High-performance client-side routing within a single-page mount (`[...slug]`), enabling instantaneous route transitions without server roundtrips.
- **Tailwind CSS (`v4.0`)**: Utility-first CSS engine customized with university brand tokens, deep navy tints (`#1b2d42`), and warm amber accents (`#ea580c`).
- **Lucide React (`1.16.0`)**: Clean, accessible iconography across topbar navigation, modal alerts, and buttons.
- **jsPDF & html2canvas**: Client-side document rendering libraries powering instant PDF and PNG downloads.

### 2. Backend & Data Engine
- **Node.js (`v22.x` / `v24.x` LTS)**: Enterprise runtime supporting native ESM imports and top-level await.
- **Native Node SQLite (`node:sqlite`)**: High-throughput embedded relational database storing all 1,159 students, 426 faculty members, and 682 teaching allocations with zero external database latency.
- **RESTful Route Handlers (`src/app/(frontend)/portal-api/`)**: JSON endpoints providing cached reads, administrative CRUD updates, and password resets.

---

## 📂 Detailed Project Directory Map

```
Academic-Registration-Portal-Y23/
├── public/
│   ├── assets/
│   │   ├── klef-logo.png                 # Primary university emblem (63px signin / 42px topbar)
│   │   └── klef-crest.png                # High-res university seal
│   └── favicon.png                       # Browser tab favicon
├── src/
│   ├── app/                              # Next.js App Router layer
│   │   └── (frontend)/
│   │       ├── [...slug]/
│   │       │   └── page.jsx              # Catch-all page delegating to PortalMount
│   │       ├── portal-api/
│   │       │   ├── [resource]/route.js   # Dynamic REST endpoints (students, faculty, courses)
│   │       │   └── auth/route.js         # Session verification and role management
│   │       ├── styles/                   # Per-page modular CSS stylesheets
│   │       │   ├── academic-overview.css # Overview cards, credit rings, and summary grids
│   │       │   ├── cluster-selection.css # Specialization banners and cohort cards
│   │       │   ├── subject-selection.css # Bucket tabs, subject chips, and selection pill bars
│   │       │   ├── faculty-preference.css# 3-tier lecture tables & sub-section rankings
│   │       │   ├── faculty-directory.css # Directory search, filter chips, and PDF headers
│   │       │   ├── my-preferences.css    # Clean preference table and PNG capture layout
│   │       │   ├── student-profile.css   # Demographic details and password change modal
│   │       │   ├── admin-students.css    # Admin tables, search bars, and pagination controls
│   │       │   └── developer-page.css    # Architect portfolio cards and timeline items
│   │       ├── layout.jsx                # Root HTML document and font preloading
│   │       ├── page.jsx                  # Root entry redirecting to /KLEF/8-2/GBS.php
│   │       ├── PortalMount.jsx           # Client-side wrapper ensuring clean mounting
│   │       └── styles.css                # Global theme tokens and Tailwind CSS imports
│   ├── lib/
│   │   ├── db/
│   │   │   ├── client.js                 # SQLite database connection & schema bootstrapping
│   │   │   ├── eligibilityEngine.js      # Deterministic academic qualification rules
│   │   │   ├── optionSheetRules.json     # Institutional section ranges per specialization
│   │   │   ├── queries.js                # High-performance analytical database queries
│   │   │   └── schema.sql                # Normalized schema DDL (14 tables with indexes)
│   │   └── portal-auth.js                # Session authentication and cookie tokens
│   └── portal/                           # React 19 Single Page Application
│       ├── app/
│       │   ├── App.jsx                   # Top-level client mount & AuthProvider wrapper
│       │   └── routes.jsx                # React Router 8 route definitions with .php mappings
│       ├── components/                   # Modular presentation components
│       │   ├── academic/                 # Course selectors and faculty ranking controls
│       │   ├── common/                   # Brand headers, date pickers, password inputs
│       │   └── layout/                   # Topbar header shell, navigation, and footer
│       ├── pages/                        # Student and administrative workspaces
│       │   ├── AcademicOverview.jsx      # Student dashboard & credit accumulation
│       │   ├── ClusterSelection.jsx      # Specialization-locked cluster cohort confirmation
│       │   ├── SubjectSelection.jsx      # 7-bucket course selection workflow
│       │   ├── FacultyPreferences.jsx    # Hierarchical lecture and sub-section ranking
│       │   ├── FacultyDirectory.jsx      # Faculty roster with PDF export capabilities
│       │   ├── MyPreferences.jsx         # Summary grid with PNG proof download
│       │   ├── MyProfile.jsx             # Student profile inspection & credential management
│       │   ├── Login.jsx                 # Student & Admin sign-in interface
│       │   ├── Admin.jsx                 # Administrative command dashboard
│       │   └── Developer.jsx             # Systems architect attribution & technical profile
│       ├── services/                     # Data stores, local storage adapters & student roster
│       │   ├── academicData.js           # Static curricular course definitions & fallbacks
│       │   ├── authService.js            # In-memory authentication & session store
│       │   ├── preferenceService.js      # Faculty preference persistence adapter
│       │   ├── studentRosterData.json    # Complete 1,159-student specialization index
│       │   └── studentService.js         # Cluster lookup & route memory service
│       └── utils/                        # URL route builders & validation routines
├── next.config.mjs                       # Next.js standalone build configuration
├── package.json                          # Project dependencies and lifecycle scripts
├── tsconfig.json                         # TypeScript compiler settings
├── LICENSE                               # MIT License legal terms
├── CONTRIBUTING.md                       # Contribution guidelines
├── CODE_OF_CONDUCT.md                   # Community standards
├── SECURITY.md                           # Vulnerability disclosure protocol
└── ACCESSIBILITY.md                      # Accessibility standards (WCAG 2.1 AA)
```

---

## 🚀 Local Engineering Setup & Build Runbook

### Prerequisites
- **Node.js**: `v20.x`, `v22.x`, or `v24.x` LTS
- **Package Manager**: `npm` (v10+) or `pnpm` (v9+)
- **Git**

### 1. Clone the Repository
```bash
git clone https://github.com/BhaanuG/Academic-Registration-Portal-Y23.git
cd "Academic-Registration-Portal-Y23"
```

### 2. Install Project Dependencies
```bash
npm install
```

### 3. Launch Development Server
```bash
npm run dev
```

### 4. Build for Production
```bash
npm run build
```
This compiles optimized server bundles and client bundles through Turbopack.

---

## 👨‍💻 Author Attribution & Open-Source Governance

<table align="center">
  <tr>
    <td align="center">
      <a href="https://github.com/BhaanuG">
        <img src="https://github.com/BhaanuG.png" width="120px;" alt="Bhaanu Gali" style="border-radius: 50%; box-shadow: 0 4px 14px rgba(0,0,0,0.2);" /><br /><br />
        <sub><b>Bhaanu G (Bhaanu Gali)</b></sub>
      </a><br />
      <code>Principal Systems Architect & Lead Software Engineer</code><br />
      <a href="mailto:Bhaanugali@gmail.com">Bhaanugali@gmail.com</a> &bull; <a href="mailto:2400030952@kluniversity.in">2400030952@kluniversity.in</a>
    </td>
  </tr>
</table>

<p align="center">
  Developed for and maintained under the academic governance of <b>Koneru Lakshmaiah Education Foundation (KLEF Deemed-to-be University)</b>.
</p>

---

## 📜 Compliance & Documentation Suite

- **[LICENSE](LICENSE)**: MIT License terms (Copyright &copy; 2026 Bhaanu G).
- **[CONTRIBUTING.md](CONTRIBUTING.md)**: Contribution guidelines and pull request conventions.
- **[CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)**: Community standards adapted from Contributor Covenant v2.1.
- **[SECURITY.md](SECURITY.md)**: Responsible vulnerability disclosure protocol.
- **[ACCESSIBILITY.md](ACCESSIBILITY.md)**: Standards-compliant WCAG 2.1 AA accessibility features.
