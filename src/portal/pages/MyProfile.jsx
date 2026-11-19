import { useEffect, useState } from "react";
import DatePicker from "../components/common/DatePicker";
import PageHeading from "../components/common/PageHeading";
import PasswordInput from "../components/common/PasswordInput";
import { passwordsMatch } from "../utils/validation";
import {
  hasCustomPassword,
  getCustomPassword,
  setCustomPassword,
  getRememberedDateOfBirth,
} from "../services/authService";
import { Check, CheckCircle2, Lock, Shield, User, KeyRound, AlertCircle } from "lucide-react";

export default function Profile({ studentId }) {
  const [profile, setProfile] = useState(null);
  const [email] = useState(studentId ? `${studentId}@kluniversity.in` : "");
  const [personalEmail, setPersonalEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordStatus, setPasswordStatus] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [currentDob, setCurrentDob] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [hasCustomPwd, setHasCustomPwd] = useState(() => hasCustomPassword(studentId));

  // Keep hasCustomPwd in sync whenever studentId changes or after an update
  useEffect(() => {
    setHasCustomPwd(hasCustomPassword(studentId));
  }, [studentId]);

  useEffect(() => {
    if (!studentId) return;
    fetch(`/portal-api/student-profile?studentId=${studentId}`)
      .then((r) => r.json())
      .then((res) => {
        if (res.ok && res.data) {
          const s = res.data;
          setProfile({
            name: s.name,
            rollNumber: s.student_id,
            department: `${s.program || 'CSE'} · Computer Science & Engineering`,
            specialization: s.specialization || "Not verified",
            batch: "2023–2027",
            term: "Fourth Year · Semester 8 (2026–27 EVEN)",
            gender: s.gender || "—",
            dateOfBirth: s.date_of_birth || "—",
            aadhaarNumber: s.aadhaar_number || "—",
            apaarNumber: s.apaar_number || s.aapaar_number || s.apaarNumber || s.aapaarNumber || "—",
            residencyStatus: s.residency_status || "—",
            parentName: s.parent_name || "—",
            parentPhoneNumber: s.parent_phone_number || "—",
          });
          setPersonalEmail(s.personal_email || `${s.student_id}@kluniversity.in`);
          setMobile(s.mobile_number || "—");
        }
      })
      .catch((err) => console.error("Error loading student profile in MyProfile:", err));
  }, [studentId]);

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    // Verify current credential
    if (hasCustomPwd) {
      const activePwd = getCustomPassword(studentId);
      if (activePwd && currentPassword !== activePwd) {
        setPasswordStatus("error");
        setPasswordMessage("Current password entered is incorrect.");
        return;
      }
    } else {
      const registeredDob = profile?.dateOfBirth || getRememberedDateOfBirth(studentId) || "2005-01-01";
      if (!currentDob) {
        setPasswordStatus("error");
        setPasswordMessage("Please select your current registered Date of Birth.");
        return;
      }
      // Allow verification against either the student's registered DOB or the universal default 2005-01-01
      if (currentDob !== registeredDob && currentDob !== "2005-01-01") {
        setPasswordStatus("error");
        setPasswordMessage("Current Date of Birth does not match your official record or default credential (01 Jan 2005).");
        return;
      }
    }

    if (!newPassword || newPassword.length < 8) {
      setPasswordStatus("error");
      setPasswordMessage("New password must be at least 8 characters long.");
      return;
    }

    if (!passwordsMatch(newPassword, confirmPassword)) {
      setPasswordStatus("error");
      setPasswordMessage("New passwords do not match.");
      return;
    }

    // Save custom password
    setCustomPassword(studentId, newPassword);
    setHasCustomPwd(true);

    setCurrentPassword("");
    setCurrentDob("");
    setNewPassword("");
    setConfirmPassword("");
    setPasswordStatus("success");
    setPasswordMessage("Password updated successfully. Your new password is now active and can be used immediately.");
  };

  return (
    <>
      <PageHeading
        title="My Profile"
        description="Review your verified university enrollment credentials and manage student contact information."
      />

      <div className="profile-layout">
        {/* Main Profile Information Form */}
        <section className="plain-section profile-card-main">
          <div className="section-title">
            <div className="profile-header-title">
              <div className="profile-avatar-wrap">
                <User size={24} className="text-blue-600" />
              </div>
              <div>
                <h2>Student Information</h2>
              </div>
            </div>
          </div>

          <div className="profile-fields-grid">
            <div className="field-block">
              <span className="field-label">Student Name</span>
              <input disabled value={profile?.name || "—"} readOnly className="field-input readonly" />
            </div>

            <div className="field-block">
              <span className="field-label">Roll Number</span>
              <input disabled value={profile?.rollNumber || "—"} readOnly className="field-input readonly" />
            </div>

            <div className="field-block">
              <span className="field-label">Department</span>
              <input disabled value={profile?.department || "—"} readOnly className="field-input readonly" />
            </div>

            <div className="field-block">
              <span className="field-label">Specialization</span>
              <input disabled value={profile?.specialization || "—"} readOnly className="field-input readonly" />
            </div>

            <div className="field-block">
              <span className="field-label">Batch</span>
              <input disabled value={profile?.batch || "—"} readOnly className="field-input readonly" />
            </div>

            <div className="field-block">
              <span className="field-label">Current Term</span>
              <input disabled value={profile?.term || "—"} readOnly className="field-input readonly" />
            </div>

            <div className="field-block">
              <span className="field-label">University Email</span>
              <input disabled value={email} readOnly className="field-input readonly" />
            </div>

            <div className="field-block">
              <span className="field-label">Date of Birth</span>
              <input disabled value={profile?.dateOfBirth || "—"} readOnly className="field-input readonly" />
            </div>

            <div className="field-block">
              <span className="field-label">Personal Email</span>
              <input
                disabled
                type="email"
                value={personalEmail}
                readOnly
                className="field-input readonly"
              />
            </div>

            <div className="field-block">
              <span className="field-label">Mobile Number</span>
              <input
                disabled
                type="tel"
                value={mobile}
                readOnly
                className="field-input readonly"
              />
            </div>

            <div className="field-block">
              <span className="field-label">Gender</span>
              <input disabled value={profile?.gender || "—"} readOnly className="field-input readonly" />
            </div>

            <div className="field-block">
              <span className="field-label">Aadhaar Number</span>
              <input disabled value={profile?.aadhaarNumber || "—"} readOnly className="field-input readonly" />
            </div>

            <div className="field-block">
              <span className="field-label">APAAR Number</span>
              <input disabled value={profile?.apaarNumber || profile?.aapaarNumber || "—"} readOnly className="field-input readonly" />
            </div>

            <div className="field-block">
              <span className="field-label">Residential Status</span>
              <input disabled value={profile?.residencyStatus || "—"} readOnly className="field-input readonly" />
            </div>

            <div className="field-block">
              <span className="field-label">Parent / Guardian Name</span>
              <input disabled value={profile?.parentName || "—"} readOnly className="field-input readonly" />
            </div>

            <div className="field-block">
              <span className="field-label">Parent Contact Number</span>
              <input disabled value={profile?.parentPhoneNumber || "—"} readOnly className="field-input readonly" />
            </div>
          </div>
        </section>

        {/* Account Security & Password Management */}
        <aside className="account-sidebar">
          <section className="security-card">
            <div className="security-header">
              <div className="security-icon-wrap">
                <KeyRound size={20} className="text-blue-600" />
              </div>
              <div>
                <p className="eyebrow">Account Security</p>
                <h2>Change Password</h2>
              </div>
            </div>

            <p className="security-desc">
              Ensure your account is protected with a secure password containing at least 8 characters.
            </p>

            <form className="security-form" onSubmit={handlePasswordSubmit}>
              {hasCustomPwd ? (
                <div className="field-block">
                  <span className="field-label">Current Password</span>
                  <PasswordInput
                    value={currentPassword}
                    onChange={(event) => setCurrentPassword(event.target.value)}
                    autoComplete="current-password"
                    placeholder="Enter current password"
                    required
                  />
                </div>
              ) : (
                <div className="field-block">
                  <span className="field-label">Current Credential (Date of Birth)</span>
                  <DatePicker
                    label="Current Registered DOB"
                    value={currentDob}
                    onChange={setCurrentDob}
                  />
                  <small className="field-help-text">
                    Verify your current default credential using the calendar
                  </small>
                </div>
              )}

              <div className="field-block">
                <span className="field-label">New Password</span>
                <PasswordInput
                  minLength={8}
                  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}
                  autoComplete="new-password"
                  placeholder="Minimum 8 characters"
                  required
                />
              </div>

              <div className="field-block">
                <span className="field-label">Confirm New Password</span>
                <PasswordInput
                  minLength={8}
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  autoComplete="new-password"
                  placeholder="Re-enter new password"
                  required
                />
              </div>

              {passwordMessage && (
                <div className={`form-feedback-pill ${passwordStatus}`} role="status">
                  {passwordStatus === "success" ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                  <span>{passwordMessage}</span>
                </div>
              )}

              <button type="submit" className="primary-btn w-full">
                <span>Update Password</span>
              </button>
            </form>
          </section>
        </aside>
      </div>
    </>
  );
}
