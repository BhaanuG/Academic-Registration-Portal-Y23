export const pageSegments = {
  overview: "Academic-Overview",
  cluster: "Cluster-Selection",
  subjects: "Subject-Selection",
  preferences: "Faculty-Preferences",
  directory: "Faculty-Directory",
  "my-preference": "My-Preference",
  profile: "My-Profile",
};

export const segmentPages = Object.fromEntries([
  ...Object.entries(pageSegments).map(([page, segment]) => [segment, page]),
  ...Object.entries(pageSegments).map(([page, segment]) => [`${segment}.php`, page]),
  ...Object.entries(pageSegments).map(([page]) => [`${page}.php`, page]),
  ...Object.entries(pageSegments).map(([page]) => [page, page]),
]);

export function portalPath(studentId, studentName, page) {
  const segment = pageSegments[page] || page;
  const cleanSegment = segment.replace(/\.php$/, "");
  return `/KLEF/8-2/${encodeURIComponent(studentId)}/${encodeURIComponent(studentName)}/${cleanSegment}.php`;
}
