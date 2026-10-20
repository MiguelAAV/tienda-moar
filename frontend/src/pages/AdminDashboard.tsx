// src/pages/AdminDashboard.tsx
import { useState } from "react";
import { useProducts } from "../context/ProductContext";
import type { Product } from "../assets/products";
import { useAuth } from "../context/AuthContext";

export default function AdminDashboard() {
  const { isAdmin } = useAuth();
  const { products, addProduct, deleteProduct, updateProduct } = useProducts();

  const [editing, setEditing] = useState<Product | null>(null);

  const createEmptyForm = (): Product => ({
    id: 0, // el backend genera el id
    nombre: "",
    brand: "Apple",
    descripcion: "",
    precio: "",
    precioNum: undefined,
    imagen: "",
    stock: 0,
    liberado: "LIBERADO",
  });

  const [form, setForm] = useState<Product>(createEmptyForm());
  const [loading, setLoading] = useState(false);

  if (!isAdmin) {
    return (
      <div className="container py-4">
        <h2>No autorizado</h2>
        <p className="text-muted">Debes iniciar sesión como administrador.</p>
      </div>
    );
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    // stock debe ser número, el resto string
    if (name === "stock") {
      setForm((prev) => ({
        ...prev,
        stock: Number(value),
      }));
    } else if (name === "liberado") {
      setForm((prev) => ({
        ...prev,
        liberado: value as Product["liberado"],
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editing) {
        await updateProduct(form);
        setEditing(null);
      } else {
        await addProduct(form);
      }
      setForm(createEmptyForm());
    } catch (err) {
      console.error("Error guardando producto", err);
      alert("Ocurrió un error al guardar el producto.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product: Product) => {
    setEditing(product);
    setForm({
      ...product,
      precio: product.precio || "",
      imagen: product.imagen || "",
      stock: product.stock ?? 0,
      liberado: product.liberado ?? "LIBERADO",
    });
  };

  const handleDelete = async (id: number) => {
    if (!confirm("¿Seguro que quieres eliminar este producto?")) return;
    try {
      await deleteProduct(id);
    } catch (err) {
      console.error("Error eliminando producto", err);
      alert("Ocurrió un error al eliminar el producto.");
    }
  };

  return (
    <div className="container py-4">
      <h2>Panel Administrativo</h2>
      <p className="text-muted">Gestión completa de productos</p>

      <hr />

      {/* FORMULARIO */}
      <h4>{editing ? "Editar producto" : "Agregar producto"}</h4>
      <form onSubmit={handleSubmit} className="row g-3 mb-4">
        <div className="col-md-4">
          <label className="form-label">Nombre</label>
          <input
            name="nombre"
            type="text"
            className="form-control"
            value={form.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-3">
          <label className="form-label">Marca</label>
          <select
            name="brand"
            className="form-select"
            value={form.brand}
            onChange={handleChange}
          >
            <option value="Apple">Apple</option>
            <option value="Samsung">Samsung</option>
            <option value="Xiaomi">Xiaomi</option>
          </select>
        </div>

        <div className="col-md-3">
          <label className="form-label">Precio</label>
          <input
            name="precio"
            type="text"
            className="form-control"
            value={form.precio}
            onChange={handleChange}
            placeholder="$899.990"
            required
          />
        </div>

        <div className="col-md-2">
          <label className="form-label">Stock</label>
          <input
            name="stock"
            type="number"
            min={0}
            className="form-control"
            value={form.stock ?? 0}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-3">
          <label className="form-label">Estado del equipo</label>
          <select
            name="liberado"
            className="form-select"
            value={form.liberado ?? "LIBERADO"}
            onChange={handleChange}
          >
            <option value="LIBERADO">LIBERADO</option>
            <option value="NO LIBERADO">NO LIBERADO</option>
          </select>
        </div>

        <div className="col-md-12">
          <label className="form-label">Descripción</label>
          <textarea
            name="descripcion"
            className="form-control"
            value={form.descripcion}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-12">
          <label className="form-label">
            URL de imagen (se guardará en la base de datos)
          </label>
          <input
            name="imagen"
            type="text"
            className="form-control"
            value={form.imagen ?? ""}
            onChange={handleChange}
            placeholder="https://..."
            required
          />
        </div>

        <div className="col-md-12">
          <button className="btn btn-primary" disabled={loading}>
            {editing ? "Guardar cambios" : "Agregar producto"}
          </button>
          {editing && (
            <button
              type="button"
              className="btn btn-secondary ms-2"
              onClick={() => {
                setEditing(null);
                setForm(createEmptyForm());
              }}
              disabled={loading}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      <hr />

      {/* LISTA DE PRODUCTOS */}
      <h4>Productos registrados</h4>

      <div className="row">
        {products.map((p) => (
          <div key={p.id} className="col-md-4 col-lg-3 mb-3">
            <div className="card h-100">
              {p.imagen && (
                <img
                  src={p.imagen}
                  className="card-img-top"
                  alt={p.nombre}
                  style={{ height: "180px", objectFit: "cover" }}
                />
              )}
              <div className="card-body">
                <h5 className="card-title">{p.nombre}</h5>
                <p className="text-muted mb-1">{p.brand}</p>
                <p className="mb-1">
                  <strong>Precio:</strong> {p.precio}
                </p>
                <p className="mb-1">
                  <strong>Stock:</strong> {p.stock ?? 0} unidades
                </p>
                <p className="mb-0">
                  <strong>Estado:</strong>{" "}
                  {p.liberado ?? "LIBERADO"}
                </p>
              </div>
              <div className="card-footer d-flex justify-content-between">
                <button
                  className="btn btn-sm btn-warning"
                  type="button"
                  onClick={() => handleEdit(p)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  type="button"
                  onClick={() => handleDelete(p.id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}

        {products.length === 0 && (
          <p className="text-muted">No hay productos registrados.</p>
        )}
      </div>
    </div>
  );
}
