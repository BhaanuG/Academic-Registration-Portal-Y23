/**
 * Development & Demonstration Data Module
 * Pure frontend-only state initialization and mock record storage.
 * Does not store plaintext passwords or sensitive credentials in client storage.
 */

const SESSION_KEY = "klef-demo-session";

export function getAuthenticatedStudent() {
  return sessionStorage.getItem(SESSION_KEY);
}

export function createSession(identifier, role = "student") {
  sessionStorage.setItem(SESSION_KEY, identifier);
  sessionStorage.setItem("klef-demo-role", role);
}

export function clearSession() {
  sessionStorage.removeItem(SESSION_KEY);
  sessionStorage.removeItem("klef-demo-role");
}

export function rememberDateOfBirth(studentId, dateOfBirth) {
  // Demonstration-only session aid; in production, identity is verified via backend SSO
  sessionStorage.setItem(`klef-demo-dob-${studentId}`, dateOfBirth);
}

export function getRememberedDateOfBirth(studentId) {
  return sessionStorage.getItem(`klef-demo-dob-${studentId}`);
}

export async function requestPasswordReset(studentId) {
  // Truthful development-only simulated operation
  return {
    studentId,
    success: true,
    isDevelopmentMode: true,
    note: "Simulated demonstration reset. Institutional password management requires backend directory integration.",
  };
}
