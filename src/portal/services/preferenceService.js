import { readLocalRecord, writeLocalRecord } from "./api";

export function getPreferenceStorageKey(studentId) {
  return `klef-faculty-preferences-${studentId}`;
}

export function loadPreferences(studentId) {
  return readLocalRecord(getPreferenceStorageKey(studentId), {});
}

export function savePreferences(studentId, preferences) {
  // Pure client-side demonstration persistence
  writeLocalRecord(getPreferenceStorageKey(studentId), preferences);
}
