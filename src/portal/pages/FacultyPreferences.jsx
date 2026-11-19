import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router";
import PageHeading from "../components/common/PageHeading";
import PreferenceSelect from "../components/academic/PreferenceSelect";
import { buckets, componentNames, faculty, getSubSectionFaculty, sectionBase, sectionFor } from "../services/academicData";
import { RotateCcw, AlertTriangle, CheckCircle2, X } from "lucide-react";
import OverlayPortal from "../components/common/OverlayPortal";

export default function Preferences({ studentId, selections, prefs, setPrefs, cluster }) {
  const [studentBuckets, setStudentBuckets] = useState(null);
  const [studentSubjects, setStudentSubjects] = useState(null);

  // Fetch student personalized buckets and elective courses from live DB
  useEffect(() => {
    if (!studentId) return;
    Promise.all([
      fetch(`/portal-api/student-eligible-buckets?studentId=${studentId}`).then((r) => r.json()),
      fetch(`/portal-api/student-subjects?studentId=${studentId}`).then((r) => r.json()),
    ])
      .then(([bRes, sRes]) => {
        if (bRes.ok && Array.isArray(bRes.data) && bRes.data.length > 0) {
          setStudentBuckets(bRes.data);
        }
        if (sRes.ok && Array.isArray(sRes.data) && sRes.data.length > 0) {
          setStudentSubjects(sRes.data);
        }
      })
      .catch(() => {});
  }, [studentId]);

  // Construct entries using student-specific buckets & subjects with fallback
  const entries = useMemo(() => {
    const activeBucketsList = studentBuckets && studentBuckets.length > 0
      ? studentBuckets.map((sb) => {
          const fallback = buckets.find((b) => b.id === sb.id);
          const matchingSubjects = studentSubjects ? studentSubjects.filter((s) => s.bucket_id === sb.id) : [];
          const customSubjects = matchingSubjects.flatMap((ms) => {
            if (ms.is_elective && ms.eligible_courses && ms.eligible_courses.length > 0) {
              return ms.eligible_courses.map((ec) => ({
                code: ec.code,
                name: ec.name,
                credits: ec.credits ?? 3,
                ltps: ec.ltps || (ec.lecture_hours !== undefined && ec.lecture_hours !== null ? [ec.lecture_hours, ec.tutorial_hours ?? 0, ec.practical_hours ?? 0, ec.skill_hours ?? 0] : [3, 0, 0, 0]),
                components: ec.components || ["L"],
                sections: ec.assignedSections || ms.sections,
                optionSheetRange: ms.optionSheetRange,
                description: ec.description || "",
              }));
            }
            return [{
              code: ms.course_code,
              name: ms.course_name,
              credits: ms.credits ?? 3,
              ltps: ms.ltps || (ms.lecture_hours !== undefined && ms.lecture_hours !== null ? [ms.lecture_hours, ms.tutorial_hours ?? 0, ms.practical_hours ?? 0, ms.skill_hours ?? 0] : [3, 0, 0, 0]),
              components: ms.components || ["L"],
              sections: ms.sections,
              optionSheetRange: ms.optionSheetRange,
              description: "",
            }];
          });

          // Deduplicate
          const seen = new Set();
          const unique = [];
          (customSubjects.length > 0 ? customSubjects : (fallback?.subjects || [])).forEach((s) => {
            if (!seen.has(s.code)) {
              seen.add(s.code);
              unique.push(s);
            }
          });

          return {
            id: sb.id,
            short: sb.short_code || fallback?.short || sb.id,
            title: sb.title || fallback?.title || sb.id,
            subjects: unique,
          };
        })
      : buckets;

    return activeBucketsList.map((bucket) => {
      const selectedCode = selections[bucket.id];
      // Search in current bucket subjects first, then search all buckets fallback
      let subject = bucket.subjects.find((s) => s.code === selectedCode);
      if (!subject && selectedCode) {
        for (const b of buckets) {
          const found = b.subjects.find((s) => s.code === selectedCode);
          if (found) {
            subject = found;
            break;
          }
        }
      }
      return {
        bucket,
        subject,
      };
    });
  }, [studentBuckets, studentSubjects, selections]);

  const [activeBucket, setActiveBucket] = useState("C0");

  useEffect(() => {
    if (entries.length > 0 && !entries.some((e) => e.bucket.id === activeBucket)) {
      setActiveBucket(entries[0].bucket.id);
    }
  }, [entries, activeBucket]);
  const [showResetAllModal, setShowResetAllModal] = useState(false);
  const [showResetCurrentModal, setShowResetCurrentModal] = useState(false);
  const [resetStatus, setResetStatus] = useState("");

  // Close modals on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setShowResetAllModal(false);
        setShowResetCurrentModal(false);
      }
    };
    if (showResetAllModal || showResetCurrentModal) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [showResetAllModal, showResetCurrentModal]);

  const activeEntry = entries.find((entry) => entry.bucket.id === activeBucket) || entries[0];
  const subject = activeEntry.subject;

  const setPreference = (component, rank, value) => {
    if (!subject) return;
    const key = `${subject.code}-${component}`;
    setPrefs((all) => {
      const next = { ...all };
      const current = [...(all[key] || ["", "", ""])];
      current[rank] = value;
      next[key] = current;
      if (component === primaryComponent) {
        const otherComponents = subject.components.filter((c) => c !== primaryComponent);
        otherComponents.forEach((c) => {
          [0, 1, 2].forEach((subRank) => {
            const subKey = `${subject.code}-${c}-L${rank + 1}-R${subRank + 1}`;
            delete next[subKey];
          });
        });
      }
      return next;
    });
  };

  const setSubPreference = (component, lectureRank, subRank, value) => {
    if (!subject) return;
    const key = `${subject.code}-${component}-L${lectureRank + 1}-R${subRank + 1}`;
    setPrefs((all) => ({
      ...all,
      [key]: value,
    }));
  };

  const handleResetCurrentSubjectPreferences = () => {
    if (!subject) return;
    setPrefs((all) => {
      const next = { ...all };
      // Delete lecture preferences for this subject
      delete next[`${subject.code}-L`];
      // Delete all sub-component rankings for this subject
      const prefix = `${subject.code}-`;
      Object.keys(next).forEach((k) => {
        if (k.startsWith(prefix)) {
          delete next[k];
        }
      });
      return next;
    });
    setShowResetCurrentModal(false);
    setResetStatus(`Faculty preferences for ${subject.name} (${subject.code}) cleared.`);
    setTimeout(() => setResetStatus(""), 4000);
  };

  const handleResetAllFacultyPreferences = () => {
    setPrefs({});
    setShowResetAllModal(false);
    setResetStatus("All faculty preferences across all subjects cleared.");
    setTimeout(() => setResetStatus(""), 4000);
  };

  const rankLabels = ["First preference", "Second preference", "Third preference"];
  
  // Priority sequence: Lecture (L) -> Tutorial (T) -> Practical (P) -> Skill (S)
  const primaryComponent = subject
    ? (subject.components.includes("L")
        ? "L"
        : subject.components.includes("T")
        ? "T"
        : subject.components.includes("P")
        ? "P"
        : subject.components.includes("S")
        ? "S"
        : subject.components[0] || "L")
    : "L";
  const primaryComponentName = componentNames[primaryComponent] || (
    primaryComponent === "L" ? "Lecture" :
    primaryComponent === "T" ? "Tutorial" :
    primaryComponent === "P" ? "Practical" :
    primaryComponent === "S" ? "Skill" : primaryComponent
  );
  const subComponents = subject ? subject.components.filter((c) => c !== primaryComponent) : [];

  return (
    <>
      <PageHeading
        title="Faculty Preferences"
        description={
          subComponents.length > 0
            ? `Rank three faculty choices for ${primaryComponentName}. Each selected section unlocks a dedicated sub-preference table to rank sub-sections (A, B, C) for remaining course components.`
            : `Rank three faculty choices in order of preference for ${primaryComponentName}. This course has a single delivery component (${primaryComponent}).`
        }
        aside={
          <div className="flex flex-col items-end gap-2">
            <button
              type="button"
              className="reset-action-pill"
              onClick={() => setShowResetAllModal(true)}
              title="Reset all faculty rankings across all subjects"
            >
              <RotateCcw size={13} />
              <span>Reset All Subjects</span>
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

      <div className="preference-layout">
        <aside className="selected-course-nav">
          <p className="eyebrow">Your selected subjects</p>
          {entries.map(({ bucket, subject: item }) => {
            const itemPrimary = item
              ? (item.components.includes("L") ? "L" : item.components[0] || "L")
              : "L";
            const completed =
              item &&
              (prefs[`${item.code}-${itemPrimary}`] || []).filter(Boolean).length === 3;
            return (
              <button
                key={bucket.id}
                className={`${activeEntry.bucket.id === bucket.id ? "active" : ""} ${!item ? "selection-error" : ""}`}
                onClick={() => setActiveBucket(bucket.id)}
              >
                <span>{bucket.id}</span>
                <div>
                  <strong>{item?.name || "No subject selected"}</strong>
                  {item ? (
                    <small>
                      {item.code} · {item.credits} credits
                    </small>
                  ) : (
                    <small>Select a subject in {bucket.id} to continue</small>
                  )}
                </div>
                <b>
                  {!item
                    ? "Action required"
                    : completed
                      ? "Complete"
                      : `${item.components.length} part${item.components.length > 1 ? "s" : ""}`}
                </b>
              </button>
            );
          })}
        </aside>

        <section className="preference-content" key={activeEntry.bucket.id}>
          {!subject ? (
            <div className="preference-empty">
              <span>{activeEntry.bucket.id}</span>
              <h2>Course option not selected</h2>
              <p>
                You selected “None of the above” for this bucket. Return to Course Selection and
                choose a course before entering faculty preferences.
              </p>
              <Link to="/KLEF/3-2/Course-Bucket-Selection">Back to Course Selection</Link>
            </div>
          ) : (
            <>
              <header className="preference-subject-head">
                <div>
                  <div className="bucket-header-meta">
                    <span className="bucket-code-pill">{activeEntry.bucket.id}</span>
                    <span className="bucket-type-tag">{activeEntry.bucket.short}</span>
                  </div>
                  <h2>{activeEntry.bucket.title}</h2>
                  <p className="bucket-desc">
                    {subject.code} · {subject.credits} credits · Components:{" "}
                    {subject.components.map((c) => componentNames[c] || c).join(", ")}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    className="reset-action-pill"
                    onClick={() => setShowResetCurrentModal(true)}
                    title={`Reset faculty rankings for ${subject.code} only`}
                  >
                    <RotateCcw size={12} />
                    <span>Reset {activeEntry.bucket.id}</span>
                  </button>

                  <div className="cohort-chip">
                    <div className="cohort-chip-top">
                      <span className="cohort-label">Assigned Cluster:</span>
                      <strong className="cohort-val">
                        {cluster === "Cluster 1" || cluster === "C 1" || cluster === "C1"
                          ? "C 1"
                          : cluster === "Cluster 2" || cluster === "C 2" || cluster === "C2"
                          ? "C 2"
                          : cluster?.replace(/Cluster\s*/i, "C ") || "C 2"}
                      </strong>
                    </div>
                    {(() => {
                      const labels = ["L", "T", "P", "S"];
                      return (
                        <div className="cohort-ltps-grid-table" title="Course Credit Weight (L | T | P | S)">
                          <div className="grid-row grid-head">
                            {labels.map((lbl) => (
                              <span key={lbl}>{lbl}</span>
                            ))}
                          </div>
                          <div className="grid-row grid-body">
                            {labels.map((_, idx) => (
                              <span key={idx}>-</span>
                            ))}
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </div>
              </header>

              <div className="lecture-preference-card">
                <div className="card-heading">
                  <div>
                    <span className="eyebrow">Primary allocation</span>
                    <h3>{primaryComponentName}</h3>
                    <p>
                      {subComponents.length > 0
                        ? "Select three distinct faculty members in order of preference. Your choice sets the section anchor for tutorials, practicals, and skills."
                        : `Select three distinct faculty members in order of preference for ${primaryComponentName}.`}
                    </p>
                  </div>
                </div>

                <div className="preference-selectors">
                  {rankLabels.map((label, rank) => {
                    const primaryPrefs = prefs[`${subject.code}-${primaryComponent}`] || ["", "", ""];
                    const currentVal = primaryPrefs[rank] || "";
                    const excluded = primaryPrefs.filter((val, i) => i !== rank && Boolean(val));
                    const selectedFaculty = faculty.find((f) => f.id === currentVal);
                    // Determine assigned section range for this subject/component
                    const assignedRange = subject.optionSheetRange || (
                      primaryComponent === "P"
                        ? (subject.sections?.pracSection !== "NA" ? subject.sections?.pracSection : null)
                        : (subject.sections?.lecSection !== "NA" ? subject.sections?.lecSection : null)
                    );

                    return (
                      <div key={label} className="preference-rank-field">
                        <label>
                          <span className="rank-badge">{rank + 1}</span>
                          <span>{label}</span>
                        </label>
                        <PreferenceSelect
                          subjectCode={subject.code}
                          component={primaryComponent}
                          cluster={cluster}
                          sectionFilter={assignedRange}
                          value={currentVal}
                          onChange={(val) => setPreference(primaryComponent, rank, val)}
                          excludedIds={excluded}
                          placeholder={`Choose ${label.toLowerCase()}`}
                        />
                        {selectedFaculty && (
                          <div className="selected-faculty-chip">
                            <span className="faculty-badge">Section</span>
                            <strong>{sectionFor(subject.code, selectedFaculty.id, primaryComponent, cluster)}</strong>
                            <span className="faculty-name">{selectedFaculty.name}</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {subComponents.length > 0 && (
                <div className="subcomponent-preferences">
                  <div className="card-heading">
                    <div>
                      <h3>{subComponents.map((c) => componentNames[c] || c).join(" & ")}</h3>
                      <p>
                        For each {primaryComponentName.toLowerCase()} choice, configure your preferred order for sub-sections.
                        Sub-section faculty are assigned by the department based on availability.
                      </p>
                    </div>
                  </div>

                  {rankLabels.map((label, lectureRank) => {
                    const primaryPrefs = prefs[`${subject.code}-${primaryComponent}`] || ["", "", ""];
                    const primaryFacultyId = primaryPrefs[lectureRank];
                    const primaryFaculty = faculty.find((f) => f.id === primaryFacultyId);
                    const baseSec = primaryFaculty ? sectionBase(sectionFor(subject.code, primaryFaculty.id, primaryComponent, cluster)) : null;

                    if (!primaryFaculty) {
                      return (
                        <div key={label} className="subcomponent-tier-locked">
                          <div className="locked-header">
                            <span className="rank-badge muted">{lectureRank + 1}</span>
                            <strong>{label} sub-components locked</strong>
                          </div>
                          <p>
                            Select a faculty member for {label.toLowerCase()} above to unlock sub-section preferences.
                          </p>
                        </div>
                      );
                    }

                    return (
                      <div key={label} className="subcomponent-tier-active">
                        <div className="tier-header">
                          <div className="tier-title">
                            <span className="rank-badge">{lectureRank + 1}</span>
                            <div>
                              <strong>{label}</strong>
                              <span>
                                {primaryFaculty.name} · Section {sectionFor(subject.code, primaryFaculty.id, primaryComponent, cluster)}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="subcomponent-tables">
                          {subComponents.map((component) => {
                            const letters = ["A", "B", "C"];
                            const compName = componentNames[component] || component;
                            return (
                              <div key={component} className="subcomponent-table-wrap">
                                <div className="table-caption">
                                  <strong>{compName}</strong>
                                  <small>Rank 3 section options</small>
                                </div>
                                <table className="subcomponent-table">
                                  <thead>
                                    <tr>
                                      <th>Rank</th>
                                      <th>Section</th>
                                      <th>Assigned faculty</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {rankLabels.map((rankLabel, subRank) => {
                                      const currentSubVal =
                                        prefs[
                                          `${subject.code}-${component}-L${lectureRank + 1}-R${subRank + 1}`
                                        ] || "";
                                      const otherSubVals = [0, 1, 2]
                                        .filter((i) => i !== subRank)
                                        .map(
                                          (i) =>
                                            prefs[
                                              `${subject.code}-${component}-L${lectureRank + 1}-R${i + 1}`
                                            ],
                                        )
                                        .filter(Boolean);
                                      const availableLetters = letters.filter(
                                        (letter) => !otherSubVals.includes(letter),
                                      );
                                      const assignedFac = currentSubVal && baseSec
                                        ? getSubSectionFaculty(subject.code, baseSec, currentSubVal, component)
                                        : null;

                                      return (
                                        <tr key={rankLabel}>
                                          <td className="rank-col">
                                            <span>{subRank + 1}</span>
                                          </td>
                                          <td className="select-col">
                                            <select
                                              value={currentSubVal}
                                              onChange={(e) =>
                                                setSubPreference(
                                                  component,
                                                  lectureRank,
                                                  subRank,
                                                  e.target.value,
                                                )
                                              }
                                            >
                                              <option value="">Select sub-section</option>
                                              {availableLetters.map((letter) => {
                                                const optFac = baseSec
                                                  ? getSubSectionFaculty(subject.code, baseSec, letter, component)
                                                  : null;
                                                return (
                                                  <option key={letter} value={letter}>
                                                    S - {baseSec}{letter}{optFac ? ` • ${optFac.name} • ${optFac.id}` : ""}
                                                  </option>
                                                );
                                              })}
                                              {currentSubVal &&
                                                !availableLetters.includes(currentSubVal) && (() => {
                                                  const curFac = baseSec
                                                    ? getSubSectionFaculty(subject.code, baseSec, currentSubVal, component)
                                                    : null;
                                                  return (
                                                    <option value={currentSubVal}>
                                                      S - {baseSec}{currentSubVal}{curFac ? ` • ${curFac.name} • ${curFac.id}` : ""}
                                                    </option>
                                                  );
                                                })()}
                                            </select>
                                          </td>
                                          <td className="faculty-col">
                                            {assignedFac ? (
                                              <span className="faculty-name-assigned">
                                                {assignedFac.name}
                                              </span>
                                            ) : (
                                              <span className="faculty-pending">
                                                Select section
                                              </span>
                                            )}
                                          </td>
                                        </tr>
                                      );
                                    })}
                                  </tbody>
                                </table>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </section>
      </div>

      {/* Confirmation Modal for Resetting Single Subject Preferences via OverlayPortal */}
      {showResetCurrentModal && subject && (
        <OverlayPortal
          isOpen={showResetCurrentModal}
          onClose={() => setShowResetCurrentModal(false)}
          className="modal-backdrop-centered"
        >
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
                <h2>Reset {activeEntry.bucket.id}</h2>
                <p>Clear faculty rankings for {subject.name}?</p>
              </div>
            </div>

            <div className="admin-confirm-body">
              <p className="text-sm text-slate-600">
                This will clear all 1st, 2nd, and 3rd lecture faculty rankings and associated Tutorial, Practical, and Skill sub-section preferences for {subject.name} ({subject.code}). Other bucket preferences remain untouched.
              </p>
              <div className="admin-confirm-summary-box">
                <div className="admin-confirm-row">
                  <span>Bucket &amp; Subject:</span>
                  <strong>{activeEntry.bucket.id} · {subject.code}</strong>
                </div>
                <div className="admin-confirm-row">
                  <span>Action:</span>
                  <span className="text-amber-700 font-semibold">Clear Single Subject Preferences</span>
                </div>
              </div>
            </div>

            <div className="admin-confirm-actions">
              <button
                type="button"
                className="secondary-btn"
                onClick={() => setShowResetCurrentModal(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="primary-btn danger-override"
                onClick={handleResetCurrentSubjectPreferences}
              >
                <RotateCcw size={15} />
                <span>Confirm Reset</span>
              </button>
            </div>
          </div>
        </OverlayPortal>
      )}

      {/* Confirmation Modal for Resetting All Faculty Preferences via OverlayPortal */}
      {showResetAllModal && (
        <OverlayPortal
          isOpen={showResetAllModal}
          onClose={() => setShowResetAllModal(false)}
          className="modal-backdrop-centered"
        >
          <div
            className="admin-confirm-dialog"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <div className="admin-confirm-header">
              <div className="admin-confirm-icon-wrap">
                <AlertTriangle size={24} className="text-rose-600" />
              </div>
              <div>
                <h2>Reset All Faculty Preferences</h2>
                <p>Are you sure you want to clear all faculty rankings across all subjects?</p>
              </div>
            </div>

            <div className="admin-confirm-body">
              <p className="text-sm text-slate-600">
                This will clear all 1st, 2nd, and 3rd lecture choices and sub-section preferences across all your enrolled courses.
              </p>
              <div className="admin-confirm-summary-box">
                <div className="admin-confirm-row">
                  <span>Target:</span>
                  <strong>All 7 Course Buckets</strong>
                </div>
                <div className="admin-confirm-row">
                  <span>Action:</span>
                  <span className="text-rose-700 font-semibold">Clear All Preferences</span>
                </div>
              </div>
            </div>

            <div className="admin-confirm-actions">
              <button
                type="button"
                className="secondary-btn"
                onClick={() => setShowResetAllModal(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="primary-btn danger-override"
                onClick={handleResetAllFacultyPreferences}
              >
                <RotateCcw size={15} />
                <span>Confirm Reset All</span>
              </button>
            </div>
          </div>
        </OverlayPortal>
      )}
    </>
  );
}
