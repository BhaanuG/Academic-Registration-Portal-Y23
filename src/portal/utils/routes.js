export const pageSegments = {
  overview: "Academic-Overview.php",
  cluster: "Cluster-Selection.php",
  subjects: "Subject-Selection.php",
  preferences: "Faculty-Preferences.php",
  directory: "Faculty-Directory.php",
  "my-preference": "My-Preference.php",
  profile: "My-Profile.php",
};

export const segmentPages = {
  "Academic-Overview.php": "overview",
  "Cluster-Selection.php": "cluster",
  "Subject-Selection.php": "subjects",
  "Faculty-Preferences.php": "preferences",
  "Faculty-Directory.php": "directory",
  "My-Preference.php": "my-preference",
  "My-Profile.php": "profile",
  // Backwards compatibility for paths without .php
  "Academic-Overview": "overview",
  "Cluster-Selection": "cluster",
  "Subject-Selection": "subjects",
  "Faculty-Preferences": "preferences",
  "Faculty-Directory": "directory",
  "My-Preference": "my-preference",
  "My-Profile": "profile",
};

export function portalPath(studentId, studentName, page) {
  const segment = pageSegments[page] || (page.endsWith(".php") ? page : `${page}.php`);
  return `/KLEF/8-2/${encodeURIComponent(studentId)}/${encodeURIComponent(studentName)}/${segment}`;
}
