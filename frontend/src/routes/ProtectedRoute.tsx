// src/routes/ProtectedRoute.tsx
import { Navigate, useLocation } from "react-router-dom";
import { type ReactNode } from "react";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAdmin, isSuperAdmin } = useAuth();
  const location = useLocation();

  if (!isAdmin && !isSuperAdmin) {
    try {
      const stored = localStorage.getItem("authUser");
      if (stored) {
        const u = JSON.parse(stored);
        if (u.role === "ADMIN" || u.role === "SUPER_ADMIN") {
          return children;
        }
      }
    } catch {
      /* ignore parsing error */
    }
    return (
      <Navigate
        to={`/login?from=${location.pathname}`}
        replace
      />
    );
  }

  return children;
}

