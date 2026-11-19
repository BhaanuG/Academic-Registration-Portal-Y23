export const pageSegments = {
  overview: "Academic-Overview",
  cluster: "Cluster-Selection",
  subjects: "Subject-Selection",
  preferences: "Faculty-Preferences",
  directory: "Faculty-Directory",
  "my-preference": "My-Preference",
  profile: "My-Profile",
};

export const segmentPages = Object.fromEntries(
  Object.entries(pageSegments).map(([page, segment]) => [segment, page]),
);

export function portalPath(studentId, studentName, page) {
  return `/KLEF/3-2/${encodeURIComponent(studentId)}/${encodeURIComponent(studentName)}/${pageSegments[page]}`;
}
