<div align="center">

<a href="https://github.com/BhaanuG/Academic-Registration-Portal-Y23">
  <img src="public/assets/klef-logo.png" alt="KLEF University Logo" width="380" style="object-fit: contain; border-radius: 12px; box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);" />
</a>

# ACADEMIC REGISTRATION PORTAL · Y23

### Enterprise Multi-Dimensional Course Registration & Faculty Allocation Platform

<p align="center">
  <b>Architected, Engineered & Authored Solely by <a href="mailto:Bhaanugali@gmail.com">Bhaanu G (Bhaanu Gali)</a></b><br/>
  <code>Principal Systems Architect & Lead Software Engineer</code><br/>
  <a href="mailto:Bhaanugali@gmail.com">Bhaanugali@gmail.com</a> &bull; <a href="mailto:2400030952@kluniversity.in">2400030952@kluniversity.in</a> &bull; <a href="https://github.com/BhaanuG/Academic-Registration-Portal-Y23">GitHub Repository</a>
</p>

---

<p align="center">
  <a href="#-system-architecture--technical-topology"><img src="https://img.shields.io/badge/Architecture-Deterministic%20Eligibility%20Engine-blueviolet?style=for-the-badge" alt="Architecture" /></a>
  <a href="#-technology-stack--runtime-specifications"><img src="https://img.shields.io/badge/Next.js-16.4.6%20(Turbopack)-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js 16" /></a>
  <a href="#-technology-stack--runtime-specifications"><img src="https://img.shields.io/badge/React-19.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 19" /></a>
  <a href="#-technology-stack--runtime-specifications"><img src="https://img.shields.io/badge/React%20Router-8.5.1-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white" alt="React Router 8" /></a>
  <a href="#-technology-stack--runtime-specifications"><img src="https://img.shields.io/badge/TailwindCSS-v4.0-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="TailwindCSS v4" /></a>
  <a href="#-technology-stack--runtime-specifications"><img src="https://img.shields.io/badge/SQLite-Native%20Node.js%20(node%3Asqlite)-003B57?style=for-the-badge&logo=sqlite&logoColor=white" alt="SQLite Engine" /></a>
  <a href="#-technology-stack--runtime-specifications"><img src="https://img.shields.io/badge/Node.js-22.x%20%2F%2024.x%20LTS-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js LTS" /></a>
</p>

</div>

---

## 📌 Executive Overview

The **KLEF Academic Registration Portal (Y23)** is an institutional-grade, full-lifecycle web platform built for **Koneru Lakshmaiah Education Foundation (KLEF Deemed-to-be University)**. 

Engineered specifically for undergraduate engineering cohorts, this system coordinates student subject selection across multi-credit curricular buckets, enforces strict cohort eligibility constraints, captures granular faculty allocation preferences across multi-tier lecture and laboratory components, and supplies administrative oversight through a centralized command console.

---

## 🌟 Key Functional Pillars

1. **Deterministic Specialization & Cluster Locking**:
   - Automatically resolves each student's specialization (e.g. *Data Science & Big Data Analytics*, *Cloud Native Software Engineering*, *Generative AI & Multi-Modal Intelligence*, etc.) to their designated section cluster:
     - **Cluster 1 (`S1 — S50`)**: Aligned with software engineering, cloud architecture, and data engineering cohorts.
     - **Cluster 2 (`S51 — S100`)**: Aligned with advanced artificial intelligence, computational systems, and robotics cohorts.
   - Prevents accidental cross-cohort enrollment while allowing clean auditability.

2. **Multi-Bucket Curricular Framework**:
   - Governs courses across 7 distinct academic buckets (C0 through C8), including Core Subjects, Professional Electives (PE), Open Electives (OE), and Specialized Career Track (CRT/Audit) offerings.
   - Live credit accumulation tracker ensuring strict adherence to degree completion criteria.

3. **Multi-Tiered Faculty Preference Engine**:
   - Empowers students to rank their 1st, 2nd, and 3rd choices for Lecture instructors.
   - Selecting a lecture section dynamically unlocks contextual sub-rankings for corresponding Tutorial (T), Practical (P), and Skill (S) laboratory mentors.
   - Supports exportable PDF & PNG verification proofs of recorded preferences.

4. **Zero-UI Silent Auto-Save Persistence**:
   - All student choices (cluster confirmations, course selections, and faculty rankings) auto-save in real time without intrusive popups or disruptive UI banners.
   - Sessions seamlessly persist across window refreshes, tab closures, and multi-day logins.

5. **Institutional Routing System**:
   - Institutionalized, deterministic `.php` URL routes:
     - **Sign-in Gateway**: `/KLEF/8-2/GBS.php`
     - **Student Portal**: `/KLEF/8-2/{studentId}/{studentName}/{pageName}.php` (e.g., `Academic-Overview.php`, `Cluster-Selection.php`, `Subject-Selection.php`, `Faculty-Preferences.php`, `Faculty-Directory.php`, `My-Preference.php`, `My-Profile.php`)
     - **Admin Portal**: `/KLEF/8-2/Admin/G-Bhaanu-Sai/{pageName}.php` (e.g., `Dashboard.php`, `Students.php`, `Faculty.php`, `Buckets.php`, `Courses.php`)
     - **Developer Page**: `/KLEF/8-2/Developer/G-Bhaanu-Sai.php`

6. **Administrative Console**:
   - Comprehensive controls to inspect, filter, add, edit, or remove student profiles, faculty allocations, and course bucket configurations.

---

## 🏗️ Technical Architecture & Project Structure

```
Academic-Registration-Portal-Y23/
├── public/                               # Static assets and brand collateral
│   ├── assets/                           # Official KLEF logos and university emblems
│   └── favicon.png                       # Browser favicon
├── src/
│   ├── app/                              # Next.js 16 App Router foundation
│   │   └── (frontend)/
│   │       ├── [...slug]/page.jsx        # Catch-all client-side router delegate
│   │       ├── portal-api/               # REST API endpoints for institutional records
│   │       ├── styles/                   # Per-page modular CSS stylesheets
│   │       ├── layout.jsx                # Root HTML document and font definitions
│   │       └── styles.css                # Global theme tokens and Tailwind CSS imports
│   ├── lib/
│   │   ├── db/
│   │   │   ├── client.js                 # SQLite database connection & schema bootstrapping
│   │   │   ├── eligibilityEngine.js      # Deterministic academic qualification rules
│   │   │   ├── optionSheetRules.json     # Institutional section ranges per specialization
│   │   │   └── queries.js                # High-performance analytical database queries
│   │   └── portal-auth.js                # Session authentication and cookie tokens
│   └── portal/                           # Client-side React 19 application
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
│       └── utils/                        # URL route builders & validation routines
├── next.config.mjs                       # Next.js standalone build configuration
├── package.json                          # Project dependencies and lifecycle scripts
├── tsconfig.json                         # TypeScript compiler settings
└── LICENSE                               # MIT License legal terms
```

---

## 🛠️ Installation & Local Development

### Prerequisites
- **Node.js**: `v20.x`, `v22.x`, or `v24.x` LTS
- **Package Manager**: `npm` (v10+) or `pnpm` (v9+)
- **Git**

### 1. Clone the Repository
```bash
git clone https://github.com/BhaanuG/Academic-Registration-Portal-Y23.git
cd "Academic-Registration-Portal-Y23"
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser. The app will automatically redirect to `/KLEF/8-2/GBS.php`.

### 4. Build for Production
```bash
npm run build
```

---

## 👨‍💻 Author & Principal Architect

<table align="center">
  <tr>
    <td align="center">
      <a href="https://github.com/BhaanuG">
        <img src="https://github.com/BhaanuG.png" width="115px;" alt="Bhaanu Gali" style="border-radius: 50%; box-shadow: 0 4px 12px rgba(0,0,0,0.2);" /><br /><br />
        <sub><b>Bhaanu G (Bhaanu Gali)</b></sub>
      </a><br />
      <code>Principal Systems Architect & Lead Software Engineer</code><br />
      <a href="mailto:Bhaanugali@gmail.com">Bhaanugali@gmail.com</a> &bull; <a href="mailto:2400030952@kluniversity.in">2400030952@kluniversity.in</a>
    </td>
  </tr>
</table>

Developed for and maintained under the academic governance of **Koneru Lakshmaiah Education Foundation (KLEF Deemed-to-be University)**.

---

## 📄 Open Source Governance

- **[LICENSE](LICENSE)**: MIT License terms (Copyright &copy; 2026 Bhaanu G).
- **[CONTRIBUTING.md](CONTRIBUTING.md)**: Contribution guidelines and pull request workflows.
- **[CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)**: Community standards and enforcement guidelines.
- **[SECURITY.md](SECURITY.md)**: Security vulnerability disclosure and reporting protocol.
- **[ACCESSIBILITY.md](ACCESSIBILITY.md)**: WCAG 2.1 AA accessibility commitments and testing practices.
