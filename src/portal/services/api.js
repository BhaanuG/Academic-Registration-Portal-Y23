export function readLocalRecord(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

export function writeLocalRecord(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
