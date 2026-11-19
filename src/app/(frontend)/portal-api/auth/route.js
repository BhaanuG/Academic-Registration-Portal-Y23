import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { getPortalUser, PORTAL_SESSION_COOKIE } from '@/lib/portal-auth'

const error = (message, status = 400) => NextResponse.json({ ok: false, message }, { status })

export async function GET() {
  const user = await getPortalUser()
  if (!user) return error('Not signed in.', 401)
  return NextResponse.json({ ok: true, user })
}

export async function POST(request) {
  const body = await request.json().catch(() => null)
  const username = typeof body?.username === 'string' ? body.username.trim() : ''
  const password = typeof body?.password === 'string' ? body.password : ''
  if (!/^\d{10}$/.test(username) || !password) return error('Enter a valid 10-digit ID and credential.')

  if (username === '8897337687') {
    if (password === 'Janu@143') {
      const cookieStore = await cookies()
      cookieStore.set(PORTAL_SESSION_COOKIE, 'admin-session-8897337687', {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 60 * 60 * 8,
      })
      return NextResponse.json({
        ok: true,
        user: {
          id: 'admin-8897337687',
          username: '8897337687',
          name: 'G. Bhaanu Sai',
          role: 'admin',
        },
      })
    }
    return error('The administrator credential entered is incorrect.', 401)
  }

  // Student authentication
  const cookieStore = await cookies()
  cookieStore.set(PORTAL_SESSION_COOKIE, `student-session-${username}`, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 8,
  })

  return NextResponse.json({
    ok: true,
    user: {
      id: `student-${username}`,
      username: username,
      name: 'Anirudh Varma',
      role: 'student',
      cluster: 'Cluster 2',
    },
  })
}

export async function DELETE() {
  const cookieStore = await cookies()
  cookieStore.set(PORTAL_SESSION_COOKIE, '', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 0,
  })
  return NextResponse.json({ ok: true })
}
