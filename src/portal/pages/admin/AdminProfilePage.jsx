import { useState, useEffect } from "react";
import {
  User,
  CheckCircle,
  Pencil,
  X,
  Save,
} from "lucide-react";

export default function AdminProfilePage({ admin }) {
  // Initial administrator details from props or defaults
  const [profile, setProfile] = useState({
    name: admin?.name || "G. Bhaanu Sai",
    username: admin?.username || "8897337687",
    email: "bhaanusai.g@kluniversity.in",
    personalEmail: "bhaanusai.admin@gmail.com",
    phone: "+91 88973 37687",
    designation: "Assistant Director of Academic Registration",
    department: "Office of the Registrar / Computer Science & Engineering",
    campus: "KLEF Green Fields, Vaddeswaram",
    role: "System Administrator",
    accessLevel: "Full Registration Central Administration",
    lastLogin: "Active Now",
    mfaStatus: "Enabled (TOTP / SMS)",
    sessionTimeout: "4 Hours",
    auditId: "ADM-SEC-8897",
  });

  // Load custom saved administrator contact details from localStorage if present
  useEffect(() => {
    const saved = localStorage.getItem("klef-admin-profile");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setProfile((prev) => ({ ...prev, ...parsed }));
      } catch {}
    }
  }, []);

  // Editing state for allowable contact fields
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    personalEmail: "",
    phone: "",
    campus: "",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const startEdit = () => {
    setEditForm({
      personalEmail: profile.personalEmail,
      phone: profile.phone,
      campus: profile.campus,
    });
    setIsEditing(true);
    setFeedback(null);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setFeedback(null);
  };

  const handleSave = (e) => {
    e.preventDefault();
    setIsSaving(true);
    setFeedback(null);

    const updated = {
      ...profile,
      personalEmail: editForm.personalEmail.trim() || profile.personalEmail,
      phone: editForm.phone.trim() || profile.phone,
      campus: editForm.campus.trim() || profile.campus,
    };

    // Save to local storage for persistence across reloads
    localStorage.setItem("klef-admin-profile", JSON.stringify(updated));
    setProfile(updated);

    setTimeout(() => {
      setIsSaving(false);
      setIsEditing(false);
      setFeedback({
        type: "success",
        text: "Administrator contact preferences updated successfully.",
      });
      setTimeout(() => setFeedback(null), 4000);
    }, 400);
  };

  // Monogram initials
  const initials = profile.name
    .split(" ")
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 3)
    .join("");

  return (
    <section className="admin-profile-shell">
      {/* Header Banner */}
      <div className="admin-records-header">
        <div>
          <span className="kicker">Institutional Account</span>
          <h1 className="admin-page-title">Administrator Profile</h1>
          <p className="admin-page-desc">
            Manage your administrative identity credentials and contact preferences.
          </p>
        </div>
        {!isEditing && (
          <button type="button" className="secondary-btn" onClick={startEdit}>
            <Pencil size={15} />
            <span>Edit Contact Info</span>
          </button>
        )}
      </div>

      {feedback && (
        <div
          className={`admin-feedback-banner ${
            feedback.type === "success" ? "feedback-success" : "feedback-error"
          }`}
        >
          <CheckCircle size={18} />
          <div className="admin-feedback-body">
            <strong>{feedback.text}</strong>
          </div>
        </div>
      )}

      {/* Main Profile Grid */}
      <div className="admin-profile-clean-layout">
        {/* Profile Card */}
        <div className="admin-content-card">
          <div className="admin-card-header">
            <div className="admin-card-title-group">
              <div className="admin-id-avatar-circle sm">
                <span>{initials}</span>
                <span className="admin-avatar-status-badge" title="Online and Authenticated" />
              </div>
              <div>
                <h2 className="admin-clean-profile-name">{profile.name}</h2>
              </div>
            </div>
            {isEditing && (
              <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                Editing Mode Active
              </span>
            )}
          </div>

          {!isEditing ? (
            <div className="admin-details-grid">
              <div className="admin-detail-item">
                <dt>Full Name (Official)</dt>
                <dd>{profile.name}</dd>
              </div>
              <div className="admin-detail-item">
                <dt>Employee / Admin ID</dt>
                <dd className="font-mono">{profile.username}</dd>
              </div>
              <div className="admin-detail-item">
                <dt>Institutional Email</dt>
                <dd>
                  <a href={`mailto:${profile.email}`} className="text-blue-600 hover:underline">
                    {profile.email}
                  </a>
                </dd>
              </div>
              <div className="admin-detail-item">
                <dt>Personal Contact Email</dt>
                <dd>{profile.personalEmail || "—"}</dd>
              </div>
              <div className="admin-detail-item">
                <dt>Contact Mobile</dt>
                <dd>{profile.phone || "—"}</dd>
              </div>
              <div className="admin-detail-item">
                <dt>Campus Location</dt>
                <dd>{profile.campus}</dd>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSave} className="admin-edit-contact-form">
              <div className="admin-form-row">
                <div className="admin-reset-field-group">
                  <label className="admin-field-label">Institutional Email (System Locked)</label>
                  <input
                    type="text"
                    value={profile.email}
                    disabled
                    className="admin-text-input bg-slate-50 text-slate-500 cursor-not-allowed"
                  />
                  <span className="admin-field-helper">Managed by university IT directory services.</span>
                </div>

                <div className="admin-reset-field-group">
                  <label htmlFor="personal-email-input" className="admin-field-label">
                    Personal / Recovery Email
                  </label>
                  <input
                    id="personal-email-input"
                    type="email"
                    value={editForm.personalEmail}
                    onChange={(e) => setEditForm({ ...editForm, personalEmail: e.target.value })}
                    className="admin-text-input"
                    placeholder="e.g., bhaanusai.admin@gmail.com"
                    required
                  />
                </div>
              </div>

              <div className="admin-form-row">
                <div className="admin-reset-field-group">
                  <label htmlFor="phone-input" className="admin-field-label">
                    Contact Mobile Number
                  </label>
                  <input
                    id="phone-input"
                    type="tel"
                    value={editForm.phone}
                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                    className="admin-text-input"
                    placeholder="+91 88973 37687"
                    required
                  />
                </div>

                <div className="admin-reset-field-group">
                  <label htmlFor="campus-input" className="admin-field-label">
                    Campus Office Location
                  </label>
                  <input
                    id="campus-input"
                    type="text"
                    value={editForm.campus}
                    onChange={(e) => setEditForm({ ...editForm, campus: e.target.value })}
                    className="admin-text-input"
                    placeholder="e.g., KLEF Green Fields, Vaddeswaram"
                    required
                  />
                </div>
              </div>

              <div className="admin-edit-actions">
                <button type="button" className="secondary-btn" onClick={cancelEdit} disabled={isSaving}>
                  <X size={15} />
                  <span>Cancel</span>
                </button>
                <button type="submit" className="primary-btn" disabled={isSaving}>
                  <Save size={15} />
                  <span>{isSaving ? "Saving Changes…" : "Save Contact Details"}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
