import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";

type Role = "CLIENTE" | "ADMIN" | "SUPER_ADMIN" | string;

export interface AuthUser {
  id: number;
  email: string;
  nombre: string;
  apellido: string;
  role: Role;
  telefono?: string | null;
  enabled?: boolean;
  calle?: string | null;
  numeroCasa?: string | null;
  numeroDepto?: string | null;
  comuna?: string | null;
  region?: string | null;
}

interface AuthContextProps {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  login: (email: string, password: string) => Promise<AuthUser | null>;
  logout: () => void;
}

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080";

const AuthContext = createContext<AuthContextProps | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Cargar sesión desde localStorage al iniciar
useEffect(() => {
  const storedToken = localStorage.getItem("token");
  const storedUser = localStorage.getItem("authUser");

  // Solo restaurar sesión si existen AMBOS valores
  if (storedToken && storedUser) {
    try {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    } catch {
      localStorage.removeItem("token");
      localStorage.removeItem("authUser");
    }
  } else {
    // Si no están los dos, limpiamos sesión incompleta
    localStorage.removeItem("token");
    localStorage.removeItem("authUser");
  }
}, []);


  const login = useCallback(async (email: string, password: string) => {
    try {
      const resp = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!resp.ok) return null;

      const data = await resp.json();

      // EXTRAER TOKEN 🔥
      const jwtToken = data.token;
      if (!jwtToken) {
        console.error("Backend no devolvió token JWT");
        return null;
      }

      // GUARDAR TOKEN
      setToken(jwtToken);
      localStorage.setItem("token", jwtToken);

      // Usuario
      const loggedUser: AuthUser = {
        id: data.id,
        email: data.email,
        nombre: data.nombre,
        apellido: data.apellido,
        role: data.role,
        telefono: data.telefono ?? null,
        enabled: data.enabled ?? true,
        calle: data.calle ?? null,
        numeroCasa: data.numeroCasa ?? null,
        numeroDepto: data.numeroDepto ?? null,
        comuna: data.comuna ?? null,
        region: data.region ?? null,
      };

      setUser(loggedUser);
      localStorage.setItem("authUser", JSON.stringify(loggedUser));

      return loggedUser;
    } catch (err) {
      console.error("Error al hacer login:", err);
      return null;
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("authUser");
    localStorage.removeItem("token");
  }, []);

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: !!user && !!token,
      isAdmin: user?.role === "ADMIN" || user?.role === "SUPER_ADMIN",
      isSuperAdmin: user?.role === "SUPER_ADMIN",
      login,
      logout,
    }),
    [user, token, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de <AuthProvider>");
  return ctx;
}


