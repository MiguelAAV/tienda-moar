// src/pages/ProductoDetalle.tsx
import { Link, useParams, useOutletContext } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import { useCart } from "../context/CartContext";
import type { Product } from "../assets/products";

type OutletCtx = { showToast: (msg: string) => void };

export default function ProductoDetalle() {
  const { id } = useParams<{ id: string }>();
  const { products } = useProducts();
  const { add } = useCart();
  const { showToast } = useOutletContext<OutletCtx>();

  const productId = Number(id);
  const producto: Product | undefined = products.find(
    (p) => p.id === productId
  );

  if (!producto) {
    return (
      <div className="container py-4">
        <p className="text-muted">Producto no encontrado.</p>
        <Link to="/productos" className="btn btn-outline-secondary">
          Volver a productos
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <Link to="/productos" className="btn btn-link mb-3">
        ← Volver a productos
      </Link>

      <div className="row">
        <div className="col-md-5 mb-3">
          {producto.imagen && (
            <div
              className="border rounded d-flex align-items-center justify-content-center"
              style={{ backgroundColor: "#f8f9fa", height: 320 }}
            >
              <img
                src={producto.imagen}
                alt={producto.nombre}
                style={{
                  maxHeight: "100%",
                  maxWidth: "100%",
                  objectFit: "contain",
                }}
              />
            </div>
          )}
        </div>

        <div className="col-md-7">
          <h2>{producto.nombre}</h2>
          <p className="text-muted">{producto.brand}</p>
          <p className="fw-bold fs-3 text-primary">{producto.precio}</p>

          <p className="mb-3">{producto.descripcion}</p>

          <p className="mb-1">
            <strong>Stock:</strong> {producto.stock ?? 0} unidades
          </p>
          <p className="mb-3">
            <strong>Estado:</strong>{" "}
            {producto.liberado ?? "LIBERADO"}
          </p>

          <button
            className="btn btn-primary me-2"
            onClick={() => {
              add(producto);
              showToast(`✅ ${producto.nombre} agregado al carrito`);
            }}
          >
            Añadir al carrito
          </button>

          <Link to="/carrito" className="btn btn-outline-secondary">
            Ir al carrito
          </Link>
        </div>
      </div>
    </div>
  );
}
