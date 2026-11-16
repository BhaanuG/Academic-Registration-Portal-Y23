-- ============================================================================
-- Academic Registration Portal — Production Supabase PostgreSQL Schema
-- Normalized Relational Database Architecture with Full Integrity Constraints,
-- Multi-Table Relationships, and Row Level Security (RLS) Policies.
-- ============================================================================

-- 0. Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ----------------------------------------------------------------------------
-- 1. Profiles Table (Extends Supabase auth.users)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username VARCHAR(64) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(32) NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'admin')),
  email VARCHAR(255),
  phone VARCHAR(32),
  department VARCHAR(255),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- 2. Academic Terms Table
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.academic_terms (
  id VARCHAR(32) PRIMARY KEY, -- e.g. '2026-27-ODD', '2026-27-EVEN'
  academic_year VARCHAR(32) NOT NULL, -- '2026-27'
  semester_code VARCHAR(16) NOT NULL CHECK (semester_code IN ('ODD', 'EVEN')),
  semester_number INT NOT NULL, -- 5, 6
  is_active BOOLEAN NOT NULL DEFAULT true,
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- 3. Specializations Table
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.specializations (
  code VARCHAR(32) PRIMARY KEY, -- 'GAI', 'CSE', 'AIDS', 'CSIT'
  title VARCHAR(255) NOT NULL,
  department VARCHAR(255) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- 4. Clusters Table
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.clusters (
  id VARCHAR(32) PRIMARY KEY, -- 'Cluster 1', 'Cluster 2'
  name VARCHAR(64) NOT NULL,
  section_start INT NOT NULL,
  section_end INT NOT NULL,
  section_range VARCHAR(64) NOT NULL, -- 'S1 — S50', 'S51 — S100'
  description TEXT,
  is_recommended BOOLEAN DEFAULT false,
  specialization_code VARCHAR(32) REFERENCES public.specializations(code) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- 5. Course Categories Table
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.course_categories (
  code VARCHAR(32) PRIMARY KEY, -- 'PRI', 'OE1', 'OE2', 'PE5', 'SCE', 'AUC', 'PE4', 'OE3'
  name VARCHAR(255) NOT NULL,
  type VARCHAR(32) NOT NULL DEFAULT 'ACADEMIC' CHECK (type IN ('ACADEMIC', 'CAREER_READINESS')),
  description TEXT
);

-- ----------------------------------------------------------------------------
-- 6. Academic Buckets Table (C0 - C8)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.buckets (
  id VARCHAR(16) PRIMARY KEY, -- 'C0', 'C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8'
  short_code VARCHAR(32) NOT NULL, -- 'PRI', 'OE1', 'OE2', 'PE5', 'SCE', 'AUC-1', 'AUC-2', 'PE4', 'OE3'
  title VARCHAR(255) NOT NULL,
  category_code VARCHAR(32) REFERENCES public.course_categories(code) ON DELETE RESTRICT,
  sort_order INT NOT NULL DEFAULT 0,
  min_credits INT NOT NULL DEFAULT 2,
  max_credits INT NOT NULL DEFAULT 4,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- 7. Courses Catalog Table
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.courses (
  code VARCHAR(32) PRIMARY KEY, -- '24SDCS03', '24CS3105'
  name VARCHAR(255) NOT NULL,
  bucket_id VARCHAR(16) NOT NULL REFERENCES public.buckets(id) ON DELETE RESTRICT,
  category_code VARCHAR(32) REFERENCES public.course_categories(code) ON DELETE RESTRICT,
  credits INT NOT NULL DEFAULT 3,
  lecture_hours INT NOT NULL DEFAULT 3,
  tutorial_hours INT NOT NULL DEFAULT 0,
  practical_hours INT NOT NULL DEFAULT 0,
  skill_hours INT NOT NULL DEFAULT 0,
  components TEXT[] DEFAULT '{"L"}', -- Array of delivery components ['L', 'T', 'P', 'S']
  description TEXT,
  prerequisite VARCHAR(255),
  is_crt BOOLEAN NOT NULL DEFAULT false, -- true: Placement/CRT track, false: Core Academic/NCRT
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- 8. Sections Table
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.sections (
  id VARCHAR(32) PRIMARY KEY, -- 'S-1', 'S-51', 'S-52'
  section_number INT NOT NULL,
  cluster_id VARCHAR(32) NOT NULL REFERENCES public.clusters(id) ON DELETE CASCADE,
  capacity INT DEFAULT 60,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- 9. Faculty Master Table
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.faculty (
  id VARCHAR(32) PRIMARY KEY, -- 'KLEF0864', 'KLEF1027'
  name VARCHAR(255) NOT NULL,
  designation VARCHAR(128) DEFAULT 'Assistant Professor',
  department VARCHAR(128) DEFAULT 'Computer Science & Engineering',
  email VARCHAR(255),
  phone VARCHAR(32),
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- 10. Faculty Allocations (Core Relational Junction)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.faculty_allocations (
  id VARCHAR(128) PRIMARY KEY,
  faculty_id VARCHAR(32) NOT NULL REFERENCES public.faculty(id) ON DELETE CASCADE,
  course_code VARCHAR(32) NOT NULL REFERENCES public.courses(code) ON DELETE CASCADE,
  section_id VARCHAR(32) NOT NULL REFERENCES public.sections(id) ON DELETE CASCADE,
  sub_section VARCHAR(8), -- NULL for Lecture, 'A', 'B', 'C' for sub-components
  component VARCHAR(8) NOT NULL CHECK (component IN ('L', 'T', 'P', 'S')),
  term_id VARCHAR(32) REFERENCES public.academic_terms(id) ON DELETE RESTRICT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT unique_fac_alloc UNIQUE(course_code, section_id, component, sub_section, faculty_id)
);

-- ----------------------------------------------------------------------------
-- 11. Students Table
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.students (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  student_id VARCHAR(32) UNIQUE NOT NULL, -- 10-digit institutional ID e.g. '2400030952'
  name VARCHAR(255) NOT NULL,
  university_email VARCHAR(255) UNIQUE NOT NULL,
  personal_email VARCHAR(255),
  mobile_number VARCHAR(32),
  gender VARCHAR(16) DEFAULT 'Male',
  date_of_birth DATE NOT NULL DEFAULT '2005-04-18',
  aadhaar_number VARCHAR(32),
  apaar_number VARCHAR(32),
  residency_status VARCHAR(32) DEFAULT 'Hosteler',
  parent_name VARCHAR(255),
  parent_phone_number VARCHAR(32),
  program VARCHAR(64) DEFAULT 'CSE',
  flexibility_track VARCHAR(64) DEFAULT 'CSE-2',
  addon_status_raw VARCHAR(64), -- Raw value from Student Data.xlsx ('Specialization', 'Minor', 'Second Major', 'No Add-on', 'NULL', NULL)
  addon_status VARCHAR(64) DEFAULT 'Specialization', -- Reconciled classification ('Specialization', 'Minor', 'Second Major', 'No Add-on')
  addon_verification VARCHAR(64) DEFAULT 'VERIFIED', -- 'VERIFIED', 'RECONCILED_SPECIALIZATION', 'UNRESOLVED'
  specialization VARCHAR(255) DEFAULT 'Core CSE',
  cluster_id VARCHAR(32) REFERENCES public.clusters(id) DEFAULT 'Cluster 2',
  specialization_code VARCHAR(32) REFERENCES public.specializations(code) DEFAULT 'GAI',
  is_crt BOOLEAN DEFAULT false,
  counselor_name VARCHAR(255) DEFAULT 'Dr. S. Srinivasa Rao',
  counselor_id VARCHAR(32) DEFAULT 'KLEF0864',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- 12. Student Assigned Buckets (Prescribed Course Offerings from Data One)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.student_assigned_buckets (
  id VARCHAR(128) PRIMARY KEY,
  student_id VARCHAR(32) NOT NULL REFERENCES public.students(student_id) ON DELETE CASCADE,
  bucket_id VARCHAR(16) NOT NULL REFERENCES public.buckets(id) ON DELETE RESTRICT,
  default_course_code VARCHAR(32),
  default_course_desc VARCHAR(255),
  lec_section VARCHAR(32),
  prac_section VARCHAR(32),
  skill_section VARCHAR(32),
  is_mandatory BOOLEAN NOT NULL DEFAULT true,
  term_id VARCHAR(32) REFERENCES public.academic_terms(id) DEFAULT '2026-27-ODD',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT unique_student_assigned_bucket_course UNIQUE(student_id, bucket_id, default_course_code, term_id)
);

-- ----------------------------------------------------------------------------
-- 13. Student Subject Selections Table
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.student_subject_selections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id VARCHAR(32) NOT NULL REFERENCES public.students(student_id) ON DELETE CASCADE,
  bucket_id VARCHAR(16) NOT NULL REFERENCES public.buckets(id) ON DELETE RESTRICT,
  course_code VARCHAR(32) NOT NULL REFERENCES public.courses(code) ON DELETE RESTRICT,
  term_id VARCHAR(32) REFERENCES public.academic_terms(id) DEFAULT '2026-27-ODD',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT unique_student_bucket_term UNIQUE (student_id, bucket_id, term_id)
);

-- ----------------------------------------------------------------------------
-- 13. Student Faculty Preferences Table
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.student_faculty_preferences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id VARCHAR(32) NOT NULL REFERENCES public.students(student_id) ON DELETE CASCADE,
  preference_key VARCHAR(128) NOT NULL, -- e.g. '24CS3105-L', '24CS3105-T-L1-R1'
  preference_value JSONB NOT NULL, -- JSON array of faculty IDs or single ID
  term_id VARCHAR(32) REFERENCES public.academic_terms(id) DEFAULT '2026-27-ODD',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT unique_student_pref_key_term UNIQUE (student_id, preference_key, term_id)
);

-- ----------------------------------------------------------------------------
-- 14. Indexes for Query Performance
-- ----------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_courses_bucket ON public.courses(bucket_id);
CREATE INDEX IF NOT EXISTS idx_courses_category ON public.courses(category_code);
CREATE INDEX IF NOT EXISTS idx_courses_crt ON public.courses(is_crt);
CREATE INDEX IF NOT EXISTS idx_alloc_course ON public.faculty_allocations(course_code);
CREATE INDEX IF NOT EXISTS idx_alloc_faculty ON public.faculty_allocations(faculty_id);
CREATE INDEX IF NOT EXISTS idx_alloc_section ON public.faculty_allocations(section_id);
CREATE INDEX IF NOT EXISTS idx_alloc_component ON public.faculty_allocations(component);
CREATE INDEX IF NOT EXISTS idx_students_cluster ON public.students(cluster_id);
CREATE INDEX IF NOT EXISTS idx_students_specialization ON public.students(specialization_code);
CREATE INDEX IF NOT EXISTS idx_sections_cluster ON public.sections(cluster_id);
CREATE INDEX IF NOT EXISTS idx_sub_sel_student ON public.student_subject_selections(student_id);
CREATE INDEX IF NOT EXISTS idx_fac_pref_student ON public.student_faculty_preferences(student_id);

-- ----------------------------------------------------------------------------
-- 15. Row Level Security (RLS) Configuration
-- ----------------------------------------------------------------------------
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.academic_terms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.specializations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clusters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.buckets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faculty ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faculty_allocations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_subject_selections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_faculty_preferences ENABLE ROW LEVEL SECURITY;

-- Helper function: Is current user an administrator?
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Profiles Policies
DROP POLICY IF EXISTS "Public can view own profile" ON public.profiles;
CREATE POLICY "Public can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id OR public.is_admin());

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id OR public.is_admin());

-- Read-only Public Catalogs
CREATE POLICY "Public read academic_terms" ON public.academic_terms FOR SELECT TO authenticated, anon USING (true);
CREATE POLICY "Public read specializations" ON public.specializations FOR SELECT TO authenticated, anon USING (true);
CREATE POLICY "Public read clusters" ON public.clusters FOR SELECT TO authenticated, anon USING (true);
CREATE POLICY "Public read course_categories" ON public.course_categories FOR SELECT TO authenticated, anon USING (true);
CREATE POLICY "Public read buckets" ON public.buckets FOR SELECT TO authenticated, anon USING (true);
CREATE POLICY "Public read courses" ON public.courses FOR SELECT TO authenticated, anon USING (true);
CREATE POLICY "Public read sections" ON public.sections FOR SELECT TO authenticated, anon USING (true);
CREATE POLICY "Public read faculty" ON public.faculty FOR SELECT TO authenticated, anon USING (true);
CREATE POLICY "Public read faculty_allocations" ON public.faculty_allocations FOR SELECT TO authenticated, anon USING (true);

-- Student-specific Policies
CREATE POLICY "Students readable by self or admin" ON public.students
  FOR SELECT USING (
    university_email = (SELECT email FROM auth.users WHERE id = auth.uid())
    OR public.is_admin()
  );

CREATE POLICY "Student subject selections self-access" ON public.student_subject_selections
  FOR ALL USING (
    student_id IN (
      SELECT student_id FROM public.students WHERE university_email = (SELECT email FROM auth.users WHERE id = auth.uid())
    )
    OR public.is_admin()
  );

CREATE POLICY "Student faculty preferences self-access" ON public.student_faculty_preferences
  FOR ALL USING (
    student_id IN (
      SELECT student_id FROM public.students WHERE university_email = (SELECT email FROM auth.users WHERE id = auth.uid())
    )
    OR public.is_admin()
  );
