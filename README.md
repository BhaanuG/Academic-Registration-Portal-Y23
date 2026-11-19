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

## 💡 What Is This Project? (Plain English Guide for Everyone)

> **If you are from a non-technical background, start here!**

Imagine entering a large university with more than **1,000 engineering students**, **400+ professors**, and **100+ subjects**. Every semester, every single student needs to:
1. Pick their semester subjects without taking conflicting classes.
2. Select which professors they want to learn from.
3. Choose laboratory and tutorial sessions that match their timetable.

In the past, this was done using slow paperwork, spreadsheet tables, or clunky forms that crashed when hundreds of students logged in at once. Students would get placed into the wrong classes or lose their work halfway through if their internet dropped.

### What This Website Does:
- **It is a smart online academic advisor and enrollment desk in one place.**
- **Automatic Matching:** When a student logs in with their 10-digit ID, the portal recognizes what branch they are studying (such as *Artificial Intelligence*, *Cybersecurity*, or *Cloud Computing*). It automatically assigns them to their exact group of classes (their **Cohort / Cluster**) so they never sign up for the wrong section.
- **Fair Professor Voting:** Students rank their 1st, 2nd, and 3rd choices for which teacher they prefer for lectures and lab practicals.
- **Zero Work Lost (Auto-Save):** The moment a student clicks a subject or teacher, it saves instantly. If their computer turns off or they close their phone browser, their choices are still there when they reopen the portal.
- **Official Proof Downloads:** When done, students can download an official verification PDF and PNG image of their submitted preferences for their own records.
- **Admin Control Room:** College administrators have a private dashboard to oversee all 1,159 students, update records, and ensure classrooms don't exceed capacity.

---

## 📑 Table of Contents
1. [What Is This Project? (Plain English Guide)](#-what-is-this-project-plain-english-guide-for-everyone)
2. [Step-by-Step Student Journey (How Anyone Uses It)](#-step-by-step-student-journey-how-anyone-uses-it)
3. [The Big Problems It Solves (Before vs. After)](#-the-big-problems-it-solves-before-vs-after)
4. [Scale & Real-World Numbers](#-scale--real-world-numbers)
5. [Specialization-to-Cluster Cohort Locking](#-specialization-to-cluster-cohort-locking)
6. [The 7 Curricular Buckets Explained Simply](#-the-7-curricular-buckets-explained-simply)
7. [Multi-Tier Faculty Preference Engine](#-multi-tier-faculty-preference-engine)
8. [Zero-UI Silent Auto-Save Technology](#-zero-ui-silent-auto-save-technology)
9. [Official Routing System & URL Map](#-official-routing-system--url-map)
10. [Under the Hood: Technologies Used & Why](#-under-the-hood-technologies-used--why)
11. [Detailed Project Directory Map](#-detailed-project-directory-map)
12. [Local Setup & Running the Code](#-local-setup--running-the-code)
13. [Author Attribution & Open-Source Governance](#-author-attribution--open-source-governance)

---

## 🚶 Step-by-Step Student Journey (How Anyone Uses It)

```
   ┌───────────────────┐
   │ 1. Sign-In Screen │  Enter 10-digit Student ID and Date of Birth.
   └─────────┬─────────┘
             │
             ▼
   ┌───────────────────┐
   │ 2. Overview Home  │  See your academic profile, counselor details & live credit count.
   └─────────┬─────────┘
             │
             ▼
   ┌───────────────────┐
   │ 3. Cluster Cohort │  System automatically locks your sections (S1-S50 or S51-S100)
   └─────────┬─────────┘  based on your technology specialization.
             │
             ▼
   ┌───────────────────┐
   │ 4. Course Choice  │  Pick courses across 7 curriculum buckets (Capstones, Electives,
   └─────────┬─────────┘  Ethics, and Placement preparation).
             │
             ▼
   ┌───────────────────┐
   │ 5. Teacher Rank   │  Vote 1st, 2nd, and 3rd choices for Lecture professors.
   └─────────┬─────────┘  Unlocks linked tutorial and lab mentors.
             │
             ▼
   ┌───────────────────┐
   │ 6. Download Proof │  Download official PDF faculty directory & PNG preference card.
   └───────────────────┘
```

1. **Step 1: Simple Sign-In (`/KLEF/8-2/GBS.php`)**  
   Students log in using their 10-digit university ID and their Date of Birth. No complicated extra accounts or forgotten passwords.
2. **Step 2: Academic Overview (`Academic-Overview.php`)**  
   Presents a personal dashboard showing the student's name, assigned counselor, earned credits, and semester goals.
3. **Step 3: Cluster Confirmation (`Cluster-Selection.php`)**  
   Shows the student which group of sections they belong to (Sections 1–50 or Sections 51–100) locked to their field of study.
4. **Step 4: Course Selection (`Subject-Selection.php`)**  
   Presents 7 easy-to-read buckets. As the student clicks subjects, a live credit counter updates automatically (e.g. *22 / 24 Credits Completed*).
5. **Step 5: Teacher Preferences (`Faculty-Preferences.php`)**  
   Students choose their 1st, 2nd, and 3rd choice professors. Picking a lecture professor automatically shows which lab assistants work with them.
6. **Step 6: Review & Download (`My-Preference.php` & `Faculty-Directory.php`)**  
   Displays a clean summary table of everything chosen, with one-click buttons to download an official PDF directory and a high-resolution PNG receipt.

---

## ⚡ The Big Problems It Solves (Before vs. After)

| The Old Way (Manual / Traditional) | The New Portal Way (This Platform) |
| :--- | :--- |
| **Classroom Clashes:** Students could accidentally enroll in two classes scheduled at the same time. | **Cohort-Locked Protection:** Sections are strictly separated so clashes are mathematically impossible. |
| **Wrong Section Registration:** A student studying Artificial Intelligence could enroll in a Web Design lab by mistake. | **Specialization-Locked:** The portal knows the student's degree and shows *only* the classes meant for their group. |
| **Lost Data & Frustration:** If the page refreshed or the Wi-Fi cut out, students lost all their rankings and had to start over. | **Silent Auto-Save:** Every single click saves to local memory in under 5 milliseconds with zero data loss. |
| **Paper Proof Receipts:** Students had to take phone screenshots or get physical slips stamped. | **Instant Export:** Generates clean, formatted PDF rosters and PNG receipts on the fly. |
| **Administrative Nightmare:** University coordinators had to manually clean up overlapping spreadsheets. | **Central Admin Dashboard:** Administrators have live search, filtering, and instant record editing tools. |

---

## 📊 Scale & Real-World Numbers

The portal manages the entire undergraduate engineering registration lifecycle for the Y23 cohort across multiple engineering disciplines:

| Metric | Real Volume | Plain English Meaning |
| :--- | :--- | :--- |
| **Enrolled Students** | **1,159 Students** | Total number of students who register their courses on this site. |
| **Faculty Mentors** | **426 Professors** | Qualified college teachers and lab instructors available for selection. |
| **Teaching Allocations** | **682 Allocations** | Concrete section-level course assignments across Lecture, Practical, Tutorial, and Skill components. |
| **Course Catalog** | **102 Courses** | Engineering subjects offered across Core, Elective, and Specialization tracks. |
| **Curricular Buckets** | **9 Buckets (C0–C8)** | The categories of subjects a student must complete to graduate. |
| **Specialization Tracks** | **17 Specializations** | Specific career focuses (AI, Cloud, Cyber Security, Blockchain, Robotics, etc.). |
| **Section Clusters** | **2 Main Cohorts** | `Cluster 1` (Sections `S1 — S50`) and `Cluster 2` (Sections `S51 — S100`). |

---

## 🔒 Specialization-to-Cluster Cohort Locking

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
        │      (646 Active Students)      │                             │      (512 Active Students)      │
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

---

## 📚 The 7 Curricular Buckets Explained Simply

To ensure every graduate has a complete, well-rounded education, courses are grouped into 7 distinct categories ("buckets"):

1. **Bucket C0 — Capstone Project I (`23IE4053A` / `23IE4053R`)**:
   - The major hands-on engineering project where students build real-world software or hardware prototypes.
2. **Bucket C1 — Open Elective I (OE-1)**:
   - Broadening horizon courses outside computer science (e.g., *Green Architecture*, *Operations Research*, *Bio-informatics*).
3. **Bucket C2 — Open Elective II (OE-2)**:
   - Essential business and law skills (e.g., *Intellectual Property Rights*, *Engineering Economics*, *Disaster Management*).
4. **Bucket C3 — Professional Elective IV (PE-4)**:
   - Advanced technical classes specifically aligned with the student's career track.
5. **Bucket C4 — Professional Elective V (PE-5)**:
   - Deep-dive industry subjects (e.g., *Deep Learning*, *Cloud Security Governance*, *Microservices*).
6. **Bucket C5 — Skill Course / Audit Course I (AUC-1)**:
   - Employability enhancement and Campus Recruitment Training (CRT) to help students ace job interviews.
7. **Bucket C6 — Audit Course II (AUC-2)**:
   - Core ethical and social foundation (Universal Human Values, Constitution of India, Environmental Ethics).

---

## 🎓 Multi-Tier Faculty Preference Engine

The portal gives students a fair, transparent voice in their education:

1. **3-Rank Lecture Preferences:**
   - For every chosen course, the student picks their 1st, 2nd, and 3rd preferred Lecture professors.
2. **Smart Linking for Labs & Tutorials:**
   - When a student picks a lecture professor who teaches in section `S-58`, the system automatically knows which lab assistants and tutorial teachers are tied to section `S-58`. It unlocks dedicated sub-ranking tables for:
     - **Tutorials (T):** Practice and doubt-clearing sessions (`A`, `B`, `C`).
     - **Practicals (P):** Computer lab experiments and coding tasks.
     - **Skills (S):** Practical projects and workshops.
3. **Instant Verification Receipts:**
   - **PDF Faculty Directory:** Generates a professional university document listing all professors in the student's cohort.
   - **PNG Graphical Receipt:** Creates a downloadable image of all confirmed rankings so the student has timestamped proof of submission.

---

## ⚡ Zero-UI Silent Auto-Save Technology

Many online portals frustrate users with constant popups saying *"Saving... Please wait"* or asking *"Are you sure you want to save?"*.

This portal uses a **Zero-UI Silent Auto-Save** mechanism:
- Every time a student selects a course or ranks a professor, the website saves the change in **under 5 milliseconds**.
- There are **no disruptive popups, banners, or loading spinners**.
- If a student's battery dies, laptop restarts, or they log in tomorrow from another room, **everything is right where they left it**.
- Each student's selections are stored under their own unique 10-digit ID, so students sharing the same computer never overwrite each other's work.

---

## 🌐 Official Routing System & URL Map

All portal pages use formal, recognizable `.php` web addresses matching traditional university enterprise software:

| View / Screen | Exact Web URL | Who Uses It | What Happens on This Page |
| :--- | :--- | :--- | :--- |
| **Sign-In Gateway** | `/KLEF/8-2/GBS.php` | Everyone | Student and Administrator login gate. |
| **Student Overview** | `/KLEF/8-2/{studentId}/{studentName}/Academic-Overview.php` | Students | Personal dashboard, registered status, counselor contacts. |
| **Cluster Selection** | `/KLEF/8-2/{studentId}/{studentName}/Cluster-Selection.php` | Students | View and confirm your specialization-assigned cohort. |
| **Course Selection** | `/KLEF/8-2/{studentId}/{studentName}/Subject-Selection.php` | Students | Select courses across the 7 academic buckets. |
| **Faculty Preferences**| `/KLEF/8-2/{studentId}/{studentName}/Faculty-Preferences.php`| Students | Rank your top 3 lecture and lab professors. |
| **Faculty Directory** | `/KLEF/8-2/{studentId}/{studentName}/Faculty-Directory.php` | Students | Searchable professor directory with PDF download. |
| **My Preferences** | `/KLEF/8-2/{studentId}/{studentName}/My-Preference.php` | Students | Review all confirmed choices and download PNG receipt. |
| **Student Profile** | `/KLEF/8-2/{studentId}/{studentName}/My-Profile.php` | Students | View personal records, Aadhaar, APAAR ID, and credentials. |
| **Admin Console** | `/KLEF/8-2/Admin/G-Bhaanu-Sai/Dashboard.php` | Admins | Executive control room with cohort stats and counts. |
| **Admin Students** | `/KLEF/8-2/Admin/G-Bhaanu-Sai/Students.php` | Admins | View, search, and edit all 1,159 student profiles. |
| **Admin Faculty** | `/KLEF/8-2/Admin/G-Bhaanu-Sai/Faculty.php` | Admins | View and search all 426 faculty members. |
| **Admin Buckets** | `/KLEF/8-2/Admin/G-Bhaanu-Sai/Buckets.php` | Admins | Manage curricular bucket rules and credit limits. |
| **Admin Courses** | `/KLEF/8-2/Admin/G-Bhaanu-Sai/Courses.php` | Admins | Manage the 102 active courses in the syllabus. |
| **Developer Bio** | `/KLEF/8-2/Developer/G-Bhaanu-Sai.php` | Everyone | Creator portfolio, engineering story, and contact details. |

---

## 💻 Under the Hood: Technologies Used & Why

For technical reviewers, here is why each modern technology was chosen:

1. **React 19 (`19.3.1`)**: Powers the interactive user interface. Provides smooth, instant screen updates without refreshing the whole page.
2. **Next.js 16 (`16.4.6`) with Turbopack**: The industry-standard framework for building fast, secure web applications. Compiles code in milliseconds.
3. **React Router (`8.5.1`)**: Manages seamless page navigation inside the web app while maintaining clean browser URLs.
4. **Tailwind CSS (`v4.0`)**: A modern styling system used to create custom university designs (official Navy `#1b2d42`, warm gold accents, and crisp typography).
5. **Native Node SQLite (`node:sqlite`)**: A built-in high-speed database that reads student and course records directly in memory, ensuring ultra-fast lookups without server lag.
6. **Lucide Icons (`1.16.0`)**: Lightweight, clean vector symbols for navigation icons, status checkmarks, and alerts.
7. **jsPDF & html2canvas**: Allows students to download real PDF documents and picture receipts directly in their browser without waiting for an email.

---

## 📂 Detailed Project Directory Map

```
Academic-Registration-Portal-Y23/
├── public/
│   ├── assets/
│   │   ├── klef-logo.png                 # Official KLEF University Emblem (63px on signin / 42px on topbar)
│   │   └── klef-crest.png                # High-resolution university seal
│   └── favicon.png                       # Browser tab icon
├── src/
│   ├── app/                              # Next.js App Router foundation
│   │   └── (frontend)/
│   │       ├── [...slug]/page.jsx        # Catch-all page router delegate
│   │       ├── portal-api/               # Fast backend endpoints for student & course data
│   │       ├── styles/                   # Modular CSS stylesheets for each screen
│   │       ├── layout.jsx                # Website layout wrapper and fonts
│   │       ├── page.jsx                  # Root entry redirecting to /KLEF/8-2/GBS.php
│   │       └── styles.css                # Global design tokens and colors
│   ├── lib/
│   │   ├── db/
│   │   │   ├── client.js                 # Database connector and table creation
│   │   │   ├── eligibilityEngine.js      # Rules that match specializations to cohorts
│   │   │   ├── optionSheetRules.json     # Section boundary rules per department
│   │   │   └── queries.js                # Search and data retrieval queries
│   │   └── portal-auth.js                # Safe sign-in verification
│   └── portal/                           # The visual React web application
│       ├── app/
│       │   ├── App.jsx                   # Main frontend container
│       │   └── routes.jsx                # Web page route definitions (.php URLs)
│       ├── components/                   # Reusable UI parts (headers, footers, buttons)
│       ├── pages/                        # Actual visual screens (Overview, Courses, Faculty)
│       ├── services/                     # Background helpers for saving choices & loading data
│       └── utils/                        # URL address helpers and input checks
├── next.config.mjs                       # Production web server configuration
├── package.json                          # List of software libraries used
├── tsconfig.json                         # TypeScript configuration
├── LICENSE                               # Legal open-source license
├── CONTRIBUTING.md                       # Guide for developers wanting to improve the site
├── CODE_OF_CONDUCT.md                   # Community standards
├── SECURITY.md                           # How to report security questions
└── ACCESSIBILITY.md                      # Accessible design rules for all users
```

---

## 🚀 Local Setup & Running the Code

### Prerequisites
- Install **Node.js** (Version 20, 22, or 24) on your computer.
- Install **Git**.

### Step 1: Download the Project
```bash
git clone https://github.com/BhaanuG/Academic-Registration-Portal-Y23.git
cd "Academic-Registration-Portal-Y23"
```

### Step 2: Install Libraries
```bash
npm install
```

### Step 3: Start the Website
```bash
npm run dev
```

### Step 4: Build for Production
```bash
npm run build
```

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
