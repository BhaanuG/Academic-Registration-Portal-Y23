export function getStudentCluster(studentId) {
  return localStorage.getItem(`klef-cluster-${studentId}`) || "";
}

export function saveStudentCluster(studentId, cluster) {
  localStorage.setItem(`klef-cluster-${studentId}`, cluster);
}

export function saveLastRoute(pathname) {
  localStorage.setItem("klef-last-route", pathname);
}

export function getLastRoute() {
  return localStorage.getItem("klef-last-route");
}
