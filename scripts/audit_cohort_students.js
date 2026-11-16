import { getDatabase } from '../src/lib/db/client.js';
import { eligibilityEngine } from '../src/lib/db/eligibilityEngine.js';

const db = getDatabase();
const cohorts = [
  { desc: 'CRT Placed C1', q: "SELECT * FROM students WHERE cluster_id='Cluster-1' AND student_type='CRT' AND placement_status='Placed' LIMIT 1" },
  { desc: 'CRT YTB Placed C1', q: "SELECT * FROM students WHERE cluster_id='Cluster-1' AND student_type='CRT' AND placement_status='YTB Placed' LIMIT 1" },
  { desc: 'NonCRT YTB Placed C1', q: "SELECT * FROM students WHERE cluster_id='Cluster-1' AND student_type='NonCRT' AND placement_status='YTB Placed' LIMIT 1" },
  { desc: 'NonCRT-PS YTB Placed C1', q: "SELECT * FROM students WHERE student_type='NonCRT-PS' LIMIT 1" },
  { desc: 'CRT-ICP', q: "SELECT * FROM students WHERE student_type LIKE '%ICP%' LIMIT 1" },
  { desc: 'Cluster-2 CRT', q: "SELECT * FROM students WHERE cluster_id='Cluster-2' AND student_type='CRT' LIMIT 1" },
  { desc: 'Cluster-2 NonCRT', q: "SELECT * FROM students WHERE cluster_id='Cluster-2' AND student_type='NonCRT' LIMIT 1" },
];

for (const c of cohorts) {
  const row = db.prepare(c.q).get();
  console.log('\n=== ' + c.desc + ' ===');
  console.log('Student: ' + row.student_id + ' | ' + row.name + ' | Spec: ' + row.specialization + ' | Type: ' + row.student_type + ' | Status: ' + row.placement_status + ' | Cluster: ' + row.cluster_id);
  const subjects = eligibilityEngine.getStudentAcademicSubjects(row.student_id);
  console.log('Total subjects count:', subjects.length);
  for (const s of subjects) {
    console.log(`  [${s.bucket_id}] ${s.course_code}: sec=${JSON.stringify(s.sections)}, optRange=${s.optionSheetRange}, fac=${s.faculty ? s.faculty.length : 0}, facOpts=${s.faculty_options ? s.faculty_options.length : 0}`);
  }
}
