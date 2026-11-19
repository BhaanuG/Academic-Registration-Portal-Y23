import { useState, useMemo } from "react";
import PageHeading from "../components/common/PageHeading";
import { buckets, initialSelections } from "../services/academicData";
import {
  BookOpen,
  Check,
  CheckCircle2,
  ChevronRight,
  Layers,
  Sparkles,
  RotateCcw,
  AlertTriangle,
  X,
} from "lucide-react";

export default function Subjects({ selections, setSelections, goTo }) {
  const [active, setActive] = useState("C0");
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetStatus, setResetStatus] = useState("");

  const bucket = buckets.find((item) => item.id === active) || buckets[0];

  const selectedSubjects = useMemo(() => {
    return buckets
      .map((b) => b.subjects.find((s) => s.code === selections[b.id]))
      .filter(Boolean);
  }, [selections]);

  const credits = useMemo(() => {
    return selectedSubjects.reduce((sum, item) => sum + item.credits, 0);
  }, [selectedSubjects]);

  const complete = useMemo(() => {
    return Object.keys(selections).length === buckets.length;
  }, [selections]);

  const handleResetCourseSelections = () => {
    setSelections(initialSelections);
    setShowResetModal(false);
    setResetStatus("Course selections have been reset to default curriculum subjects.");
    setTimeout(() => setResetStatus(""), 4000);
  };

  return (
    <div className="subject-selection-page">
      <PageHeading
        title="Bucket-Wise Course Selection"
        description="Choose one course from each academic bucket. Review credits, teaching components, and syllabus outlines. Your selections save automatically."
        aside={
          <div className="subject-aside-meter-row">
            <div className="credit-meter">
              <div className="meter-header">
                <span>Selected Credits</span>
                <strong>
                  <span className="animated-number">{credits}</span>
                  <small> / 25 Max</small>
                </strong>
              </div>
              <div className="meter-track">
                <i style={{ width: `${Math.min((credits / 25) * 100, 100)}%` }} />
              </div>
              <p>
                {complete && credits === 25
                  ? "Requirement met (25 Credits)"
                  : `${buckets.length - selectedSubjects.length} of ${buckets.length} buckets remaining`}
              </p>
            </div>

            <button
              type="button"
              className="reset-action-pill vertical-reset-btn"
              onClick={() => setShowResetModal(true)}
              title="Reset course selections to default"
              aria-label="Reset course selections"
            >
              <span className="vertical-text">
                <span>Re</span>
                <span>Set</span>
              </span>
              <RotateCcw size={13} className="vertical-reset-icon" />
            </button>
          </div>
        }
      />

      {resetStatus && (
        <div className="admin-feedback-banner feedback-success mb-4 animate-in fade-in">
          <CheckCircle2 size={18} />
          <div className="admin-feedback-body">
            <strong>{resetStatus}</strong>
          </div>
        </div>
      )}

      <div className="bucket-layout">
        {/* Bucket Navigation Sidebar */}
        <aside className="bucket-nav">
          <div className="bucket-nav-header">
            <p className="eyebrow">Academic Buckets</p>
          </div>

          <div className="bucket-nav-list">
            {buckets.map((item) => {
              const selectedCode = selections[item.id];
              const isNone = selectedCode === "NONE";
              const subject = item.subjects.find((s) => s.code === selectedCode);
              const isRegisteredCourse = Boolean(subject) && !isNone;
              const isCurrent = active === item.id;

              const statusClass = isRegisteredCourse
                ? "completed"
                : isNone
                ? "opted-none"
                : "pending";

              return (
                <button
                  key={item.id}
                  type="button"
                  className={`bucket-nav-item ${isCurrent ? "active" : ""} ${statusClass}`}
                  aria-current={isCurrent ? "step" : undefined}
                  onClick={() => {
                    setActive(item.id);
                  }}
                >
                  <span className="nav-bucket-badge">{item.id}</span>
                  <div className="nav-bucket-info">
                    <strong>{item.short}</strong>
                    <small>
                      {isNone
                        ? "Not selected (None)"
                        : isRegisteredCourse
                        ? `${subject.credits} credits chosen`
                        : "Selection needed"}
                    </small>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="bucket-nav-footer">
            <div className="nav-legend">
              <span className="legend-dot completed" />
              <span>Selected</span>
              <span className="legend-dot opted-none" />
              <span>None chosen</span>
              <span className="legend-dot pending" />
              <span>Pending</span>
            </div>
          </div>
        </aside>

        {/* Bucket Main Content & Subject Discovery */}
        <section className="bucket-content" key={bucket.id}>
          {/* Header of Active Bucket */}
          <div className="bucket-header-panel">
            <div className="bucket-header-meta">
              <span className="bucket-code-pill">{bucket.id}</span>
              <span className="bucket-type-tag">{bucket.short}</span>
            </div>
            <h2>{bucket.title}</h2>
            <p className="bucket-desc">
              Select one approved course from this academic bucket. Selections directly determine your faculty preference options in the subsequent step.
            </p>
          </div>

          {/* Subjects Option Cards */}
          <div className="subject-cards-grid">
            {bucket.subjects.map((item) => {
              const isSelected = selections[bucket.id] === item.code;

              return (
                <article
                  key={item.code}
                  className={`subject-card ${isSelected ? "selected" : ""}`}
                  onClick={() =>
                    setSelections((current) => ({
                      ...current,
                      [bucket.id]: item.code,
                    }))
                  }
                >
                  <div className="card-top">
                    <div className="card-code-group">
                      <span className="card-code">{item.code}</span>
                      <span className="card-credits">{item.credits} Credits</span>
                    </div>

                    <div className="card-radio-mark" aria-hidden="true">
                      {isSelected && <Check size={14} />}
                    </div>
                  </div>

                  <h3 className="card-title">{item.name}</h3>

                  <p className="card-description">
                    {item.description || "Core foundational coursework and practical laboratory sessions designed for computer science engineering."}
                  </p>

                  {/* Components Badges & L-T-P-S Structure */}
                  <div className="card-details-strip">
                    <div className="component-badges">
                      {item.components.map((c) => (
                        <span key={c} className={`badge-comp badge-${c}`} title={`Component: ${c}`}>
                          {c}
                        </span>
                      ))}
                    </div>

                    <div className="ltps-badge" title="Lecture - Tutorial - Practical - Skill hours per week">
                      <div className="ltps-matrix-labels">
                        <span>L</span>
                        <span>T</span>
                        <span>P</span>
                        <span>S</span>
                      </div>
                      <div className="ltps-matrix-values">
                        <span>{item.ltps[0]}</span>
                        <span>{item.ltps[1]}</span>
                        <span>{item.ltps[2]}</span>
                        <span>{item.ltps[3]}</span>
                      </div>
                    </div>
                  </div>

                  <div className="card-action-row">
                    <span className="action-hint">
                      {isSelected ? "Selected for Registration" : "Click to Select Course"}
                    </span>
                    {isSelected && (
                      <span className="selected-indicator-pill">
                        <CheckCircle2 size={14} /> Active
                      </span>
                    )}
                  </div>
                </article>
              );
            })}

            {/* None of the Above Option */}
            {(() => {
              const isNoneSelected = selections[bucket.id] === "NONE";
              return (
                <article
                  className={`subject-card subject-card-none ${isNoneSelected ? "selected" : ""}`}
                  onClick={() =>
                    setSelections((current) => ({
                      ...current,
                      [bucket.id]: "NONE",
                    }))
                  }
                >
                  <div className="card-top">
                    <div className="card-code-group">
                      <span className="card-code">NONE</span>
                      <span className="card-credits">0 Credits</span>
                    </div>

                    <div className="card-radio-mark" aria-hidden="true">
                      {isNoneSelected && <Check size={14} />}
                    </div>
                  </div>

                  <h3 className="card-title">None of the above</h3>

                  <p className="card-description">
                    Choose this option if you do not wish to register for any of the listed courses in {bucket.short} ({bucket.title}) this semester.
                  </p>

                  <div className="card-action-row">
                    <span className="action-hint">
                      {isNoneSelected ? "Selected: None of the above" : "Click to select none"}
                    </span>
                    {isNoneSelected && (
                      <span className="selected-indicator-pill">
                        <CheckCircle2 size={14} /> Active
                      </span>
                    )}
                  </div>
                </article>
              );
            })()}
          </div>

          {/* Sticky Bucket Navigation Footer */}
          <div className="bucket-footer">
            <div className="bucket-footer-info">
              {selections[bucket.id] === "NONE" ? (
                <span className="text-slate-600 font-semibold flex items-center gap-1.5 text-xs">
                  <CheckCircle2 size={16} /> None of the above selected for {bucket.short}
                </span>
              ) : selections[bucket.id] ? (
                <span className="text-emerald-700 font-semibold flex items-center gap-1.5 text-xs">
                  <CheckCircle2 size={16} /> Course selected for {bucket.short}
                </span>
              ) : (
                <span className="text-amber-700 font-semibold flex items-center gap-1.5 text-xs">
                  Pending selection for {bucket.short}
                </span>
              )}
            </div>

            <div className="bucket-footer-actions">
              {/* Previous Bucket button */}
              {buckets.findIndex((b) => b.id === bucket.id) > 0 && (
                <button
                  type="button"
                  className="secondary-btn btn-sm"
                  onClick={() => {
                    const idx = buckets.findIndex((b) => b.id === bucket.id);
                    setActive(buckets[idx - 1].id);
                  }}
                >
                  Previous Bucket
                </button>
              )}

              {/* Next Bucket button */}
              {buckets.findIndex((b) => b.id === bucket.id) < buckets.length - 1 ? (
                <button
                  type="button"
                  className="primary-btn btn-sm"
                  onClick={() => {
                    const idx = buckets.findIndex((b) => b.id === bucket.id);
                    setActive(buckets[idx + 1].id);
                  }}
                >
                  Next Bucket
                </button>
              ) : (
                <button
                  type="button"
                  className="primary-btn btn-sm"
                  onClick={() => goTo("preferences")}
                >
                  <span>Continue to Faculty Preferences</span>
                  <ChevronRight size={14} />
                </button>
              )}
            </div>
          </div>
        </section>
      </div>

      {/* Confirmation Modal for Resetting Course Selections */}
      {showResetModal && (
        <div className="modal-backdrop-centered" onClick={() => setShowResetModal(false)}>
          <div
            className="admin-confirm-dialog"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <div className="admin-confirm-header">
              <div className="admin-confirm-icon-wrap">
                <AlertTriangle size={24} className="text-amber-600" />
              </div>
              <div>
                <h2>Reset Course Selections</h2>
                <p>Are you sure you want to reset all selected subjects?</p>
              </div>
            </div>

            <div className="admin-confirm-body">
              <p className="text-sm text-slate-600">
                This will restore your subject selections back to the university default curriculum subjects across all 7 academic buckets (SDC, PCC-1, PCC-2, PCC-3, PE-1, PE-2, OE-1).
              </p>
              <div className="admin-confirm-summary-box">
                <div className="admin-confirm-row">
                  <span>Scope:</span>
                  <strong>All 7 Course Buckets (25 Credits)</strong>
                </div>
                <div className="admin-confirm-row">
                  <span>Action:</span>
                  <span className="text-amber-700 font-semibold">Restore Default Subjects</span>
                </div>
              </div>
            </div>

            <div className="admin-confirm-actions">
              <button
                type="button"
                className="secondary-btn"
                onClick={() => setShowResetModal(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="primary-btn danger-override"
                onClick={handleResetCourseSelections}
              >
                <RotateCcw size={15} />
                <span>Confirm Reset</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
