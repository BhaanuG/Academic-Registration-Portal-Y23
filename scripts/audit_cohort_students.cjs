const db = require('./src/lib/db/database').getDatabase();
const { eligibilityEngine } = require('./src/lib/db/eligibilityEngine');

const cohorts = [
  { desc: 'CRT Placed C1', q: "SELECT * FROM students WHERE cluster_id='Cluster-1' AND student_type='CRT' AND placement_status='Placed' LIMIT 1" },
  { desc: 'CRT YTB Placed C1', q: "SELECT * FROM students WHERE cluster_id='Cluster-1' AND student_type='CRT' AND placement_status='YTB Placed' LIMIT 1" },
  { desc: 'NonCRT YTB Placed C1', q: "SELECT * FROM students WHERE cluster_id='Cluster-1' AND student_type='NonCRT' AND placement_status='YTB Placed' LIMIT 1" },
  { desc: 'NonCRT-PS YTB Placed C1', q: "SELECT * FROM students WHERE student_type='NonCRT-PS' LIMIT 1" },
  { desc: 'CRT-ICP', q: "SELECT * FROM students WHERE student_type LIKE '%ICP%' LIMIT 1" },
  { desc: 'Cluster-2 CRT', q: "SELECT * FROM students WHERE cluster_id='Cluster-2' AND student_type='CRT' LIMIT 1" },
  { desc: 'Cluster-2 NonCRT', q: "SELECT * FROM students WHERE cluster_id='Cluster-2' AND student_type='NonCRT' LIMIT 1" },
];

cohorts.forEach(c => {
  const row = db.prepare(c.q).get();
  console.log('===', c.desc, '===');
  console.log('Student:', row.id, row.name, '| Spec:', row.specialization, '| Type:', row.student_type, '| Status:', row.placement_status, '| Cluster:', row.cluster_id);
  
  const assigned = db.prepare('SELECT bucket_id, default_course_code, default_course_desc, lec_section, prac_section, skill_section FROM student_assigned_buckets WHERE student_id = ? ORDER BY bucket_id').all(row.id);
  console.log('Assigned buckets count:', assigned.length);
  assigned.forEach(a => {
    console.log(`  [${a.bucket_id}] ${a.default_course_code}: Lec=${a.lec_section}, Prac=${a.prac_section}, Skill=${a.skill_section}`);
  });
});
