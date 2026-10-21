import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/logo_marcas/Moar3.jpg"; // <<--- tu logo aquí

export default function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const loggedUser = await login(email, pass);
    if (!loggedUser) {
      setError("Credenciales incorrectas");
      return;
    }

    if (loggedUser.role === "SUPER_ADMIN") navigate("/super-admin", { replace: true });
    else if (loggedUser.role === "ADMIN") navigate("/admin", { replace: true });
    else navigate("/", { replace: true });
  };

  return (
    <div className="container py-5" style={{ maxWidth: 450 }}>
      <div className="card shadow-sm border-0 p-4">
        {/* LOGO */}
        <div className="text-center mb-3">
          <img
            src={logo}
            alt="Logo"
            style={{ width: 250, height: "auto", opacity: 0.9 }}
          />
        </div>

        <h3 className="fw-semibold text-center mb-1" style={{ color: "#14284b" }}>
          Iniciar sesión
        </h3>

        <p className="text-muted text-center mb-4" style={{ fontSize: 13 }}>
          Accede con tu correo y contraseña
        </p>

        <form className="d-grid gap-3" onSubmit={onSubmit}>
          <input
            id="login-email"
            className="form-control"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            id="login-password"
            className="form-control"
            type="password"
            placeholder="Contraseña"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />

          {error && (
            <div className="alert alert-danger py-2 text-center mb-0">
              {error}
            </div>
          )}

          <button id="login-submit-btn" className="btn btn-primary mt-2">Ingresar</button>
        </form>
      </div>
    </div>
  );
}



