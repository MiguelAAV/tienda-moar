import { Navigate, useLocation } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuth } from "../context/AuthContext";

export default function SuperAdminRoute({ children }: { children: ReactNode }) {
  const { isSuperAdmin } = useAuth();
  const location = useLocation();

  if (!isSuperAdmin) {
    return <Navigate to={`/login?from=${location.pathname}`} replace />;
  }

  return <>{children}</>;
}
