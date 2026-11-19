import React, { useMemo } from "react";
import PageHeading from "../components/common/PageHeading";
import { getStudentCluster } from "../services/studentService";
import { loadPreferences } from "../services/preferenceService";
import { readLocalRecord } from "../services/api";
import { getSelectionStorageKey, initialSelections } from "../services/subjectService";
import { buckets } from "../services/academicData";
import {
  CheckCircle2,
  Clock,
  BookOpen,
  Layers,
  Award,
  Sparkles,
  UserCheck,
  ArrowRight,
  Shield,
  FileCheck,
  Building,
  GraduationCap,
  Calendar,
  Compass,
} from "lucide-react";

export default function Overview({ studentId, goTo }) {
  // Read actual student state
  const cluster = useMemo(() => getStudentCluster(studentId) || "Cluster 2", [studentId]);
  const selections = useMemo(() => {
    return readLocalRecord(getSelectionStorageKey(studentId), initialSelections);
  }, [studentId]);
  const preferences = useMemo(() => loadPreferences(studentId), [studentId]);

  // Compute actual progress metrics
  const selectedSubjectsList = useMemo(() => {
    return buckets
      .map((b) => b.subjects.find((s) => s.code === selections[b.id]))
      .filter(Boolean);
  }, [selections]);

  const selectedCredits = useMemo(() => {
    return selectedSubjectsList.reduce((sum, s) => sum + (s.credits || 0), 0);
  }, [selectedSubjectsList]);

  const totalBuckets = buckets.length || 7;
  const isSubjectSelectionComplete = selectedSubjectsList.length >= totalBuckets;

  const rankedSubjectsCount = useMemo(() => {
    const set = new Set();
    Object.keys(preferences).forEach((key) => {
      const separator = key.indexOf("-");
      if (separator !== -1) {
        set.add(key.slice(0, separator));
      }
    });
    return set.size;
  }, [preferences]);

  return (
    <div className="overview-container">
      <PageHeading
        title="Academic Overview"
        description="Official university profile, active cohort allocation, and academic registration progression status."
      />

      {/* Main Content Layout Grid */}
      <div className="overview-grid">
        {/* Left Column: Official Academic Credentials */}
        <div className="overview-main-col">
          <section className="plain-section academic-section">
            <div className="section-title">
              <div>
                <h2>Academic Enrollment Identity</h2>
              </div>
              <span className="read-only">Registrar Managed</span>
            </div>

            <dl className="data-grid academic-grid">
              <div>
                <dt>Student Name</dt>
                <dd>Anirudh Varma</dd>
              </div>
              <div>
                <dt>University Roll Number</dt>
                <dd className="font-mono">{studentId}</dd>
              </div>
              <div>
                <dt>Institutional Email</dt>
                <dd>
                  <a href={`mailto:${studentId}@kluniversity.in`} className="text-blue-600 hover:underline">
                    {studentId}@kluniversity.in
                  </a>
                </dd>
              </div>
              <div>
                <dt>Department / Branch</dt>
                <dd>Computer Science &amp; Engineering - 2</dd>
              </div>
              <div>
                <dt>Academic Specialization</dt>
                <dd className="text-blue-700 font-semibold">Generative AI &amp; Multi-modal Intelligence</dd>
              </div>
              <div>
                <dt>Program &amp; Degree</dt>
                <dd>Bachelor of Technology (B.Tech)</dd>
              </div>
              <div>
                <dt>Academic Batch</dt>
                <dd>2024–2028</dd>
              </div>
              <div>
                <dt>Current Term Level</dt>
                <dd>Third Year · Semester 5</dd>
              </div>
            </dl>
          </section>
        </div>

        {/* Right Column: Assigned Faculty Counselor Panel */}
        <aside className="counselor-panel">
          <p className="eyebrow">Academic Counseling</p>
          <h2>Dr. S. Srinivasa Rao</h2>
          <dl>
            <div>
              <dt>Employee ID</dt>
              <dd className="font-mono">KLEF0864</dd>
            </div>
            <div>
              <dt>Designation</dt>
              <dd>Associate Professor</dd>
            </div>
            <div>
              <dt>Department</dt>
              <dd>Computer Science &amp; Engineering</dd>
            </div>
            <div>
              <dt>Contact Email</dt>
              <dd>
                <a href="mailto:s.rao@kluniversity.in" className="text-blue-600 hover:underline">
                  s.rao@kluniversity.in
                </a>
              </dd>
            </div>
          </dl>
        </aside>
      </div>
    </div>
  );
}
