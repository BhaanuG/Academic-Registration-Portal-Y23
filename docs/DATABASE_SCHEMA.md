# Database Schema Reference

The portal relies on SQLite located at `.data/academic_portal.sqlite` (with schema definition in `src/lib/db/schema.sql`).

## Core Tables

### 1. `academic_terms`
Stores academic semesters and academic years.
- `id` (TEXT PRIMARY KEY): Term identifier (e.g. `2024-25-EVEN`)
- `name` (TEXT): Display name
- `is_active` (INTEGER): Active flag

### 2. `specializations`
Academic specialization programs.
- `id` (TEXT PRIMARY KEY): Unique identifier
- `name` (TEXT): Official title (e.g., "Cloud Infrastructure Design And Engineering", "Generative AI for Agentic and Multi-Modal Intelligence")
- `code` (TEXT): Short code

### 3. `clusters`
Section cohorts dividing students into administrative groups.
- `id` (TEXT PRIMARY KEY): Cluster identifier (`cluster_1`, `cluster_2`)
- `name` (TEXT): Display name (`Cluster 1`, `Cluster 2`)
- `section_range` (TEXT): Permitted section boundary (e.g., `S1-S50`, `S51-S100`)

### 4. `buckets`
Curriculum course groupings.
- `id` (TEXT PRIMARY KEY): Bucket identifier (`B1` through `B9`)
- `short_code` (TEXT): Bucket short code
- `title` (TEXT): Bucket title
- `sort_order` (INTEGER): Display order

### 5. `courses`
Course catalog entries.
- `code` (TEXT PRIMARY KEY): Official course code (e.g. `23CS2205A`)
- `name` (TEXT): Course name
- `bucket_id` (TEXT REFERENCES buckets): Associated bucket
- `credits` (INTEGER): Academic credits
- `lecture_hours`, `tutorial_hours`, `practical_hours`, `skill_hours`: L-T-P-S distribution
- `components` (TEXT): JSON array of delivery components (`["L", "P", "S"]`)

### 6. `sections`
Sections offered per course and cluster.
- `id` (INTEGER PRIMARY KEY AUTOINCREMENT)
- `course_code` (TEXT REFERENCES courses)
- `cluster_id` (TEXT REFERENCES clusters)
- `section_number` (INTEGER)

### 7. `faculty`
Faculty directory.
- `id` (TEXT PRIMARY KEY): Employee ID
- `name` (TEXT): Full name
- `designation` (TEXT): Academic designation
- `department` (TEXT): Academic department

### 8. `faculty_allocations`
Authorized faculty-to-section-component mappings.
- `id` (INTEGER PRIMARY KEY AUTOINCREMENT)
- `course_code` (TEXT REFERENCES courses)
- `section_id` (INTEGER REFERENCES sections)
- `faculty_id` (TEXT REFERENCES faculty)
- `component` (TEXT): Component type (`L`, `P`, `S`)

### 9. `students`
Student roster records (1,159 registered students).
- `id` (TEXT PRIMARY KEY): Student Roll Number (e.g. `2300030001`)
- `name` (TEXT): Full name
- `email` (TEXT): University email
- `specialization_id` (TEXT REFERENCES specializations)
- `cluster_id` (TEXT REFERENCES clusters)
- `cgpa` (REAL): Cumulative Grade Point Average
- `registered_credits` (INTEGER): Currently confirmed credits
- `aadhaar_number` (TEXT): Full Aadhaar identifier
- `apaar_number` (TEXT): Full APAAR identifier
- `password_hash` (TEXT): Secure credential storage

### 10. `student_assigned_buckets`
Official course and bucket allocations per student.
- `id` (INTEGER PRIMARY KEY AUTOINCREMENT)
- `student_id` (TEXT REFERENCES students)
- `bucket_id` (TEXT REFERENCES buckets)
- `course_code` (TEXT REFERENCES courses)
- `classification` (TEXT): `PRESCRIBED` or `ELECTIVE`

### 11. Preference & Finalization Tables
- `student_subject_selections`: Student subject choices per bucket.
- `student_faculty_preferences`: Ranked faculty preferences per course and component.
- `student_section_selections`: Section selections.
- `student_preference_finalizations`: Formal finalization timestamp and lock status.
