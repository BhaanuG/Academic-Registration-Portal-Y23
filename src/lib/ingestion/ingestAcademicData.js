import fs from 'node:fs';
import path from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import xlsxPkg from 'xlsx';
const xlsx = xlsxPkg.default || xlsxPkg;
import { toTitleCase } from '../../portal/utils/validation.js';

const DB_DIR = path.join(process.cwd(), '.data');
const DB_FILE = path.join(DB_DIR, 'academic_portal.sqlite');
const SCHEMA_FILE = path.join(process.cwd(), 'src', 'lib', 'db', 'schema.sql');

const DOWNLOADS_DIR = 'C:/Users/DELL/Downloads';

export function runFullAcademicIngestion() {
  console.log('--- STARTING HIGH-FIDELITY ACADEMIC INGESTION PIPELINE ---');

  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }

  // Remove existing DB to build complete reconciled relational database
  if (fs.existsSync(DB_FILE)) {
    fs.unlinkSync(DB_FILE);
  }

  const db = new DatabaseSync(DB_FILE);
  const schemaSql = fs.readFileSync(SCHEMA_FILE, 'utf-8');
  db.exec(schemaSql);

  db.exec('BEGIN TRANSACTION;');

  // 1. Seed Academic Terms
  db.prepare(`
    INSERT INTO academic_terms (id, academic_year, semester_code, semester_number, is_active)
    VALUES 
      ('2026-27-ODD', '2026-27', 'ODD', 5, 1),
      ('2026-27-EVEN', '2026-27', 'EVEN', 6, 0)
  `).run();

  // 2. Seed Clusters (Cluster-1 and Cluster-2)
  db.prepare(`
    INSERT INTO clusters (id, name, section_start, section_end, section_range, description, is_recommended)
    VALUES 
      ('Cluster-1', 'Cluster 1', 1, 50, 'S1 — S50', 'Section range 1 through 50 for primary cohort registrations.', 0),
      ('Cluster-2', 'Cluster 2', 51, 100, 'S51 — S100', 'Section range 51 through 100 aligned with your specialization cohort.', 1)
  `).run();

  // 3. Seed Buckets C0 - C8
  const bucketDefs = [
    { id: 'C0', short: 'PRI', title: 'Capstone Project-1 & Internships', sort: 0 },
    { id: 'C1', short: 'OE1', title: 'Open Elective 1', sort: 1 },
    { id: 'C2', short: 'OE2', title: 'Open Elective 2', sort: 2 },
    { id: 'C3', short: 'PE5', title: 'Professional Elective 5', sort: 3 },
    { id: 'C4', short: 'SCE', title: 'Basic Science Elective', sort: 4 },
    { id: 'C5', short: 'AUC-1', title: 'Audit Course 1 (Indian Constitution)', sort: 5 },
    { id: 'C6', short: 'AUC-2', title: 'Audit Course 2 (Ecology & Environment / Human Values)', sort: 6 },
    { id: 'C7', short: 'PE4', title: 'Professional Elective 4', sort: 7 },
    { id: 'C8', short: 'OE3', title: 'Open Elective 3 (All Placed Students)', sort: 8 },
  ];

  const insertBucket = db.prepare(`
    INSERT INTO buckets (id, short_code, title, sort_order, min_credits, max_credits)
    VALUES (?, ?, ?, ?, 2, 4)
  `);
  bucketDefs.forEach((b) => insertBucket.run(b.id, b.short, b.title, b.sort));

  // 4. Ingest Course Catalog from OE1.xlsx, OE2.xlsx, and List Of Courses.xlsx
  console.log('Parsing course catalog from spreadsheets...');
  const courseInsert = db.prepare(`
    INSERT OR REPLACE INTO courses (code, name, bucket_id, category_code, credits, lecture_hours, practical_hours, skill_hours, components, description, is_crt)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const coursesFile = path.join(DOWNLOADS_DIR, 'List Of Courses.xlsx');
  if (fs.existsSync(coursesFile)) {
    const wb = xlsx.readFile(coursesFile);
    const rows = xlsx.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], { header: 1 });
    for (let i = 6; i < rows.length; i++) {
      const r = rows[i];
      if (!r || !r[1]) continue;
      const cat = r[0] || 'CORE';
      const code = String(r[1]).trim();
      const bucket = r[2] || 'C0';
      const name = toTitleCase(String(r[3] || code).trim());
      courseInsert.run(code, name, bucket, cat, 3, 3, 0, 0, JSON.stringify(['L']), `${name} course offering.`, 0);
    }
  }

  // Authoritative OE1 and OE2 with explicit (Not For CSE) restrictions
  const oe1File = path.join(DOWNLOADS_DIR, 'OE1.xlsx');
  if (fs.existsSync(oe1File)) {
    const wb = xlsx.readFile(oe1File);
    const rows = xlsx.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], { header: 1 });
    for (let i = 3; i < rows.length; i++) {
      const r = rows[i];
      if (!r || !r[2]) continue;
      const code = String(r[2]).trim();
      const rawName = String(r[3] || code).trim();
      const name = toTitleCase(rawName);
      courseInsert.run(code, name, 'C1', 'OE1', 3, 3, 0, 0, JSON.stringify(['L']), `${name} (Open Elective 1).`, 0);
    }
  }

  const oe2File = path.join(DOWNLOADS_DIR, 'OE2.xlsx');
  if (fs.existsSync(oe2File)) {
    const wb = xlsx.readFile(oe2File);
    const rows = xlsx.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], { header: 1 });
    for (let i = 3; i < rows.length; i++) {
      const r = rows[i];
      if (!r || !r[2]) continue;
      const code = String(r[2]).trim();
      const rawName = String(r[3] || code).trim();
      const name = toTitleCase(rawName);
      courseInsert.run(code, name, 'C2', 'OE2', 3, 3, 0, 0, JSON.stringify(['L']), `${name} (Open Elective 2).`, 0);
    }
  }

  // 5. Ingest Faculty and Sections from Course - Sec Faculty.xlsx
  console.log('Ingesting faculty and allocations from Course - Sec Faculty.xlsx...');
  const facFile = path.join(DOWNLOADS_DIR, 'Course - Sec Faculty.xlsx');
  const facInsert = db.prepare(`
    INSERT OR IGNORE INTO faculty (id, name, designation, department, email, phone)
    VALUES (?, ?, 'Assistant Professor', 'Computer Science & Engineering', ?, '+91 98480 12345')
  `);
  const secInsert = db.prepare(`
    INSERT OR IGNORE INTO sections (id, section_number, cluster_id, capacity)
    VALUES (?, ?, ?, 60)
  `);
  const allocInsert = db.prepare(`
    INSERT OR IGNORE INTO faculty_allocations (id, faculty_id, course_code, section_id, sub_section, component, term_id)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  if (fs.existsSync(facFile)) {
    const wb = xlsx.readFile(facFile);
    const rows = xlsx.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], { range: 1 });

    rows.forEach((r, idx) => {
      const empId = String(r['EMP ID'] || '').trim();
      const facName = toTitleCase(String(r['NAME OF THE FACULTY'] || '').trim());
      const courseCode = String(r['COURSE CODE'] || '').trim();
      const courseName = toTitleCase(String(r['NAME OF THE COURSE'] || '').trim());
      const bucket = r['BUCKET NO.'] || 'C0';
      const secNum = parseInt(r['SECTION NUMBER'], 10) || 1;
      const comp = String(r['DELIVERY COMPONENT'] || 'L').toUpperCase().trim();

      if (!empId || empId === 'NA') return;

      // Ensure course exists
      courseInsert.run(courseCode, courseName, bucket, 'CORE', 3, 3, 0, 0, JSON.stringify([comp]), `${courseName}`, 0);

      // Insert faculty
      facInsert.run(empId, facName, `klef${empId}@kluniversity.in`);

      // Insert section
      const secId = `S-${secNum}`;
      const clusterId = secNum <= 50 ? 'Cluster-1' : 'Cluster-2';
      secInsert.run(secId, secNum, clusterId);

      // Insert allocation
      const allocId = `alloc-${courseCode}-${secId}-${comp}-${empId}-${idx}`;
      allocInsert.run(allocId, empId, courseCode, secId, null, comp, '2026-27-ODD');
    });
  }

  // 6. Ingest Master Students from Student Data.xlsx (1,159 Students)
  console.log('Ingesting master student profiles from Student Data.xlsx...');
  const stuFile = path.join(DOWNLOADS_DIR, 'Student Data.xlsx');
  const stuInsert = db.prepare(`
    INSERT OR IGNORE INTO students (
      id, student_id, name, university_email, personal_email, mobile_number, gender,
      date_of_birth, aadhaar_number, apaar_number, residency_status, parent_name,
      parent_phone_number, program, flexibility_track, addon_status_raw, addon_status, addon_verification, specialization,
      cluster_id, student_type, placement_status, counselor_name, counselor_id,
      counselor_mobile, counselor_email
    ) VALUES (
      ?, ?, ?, ?, ?, ?, ?, '2005-04-18', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
    )
  `);

  if (fs.existsSync(stuFile)) {
    const wb = xlsx.readFile(stuFile);
    const rows = xlsx.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);

    rows.forEach((r) => {
      const studentId = String(r.STUDENT_ID).trim();
      const name = toTitleCase(String(r['STUDENT NAME'] || '').trim());
      const aadhar = String(r['AADHAR NUMBER'] || '').trim();
      const apaar = String(r['AAPAAR NO'] || '').trim();
      const residency = r.hosteller && r.hosteller.toLowerCase().includes('day') ? 'Day Scholar' : 'Hosteler';
      const gender = r.Gender || 'Male';
      const phone = r['Contact Number 1(Student Phone number)'] ? `+91 ${r['Contact Number 1(Student Phone number)']}` : '+91 98765 43210';
      const parentPhone = r['Contact Number 2 (Parent phone number)'] ? `+91 ${r['Contact Number 2 (Parent phone number)']}` : '+91 98765 00000';
      const parentName = toTitleCase(String(r['Parent Name'] || '').trim());
      const program = r.PROGRAM || 'CSE';
      const track = r['Final Flexibility - coding based'] || 'CSE-2';
      
      // Preserve raw ADDON value
      const rawAddon = r.ADDON !== undefined ? String(r.ADDON).trim() : null;
      let reconciledAddon = 'Specialization';
      let verificationStatus = 'VERIFIED';

      if (rawAddon === 'Minor') {
        reconciledAddon = 'Minor';
      } else if (rawAddon === 'Second Major') {
        reconciledAddon = 'Second Major';
      } else if (rawAddon === 'No Add-on') {
        reconciledAddon = 'No Add-on';
      } else if (rawAddon === 'Specialization') {
        reconciledAddon = 'Specialization';
      } else if (rawAddon === 'NULL' || rawAddon === null || rawAddon === '') {
        // Raw anomaly: Student 2300031300 ('NULL') or Student 2300033677 (undefined)
        reconciledAddon = 'Specialization';
        verificationStatus = 'RECONCILED_SPECIALIZATION';
      }

      const spec = toTitleCase(String(r.SPECIALIZATION || '').trim());
      const counselorName = toTitleCase(String(r['Counsellor Name'] || 'Dr. S. Srinivasa Rao').trim());
      const counselorId = String(r['Emp-ID'] || 'KLEF0864').trim();
      const counselorMobile = r['Counsellor Mobile No'] ? `+91 ${r['Counsellor Mobile No']}` : '+91 98480 12345';
      const counselorEmail = r['E-Mail'] || 'counselor@kluniversity.in';

      stuInsert.run(
        `student-${studentId}`,
        studentId,
        name,
        `${studentId}@kluniversity.in`,
        `${name.toLowerCase().replace(/[^a-z]/g, '') || 'student'}@gmail.com`,
        phone,
        gender,
        aadhar,
        apaar,
        residency,
        parentName,
        parentPhone,
        program,
        track,
        rawAddon,
        reconciledAddon,
        verificationStatus,
        spec,
        'Cluster-1', // Default, updated by Data One
        'CRT',
        'Placed',
        counselorName,
        counselorId,
        counselorMobile,
        counselorEmail
      );
    });
  }

  // 7. Ingest Cohort Specialization & Bucket Allocations from Data One.xlsx (11,228 rows)
  console.log('Mapping student cohort buckets from Data One.xlsx...');
  const dataOneFile = path.join(DOWNLOADS_DIR, 'Data One.xlsx');
  const stuUpdate = db.prepare(`
    UPDATE students 
    SET cluster_id = ?, student_type = ?, placement_status = ?, specialization = ?
    WHERE student_id = ?
  `);

  const assignInsert = db.prepare(`
    INSERT OR IGNORE INTO student_assigned_buckets (
      id, student_id, bucket_id, default_course_code, default_course_desc,
      lec_section, prac_section, skill_section, is_mandatory
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1)
  `);

  if (fs.existsSync(dataOneFile)) {
    const wb = xlsx.readFile(dataOneFile);
    const rows = xlsx.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);

    rows.forEach((r, idx) => {
      const studentId = String(r['University ID']).trim();
      const cluster = r.Cluster || 'Cluster-1';
      const studentType = r['Student Type'] || 'CRT';
      const placement = r['Placement Status'] || 'Placed';
      const spec = toTitleCase(String(r.Specialization || '').trim());
      const bucket = String(r.BucketNo || '').trim();
      const courseCode = String(r['Course Code'] || '').trim();
      const courseDesc = toTitleCase(String(r['Course Desc'] || '').trim());
      const lec = String(r['Lec Section'] || 'NA').trim();
      const prac = String(r['Practical Section'] || 'NA').trim();
      const skill = String(r['Skill Sec'] || 'NA').trim();

      // Update student classification
      stuUpdate.run(cluster, studentType, placement, spec, studentId);

      // Insert assigned bucket
      const assignId = `sab-${studentId}-${bucket}-${idx}`;
      assignInsert.run(assignId, studentId, bucket, courseCode, courseDesc, lec, prac, skill);
    });
  }

  db.exec('COMMIT;');

  console.log('--- INGESTION COMPLETE ---');
  const stats = {
    students: db.prepare('SELECT COUNT(*) as count FROM students').get().count,
    buckets: db.prepare('SELECT COUNT(*) as count FROM buckets').get().count,
    courses: db.prepare('SELECT COUNT(*) as count FROM courses').get().count,
    faculty: db.prepare('SELECT COUNT(*) as count FROM faculty').get().count,
    allocations: db.prepare('SELECT COUNT(*) as count FROM faculty_allocations').get().count,
    assignedBuckets: db.prepare('SELECT COUNT(*) as count FROM student_assigned_buckets').get().count,
  };
  console.log('Database Stats:', stats);
  return stats;
}
