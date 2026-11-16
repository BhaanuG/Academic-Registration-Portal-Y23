# Academic Data Sources and Ingestion

## Canonical Data Architecture

The application's institutional academic data is persisted in SQLite at `.data/academic_portal.sqlite`.

### Data Ingestion Architecture
- **Raw Master Datasets:** Ingested via `src/lib/ingestion/ingestAcademicData.js` during portal setup.
- **Data Generator:** `scripts/generate_academic_data.cjs` generates bundled static academic lookups in `src/portal/services/academicData.js` ensuring immediate client-side responsiveness without network latency.
- **Runtime Persistence:** Read and write queries interact directly with the embedded SQLite database via `src/lib/db/client.js` and `/portal-api/[resource]`.

## Verification & Integrity Metrics
- **Total Registered Students:** 1,159
- **Course Catalog:** 102 courses across 9 curriculum buckets
- **Allocated Sections:** 89 active sections
- **Faculty Records:** 426 verified faculty members
- **Faculty Allocations:** 682 authorized component allocations
- **Assigned Student Course Mappings:** 11,227 canonical mappings

All data changes are strictly validated against institutional curriculum standards and cohort assignments.
