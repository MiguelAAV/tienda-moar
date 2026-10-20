import { useCallback, useMemo, useState } from "react";
import { Link, useLocation, useOutletContext } from "react-router-dom";
import type { Product } from "../assets/products";
import { useProducts } from "../context/ProductContext";
import { useCart } from "../context/CartContext";

// Contexto que viene desde MainLayout -> <Outlet context={{ showToast }}>
type OutletCtx = { showToast: (msg: string) => void };

// Normaliza texto (sin mayúsculas, sin tildes, espacios de más)
const norm = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim();

export default function Productos() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const q = params.get("q") ?? "";
  const qn = norm(q);

  const { add } = useCart();
  const { showToast } = useOutletContext<OutletCtx>();
  const { products } = useProducts();

  // Marcas dinámicas a partir de los productos
  const brands = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => set.add(p.brand));
    return Array.from(set).sort();
  }, [products]);

  const [brand, setBrand] = useState<string>("All");

  const handleBrand = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setBrand(e.target.value);
    },
    []
  );

  const filtered = useMemo(() => {
    let out = products;

    // Filtro por marca
    if (brand !== "All") {
      out = out.filter((p) => p.brand === brand);
    }

    // Filtro por búsqueda
    if (qn) {
      out = out.filter((p) => {
        const name = norm(p.nombre);
        const br = norm(p.brand);
        const desc = norm(p.descripcion ?? "");
        return (
          name.includes(qn) ||
          br.includes(qn) ||
          desc.includes(qn)
        );
      });
    }

    // Opcional: ordenar por id descendente (más nuevos primero)
    out = [...out].sort((a, b) => b.id - a.id);

    return out;
  }, [products, brand, qn]);

  const showEmptyState = qn.length > 0 && filtered.length === 0;

  return (
    <div className="container py-4">
      {/* Encabezado de página */}
      <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-2 mb-3">
        <div>
          <h1 className="fw-bold mb-1">Catálogo de productos</h1>
          <p className="text-muted mb-0">
            Encuentra el equipo perfecto para tu día a día.
          </p>
        </div>
        <div className="text-md-end small text-muted">
          {filtered.length > 0 && (
            <span>
              Mostrando <strong>{filtered.length}</strong>{" "}
              {filtered.length === 1 ? "producto" : "productos"}
            </span>
          )}
        </div>
      </div>

      {/* Barra de filtros */}
      <div className="bg-light rounded-3 p-3 mb-4 shadow-sm">
        <div className="d-flex flex-wrap align-items-center gap-2">
          {/* Filtro por marca */}
          <div className="d-flex align-items-center gap-2">
            <span className="small text-muted">Filtrar por marca:</span>
            <select
              className="form-select form-select-sm"
              style={{ minWidth: "160px" }}
              value={brand}
              onChange={handleBrand}
            >
              <option value="All">Todas las marcas</option>
              {brands.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>

          {/* Info de búsqueda */}
          <div className="ms-md-auto">
            {q && (
              <span className="badge text-bg-secondary">
                Búsqueda: “{q}”
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Estado vacío por búsqueda */}
      {showEmptyState ? (
        <div className="text-center py-5">
          <div className="display-6 mb-3">🔍</div>
          <h5 className="mb-2">No encontramos resultados</h5>
          <p className="text-muted mb-4">
            No se encontraron productos para “{q}”. 
            Prueba con otra palabra clave o revisa el catálogo completo.
          </p>
          <Link to="/productos" className="btn btn-outline-primary btn-sm">
            Limpiar filtros y ver todo
          </Link>
        </div>
      ) : (
        <>
          {/* Grid de productos */}
          <div className="row g-4">
            {filtered.map((producto) => (
              <div key={producto.id} className="col-md-6 col-lg-4">
                <div className="card h-100 shadow-sm border-0">
                  {producto.imagen && (
                    <div
                      className="bg-white d-flex align-items-center justify-content-center"
                      style={{ height: 220 }}
                    >
                      <img
                        src={producto.imagen}
                        className="card-img-top p-3"
                        alt={producto.nombre}
                        style={{
                          objectFit: "contain",
                          maxHeight: "100%",
                          width: "auto"
                        }}
                      />
                    </div>
                  )}

                  <div className="card-body d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="badge text-bg-light text-muted small">
                        {producto.brand}
                      </span>
                      {/* Si quieres, aquí podrías mostrar algo como "Nuevo" basado en alguna lógica */}
                      {/* <span className="badge text-bg-success small">Nuevo</span> */}
                    </div>

                    <h5 className="card-title mb-1">{producto.nombre}</h5>

                    {producto.descripcion && (
                      <p className="card-text product-description text-muted mb-2">
                        {producto.descripcion}
                      </p>
                    )}

                    <p className="fw-bold text-primary fs-5 mb-3">
                      {producto.precio}
                    </p>

                    <div className="mt-auto d-grid gap-2">
                      <Link
                        to={`/producto/${producto.id}`}
                        className="btn btn-outline-secondary btn-sm"
                      >
                        Ver más
                      </Link>

                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => {
                          add(producto);
                          showToast(
                            `✅ ${producto.nombre} agregado al carrito`
                          );
                        }}
                      >
                        Añadir al carrito
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {!filtered.length && !showEmptyState && (
              <div className="col-12">
                <p className="text-muted text-center py-4 mb-0">
                  No hay productos disponibles por el momento.
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
