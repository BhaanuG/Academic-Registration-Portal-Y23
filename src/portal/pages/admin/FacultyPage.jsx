import { useState, useMemo, useEffect } from "react";
import {
  Pencil,
  Plus,
  RefreshCcw,
  Search,
  Trash2,
  ArrowUpDown,
  UserRound,
  BookOpen,
  X,
  Layers,
  ChevronRight,
  Filter,
} from "lucide-react";
import { componentNames } from "../../services/academicData";

export default function FacultyPage({
  records,
  onRefresh,
  onAdd,
  onEdit,
  onDelete,
  loading,
  status,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [componentFilter, setComponentFilter] = useState("all");
  const [courseFilter, setCourseFilter] = useState("all");
  const [sortBy, setSortBy] = useState("facultyName");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedFaculty, setSelectedFaculty] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSelectedFaculty(null);
      }
    };
    if (selectedFaculty) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [selectedFaculty]);

  // Extract unique courses for filtering
  const courseOptions = useMemo(() => {
    const set = new Set();
    records.forEach((r) => {
      if (r.courseCode) set.add(r.courseCode);
    });
    return Array.from(set).sort();
  }, [records]);

  const filteredAndSorted = useMemo(() => {
    let result = [...records];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (f) =>
          f.facultyName?.toLowerCase().includes(q) ||
          f.employeeId?.toLowerCase().includes(q) ||
          f.courseCode?.toLowerCase().includes(q) ||
          f.courseName?.toLowerCase().includes(q) ||
          f.section?.toLowerCase().includes(q) ||
          f.department?.toLowerCase().includes(q)
      );
    }

    if (componentFilter !== "all") {
      result = result.filter((f) => {
        if (Array.isArray(f.component)) return f.component.includes(componentFilter);
        return f.component === componentFilter;
      });
    }

    if (courseFilter !== "all") {
      result = result.filter((f) => f.courseCode === courseFilter);
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
  }, [records, searchQuery, componentFilter, courseFilter, sortBy, sortOrder]);

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
    setComponentFilter("all");
    setCourseFilter("all");
  };

  const hasActiveFilters = searchQuery.trim() !== "" || componentFilter !== "all" || courseFilter !== "all";

  return (
    <section className="admin-records-container">
      {/* Header and Add Action */}
      <div className="admin-records-header">
        <div>
          <span className="kicker">University Academics</span>
          <h1 className="admin-page-title">Faculty Allocations</h1>
          <p className="admin-page-desc">
            Manage faculty course assignments, section allocations, and component responsibilities (L, T, P, S).
          </p>
        </div>
        <button type="button" className="primary-btn" onClick={onAdd}>
          <Plus size={16} />
          <span>Allocate Faculty</span>
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
            placeholder="Search by faculty name, EMP ID, course, or section…"
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
            value={componentFilter}
            onChange={(e) => setComponentFilter(e.target.value)}
            className="admin-filter-select"
          >
            <option value="all">All Components</option>
            <option value="L">Lecture (L)</option>
            <option value="T">Tutorial (T)</option>
            <option value="P">Practical (P)</option>
            <option value="S">Skill (S)</option>
          </select>
        </div>

        <div className="admin-select-filter">
          <select
            value={courseFilter}
            onChange={(e) => setCourseFilter(e.target.value)}
            className="admin-filter-select"
          >
            <option value="all">All Courses</option>
            {courseOptions.map((code) => (
              <option key={code} value={code}>
                {code}
              </option>
            ))}
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

      {/* Faculty Data Table */}
      <div className="admin-table-container">
        <table className="admin-data-table">
          <thead>
            <tr>
              <th
                onClick={() => toggleSort("facultyName")}
                className="sortable-th"
                style={{ width: "28%" }}
              >
                <div className="th-content">
                  <span>Faculty Name &amp; EMP ID</span>
                  <ArrowUpDown size={13} className={sortBy === "facultyName" ? "text-blue-600" : "text-slate-400"} />
                </div>
              </th>
              <th
                onClick={() => toggleSort("courseCode")}
                className="sortable-th"
                style={{ width: "30%" }}
              >
                <div className="th-content">
                  <span>Assigned Course &amp; Department</span>
                  <ArrowUpDown size={13} className={sortBy === "courseCode" ? "text-blue-600" : "text-slate-400"} />
                </div>
              </th>
              <th style={{ width: "20%" }}>Section &amp; Components</th>
              <th
                onClick={() => toggleSort("updatedAt")}
                className="sortable-th"
                style={{ width: "12%" }}
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
            {filteredAndSorted.map((record) => {
              const compList = Array.isArray(record.component) ? record.component : [record.component].filter(Boolean);
              return (
                <tr
                  key={record.id}
                  className={`admin-table-row ${selectedFaculty?.id === record.id ? "row-selected" : ""}`}
                >
                  <td
                    onClick={() => setSelectedFaculty(record)}
                    className="clickable-cell"
                  >
                    <div className="student-profile-cell">
                      <div className="student-avatar-badge bg-indigo-50 border-indigo-200 text-indigo-700">
                        {record.facultyName?.split(" ").map((p) => p[0]).slice(0, 2).join("")}
                      </div>
                      <div>
                        <strong className="student-primary-name">{record.facultyName}</strong>
                        <span className="student-secondary-id">
                          ID: {record.employeeId} · {record.designation || "Faculty Member"}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td onClick={() => setSelectedFaculty(record)} className="clickable-cell">
                    <div className="counselor-cell-info">
                      <strong>{record.courseCode} · {record.courseName}</strong>
                      <small>{record.department || "Computer Science & Engineering"}</small>
                    </div>
                  </td>
                  <td onClick={() => setSelectedFaculty(record)} className="clickable-cell">
                    <div className="cluster-tag-group">
                      <span className="badge-cluster bg-slate-100 text-slate-800 border border-slate-200">
                        Section {record.section}
                      </span>
                      {compList.map((c) => (
                        <span key={c} className="badge-component-tag">
                          {c}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td onClick={() => setSelectedFaculty(record)} className="clickable-cell">
                    <span className="text-slate-500 text-xs">
                      {record.updatedAt ? new Date(record.updatedAt).toLocaleDateString("en-GB") : "—"}
                    </span>
                  </td>
                  <td className="text-right">
                    <div className="admin-actions-cell">
                      <button
                        type="button"
                        aria-label="View Faculty Details"
                        title="View Details"
                        className="admin-action-icon-btn"
                        onClick={() => setSelectedFaculty(record)}
                      >
                        <UserRound size={15} />
                      </button>
                      <button
                        type="button"
                        aria-label="Edit faculty assignment"
                        title="Edit Assignment"
                        className="admin-action-icon-btn"
                        onClick={() => onEdit(record)}
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        type="button"
                        aria-label="Delete faculty"
                        title="Delete Assignment"
                        className="admin-action-icon-btn danger"
                        onClick={() => onDelete(record)}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}

            {loading && (
              <tr>
                <td colSpan="5" className="admin-table-empty">
                  Loading faculty allocations…
                </td>
              </tr>
            )}

            {!loading && !filteredAndSorted.length && (
              <tr>
                <td colSpan="5" className="admin-table-empty">
                  No faculty allocation records found matching the active filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Slide-out Faculty Detail Drawer */}
      {selectedFaculty && (
        <div className="student-detail-drawer-scrim" onClick={() => setSelectedFaculty(null)}>
          <aside
            className="student-detail-drawer"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="drawer-header">
              <div className="drawer-title-group">
                <span className="kicker">Faculty Assignment Profile</span>
                <h2>{selectedFaculty.facultyName}</h2>
                <span className="drawer-id-tag">EMP ID: {selectedFaculty.employeeId}</span>
              </div>
              <button
                type="button"
                className="drawer-close-btn"
                onClick={() => setSelectedFaculty(null)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="drawer-content">
              {/* Section: Academic Assignment */}
              <div className="drawer-section">
                <h3>Course &amp; Section Assignment</h3>
                <dl className="drawer-dl">
                  <div>
                    <dt>Course Code</dt>
                    <dd>{selectedFaculty.courseCode}</dd>
                  </div>
                  <div>
                    <dt>Course Title</dt>
                    <dd>{selectedFaculty.courseName}</dd>
                  </div>
                  <div>
                    <dt>Assigned Section</dt>
                    <dd>Section {selectedFaculty.section}</dd>
                  </div>
                  <div>
                    <dt>Teaching Components</dt>
                    <dd>
                      {(Array.isArray(selectedFaculty.component) ? selectedFaculty.component : [selectedFaculty.component])
                        .map((c) => `${componentNames[c] || c} (${c})`)
                        .join(", ")}
                    </dd>
                  </div>
                </dl>
              </div>

              {/* Section: Professional Details */}
              <div className="drawer-section">
                <h3>Departmental Information</h3>
                <dl className="drawer-dl">
                  <div>
                    <dt>Designation</dt>
                    <dd>{selectedFaculty.designation || "Associate Professor"}</dd>
                  </div>
                  <div>
                    <dt>Department</dt>
                    <dd>{selectedFaculty.department || "Computer Science & Engineering"}</dd>
                  </div>
                  <div>
                    <dt>Institutional Contact</dt>
                    <dd>{`${selectedFaculty.employeeId.toLowerCase()}@kluniversity.in`}</dd>
                  </div>
                </dl>
              </div>

              <div className="drawer-actions">
                <button
                  type="button"
                  className="primary-btn w-full"
                  onClick={() => {
                    onEdit(selectedFaculty);
                    setSelectedFaculty(null);
                  }}
                >
                  <Pencil size={15} />
                  <span>Edit Faculty Assignment</span>
                </button>
              </div>
            </div>
          </aside>
        </div>
      )}
    </section>
  );
}
