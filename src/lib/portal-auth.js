import { cookies } from 'next/headers'

export const PORTAL_SESSION_COOKIE = 'klef_portal_session'

export async function getPortalUser() {
  const cookieStore = await cookies()
  const token = cookieStore.get(PORTAL_SESSION_COOKIE)?.value
  if (!token) return null

  if (token.startsWith('admin-session-')) {
    return {
      id: 'admin-8897337687',
      username: '8897337687',
      name: 'G. Bhaanu Sai',
      role: 'admin',
    }
  }

  // Student session
  return {
    id: 'student-2400030952',
    username: '2400030952',
    name: 'Anirudh Varma',
    role: 'student',
    cluster: 'Cluster 2',
  }
}
