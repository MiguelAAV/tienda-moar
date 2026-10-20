import { useEffect, useState } from "react";
import {
  getAdminUsers,
  createAdminUser,
  updateAdminUser,
  deleteAdminUser,
  type AdminUser,
  type CreateAdminUserDto,
  type UpdateAdminUserDto,
} from "../api/adminUsersApi";

export default function SuperAdminDashboard() {
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  // null = modo crear, número = id en edición
  const [editingId, setEditingId] = useState<number | null>(null);

  const [form, setForm] = useState<{
    nombre: string;
    apellido: string;
    email: string;
    telefono: string;
    password: string; // solo se usa al crear o cambiar
    enabled: boolean;
  }>({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    password: "",
    enabled: true,
  });

  // Cargar admins al entrar
  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getAdminUsers();
        setAdmins(data);
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar los usuarios ADMIN.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const resetForm = () => {
    setEditingId(null);
    setForm({
      nombre: "",
      apellido: "",
      email: "",
      telefono: "",
      password: "",
      enabled: true,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!form.nombre || !form.apellido || !form.email) {
      setError("Completa al menos nombre, apellido y correo.");
      return;
    }

    try {
      setSaving(true);

      if (editingId === null) {
        // CREAR
        if (!form.password) {
          setError("La contraseña es obligatoria al crear un ADMIN.");
          setSaving(false);
          return;
        }

        const dto: CreateAdminUserDto = {
          nombre: form.nombre,
          apellido: form.apellido,
          email: form.email,
          telefono: form.telefono,
          password: form.password,
        };

        const nuevo = await createAdminUser(dto);
        setAdmins((prev) => [...prev, nuevo]);
        setMessage("Usuario ADMIN creado correctamente.");
        resetForm();
      } else {
        // ACTUALIZAR
        const dto: UpdateAdminUserDto = {
          nombre: form.nombre,
          apellido: form.apellido,
          email: form.email,
          telefono: form.telefono,
          enabled: form.enabled,
        };

        // Solo mandamos password si el usuario escribió algo
        if (form.password.trim()) {
          dto.password = form.password;
        }

        const actualizado = await updateAdminUser(editingId, dto);

        setAdmins((prev) =>
          prev.map((a) => (a.id === editingId ? actualizado : a))
        );

        setMessage("Usuario ADMIN actualizado correctamente.");
        resetForm();
      }
    } catch (err) {
      console.error(err);
      setError(
        editingId === null
          ? "No se pudo crear el usuario ADMIN."
          : "No se pudo actualizar el usuario ADMIN."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleEditClick = (admin: AdminUser) => {
    setEditingId(admin.id);
    setForm({
      nombre: admin.nombre,
      apellido: admin.apellido,
      email: admin.email,
      telefono: admin.telefono ?? "",
      password: "",
      enabled: admin.enabled,
    });
    setMessage(null);
    setError(null);
  };

  const handleCancelEdit = () => {
    resetForm();
  };

  const handleDeleteClick = async (admin: AdminUser) => {
    const ok = window.confirm(
      `¿Eliminar al ADMIN ${admin.nombre} ${admin.apellido}?`
    );
    if (!ok) return;

    try {
      await deleteAdminUser(admin.id);
      setAdmins((prev) => prev.filter((a) => a.id !== admin.id));
      setMessage("Usuario ADMIN eliminado correctamente.");
      if (editingId === admin.id) {
        resetForm();
      }
    } catch (err) {
      console.error(err);
      setError("No se pudo eliminar el usuario ADMIN.");
    }
  };

  return (
    <div className="container py-4">
      <h1 className="mb-2">Panel Super Admin</h1>
      <p className="text-muted">
        Gestión completa de usuarios con rol <strong>ADMIN</strong>.
      </p>

      {/* Mensajes */}
      {error && (
        <div className="alert alert-danger py-2 mt-2">{error}</div>
      )}
      {message && (
        <div className="alert alert-success py-2 mt-2">{message}</div>
      )}

      {/* Formulario creación / edición */}
      <section className="mt-4 mb-5">
        <h2 className="h5 mb-3">
          {editingId === null ? "Crear nuevo ADMIN" : "Editar ADMIN"}
        </h2>
        <form className="d-grid gap-2" style={{ maxWidth: 420 }} onSubmit={handleSubmit}>
          <input
            className="form-control"
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={form.nombre}
            onChange={handleChange}
          />
          <input
            className="form-control"
            type="text"
            name="apellido"
            placeholder="Apellido"
            value={form.apellido}
            onChange={handleChange}
          />
          <input
            className="form-control"
            type="email"
            name="email"
            placeholder="Correo"
            value={form.email}
            onChange={handleChange}
          />
          <input
            className="form-control"
            type="text"
            name="telefono"
            placeholder="Teléfono (opcional)"
            value={form.telefono}
            onChange={handleChange}
          />
          <input
            className="form-control"
            type="password"
            name="password"
            placeholder={
              editingId === null
                ? "Contraseña (obligatoria al crear)"
                : "Nueva contraseña (dejar vacío para no cambiar)"
            }
            value={form.password}
            onChange={handleChange}
          />

          <div className="form-check">
            <input
              className="form-check-input"
              id="enabled"
              type="checkbox"
              name="enabled"
              checked={form.enabled}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="enabled">
              Cuenta activa
            </label>
          </div>

          <div className="d-flex gap-2 mt-2">
            <button className="btn btn-primary" type="submit" disabled={saving}>
              {saving
                ? "Guardando..."
                : editingId === null
                ? "Crear ADMIN"
                : "Guardar cambios"}
            </button>
            {editingId !== null && (
              <button
                className="btn btn-secondary"
                type="button"
                onClick={handleCancelEdit}
              >
                Cancelar edición
              </button>
            )}
          </div>
        </form>
      </section>

      {/* Listado de admins */}
      <section>
        <h2 className="h5 mb-3">Lista de usuarios ADMIN</h2>

        {loading ? (
          <p>Cargando admins...</p>
        ) : admins.length === 0 ? (
          <p>No hay usuarios ADMIN registrados.</p>
        ) : (
          <div className="table-responsive">
            <table className="table align-middle">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Correo</th>
                  <th>Teléfono</th>
                  <th>Estado</th>
                  <th style={{ width: 180 }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {admins.map((a) => (
                  <tr key={a.id}>
                    <td>{a.id}</td>
                    <td>{`${a.nombre} ${a.apellido}`}</td>
                    <td>{a.email}</td>
                    <td>{a.telefono || "-"}</td>
                    <td>
                      {a.enabled ? (
                        <span className="badge bg-success">Activo</span>
                      ) : (
                        <span className="badge bg-secondary">Bloqueado</span>
                      )}
                    </td>
                    <td>
                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-sm btn-outline-primary"
                          type="button"
                          onClick={() => handleEditClick(a)}
                        >
                          Editar
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          type="button"
                          onClick={() => handleDeleteClick(a)}
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

