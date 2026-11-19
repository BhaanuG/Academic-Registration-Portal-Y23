import { createContext, useMemo, useState } from "react";
import { clearSession, createSession, getAuthenticatedStudent } from "../services/authService";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [studentId, setStudentId] = useState(getAuthenticatedStudent);
  const value = useMemo(
    () => ({
      studentId,
      signIn(nextStudentId) {
        createSession(nextStudentId);
        setStudentId(nextStudentId);
      },
      signOut() {
        clearSession();
        setStudentId(null);
      },
    }),
    [studentId],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
