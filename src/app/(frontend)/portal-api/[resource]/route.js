import { NextResponse } from 'next/server'
import { getPortalUser } from '@/lib/portal-auth'
import { faculty, buckets } from '@/portal/services/academicData'

const allowedResources = new Set(['students', 'faculty', 'buckets', 'courses', 'preferences'])

function responseError(message, status = 400) {
  return NextResponse.json({ ok: false, message }, { status })
}

async function context(params) {
  const { resource } = await params
  if (!allowedResources.has(resource)) return null
  const user = await getPortalUser()
  return { resource, user }
}

export async function GET(_request, { params }) {
  const ctx = await context(params)
  if (!ctx) return responseError('Unknown resource.', 404)
  if (!ctx.user) return responseError('Sign in required.', 401)

  if (ctx.resource === 'students') {
    const studentDoc = {
      id: 'student-2400030952',
      name: 'Anirudh Varma',
      username: '2400030952',
      dateOfBirth: '2005-04-18',
      universityEmail: '2400030952@kluniversity.in',
      personalEmail: 'anirudh.varma@gmail.com',
      mobileNumber: '+91 98765 43210',
      gender: 'Male',
      aadhaarNumber: '1234 5678 9012',
      aapaarNumber: 'APAAR-9876-5432',
      residencyStatus: 'Hosteler',
      parentName: 'K. R. Varma',
      parentPhoneNumber: '+91 98765 00000',
      cluster: 'Cluster 2',
      counselor: {
        name: 'Dr. S. Srinivasa Rao',
        employeeId: 'KLEF0864',
        designation: 'Associate Professor',
        mobileNumber: '9876541111',
        email: 's.rao@kluniversity.in',
      },
      updatedAt: new Date().toISOString(),
    }
    return NextResponse.json({ ok: true, docs: [studentDoc] })
  }

  if (ctx.resource === 'faculty') {
    const facultyDocs = faculty.map((f, i) => ({
      id: `fac-${i + 1}`,
      employeeId: f.id,
      facultyName: f.name,
      designation: f.designation,
      department: f.department,
      section: f.section || 'S - 58',
      component: f.components,
      courseCode: '24SDCS03',
      courseName: f.subjects[0] || 'Core Course',
      updatedAt: new Date().toISOString(),
    }))
    return NextResponse.json({ ok: true, docs: facultyDocs })
  }

  if (ctx.resource === 'buckets') {
    const bucketDocs = buckets.map((b, i) => ({
      id: `bucket-${b.id}`,
      code: b.id,
      shortName: b.short,
      title: b.title,
      sortOrder: i + 1,
      active: true,
      updatedAt: new Date().toISOString(),
    }))
    return NextResponse.json({ ok: true, docs: bucketDocs })
  }

  if (ctx.resource === 'courses') {
    const courseDocs = buckets.flatMap((b) =>
      b.subjects.map((s, idx) => ({
        id: `course-${b.id}-${idx}`,
        bucket: b.id,
        courseCode: s.code,
        name: s.name,
        credits: s.credits,
        lectureHours: s.ltps[0],
        tutorialHours: s.ltps[1],
        practicalHours: s.ltps[2],
        skillHours: s.ltps[3],
        components: s.components,
        description: s.description || '',
        prerequisite: s.prerequisite || '',
        active: true,
        updatedAt: new Date().toISOString(),
      })),
    )
    return NextResponse.json({ ok: true, docs: courseDocs })
  }

  if (ctx.resource === 'preferences') {
    return NextResponse.json({ ok: true, docs: [] })
  }

  return NextResponse.json({ ok: true, docs: [] })
}

export async function POST(request, { params }) {
  const ctx = await context(params)
  if (!ctx) return responseError('Unknown resource.', 404)
  const body = await request.json().catch(() => null)
  return NextResponse.json({ ok: true, doc: { id: `doc-${Date.now()}`, ...body } })
}

export async function PATCH(request, { params }) {
  const ctx = await context(params)
  if (!ctx) return responseError('Unknown resource.', 404)
  const body = await request.json().catch(() => null)
  return NextResponse.json({ ok: true, doc: body })
}

export async function DELETE(request, { params }) {
  const ctx = await context(params)
  if (!ctx) return responseError('Unknown resource.', 404)
  return NextResponse.json({ ok: true })
}
