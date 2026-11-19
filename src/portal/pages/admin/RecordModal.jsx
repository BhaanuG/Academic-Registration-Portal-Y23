import { useEffect } from "react";
import { Save, X } from "lucide-react";

export default function RecordModal({
  editing,
  active,
  singularLabel,
  fields,
  form,
  setForm,
  buckets,
  onSave,
  onClose,
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="admin-modal-backdrop"
      role="presentation"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <section className="admin-modal" role="dialog" aria-modal="true">
        <header>
          <div>
            <span className="kicker">
              {editing === "new" ? "New Entry" : "Modify Record"}
            </span>
            <h2>{singularLabel}</h2>
          </div>
          <button aria-label="Close form" onClick={onClose}><X size={18} /></button>
        </header>

        <form onSubmit={onSave}>
          <div className="admin-form-grid">
            {(fields || []).map(([key, label, type, required, readOnly, options]) => (
              <label key={key} className={type === "textarea" ? "wide" : ""}>
                <span>
                  {label}
                  {required && " *"}
                </span>

                {type === "select" || type === "bucket" ? (
                  <select
                    required={required}
                    disabled={readOnly}
                    value={form[key] || ""}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  >
                    <option value="">Select an option</option>
                    {(type === "bucket"
                      ? buckets.map((bucket) => [bucket.id, `${bucket.code} · ${bucket.title}`])
                      : options.map((option) => [option, option])
                    ).map(([value, text]) => (
                      <option key={value} value={value}>
                        {text}
                      </option>
                    ))}
                  </select>
                ) : type === "multiselect" ? (
                  <div className="admin-check-row">
                    {options.map((option) => (
                      <label key={option}>
                        <input
                          type="checkbox"
                          checked={(form[key] || []).includes(option)}
                          onChange={(e) =>
                            setForm({
                              ...form,
                              [key]: e.target.checked
                                ? [...(form[key] || []), option]
                                : (form[key] || []).filter((item) => item !== option),
                            })
                          }
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                ) : type === "textarea" ? (
                  <textarea
                    value={form[key] || ""}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  />
                ) : type === "checkbox" ? (
                  <input
                    type="checkbox"
                    checked={Boolean(form[key])}
                    onChange={(e) => setForm({ ...form, [key]: e.target.checked })}
                  />
                ) : (
                  <input
                    type={type}
                    required={required}
                    disabled={readOnly}
                    value={form[key] || ""}
                    maxLength={key === "username" ? 10 : undefined}
                    onChange={(e) => {
                      const value = key === "username" ? e.target.value.replace(/\D/g, "") : e.target.value;
                      setForm({
                        ...form,
                        [key]: value,
                        ...(key === "username" ? { universityEmail: value ? `${value}@kluniversity.in` : "" } : {}),
                      });
                    }}
                  />
                )}
              </label>
            ))}
          </div>

          {active === "Students" && (
            <p className="admin-form-note">
              Default password corresponds to the student’s Date of Birth (YYYY-MM-DD). University email is automatically generated from the 10-digit Student ID.
            </p>
          )}

          <footer>
            <button type="button" className="secondary-btn" onClick={onClose}>
              Cancel
            </button>
            <button className="primary-btn" type="submit">
              <Save size={16} />
              <span>Save Record</span>
            </button>
          </footer>
        </form>
      </section>
    </div>
  );
}
