import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerCliente } from "../api/authApi";

const REGIONES_CHILE = [
  "Arica y Parinacota",
  "Tarapacá",
  "Antofagasta",
  "Atacama",
  "Coquimbo",
  "Valparaíso",
  "Metropolitana de Santiago",
  "Libertador General Bernardo O’Higgins",
  "Maule",
  "Ñuble",
  "Biobío",
  "La Araucanía",
  "Los Ríos",
  "Los Lagos",
  "Aysén",
  "Magallanes y Antártica Chilena",
];

export default function RegistroCliente() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    password: "",
    confirmPassword: "",
    calle: "",
    numero: "",
    departamento: "",
    comuna: "",
    region: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (
      !form.nombre ||
      !form.apellido ||
      !form.email ||
      !form.password ||
      !form.calle ||
      !form.numero ||
      !form.comuna ||
      !form.region
    ) {
      setError("Completa todos los campos obligatorios (*).");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      setLoading(true);

      await registerCliente({
        nombre: form.nombre,
        apellido: form.apellido,
        email: form.email,
        telefono: form.telefono,
        password: form.password,
        calle: form.calle,
        numeroCasa: form.numero,
        numeroDepto: form.departamento,
        comuna: form.comuna,
        region: form.region,
      });

      setSuccess("Cuenta creada correctamente. Ahora puedes iniciar sesión.");

      setForm({
        nombre: "",
        apellido: "",
        email: "",
        telefono: "",
        password: "",
        confirmPassword: "",
        calle: "",
        numero: "",
        departamento: "",
        comuna: "",
        region: "",
      });

      setTimeout(() => navigate("/login"), 1000);
    } catch (err: any) {
      setError(
        err instanceof Error
          ? err.message || "No se pudo completar el registro."
          : "No se pudo completar el registro."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: 520 }}>
      <h2 className="mb-4">Crear cuenta</h2>

      {error && <div className="alert alert-danger py-2">{error}</div>}
      {success && <div className="alert alert-success py-2">{success}</div>}

      <form className="d-grid gap-3" onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          className="form-control"
          placeholder="Nombre *"
          value={form.nombre}
          onChange={handleChange}
        />

        <input
          type="text"
          name="apellido"
          className="form-control"
          placeholder="Apellido *"
          value={form.apellido}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          className="form-control"
          placeholder="Correo electrónico *"
          value={form.email}
          onChange={handleChange}
        />

        <input
          type="text"
          name="telefono"
          className="form-control"
          placeholder="Teléfono (opcional)"
          value={form.telefono}
          onChange={handleChange}
        />

        <div className="fw-semibold mt-2">Dirección</div>

        <input
          type="text"
          name="calle"
          className="form-control"
          placeholder="Calle *"
          value={form.calle}
          onChange={handleChange}
        />

        <div className="d-flex gap-2">
          <input
            type="text"
            name="numero"
            className="form-control"
            placeholder="Número *"
            value={form.numero}
            onChange={handleChange}
          />
          <input
            type="text"
            name="departamento"
            className="form-control"
            placeholder="Depto (opcional)"
            value={form.departamento}
            onChange={handleChange}
          />
        </div>

        <input
          type="text"
          name="comuna"
          className="form-control"
          placeholder="Comuna *"
          value={form.comuna}
          onChange={handleChange}
        />

        <select
          name="region"
          className="form-select"
          value={form.region}
          onChange={handleChange}
        >
          <option value="">Selecciona una región *</option>
          {REGIONES_CHILE.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>

        <input
          type="password"
          name="password"
          className="form-control"
          placeholder="Contraseña *"
          value={form.password}
          onChange={handleChange}
        />

        <input
          type="password"
          name="confirmPassword"
          className="form-control"
          placeholder="Confirmar contraseña *"
          value={form.confirmPassword}
          onChange={handleChange}
        />

        <button className="btn btn-primary" disabled={loading}>
          {loading ? "Registrando..." : "Registrarse"}
        </button>
      </form>

      <div className="mt-3">
        ¿Ya tienes una cuenta?{" "}
        <Link to="/login" className="text-primary">
          Inicia sesión
        </Link>
      </div>
    </div>
  );
}


