import { useState, useMemo } from "react";
import PageHeading from "../components/common/PageHeading";
import { useFaculty } from "../hooks/useFaculty";
import { buckets, componentNames, sectionFor } from "../services/academicData";
import { Search, UserRound, ArrowUpDown, Filter, BookOpen, Layers, X, Download } from "lucide-react";

export default function FacultyDirectory({ cluster }) {
  const [query, setQuery] = useState("");
  const [courseCode, setCourseCode] = useState("All courses");
  const [component, setComponent] = useState("All components");
  const [facultyOrder, setFacultyOrder] = useState("asc");
  const [isExporting, setIsExporting] = useState(false);

  const facultyList = useFaculty(facultyOrder);
  const courses = useMemo(() => {
    return buckets
      .flatMap((bucket) => bucket.subjects)
      .sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  const directoryRows = useMemo(() => {
    return facultyList
      .flatMap((person) =>
        person.subjects.flatMap((subjectName) => {
          const subject = courses.find((item) => item.name === subjectName);
          return person.components.map((teachingComponent) => ({
            person,
            subjectName,
            subject,
            teachingComponent,
          }));
        }),
      )
      .filter(({ person, subjectName, subject, teachingComponent }) => {
        const text =
          `${person.name} ${person.id} ${subject?.code || ""} ${subjectName} ${teachingComponent} ${componentNames[teachingComponent]}`.toLowerCase();
        return (
          text.includes(query.toLowerCase()) &&
          (courseCode === "All courses" || subject?.code === courseCode) &&
          (component === "All components" || teachingComponent === component)
        );
      });
  }, [facultyList, courses, query, courseCode, component]);

  const hasActiveFilters = query.trim() !== "" || courseCode !== "All courses" || component !== "All components";

  // Export full faculty data to PDF
  const handleDownloadPdf = async () => {
    if (isExporting) return;
    setIsExporting(true);
    try {
      const { jsPDF } = await import("jspdf");
      const autoTableModule = await import("jspdf-autotable");
      const autoTable = autoTableModule.default || autoTableModule;

      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      // Header Banner
      doc.setFillColor(36, 52, 77); // KLEF Navy
      doc.rect(0, 0, 210, 24, "F");

      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.setTextColor(255, 255, 255);
      doc.text("Koneru Lakshmaiah Education Foundation", 14, 11);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(190, 205, 225);
      doc.text("Academic Semester 5 · Faculty Allocation Directory", 14, 18);

      // Meta Info
      doc.setFontSize(8);
      doc.setTextColor(100, 116, 139);
      const today = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
      doc.text(`Generated on: ${today}  |  Assigned Cohort: ${cluster || "Cluster 2"}  |  Total Allocations: ${directoryRows.length}`, 14, 31);

      // Build table rows
      const tableRows = directoryRows.map(({ person, subjectName, subject, teachingComponent }) => [
        person.id,
        person.name,
        subject ? sectionFor(person.id, cluster) : "S - 58",
        `${teachingComponent} (${componentNames[teachingComponent] || teachingComponent})`,
        subject?.code || "TBA",
        subjectName,
      ]);

      autoTable(doc, {
        startY: 35,
        head: [["EMP ID", "Faculty Member", "Section", "Component", "Course Code", "Course Name"]],
        body: tableRows,
        theme: "striped",
        headStyles: {
          fillColor: [36, 52, 77],
          textColor: [255, 255, 255],
          fontSize: 8,
          fontStyle: "bold",
          halign: "left",
        },
        bodyStyles: {
          fontSize: 7.5,
          textColor: [30, 41, 59],
          rowPageBreak: "avoid",
        },
        alternateRowStyles: {
          fillColor: [248, 250, 252],
        },
        columnStyles: {
          0: { cellWidth: 22 },
          1: { cellWidth: 46, fontStyle: "bold" },
          2: { cellWidth: 20 },
          3: { cellWidth: 32 },
          4: { cellWidth: 24 },
          5: { cellWidth: 46 },
        },
        margin: { left: 14, right: 14, bottom: 16 },
        didDrawPage: (data) => {
          // Footer Page Number
          const pageCount = doc.internal.getNumberOfPages();
          doc.setFontSize(7.5);
          doc.setTextColor(148, 163, 184);
          doc.text(
            `Page ${data.pageNumber} of ${pageCount}  ·  KLEF Academic Registration Portal`,
            14,
            doc.internal.pageSize.height - 8
          );
        },
      });

      doc.save(`KLEF-Faculty-Directory-${cluster ? cluster.replace(/\s+/g, "_") : "Cohort"}.pdf`);
    } catch (err) {
      console.error("PDF generation error:", err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="faculty-directory-page">
      <PageHeading
        title="Faculty Information"
        description="Search and inspect faculty allocations, teaching components (L, T, P, S), and section distributions across all offered semester courses."
        aside={
          <div className="flex items-center gap-3">
            <div className="status-stamp">
              <span>ASSIGNED COHORT</span>
              <strong>{cluster || "Cluster 2"}</strong>
            </div>

            <button
              type="button"
              className="faculty-download-icon-btn"
              onClick={handleDownloadPdf}
              disabled={isExporting}
              title="Download entire faculty list in PDF format"
              aria-label="Download faculty list PDF"
            >
              <Download size={18} />
            </button>
          </div>
        }
      />

      {/* Directory Filter Bar */}
      <div className="admin-filter-bar">
        <div className="admin-search-box">
          <Search size={16} className="text-slate-400" />
          <input
            type="text"
            placeholder="Search by faculty name, EMP ID, or course…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="admin-search-input"
          />
          {query && (
            <button
              type="button"
              className="text-slate-400 hover:text-slate-600"
              onClick={() => setQuery("")}
            >
              <X size={14} />
            </button>
          )}
        </div>

        <div className="admin-select-filter">
          <select
            value={courseCode}
            onChange={(e) => setCourseCode(e.target.value)}
            className="admin-filter-select"
          >
            <option value="All courses">All Courses</option>
            {courses.map((item) => (
              <option key={item.code} value={item.code}>
                {item.code} · {item.name}
              </option>
            ))}
          </select>
        </div>

        <div className="admin-select-filter">
          <select
            value={component}
            onChange={(e) => setComponent(e.target.value)}
            className="admin-filter-select"
          >
            <option value="All components">All Components (L, T, P, S)</option>
            {Object.entries(componentNames).map(([key, name]) => (
              <option key={key} value={key}>
                {key} — {name}
              </option>
            ))}
          </select>
        </div>

        <div className="admin-select-filter">
          <select
            value={facultyOrder}
            onChange={(e) => setFacultyOrder(e.target.value)}
            className="admin-filter-select"
          >
            <option value="asc">Name · A → Z</option>
            <option value="desc">Name · Z → A</option>
          </select>
        </div>

        <div className="admin-filter-meta">
          {hasActiveFilters && (
            <button
              type="button"
              className="admin-clear-filter-btn"
              onClick={() => {
                setQuery("");
                setCourseCode("All courses");
                setComponent("All components");
              }}
            >
              Reset filters
            </button>
          )}
          <span className="admin-record-counter">
            {directoryRows.length} {directoryRows.length === 1 ? "Record" : "Records"}
          </span>
        </div>
      </div>

      {/* Directory Table */}
      <div className="admin-table-container">
        <table className="admin-data-table">
          <thead>
            <tr>
              <th style={{ width: "14%" }}>EMP ID</th>
              <th style={{ width: "24%" }}>Faculty Member</th>
              <th style={{ width: "12%" }}>Section</th>
              <th style={{ width: "14%" }}>Component</th>
              <th style={{ width: "14%" }}>Course Code</th>
              <th style={{ width: "22%" }}>Course Name</th>
            </tr>
          </thead>
          <tbody>
            {directoryRows.map(({ person, subjectName, subject, teachingComponent }) => (
              <tr key={`${person.id}-${subjectName}-${teachingComponent}`} className="admin-table-row">
                <td>
                  <span className="font-mono text-xs font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                    {person.id}
                  </span>
                </td>
                <td>
                  <strong className="text-slate-900 font-semibold text-sm">{person.name}</strong>
                </td>
                <td>
                  <span className="font-semibold text-slate-800 text-xs">
                    {subject ? sectionFor(person.id, cluster) : "S - 58"}
                  </span>
                </td>
                <td>
                  <span className="badge-component-tag" title={componentNames[teachingComponent]}>
                    {teachingComponent}
                  </span>
                </td>
                <td>
                  <span className="font-mono text-xs text-blue-700 font-medium">
                    {subject?.code || "TBA"}
                  </span>
                </td>
                <td>
                  <span className="text-xs text-slate-700 font-medium">{subjectName}</span>
                </td>
              </tr>
            ))}

            {!directoryRows.length && (
              <tr>
                <td colSpan={6} className="admin-table-empty">
                  No faculty allocations match your active search or filter criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
