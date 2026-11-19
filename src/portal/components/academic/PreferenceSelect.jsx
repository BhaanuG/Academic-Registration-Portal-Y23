import { faculty, sectionFor } from "../../services/academicData";
import { Check, ChevronDown } from "lucide-react";

export default function PreferenceSelect({
  value,
  onChange,
  options,
  used = [],
  excludedIds = [],
  label,
  subjectCode,
  component = "L",
  cluster = "Cluster 2",
  placeholder = "Select faculty member...",
  sectionHint,
}) {
  // Determine faculty pool: use options prop if provided, else filter default faculty list
  const facultyPool = options && Array.isArray(options)
    ? options
    : faculty.filter((f) => {
        const matchesComp = !component || f.components.includes(component);
        const matchesSub = !subjectCode || f.subjects.some((s) => s === subjectCode || s);
        return matchesComp && matchesSub;
      });

  const selectedFaculty = value ? faculty.find((f) => f.id === value) : null;
  const sectionText = value ? sectionFor(subjectCode, value, component, cluster) : "";

  // Combine used and excludedIds
  const unavailableIds = [...(used || []), ...(excludedIds || [])];

  return (
    <div className={`preference-select-card ${value ? "is-selected" : ""}`}>
      {label && (
        <div className="pref-label-row">
          <span className="pref-rank-title">{label}</span>
          {value && (
            <span className="pref-saved-pill">
              <Check size={12} />
              <span>Locked &amp; Saved</span>
            </span>
          )}
        </div>
      )}

      <div className="pref-dropdown-container">
        <select
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          className="pref-native-select"
        >
          <option value="">{placeholder}</option>
          {facultyPool.map((person) => {
            const sec = sectionFor(subjectCode, person.id, component, cluster);
            const isUsed = unavailableIds.includes(person.id) && person.id !== value;
            return (
              <option
                key={person.id}
                value={person.id}
                disabled={isUsed}
              >
                {sec} • {person.name} • {person.id}{isUsed ? " — Already chosen" : ""}
              </option>
            );
          })}
        </select>
        <ChevronDown size={16} className="pref-select-arrow" />
      </div>

      <div className="pref-meta-row">
        {selectedFaculty ? (
          <div className="pref-details">
            <strong>{selectedFaculty.designation || "Faculty Member"}</strong>
            <span>Section {sectionText}</span>
          </div>
        ) : (
          <span className="pref-placeholder-hint">Select a faculty to lock in lecture section</span>
        )}
      </div>

      {sectionHint && <em className="preference-section-hint">{sectionHint}</em>}
    </div>
  );
}
