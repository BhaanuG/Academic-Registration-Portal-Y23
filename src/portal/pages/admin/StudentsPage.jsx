import { useState, useMemo, useEffect } from "react";
import {
  Pencil,
  Plus,
  RefreshCcw,
  Search,
  Trash2,
  ArrowUpDown,
  User,
  GraduationCap,
  Mail,
  Phone,
  Shield,
  X,
  ExternalLink,
  ChevronRight,
  Filter,
} from "lucide-react";

export default function StudentsPage({
  records,
  onRefresh,
  onAdd,
  onEdit,
  onDelete,
  onResetPassword,
  loading,
  status,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [clusterFilter, setClusterFilter] = useState("all");
  const [residencyFilter, setResidencyFilter] = useState("all");
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSelectedStudent(null);
      }
    };
    if (selectedStudent) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [selectedStudent]);

  const filteredAndSorted = useMemo(() => {
    let result = [...records];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (s) =>
          s.name?.toLowerCase().includes(q) ||
          s.username?.toLowerCase().includes(q) ||
          s.universityEmail?.toLowerCase().includes(q) ||
          s.personalEmail?.toLowerCase().includes(q) ||
          s.counselor?.name?.toLowerCase().includes(q) ||
          s.counselor?.employeeId?.toLowerCase().includes(q)
      );
    }

    if (clusterFilter !== "all") {
      result = result.filter((s) => s.cluster === clusterFilter);
    }

    if (residencyFilter !== "all") {
      result = result.filter((s) => s.residencyStatus === residencyFilter);
    }

    result.sort((a, b) => {
      let valA = a[sortBy] || "";
      let valB = b[sortBy] || "";

      if (typeof valA === "string") valA = valA.toLowerCase();
      if (typeof valB === "string") valB = valB.toLowerCase();

      if (valA < valB) return sortOrder === "asc" ? -1 : 1;
      if (valA > valB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    return result;
  }, [records, searchQuery, sortBy, sortOrder, clusterFilter, residencyFilter]);

  const toggleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const clearFilters = () => {
    setSearchQuery("");
    setClusterFilter("all");
    setResidencyFilter("all");
  };

  const hasActiveFilters = searchQuery.trim() !== "" || clusterFilter !== "all" || residencyFilter !== "all";

  return (
    <section className="admin-records-container">
      {/* Header and Add Action */}
      <div className="admin-records-header">
        <div>
          <span className="kicker">University Directory</span>
          <h1 className="admin-page-title">Students Management</h1>
          <p className="admin-page-desc">
            Review student enrollments, counselor allocations, residency status, and manage account credentials.
          </p>
        </div>
        <button type="button" className="primary-btn" onClick={onAdd}>
          <Plus size={16} />
          <span>Add Student Profile</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="admin-filter-bar">
        <div className="admin-search-box">
          <Search size={16} className="text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by student name, ID, email, or counselor…"
            className="admin-search-input"
          />
          {searchQuery && (
            <button
              type="button"
              className="text-slate-400 hover:text-slate-600"
              onClick={() => setSearchQuery("")}
            >
              <X size={14} />
            </button>
          )}
        </div>

        <div className="admin-select-filter">
          <select
            value={clusterFilter}
            onChange={(e) => setClusterFilter(e.target.value)}
            className="admin-filter-select"
          >
            <option value="all">All Clusters</option>
            <option value="Cluster 1">Cluster 1 (S1–S50)</option>
            <option value="Cluster 2">Cluster 2 (S51–S100)</option>
          </select>
        </div>

        <div className="admin-select-filter">
          <select
            value={residencyFilter}
            onChange={(e) => setResidencyFilter(e.target.value)}
            className="admin-filter-select"
          >
            <option value="all">All Residencies</option>
            <option value="Hosteler">Hosteler</option>
            <option value="Day Scholar">Day Scholar</option>
          </select>
        </div>

        <div className="admin-filter-meta">
          {hasActiveFilters && (
            <button type="button" className="admin-clear-filter-btn" onClick={clearFilters}>
              Reset filters
            </button>
          )}
          <button type="button" className="secondary-btn btn-sm" onClick={onRefresh}>
            <RefreshCcw size={14} />
            <span>Refresh</span>
          </button>
          <span className="admin-record-counter">
            <strong>{filteredAndSorted.length}</strong> of {records.length} records
          </span>
        </div>
      </div>

      {status && (
        <div className="admin-status-toast">
          <span>{status}</span>
        </div>
      )}

      {/* Student Data Table */}
      <div className="admin-table-container">
        <table className="admin-data-table">
          <thead>
            <tr>
              <th
                onClick={() => toggleSort("name")}
                className="sortable-th"
                style={{ width: "30%" }}
              >
                <div className="th-content">
                  <span>Student Name &amp; ID</span>
                  <ArrowUpDown size={13} className={sortBy === "name" ? "text-blue-600" : "text-slate-400"} />
                </div>
              </th>
              <th style={{ width: "24%" }}>Residency &amp; Cluster</th>
              <th style={{ width: "26%" }}>Faculty Counselor</th>
              <th
                onClick={() => toggleSort("updatedAt")}
                className="sortable-th"
                style={{ width: "10%" }}
              >
                <div className="th-content">
                  <span>Updated</span>
                  <ArrowUpDown size={13} className={sortBy === "updatedAt" ? "text-blue-600" : "text-slate-400"} />
                </div>
              </th>
              <th style={{ width: "10%", textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSorted.map((record) => (
              <tr
                key={record.id}
                className={`admin-table-row ${selectedStudent?.id === record.id ? "row-selected" : ""}`}
              >
                <td
                  onClick={() => setSelectedStudent(record)}
                  className="clickable-cell"
                >
                  <div className="student-profile-cell">
                    <div className="student-avatar-badge">
                      {record.name?.split(" ").map((p) => p[0]).slice(0, 2).join("")}
                    </div>
                    <div>
                      <strong className="student-primary-name">{record.name}</strong>
                      <span className="student-secondary-id">
                        {record.username} · {record.universityEmail || "No official email"}
                      </span>
                    </div>
                  </div>
                </td>
                <td onClick={() => setSelectedStudent(record)} className="clickable-cell">
                  <div className="cluster-tag-group">
                    <span className="badge-cluster">{record.cluster || "Cluster 2"}</span>
                    <span className="badge-residency">{record.residencyStatus || "Hosteler"}</span>
                  </div>
                </td>
                <td onClick={() => setSelectedStudent(record)} className="clickable-cell">
                  <div className="counselor-cell-info">
                    <strong>{record.counselor?.name || "Dr. S. Srinivasa Rao"}</strong>
                    <small>ID: {record.counselor?.employeeId || "KLEF0864"}</small>
                  </div>
                </td>
                <td onClick={() => setSelectedStudent(record)} className="clickable-cell">
                  <span className="text-slate-500 text-xs">
                    {record.updatedAt ? new Date(record.updatedAt).toLocaleDateString("en-GB") : "—"}
                  </span>
                </td>
                <td className="text-right">
                  <div className="admin-actions-cell">
                    <button
                      type="button"
                      aria-label="View Student Details"
                      title="View Details"
                      className="admin-action-icon-btn"
                      onClick={() => setSelectedStudent(record)}
                    >
                      <User size={15} />
                    </button>
                    <button
                      type="button"
                      aria-label="Edit student profile"
                      title="Edit Profile"
                      className="admin-action-icon-btn"
                      onClick={() => onEdit(record)}
                    >
                      <Pencil size={15} />
                    </button>
                    <button
                      type="button"
                      aria-label="Reset password"
                      title="Reset Password to Date of Birth"
                      className="admin-action-icon-btn"
                      onClick={() => onResetPassword(record)}
                    >
                      <RefreshCcw size={15} />
                    </button>
                    <button
                      type="button"
                      aria-label="Delete student"
                      title="Delete Record"
                      className="admin-action-icon-btn danger"
                      onClick={() => onDelete(record)}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {loading && (
              <tr>
                <td colSpan="5" className="admin-table-empty">
                  Loading student records…
                </td>
              </tr>
            )}

            {!loading && !filteredAndSorted.length && (
              <tr>
                <td colSpan="5" className="admin-table-empty">
                  No student records found matching the active search or filter criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Slide-out Student Detail Drawer */}
      {selectedStudent && (
        <div className="student-detail-drawer-scrim" onClick={() => setSelectedStudent(null)}>
          <aside
            className="student-detail-drawer"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="drawer-header">
              <div className="drawer-title-group">
                <span className="kicker">Student Detail Profile</span>
                <h2>{selectedStudent.name}</h2>
                <span className="drawer-id-tag">ID: {selectedStudent.username}</span>
              </div>
              <button
                type="button"
                className="drawer-close-btn"
                onClick={() => setSelectedStudent(null)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="drawer-content">
              {/* Section: Academic Identity */}
              <div className="drawer-section">
                <h3>Academic Registration</h3>
                <dl className="drawer-dl">
                  <div>
                    <dt>Assigned Cluster</dt>
                    <dd>{selectedStudent.cluster || "Cluster 2"}</dd>
                  </div>
                  <div>
                    <dt>Residency Status</dt>
                    <dd>{selectedStudent.residencyStatus || "Hosteler"}</dd>
                  </div>
                  <div>
                    <dt>Date of Birth</dt>
                    <dd>{selectedStudent.dateOfBirth || "2005-04-18"}</dd>
                  </div>
                  <div>
                    <dt>Gender</dt>
                    <dd>{selectedStudent.gender || "Male"}</dd>
                  </div>
                </dl>
              </div>

              {/* Section: Contact & Identity */}
              <div className="drawer-section">
                <h3>Contact &amp; Identification</h3>
                <dl className="drawer-dl">
                  <div>
                    <dt>Institutional Email</dt>
                    <dd>{selectedStudent.universityEmail || `${selectedStudent.username}@kluniversity.in`}</dd>
                  </div>
                  <div>
                    <dt>Personal Email</dt>
                    <dd>{selectedStudent.personalEmail || "—"}</dd>
                  </div>
                  <div>
                    <dt>Mobile Number</dt>
                    <dd>{selectedStudent.mobileNumber || "—"}</dd>
                  </div>
                  <div>
                    <dt>Aadhaar Number</dt>
                    <dd>{selectedStudent.aadhaarNumber || "—"}</dd>
                  </div>
                  <div>
                    <dt>APAAR Number</dt>
                    <dd>{selectedStudent.aapaarNumber || "—"}</dd>
                  </div>
                </dl>
              </div>

              {/* Section: Parent & Counselor */}
              <div className="drawer-section">
                <h3>Counselor &amp; Guardian</h3>
                <dl className="drawer-dl">
                  <div>
                    <dt>Faculty Counselor</dt>
                    <dd>{selectedStudent.counselor?.name || "Dr. S. Srinivasa Rao"}</dd>
                  </div>
                  <div>
                    <dt>Counselor ID</dt>
                    <dd>{selectedStudent.counselor?.employeeId || "KLEF0864"}</dd>
                  </div>
                  <div>
                    <dt>Parent Name</dt>
                    <dd>{selectedStudent.parentName || "—"}</dd>
                  </div>
                  <div>
                    <dt>Parent Phone</dt>
                    <dd>{selectedStudent.parentPhoneNumber || "—"}</dd>
                  </div>
                </dl>
              </div>

              <div className="drawer-actions">
                <button
                  type="button"
                  className="primary-btn w-full"
                  onClick={() => {
                    onEdit(selectedStudent);
                    setSelectedStudent(null);
                  }}
                >
                  <Pencil size={15} />
                  <span>Edit Profile Details</span>
                </button>
              </div>
            </div>
          </aside>
        </div>
      )}
    </section>
  );
}
