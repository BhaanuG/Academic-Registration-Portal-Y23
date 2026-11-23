import { Pool } from 'pg';

let pool = null;

export function getSupabasePool() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    return null;
  }

  if (!pool) {
    pool = new Pool({
      connectionString,
      ssl: { rejectUnauthorized: false },
      max: 5,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
    });
  }

  return pool;
}

/**
 * Fetch verified student confidential identity details from Supabase PostgreSQL
 */
export async function getStudentPrivateDetails(studentId) {
  const p = getSupabasePool();
  if (!p) return null;

  try {
    const res = await p.query(
      'SELECT student_id, aadhaar_number, apaar_number, mobile_number, parent_phone_number, counselor_name, counselor_mobile, counselor_email FROM students WHERE student_id = $1 LIMIT 1',
      [studentId]
    );
    if (res.rows && res.rows.length > 0) {
      return res.rows[0];
    }
  } catch (err) {
    console.warn('[Supabase] Could not query student confidential details:', err.message);
  }
  return null;
}
