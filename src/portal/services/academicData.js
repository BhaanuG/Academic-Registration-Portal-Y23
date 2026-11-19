export const buckets = [
  {
    id: "C0",
    short: "SDC",
    title: "Skill Development Course",
    subjects: [
      {
        code: "24SDCS03",
        name: "SOA Programming and Microservices",
        credits: 2,
        ltps: [1, 0, 0, 2],
        components: ["L", "S"],
        description: "Service-oriented architecture, API design, and deployable microservices.",
      },
      {
        code: "24SDCS08",
        name: "Cloud Native Development",
        credits: 2,
        ltps: [1, 0, 0, 2],
        components: ["L", "S"],
        description: "Containers, cloud deployment patterns, and observable services.",
        prerequisite: "Object-oriented programming",
      },
    ],
  },
  {
    id: "C1",
    short: "PCC-1",
    title: "Professional Core Course 1",
    subjects: [
      {
        code: "24CS3105",
        name: "Information Assurance and Security",
        credits: 4,
        ltps: [3, 1, 0, 0],
        components: ["L", "T"],
        description: "Security models, cryptography fundamentals, and risk management.",
      },
      {
        code: "24CS3110",
        name: "Computer Networks",
        credits: 4,
        ltps: [3, 0, 2, 0],
        components: ["L", "P"],
        description: "Layered network models, routing, transport, and network programming.",
      },
    ],
  },
  {
    id: "C2",
    short: "PCC-2",
    title: "Professional Core Course 2",
    subjects: [
      {
        code: "24CI3201",
        name: "Adaptive Software Engineering",
        credits: 4,
        ltps: [3, 0, 2, 0],
        components: ["L", "P"],
        description: "Architecture, evolution, testing, and delivery of adaptive systems.",
        prerequisite: "Software Engineering",
      },
      {
        code: "24CS3212",
        name: "Distributed Systems",
        credits: 4,
        ltps: [3, 0, 2, 0],
        components: ["L", "P"],
        description: "Coordination, replication, fault tolerance, and distributed data.",
      },
    ],
  },
  {
    id: "C3",
    short: "PE-1",
    title: "Professional Elective 1",
    subjects: [
      {
        code: "24GM1301",
        name: "Principles of Deep Neural Computation",
        credits: 4,
        ltps: [3, 0, 2, 0],
        components: ["L", "P"],
        description: "Neural architectures, optimization, representation learning, and evaluation.",
        prerequisite: "Linear algebra and Python",
      },
      {
        code: "24CS3270",
        name: "Applied Natural Language Processing",
        credits: 4,
        ltps: [3, 0, 2, 0],
        components: ["L", "P"],
        description: "Language models, sequence learning, retrieval, and NLP evaluation.",
      },
    ],
  },
  {
    id: "C4",
    short: "FCC",
    title: "Foundation / Core Choice",
    subjects: [
      {
        code: "24CS2255F",
        name: "Advanced Data Structures",
        credits: 3,
        ltps: [2, 0, 2, 0],
        components: ["L", "P"],
        description: "Advanced trees, graphs, probabilistic structures, and complexity.",
      },
      {
        code: "24CS2227F",
        name: "Data Analytics and Visualization",
        credits: 3,
        ltps: [2, 0, 2, 0],
        components: ["L", "P"],
        description: "Analytical workflows and clear visual communication of data.",
      },
      {
        code: "24CS2250F",
        name: "Human Computer Interaction",
        credits: 3,
        ltps: [2, 1, 0, 0],
        components: ["L", "T"],
        description: "Human-centered design, prototyping, and usability evaluation.",
      },
    ],
  },
  {
    id: "C5",
    short: "BSC",
    title: "Basic Science Course",
    subjects: [
      {
        code: "24AD3107",
        name: "Data Science",
        credits: 4,
        ltps: [3, 0, 2, 0],
        components: ["L", "P"],
        description: "Data preparation, inference, modeling, and reproducible analysis.",
      },
      {
        code: "24MA3102",
        name: "Computational Statistics",
        credits: 4,
        ltps: [3, 1, 0, 0],
        components: ["L", "T"],
        description: "Statistical estimation, simulation, and computational methods.",
      },
    ],
  },
  {
    id: "C6",
    short: "HFC",
    title: "Humanities and Flexible Choice",
    subjects: [
      {
        code: "24AD3105",
        name: "Deep Learning",
        credits: 4,
        ltps: [3, 0, 2, 0],
        components: ["L", "P"],
        description: "Modern deep networks, training strategies, and responsible deployment.",
      },
      {
        code: "24HS3124",
        name: "Technology, Society and Ethics",
        credits: 4,
        ltps: [3, 1, 0, 0],
        components: ["L", "T"],
        description: "Ethical reasoning for computing and its social consequences.",
      },
    ],
  },
];
export const faculty = [
  {
    id: "KLEF1027",
    name: "Dr. Meera Iyer",
    designation: "Professor",
    department: "Computer Science & Engineering",
    subjects: ["Distributed Systems", "Adaptive Software Engineering"],
    components: ["L", "T"],
    allocation: "S52 · Lecture",
  },
  {
    id: "KLEF1184",
    name: "Dr. Arvind Rao",
    designation: "Associate Professor",
    department: "Computer Science & Engineering",
    subjects: ["Information Assurance and Security", "Computer Networks"],
    components: ["L", "P"],
    allocation: "S52 · Lecture / S52-A · Practical",
  },
  {
    id: "KLEF1271",
    name: "Dr. Nandita Bose",
    designation: "Associate Professor",
    department: "Computer Science & Engineering",
    subjects: ["Principles of Deep Neural Computation", "Deep Learning"],
    components: ["L", "P"],
    allocation: "S52 · Lecture / S52-B · Practical",
  },
  {
    id: "KLEF1390",
    name: "Prof. Vivek Menon",
    designation: "Assistant Professor",
    department: "Computer Science & Engineering",
    subjects: ["Advanced Data Structures", "Data Science"],
    components: ["L", "P"],
    allocation: "S52-C · Practical",
  },
  {
    id: "KLEF1438",
    name: "Dr. Kavya Reddy",
    designation: "Assistant Professor",
    department: "Computer Science & Engineering",
    subjects: ["Human Computer Interaction", "SOA Programming and Microservices"],
    components: ["L", "T", "S"],
    allocation: "S52 · Tutorial / Skill",
  },
  {
    id: "KLEF1512",
    name: "Prof. Farhan Ali",
    designation: "Assistant Professor",
    department: "Computer Science & Engineering",
    subjects: ["Cloud Native Development", "Distributed Systems"],
    components: ["L", "P", "S"],
    allocation: "S52-B · Practical / Skill",
  },
  {
    id: "KLEF1633",
    name: "Dr. S. Ananya",
    designation: "Professor",
    department: "Artificial Intelligence & Data Science",
    subjects: ["Data Science", "Deep Learning"],
    components: ["L", "P"],
    allocation: "S52 · Lecture",
  },
  {
    id: "KLEF1724",
    name: "Prof. Rahul Dev",
    designation: "Assistant Professor",
    department: "Artificial Intelligence & Data Science",
    subjects: ["Applied Natural Language Processing", "Deep Learning"],
    components: ["L", "P"],
    allocation: "S52-A · Practical",
  },
  {
    id: "KLEF1806",
    name: "Dr. Leena Mathew",
    designation: "Associate Professor",
    department: "Mathematics",
    subjects: ["Computational Statistics", "Data Science"],
    components: ["L", "T"],
    allocation: "S52 · Lecture / Tutorial",
  },
  {
    id: "KLEF1941",
    name: "Prof. Gautham Sen",
    designation: "Assistant Professor",
    department: "Computer Science & Engineering",
    subjects: ["Data Analytics and Visualization", "Advanced Data Structures"],
    components: ["P"],
    allocation: "S52-B · Practical",
  },
  {
    id: "KLEF2055",
    name: "Dr. Priya Nair",
    designation: "Associate Professor",
    department: "Humanities & Social Sciences",
    subjects: ["Technology, Society and Ethics"],
    components: ["L", "T"],
    allocation: "S52 · Lecture / Tutorial",
  },
  {
    id: "KLEF2148",
    name: "Prof. Kiran Kumar",
    designation: "Assistant Professor",
    department: "Computer Science & Engineering",
    subjects: ["SOA Programming and Microservices", "Cloud Native Development"],
    components: ["S", "P"],
    allocation: "S52 · Skill / S52-C · Practical",
  },
];
export const componentNames = {
  L: "Lecture",
  T: "Tutorial",
  P: "Practical",
  S: "Skill",
};
export const initialSelections = {};
export function getSubSectionFaculty(subjectCode, secNum, subLetter, component) {
  const pool = faculty.filter((person) => person.components.includes(component));
  if (!pool.length) return null;
  const num = parseInt(secNum, 10) || 1;
  const subIdx = subLetter.toUpperCase().charCodeAt(0) - 65; // A=0, B=1, C=2
  const baseOffset = (num * 3 + Math.floor(num / 2)) % pool.length;
  const index = (baseOffset + (subIdx >= 0 ? subIdx : 0)) % pool.length;
  return pool[index];
}

export function sectionFor(subjectCode, facultyId, component, cluster = "Cluster 2") {
  const assigned = faculty.find(
    (person) =>
      person.id === facultyId &&
      person.components.includes(component) &&
      person.subjects.some((subject) => subject === subjectCode || subject),
  );
  if (assigned?.section) {
    const base = sectionBase(assigned.section);
    if (component === "L") return `S - ${base}`;
    const suffix = assigned.section.match(/([ABC])$/i)?.[1]?.toUpperCase();
    if (suffix) return `S - ${base}${suffix}`;
    const seed = `${facultyId}${component}`.split("").reduce((total, character) => total + character.charCodeAt(0), 0);
    return `S - ${base}${["A", "B", "C"][seed % 3]}`;
  }
  const seed = `${subjectCode}${facultyId}${component}`
    .split("")
    .reduce((total, character) => total + character.charCodeAt(0), 0);
  const baseNum = (cluster === "Cluster 1" ? 1 : 51) + (seed % 14);
  if (component !== "L") return `S - ${baseNum}${["A", "B", "C"][seed % 3]}`;
  return `S - ${baseNum}`;
}

export function sectionBase(section = "") {
  return String(section).match(/\d+/)?.[0] || "";
}
