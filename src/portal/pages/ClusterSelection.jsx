import { useState } from "react";
import PageHeading from "../components/common/PageHeading";
import { ArrowLeft, Check, Info } from "lucide-react";
import { getStudentRosterInfo } from "../services/studentService";

export default function ClusterSelection({ studentId, cluster, setCluster, goTo }) {
  const studentInfo = getStudentRosterInfo(studentId);
  const autoAssignedCluster = studentInfo.cluster || cluster || "Cluster 2";
  const specializationName = studentInfo.specialization || "Generative AI for Agentic and Multi-Modal Intelligence";

  const clusters = [
    {
      id: "Cluster 1",
      name: "Cluster 1",
      range: "S1 — S50",
      description: "Section range 1 through 50 for primary cohort registrations.",
      isAssigned: autoAssignedCluster === "Cluster 1",
    },
    {
      id: "Cluster 2",
      name: "Cluster 2",
      range: "S51 — S100",
      description: "Section range 51 through 100 aligned with your specialization cohort.",
      isAssigned: autoAssignedCluster === "Cluster 2",
    },
  ];

  return (
    <div className="cluster-selection-workspace">
      <PageHeading
        title="Cluster Selection"
        description="Confirm the section cluster assigned to your specialization before choosing semester subjects."
        aside={
          <div className="status-stamp">
            <span>SELECTED COHORT</span>
            <strong>{autoAssignedCluster}</strong>
          </div>
        }
      />

      <section className="specialization-banner">
        <span className="specialization-tag">
          Your Specialization
        </span>
        <strong>{specializationName}</strong>
      </section>

      <div className="cluster-grid">
        {clusters.map((item) => {
          const selected = item.isAssigned;
          return (
            <div
              key={item.id}
              role="button"
              tabIndex={0}
              className={`cluster-card ${selected ? "selected" : ""}`}
              style={{
                cursor: selected ? "default" : "not-allowed",
                opacity: selected ? 1 : 0.6,
              }}
            >
              <div className="cluster-card-header">
                {item.isAssigned ? (
                  <span className="cluster-badge">
                    Assigned Cohort
                  </span>
                ) : (
                  <span className="cluster-badge cluster-badge-neutral">
                    Locked to Other Cohort
                  </span>
                )}
                <span className={`cluster-radio-indicator ${selected ? "is-selected" : ""}`}>
                  {selected && <Check size={14} strokeWidth={3} />}
                </span>
              </div>

              <div className="cluster-body">
                <div className="cluster-title-row">
                  <strong>{item.name}</strong>
                  <div className="cluster-range-pill">
                    <span>Range</span>
                    <em>{item.range}</em>
                  </div>
                </div>
                <p className="cluster-desc">{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="cluster-notice">
        <div className="notice-icon-wrap">
          <Info size={16} className="text-amber-600" />
        </div>
        <span>
          Your cluster is based on your specialization cohort. All course buckets will display faculty
          and section allocations from this cluster only.
        </span>
      </div>

      <div className="cluster-actions">
        <button
          type="button"
          className="secondary-btn"
          onClick={() => goTo("overview")}
        >
          <ArrowLeft size={15} />
          <span>Back to Overview</span>
        </button>
        <button
          type="button"
          className="primary-btn"
          onClick={() => {
            setCluster(autoAssignedCluster);
            goTo("subjects");
          }}
        >
          <span>Confirm {autoAssignedCluster}</span>
          <Check size={16} />
        </button>
      </div>
    </div>
  );
}
