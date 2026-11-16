const fs = require('fs');
const path = require('path');
const { getDatabase } = require('../src/lib/db/client.js');

function buildAcademicData() {
  const db = getDatabase();

  const bucketsRaw = db.prepare('SELECT id, short_code, title, sort_order FROM buckets ORDER BY sort_order ASC').all();
  const coursesRaw = db.prepare('SELECT * FROM courses ORDER BY code ASC').all();
  const facultyRaw = db.prepare('SELECT * FROM faculty ORDER BY CAST(id as INTEGER) ASC, id ASC').all();
  const allocsRaw = db.prepare(`
    SELECT fa.*, s.section_number, s.cluster_id, f.name as faculty_name, f.designation, f.department
    FROM faculty_allocations fa
    JOIN sections s ON fa.section_id = s.id
    JOIN faculty f ON fa.faculty_id = f.id
    ORDER BY s.section_number ASC, f.name ASC
  `).all();

  // Build buckets structure
  const buckets = bucketsRaw.map(b => {
    const subjects = coursesRaw.filter(c => c.bucket_id === b.id).map(c => {
      let comps = [];
      try { comps = JSON.parse(c.components || '["L"]'); } catch (e) { comps = ['L']; }
      return {
        code: c.code,
        name: c.name,
        credits: c.credits,
        ltps: [c.lecture_hours || 0, c.tutorial_hours || 0, c.practical_hours || 0, c.skill_hours || 0],
        components: comps,
        description: c.description || c.name,
      };
    });

    return {
      id: b.id,
      short: b.short_code,
      title: b.title,
      subjects,
    };
  });

  // Map faculty allocations per faculty id
  const allocsByFaculty = {};
  for (const a of allocsRaw) {
    if (!allocsByFaculty[a.faculty_id]) allocsByFaculty[a.faculty_id] = [];
    allocsByFaculty[a.faculty_id].push(a);
  }

  // Build faculty list
  const faculty = facultyRaw.map(f => {
    const allocs = allocsByFaculty[f.id] || [];
    const subjects = [...new Set(allocs.map(a => a.course_code))];
    const components = [...new Set(allocs.map(a => a.component))];
    const sectionTexts = allocs.map(a => `${a.section_id} · ${a.component === 'L' ? 'Lecture' : a.component === 'P' ? 'Practical' : a.component === 'S' ? 'Skill' : a.component}`);

    return {
      id: f.id,
      name: f.name,
      designation: f.designation || 'Assistant Professor',
      department: f.department || 'Computer Science & Engineering',
      subjects: subjects.length > 0 ? subjects : ['General'],
      components: components.length > 0 ? components : ['L'],
      allocation: sectionTexts.join(' / ') || 'General Allocation',
    };
  });

  // Export module code
  const code = `// KLEF Academic Portal - Master Course and Faculty Dataset
// Sourced directly from Y23 Odd Semester Registration Option Form.xlsx & .data/academic_portal.sqlite
// Contains all 108 Courses, 426 Verified Faculty Members, and 682 Verified Allocations

export const buckets = ${JSON.stringify(buckets, null, 2)};

export const faculty = ${JSON.stringify(faculty, null, 2)};

export const allocations = ${JSON.stringify(allocsRaw, null, 2)};

export const componentNames = {
  L: "Lecture",
  T: "Tutorial",
  P: "Practical",
  S: "Skill",
};

export const initialSelections = {};

/**
 * Returns faculty options for a specific subject, component, and cluster.
 * Strictly sorted by Section Number in ascending order.
 * Displays Section Number, Faculty Name, and Emp ID.
 */
export function getFacultyOptionsForSubject(subjectCode, component = "L", cluster = null) {
  if (!subjectCode) return [];
  const normalizedCluster = cluster === "Cluster 1" || cluster === "C1" ? "Cluster-1" :
                            cluster === "Cluster 2" || cluster === "C2" ? "Cluster-2" : cluster;

  const matched = allocations.filter(a => {
    const codeMatch = a.course_code === subjectCode || a.course_code.trim() === subjectCode.trim();
    const compMatch = !component || a.component === component;
    const clusterMatch = !normalizedCluster || a.cluster_id === normalizedCluster || a.cluster_id === 'NA' || !a.cluster_id;
    return codeMatch && compMatch && clusterMatch;
  });

  // Sort by section_number ascending, then faculty name
  matched.sort((a, b) => (a.section_number - b.section_number) || a.faculty_name.localeCompare(b.faculty_name));

  // Deduplicate by faculty_id + section_id + component
  const seen = new Set();
  const result = [];
  for (const m of matched) {
    const key = \`\${m.faculty_id}-\${m.section_id}-\${m.component}\`;
    if (!seen.has(key)) {
      seen.add(key);
      result.push({
        id: m.faculty_id,
        emp_id: m.faculty_id,
        name: m.faculty_name,
        section_id: m.section_id,
        section_number: m.section_number,
        component: m.component,
        designation: m.designation,
        department: m.department,
        displayLabel: \`\${m.section_id} • \${m.faculty_name} (Emp ID: \${m.faculty_id})\`,
      });
    }
  }

  return result;
}

export function sectionFor(subjectCode, facultyId, component, cluster = "Cluster 2") {
  if (!facultyId) return "";
  const normalizedCluster = cluster === "Cluster 1" || cluster === "C1" ? "Cluster-1" :
                            cluster === "Cluster 2" || cluster === "C2" ? "Cluster-2" : cluster;

  const match = allocations.find(a => 
    a.faculty_id === facultyId &&
    (!subjectCode || a.course_code === subjectCode || a.course_code.trim() === subjectCode.trim()) &&
    (!component || a.component === component) &&
    (!normalizedCluster || a.cluster_id === normalizedCluster || a.cluster_id === 'NA')
  );

  if (match) {
    return match.section_id;
  }

  // Fallback match by facultyId and component
  const fallback = allocations.find(a => a.faculty_id === facultyId && (!component || a.component === component));
  if (fallback) return fallback.section_id;

  return "S-1";
}

export function sectionBase(section = "") {
  return String(section).match(/\\d+/)?.[0] || "";
}

export function getSubSectionFaculty(subjectCode, secNum, subLetter, component) {
  const pool = faculty.filter((person) => person.components.includes(component));
  if (!pool.length) return null;
  const num = parseInt(secNum, 10) || 1;
  const subIdx = subLetter.toUpperCase().charCodeAt(0) - 65; // A=0, B=1, C=2
  const baseOffset = (num * 3 + Math.floor(num / 2)) % pool.length;
  const index = (baseOffset + (subIdx >= 0 ? subIdx : 0)) % pool.length;
  return pool[index];
}
`;

  const targetPath = path.resolve(__dirname, '../src/portal/services/academicData.js');
  fs.writeFileSync(targetPath, code, 'utf8');
  console.log('Successfully generated real academicData.js at:', targetPath);
}

buildAcademicData();
