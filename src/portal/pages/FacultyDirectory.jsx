import { useState, useMemo, useEffect } from "react";
import PageHeading from "../components/common/PageHeading";
import { allocations, buckets, componentNames } from "../services/academicData";
import { Search, UserRound, ArrowUpDown, Filter, BookOpen, Layers, X, Download } from "lucide-react";

export default function FacultyDirectory({ cluster, studentId, selections }) {
  const [query, setQuery] = useState("");
  const [courseCode, setCourseCode] = useState("All courses");
  const [component, setComponent] = useState("All components");
  const [facultyOrder, setFacultyOrder] = useState("asc");
  const [isExporting, setIsExporting] = useState(false);
  const [rawDirectoryRows, setRawDirectoryRows] = useState(null);

  // Normalize active student cohort cluster (Cluster-1 or Cluster-2)
  const normalizedCluster = useMemo(() => {
    if (!cluster) return "Cluster-1";
    if (cluster === "Cluster 1" || cluster === "C1" || cluster === "Cluster-1") return "Cluster-1";
    if (cluster === "Cluster 2" || cluster === "C2" || cluster === "Cluster-2") return "Cluster-2";
    return cluster;
  }, [cluster]);

  // Fetch this student's specific academic faculty directory from live DB
  useEffect(() => {
    if (!studentId) return;
    fetch(`/portal-api/faculty?studentId=${studentId}`)
      .then((r) => r.json())
      .then((res) => {
        if (res.ok && Array.isArray(res.data) && res.data.length > 0) {
          setRawDirectoryRows(res.data);
        }
      })
      .catch(() => {});
  }, [studentId]);

  const allCatalogCourses = useMemo(() => {
    return buckets.flatMap((bucket) => bucket.subjects);
  }, []);

  const directoryRows = useMemo(() => {
    // If student-specific directory rows were fetched from live backend
    let baseRows = [];
    if (rawDirectoryRows && rawDirectoryRows.length > 0) {
      baseRows = rawDirectoryRows;
    } else {
      // Fallback to cluster allocations
      const clusterAllocations = allocations.filter((a) => a.cluster_id === normalizedCluster);
      const codeToBucket = {};
      buckets.forEach((b) => {
        b.subjects.forEach((s) => {
          codeToBucket[s.code] = b.id;
        });
      });

      baseRows = clusterAllocations.map((alloc) => {
        const subject = allCatalogCourses.find((item) => item.code === alloc.course_code);
        const actualCourseName = subject?.name || alloc.course_name || alloc.course_code;
        const bucketNo = codeToBucket[alloc.course_code] || alloc.bucket_id || "C0";

        return {
          bucketNo,
          courseCode: alloc.course_code,
          courseName: actualCourseName,
          sectionNumber: alloc.section_number,
          section: alloc.section_id,
          component: alloc.component,
          empId: alloc.faculty_id,
          facultyName: alloc.faculty_name || `Faculty Member (${alloc.faculty_id})`,
        };
      });
    }

    // Filter by user search query, course code, and component
    const filtered = baseRows.filter(({ facultyName, empId, section, courseCode: cCode, courseName, component: comp, bucketNo }) => {
      const text =
        `${bucketNo} ${facultyName} ${empId} ${section} ${cCode} ${courseName} ${comp} ${componentNames[comp] || ""}`.toLowerCase();
      return (
        text.includes(query.toLowerCase()) &&
        (courseCode === "All courses" || cCode === courseCode) &&
        (component === "All components" || comp === component)
      );
    });

    // Sort strictly on the basis of Bucket, then Section Number, then Delivery Component
    const multiplier = facultyOrder === "desc" ? -1 : 1;
    return filtered.sort((a, b) => {
      return (
        a.bucketNo.localeCompare(b.bucketNo, undefined, { numeric: true }) ||
        (a.sectionNumber - b.sectionNumber) ||
        a.component.localeCompare(b.component) ||
        (multiplier * a.facultyName.localeCompare(b.facultyName))
      );
    });
  }, [rawDirectoryRows, normalizedCluster, allCatalogCourses, query, courseCode, component, facultyOrder]);

  const courses = useMemo(() => {
    const map = new Map();
    const source = rawDirectoryRows && rawDirectoryRows.length > 0 ? rawDirectoryRows : directoryRows;
    source.forEach((r) => {
      if (!map.has(r.courseCode)) {
        map.set(r.courseCode, { code: r.courseCode, name: r.courseName });
      }
    });
    return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name));
  }, [rawDirectoryRows, directoryRows]);

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
      doc.text("Academic Semester 8 · Faculty Allocation Directory", 14, 18);

      // Meta Info
      doc.setFontSize(8);
      doc.setTextColor(100, 116, 139);
      const today = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
      doc.text(`Generated on: ${today}  |  Total Allocations: ${directoryRows.length}`, 14, 31);

      // Build table rows (7 columns: BUCKET NO., COURSE CODE, NAME OF THE COURSE, SECTION NUMBER, DELIVERY COMPONENT, EMP ID, NAME OF THE FACULTY)
      const tableRows = directoryRows.map((r) => [
        r.bucketNo,
        r.courseCode,
        r.courseName,
        r.sectionNumber,
        r.component,
        r.empId,
        r.facultyName,
      ]);

      autoTable(doc, {
        startY: 35,
        head: [["BUCKET NO.", "COURSE CODE", "NAME OF THE COURSE", "SECTION NUMBER", "DELIVERY COMPONENT", "EMP ID", "NAME OF THE FACULTY"]],
        body: tableRows,
        theme: "grid",
        tableLineColor: [203, 213, 225],
        tableLineWidth: 0.15,
        headStyles: {
          fillColor: [38, 54, 74], // #26364A Top Header Navy
          textColor: [255, 255, 255],
          fontSize: 8,
          fontStyle: "bold",
          halign: "left",
          lineColor: [203, 213, 225],
          lineWidth: 0.2,
        },
        bodyStyles: {
          fontSize: 7.5,
          textColor: [30, 41, 59],
          fillColor: [255, 255, 255], // Pure white background
          lineColor: [226, 232, 240], // Clear row/column borders
          lineWidth: 0.15,
          rowPageBreak: "avoid",
        },
        alternateRowStyles: {
          fillColor: [248, 250, 252], // Crisp neutral light slate
        },
        columnStyles: {
          0: { cellWidth: 18 },
          1: { cellWidth: 26 },
          2: { cellWidth: 54 },
          3: { cellWidth: 20 },
          4: { cellWidth: 18 },
          5: { cellWidth: 20 },
          6: { cellWidth: 38, fontStyle: "bold" },
        },
        margin: { left: 8, right: 8, bottom: 16 },
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
              <th style={{ width: "10%" }}>BUCKET NO.</th>
              <th style={{ width: "14%" }}>COURSE CODE</th>
              <th style={{ width: "26%" }}>NAME OF THE COURSE</th>
              <th style={{ width: "12%" }}>SECTION NUMBER</th>
              <th style={{ width: "10%" }}>DELIVERY COMPONENT</th>
              <th style={{ width: "10%" }}>EMP ID</th>
              <th style={{ width: "18%" }}>NAME OF THE FACULTY</th>
            </tr>
          </thead>
          <tbody>
            {directoryRows.map((r) => (
              <tr key={`${r.bucketNo}-${r.courseCode}-${r.sectionNumber}-${r.component}-${r.empId}`} className="admin-table-row">
                <td>
                  <span className="font-semibold text-xs text-slate-800 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                    {r.bucketNo}
                  </span>
                </td>
                <td>
                  <span className="font-mono text-xs text-blue-700 font-semibold">
                    {r.courseCode}
                  </span>
                </td>
                <td>
                  <span className="text-xs text-slate-800 font-medium">{r.courseName}</span>
                </td>
                <td>
                  <span className="font-semibold text-slate-800 text-xs">
                    {r.sectionNumber} <span className="text-slate-400 font-normal">({r.section})</span>
                  </span>
                </td>
                <td>
                  <span className="badge-component-tag" title={componentNames[r.component] || r.component}>
                    {r.component}
                  </span>
                </td>
                <td>
                  <span className="font-mono text-xs font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                    {r.empId}
                  </span>
                </td>
                <td>
                  <strong className="text-slate-900 font-semibold text-xs">{r.facultyName}</strong>
                </td>
              </tr>
            ))}

            {!directoryRows.length && (
              <tr>
                <td colSpan={7} className="admin-table-empty">
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
