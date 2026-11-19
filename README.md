<div align="center">

<a href="https://github.com/BhaanuG/Academic-Registration-Portal-Y23">
  <img src="public/assets/klef-logo.png" alt="KLEF University Logo" width="360" style="object-fit: contain; border-radius: 10px;" />
</a>

# Academic Registration Portal (Y23 Cohort)

### Course Registration & Faculty Preference Platform
**KLEF Deemed-to-be University (KL University)**  
*Department of Computer Science & Engineering*

<p align="center">
  <b>Built by <a href="mailto:Bhaanugali@gmail.com">Bhaanu G (Bhaanu Gali)</a></b><br/>
  <code>Registration Number: 2400030952</code> &bull; 
  <a href="mailto:Bhaanugali@gmail.com">Bhaanugali@gmail.com</a> &bull; 
  <a href="mailto:2400030952@kluniversity.in">2400030952@kluniversity.in</a> &bull; 
  <a href="https://github.com/BhaanuG/Academic-Registration-Portal-Y23">GitHub</a>
</p>

---

<p align="center">
  <img src="https://img.shields.io/badge/Students-1%2C159%20Enrolled-blue?style=flat-square" alt="Students" />
  <img src="https://img.shields.io/badge/Faculty-426%20Professors-indigo?style=flat-square" alt="Faculty" />
  <img src="https://img.shields.io/badge/Courses-102%20Subjects-orange?style=flat-square" alt="Courses" />
  <img src="https://img.shields.io/badge/Next.js-16.4.6-black?style=flat-square&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19.3.1-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React 19" />
  <img src="https://img.shields.io/badge/Tailwind-v4.0-38BDF8?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Database-SQLite-003B57?style=flat-square&logo=sqlite&logoColor=white" alt="SQLite" />
</p>

</div>

---

## What is this project?

Every semester at KL University, more than a thousand engineering students have to register for their upcoming courses and choose which faculty members they want to study under. 

In past years, this process was chaotic. Hundreds of students would log on at the exact same moment. Forms would crash, selections would vanish if someone’s Wi-Fi dropped for a second, students would accidentally pick classes that had time clashes with other subjects, or they would sign up for sections meant for an entirely different branch.

I built this portal to fix that entire experience. It is a single, clean web platform that guides every student through choosing their semester courses, guarantees they stay in their correct section cluster, lets them rank their preferred professors, and saves everything automatically in real time so nobody ever loses their progress.

---

## How it works (The student journey)

Here is how a student actually uses the portal from start to finish:

1. **Sign in with Student ID & DOB**  
   Students go to `/KLEF/8-2/GBS.php` and log in with their 10-digit university registration number and Date of Birth. There are no complicated passwords to remember or reset.
2. **Dashboard Overview (`Academic-Overview.php`)**  
   Once in, the student sees their personal dashboard: their academic progress, how many credits they need this semester, who their academic counselor is, and their contact information.
3. **Cohort Confirmation (`Cluster-Selection.php`)**  
   The portal looks at the student’s specialization (for example, *AI & Data Science*, *Cloud Computing*, *DevOps*, etc.) and automatically locks them into their official section group:
   - **Cluster 1:** Sections `S1` through `S50`
   - **Cluster 2:** Sections `S51` through `S100`  
   Students cannot mistakenly switch clusters. This prevents classroom overcrowding and schedule clashes across branches.
4. **Course Selection (`Subject-Selection.php`)**  
   The semester curriculum is divided into 7 structured course buckets (Core Capstone project, Open Electives, Professional Electives, and Skill/Audit courses). As students select their subjects, a live credit meter shows their total credits so they know they are meeting degree requirements.
5. **Faculty Preferences (`Faculty-Preferences.php`)**  
   For every subject, students rank their **1st, 2nd, and 3rd choice professors** for lectures. Picking a lecture professor also unlocks the specific tutorial and lab sub-sections tied to that professor, so students can rank their lab and practice mentors as well.
6. **Review and Download Receipts (`My-Preference.php` & `Faculty-Directory.php`)**  
   Once selections are finished, students can view their complete timetable choices. They can download an **official PDF faculty directory** and a **PNG image receipt** of their choices as proof of submission.

---

## The key numbers behind the portal

I built this platform around the real, production academic data for the CSE Y23 batch at KL University:

- **1,159 registered students** across 17 different specialization branches.
- **426 active professors, associate professors, and assistant professors**.
- **682 concrete teaching allocations** across lectures, lab sessions, and tutorials.
- **102 distinct courses** in the university curriculum.
- **9 curricular buckets (C0 through C8)** covering everything from capstones to ethics.
- **2 balanced clusters:** Cluster 1 (646 students) and Cluster 2 (512 students).

---

## Special features I focused on

### 1. Silent, instant auto-save
One of the most frustrating things on student portals is filling out 15 dropdowns, clicking "Next", and seeing an error screen that wipes all your choices. 

In this portal, every single button click, subject pick, and faculty ranking saves in the background immediately. There are no annoying popup dialogs or loading spinners telling you it's saving. If a student accidentally closes their browser or their laptop runs out of battery, they can reopen the portal hours later and pick up right where they stopped.

### 2. Automatic cluster assignment by degree
Students don't need to guess which section group they belong to. The system checks their enrolled specialization:
- Software engineering, cloud architecture, and data engineering tracks automatically map to **Cluster 1**.
- Artificial intelligence, robotics, computational intelligence, and electronics tracks automatically map to **Cluster 2**.

The cards show the student's assigned group as **Assigned Cohort** and lock the other one, keeping the entire student body organized without manual administrative sorting.

### 3. Cascading faculty choices (Lecture ➔ Lab)
Teaching arrangements aren't just one professor teaching one class. A course often has a lecture teacher, a tutorial teacher, and a practical lab teacher. When a student picks a professor for lectures, the portal intelligently figures out which lab sections belong to that professor and lets the student rank their sub-preferences.

### 4. Admin control room
For college coordinators and administrators, there is an administrative workspace (`/KLEF/8-2/Admin/G-Bhaanu-Sai/Dashboard.php`). Admins can search, view, edit, and manage all 1,159 student profiles, see teacher assignments, view course credit limits, and check overall registration stats.

---

## Official page URLs

All pages in the portal use clean `.php` addresses matching standard university enterprise systems:

| Page | URL | Who uses it | What it is for |
| :--- | :--- | :--- | :--- |
| **Sign-In** | `/KLEF/8-2/GBS.php` | Everyone | Login with student ID and Date of Birth |
| **Dashboard** | `/KLEF/8-2/{id}/{name}/Academic-Overview.php` | Students | Progress, credit summary, and counselor info |
| **Cluster** | `/KLEF/8-2/{id}/{name}/Cluster-Selection.php` | Students | View your specialization cohort (Cluster 1 or 2) |
| **Courses** | `/KLEF/8-2/{id}/{name}/Subject-Selection.php` | Students | Pick your 7 bucket subjects |
| **Faculty** | `/KLEF/8-2/{id}/{name}/Faculty-Preferences.php` | Students | Rank 1st, 2nd, and 3rd choice professors |
| **Directory** | `/KLEF/8-2/{id}/{name}/Faculty-Directory.php` | Students | Searchable staff directory with PDF download |
| **Summary** | `/KLEF/8-2/{id}/{name}/My-Preference.php` | Students | Final review grid with PNG proof download |
| **Profile** | `/KLEF/8-2/{id}/{name}/My-Profile.php` | Students | Personal info, Aadhaar, and password management |
| **Admin** | `/KLEF/8-2/Admin/G-Bhaanu-Sai/Dashboard.php` | Admin | Overall registration stats and quick actions |
| **Students** | `/KLEF/8-2/Admin/G-Bhaanu-Sai/Students.php` | Admin | Search and edit all 1,159 student records |
| **Teachers** | `/KLEF/8-2/Admin/G-Bhaanu-Sai/Faculty.php` | Admin | Search and inspect 426 faculty assignments |
| **Buckets** | `/KLEF/8-2/Admin/G-Bhaanu-Sai/Buckets.php` | Admin | Configure academic bucket rules |
| **Catalog** | `/KLEF/8-2/Admin/G-Bhaanu-Sai/Courses.php` | Admin | View all 102 curriculum courses |
| **About Me** | `/KLEF/8-2/Developer/G-Bhaanu-Sai.php` | Everyone | Developer portfolio and bio |

---

## Tech stack

I chose technologies that keep the app fast, simple to maintain, and capable of handling high traffic without slowing down:

- **Frontend:** React 19 and Next.js 16 (App Router) with React Router 8 for instant page transitions.
- **Styling:** Tailwind CSS v4 with modular CSS sheets for each page.
- **Database:** Native Node.js SQLite (`node:sqlite`) for quick database reads without external database server overhead.
- **Exports:** `jsPDF` for generating PDF faculty rosters and `html2canvas` for downloading PNG receipts.
- **Icons:** Lucide React for consistent, clean navigation icons.

---

## Project structure

Here is how the project files are organized:

```
Academic-Registration-Portal-Y23/
├── public/
│   ├── assets/
│   │   └── klef-logo.png              # KLEF University logo
│   └── favicon.png                    # Browser icon
├── src/
│   ├── app/(frontend)/
│   │   ├── [...slug]/page.jsx         # Catch-all route handler
│   │   ├── portal-api/                # API routes for student & course data
│   │   ├── styles/                    # Individual CSS files for each page
│   │   ├── layout.jsx                 # Main HTML layout wrapper
│   │   └── styles.css                 # Global styles and Tailwind imports
│   ├── lib/
│   │   ├── db/
│   │   │   ├── client.js              # SQLite database setup
│   │   │   ├── eligibilityEngine.js   # Specialization and cluster logic
│   │   │   ├── optionSheetRules.json  # Department section boundaries
│   │   │   ├── queries.js             # Database search and get queries
│   │   │   └── schema.sql             # Full database structure
│   │   └── portal-auth.js             # Sign-in and session verification
│   └── portal/
│       ├── app/
│       │   ├── App.jsx                # Top-level React app component
│       │   └── routes.jsx             # All .php route definitions
│       ├── components/                # Reusable UI cards, headers, inputs
│       ├── pages/                     # The actual pages (Overview, Faculty, Admin, etc.)
│       └── services/                  # Auto-save handlers and local database records
├── next.config.mjs                    # Next.js configuration
├── package.json                       # Dependencies list
├── tsconfig.json                      # TypeScript settings
├── LICENSE                            # MIT License
├── CONTRIBUTING.md                    # Guidelines for contributing
├── CODE_OF_CONDUCT.md                # Community standards
├── SECURITY.md                        # Security report instructions
└── ACCESSIBILITY.md                   # WCAG accessibility practices
```

---

## Running the project locally

If you want to run this project on your own machine:

### Requirements
- Node.js (version 20, 22, or 24)
- Git

### 1. Clone the repository
```bash
git clone https://github.com/BhaanuG/Academic-Registration-Portal-Y23.git
cd "Academic-Registration-Portal-Y23"
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the dev server
```bash
npm run dev
```

### 4. Build for production
```bash
npm run build
```

---

## Author

<table align="center">
  <tr>
    <td align="center">
      <a href="https://github.com/BhaanuG">
        <img src="https://github.com/BhaanuG.png" width="110px;" alt="Bhaanu Gali" style="border-radius: 50%;" /><br /><br />
        <b>Bhaanu G (Bhaanu Gali)</b>
      </a><br />
      Lead Developer & Systems Architect<br />
      <a href="mailto:Bhaanugali@gmail.com">Bhaanugali@gmail.com</a> &bull; 
      <a href="mailto:2400030952@kluniversity.in">2400030952@kluniversity.in</a>
    </td>
  </tr>
</table>

<p align="center">
  Developed for and maintained under the academic governance of <b>Koneru Lakshmaiah Education Foundation (KLEF Deemed-to-be University)</b>.
</p>

---

## Project documentation

- **[LICENSE](LICENSE)**: MIT License terms.
- **[CONTRIBUTING.md](CONTRIBUTING.md)**: How to contribute code or report bugs.
- **[CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)**: Community rules and standards.
- **[SECURITY.md](SECURITY.md)**: How to report security issues privately.
- **[ACCESSIBILITY.md](ACCESSIBILITY.md)**: Accessibility features and guidelines.
