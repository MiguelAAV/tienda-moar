import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function MiCuenta() {
  const { user, isAuthenticated, isAdmin, isSuperAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { replace: true });
      return;
    }

    if (isAdmin || isSuperAdmin) {
      navigate("/admin", { replace: true });
    }
  }, [isAuthenticated, isAdmin, isSuperAdmin, navigate]);

  if (!user) return null;

  return (
    <div className="container py-5" style={{ maxWidth: 900 }}>
      {/* Encabezado */}
      <header className="mb-4">
        <h2
          className="fw-bold mb-1"
          style={{ fontSize: "2rem", color: "#14284b" }}
        >
          Mi cuenta
        </h2>
        <p className="text-muted mb-0" style={{ fontSize: 14 }}>
          Revisa y mantén actualizada tu información personal y de envío.
        </p>
      </header>

      {/* INFORMACIÓN PERSONAL */}
      <section className="mb-4">
        <div className="card shadow-sm border-0">
          <div
            className="card-body"
            style={{
              borderLeft: "4px solid #ff8c00",
            }}
          >
            <div className="d-flex align-items-center justify-content-between mb-3">
              <div>
                <span
                  className="badge rounded-pill text-bg-light mb-1"
                  style={{ fontSize: 11 }}
                >
                  Perfil
                </span>
                <h4
                  className="fw-semibold mb-0"
                  style={{ color: "#14284b", fontSize: "1.1rem" }}
                >
                  Información personal
                </h4>
              </div>

              {/* “Logo” simple: iniciales del usuario */}
              <div
                className="rounded-circle d-flex align-items-center justify-content-center"
                style={{
                  width: 46,
                  height: 46,
                  backgroundColor: "#f1f3f9",
                  color: "#14284b",
                  fontWeight: 600,
                  fontSize: 18,
                }}
              >
                {user.nombre?.[0]}
                {user.apellido?.[0]}
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <p className="mb-2">
                  <strong>Nombre:</strong> {user.nombre} {user.apellido}
                </p>
                <p className="mb-2">
                  <strong>Correo:</strong> {user.email}
                </p>
                <p className="mb-2">
                  <strong>Teléfono:</strong> {user.telefono || "No registrado"}
                </p>
              </div>

              <div className="col-md-6">
                <p className="mb-2">
                  <strong>Rol:</strong> {user.role}
                </p>
                <p className="mb-2">
                  <strong>Estado:</strong>{" "}
                  {user.enabled ? (
                    <span className="badge bg-success">Activo</span>
                  ) : (
                    <span className="badge bg-secondary">Inactivo</span>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DIRECCIÓN DE ENVÍO */}
      <section className="mb-4">
        <div className="card shadow-sm border-0">
          <div
            className="card-body"
            style={{
              borderLeft: "4px solid #14284b",
            }}
          >
            <div className="d-flex align-items-center justify-content-between mb-3">
              <div>
                <span
                  className="badge rounded-pill text-bg-light mb-1"
                  style={{ fontSize: 11 }}
                >
                  Envío
                </span>
                <h4
                  className="fw-semibold mb-0"
                  style={{ color: "#14284b", fontSize: "1.1rem" }}
                >
                  Dirección de envío
                </h4>
              </div>

              {/* Ícono simple al costado */}
              <div
                className="rounded-3 d-flex align-items-center justify-content-center"
                style={{
                  width: 40,
                  height: 40,
                  border: "1px solid #dee3ed",
                  backgroundColor: "#f9fafb",
                  fontSize: 18,
                }}
              >
                📦
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <p className="mb-2">
                  <strong>Calle:</strong> {user.calle || "—"}
                </p>
                <p className="mb-2">
                  <strong>Número:</strong> {user.numeroCasa || "—"}
                </p>
                <p className="mb-2">
                  <strong>Departamento:</strong> {user.numeroDepto || "—"}
                </p>
              </div>

              <div className="col-md-6">
                <p className="mb-2">
                  <strong>Comuna:</strong> {user.comuna || "—"}
                </p>
                <p className="mb-0">
                  <strong>Región:</strong> {user.region || "—"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEGURIDAD */}
      <section>
        <div className="card shadow-sm border-0">
          <div
            className="card-body"
            style={{
              borderLeft: "4px solid #dee3ed",
            }}
          >
            <div className="d-flex align-items-center justify-content-between mb-3">
              <div>
                <span
                  className="badge rounded-pill text-bg-light mb-1"
                  style={{ fontSize: 11 }}
                >
                  Seguridad
                </span>
                <h4
                  className="fw-semibold mb-0"
                  style={{ color: "#14284b", fontSize: "1.1rem" }}
                >
                  Acceso y contraseña
                </h4>
              </div>
              <div
                className="rounded-circle d-flex align-items-center justify-content-center"
                style={{
                  width: 40,
                  height: 40,
                  border: "1px solid #dee3ed",
                  backgroundColor: "#f9fafb",
                  fontSize: 18,
                }}
              >
                🔒
              </div>
            </div>

            <p className="text-muted mb-3" style={{ fontSize: 14 }}>
              Próximamente podrás gestionar tu contraseña de forma segura desde
              esta sección.
            </p>

            <button className="btn btn-outline-secondary btn-sm" disabled>
              Cambiar contraseña (próximamente)
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}



