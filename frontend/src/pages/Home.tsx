import { useMemo } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { useCart } from "../context/CartContext";
import type { Product } from "../assets/products";
import { useProducts } from "../context/ProductContext";

// Banners
import banner1 from "../assets/images/banner/banner1.jpg";
import banner2 from "../assets/images/banner/banner2.jpg";
import banner3 from "../assets/images/banner/banner3.jpg";
import banner4 from "../assets/images/banner/banner4.png";

// Contexto que entrega MainLayout vía <Outlet context={{ showToast }}>
type OutletCtx = { showToast: (msg: string) => void };

// Info de cada banner (imagen + textos distintos)
const bannerItems = [
  {
    imagen: banner1,
    titulo: "Sábados de descuentos Samsung",
    texto: "Aprovecha hasta 20% OFF en modelos seleccionados.",
    badge: "Samsung",
  },
  {
    imagen: banner2,
    titulo: "Llegaron los nuevos Xiaomi",
    texto: "Rendimiento brutal a precios increíbles.",
    badge: "Nuevos",
  },
  {
    imagen: banner3,
    titulo: "iPhone reacondicionados",
    texto: "Como nuevos, con garantía y mejor precio.",
    badge: "Reacondicionados",
  },
  {
    imagen: banner4,
    titulo: "Accesorios para tu próximo equipo",
    texto: "Fundas, cargadores y más para cuidar tu inversión.",
    badge: "Accesorios",
  },
];

export default function Home() {
  const { add } = useCart();
  const { showToast } = useOutletContext<OutletCtx>();
  const { products } = useProducts();

  // Destacados: últimos agregados (id más alto) hasta 8 productos
  const destacados: Product[] = useMemo(
    () =>
      [...products]
        .sort((a, b) => b.id - a.id) // más nuevos primero
        .slice(0, 8),
    [products]
  );

  return (
    <div className="container py-4">
      {/* Título + subtítulo */}
      <div className="text-center mb-4">
        <span className="badge rounded-pill text-bg-primary mb-2">
          📱 TiendaMoAr
        </span>
        <h1 className="fw-bold mb-2">Bienvenido a TiendaMoAr 🛍️</h1>
        <p className="text-muted mb-0">
          Celulares liberados, garantía y despacho rápido a todo Chile.
        </p>
      </div>

      {/* HERO: solo carrusel, más limpio y amplio */}
      <div className="home-hero bg-light rounded-4 shadow-sm p-3 p-md-4 mb-5">
        <div
          id="carouselBanner"
          className="carousel slide"
          data-bs-ride="carousel"
          data-bs-interval="4000"
          data-bs-pause="hover"
        >
          <div className="carousel-indicators">
            {bannerItems.map((_, index) => (
              <button
                key={index}
                type="button"
                data-bs-target="#carouselBanner"
                data-bs-slide-to={index}
                className={index === 0 ? "active" : ""}
                aria-current={index === 0 ? "true" : undefined}
                aria-label={`Slide ${index + 1}`}
              />
            ))}
          </div>

          <div className="carousel-inner rounded-4 overflow-hidden">
            {bannerItems.map((banner, index) => (
              <div
                key={index}
                className={`carousel-item ${index === 0 ? "active" : ""}`}
              >
                <img
                  src={banner.imagen}
                  className="d-block w-100"
                  alt={banner.titulo}
                  style={{ objectFit: "cover", height: "360px" }}
                />
                <div className="carousel-caption text-start d-none d-md-block">
                  <div className="bg-dark bg-opacity-50 rounded-3 p-3">
                    <span className="badge text-bg-warning mb-2">
                      {banner.badge}
                    </span>
                    <h4 className="fw-bold mb-1">{banner.titulo}</h4>
                    <p className="mb-2">{banner.texto}</p>
                    <Link to="/productos" className="btn btn-primary btn-sm">
                      Ver ofertas
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselBanner"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">Anterior</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselBanner"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">Siguiente</span>
          </button>
        </div>
      </div>

      {/* Productos destacados */}
      <div className="d-flex justify-content-between align-items-center mb-1">
        <h2 className="mb-0">Productos destacados</h2>
        <Link to="/productos" className="btn btn-link btn-sm">
          Ver todos los productos →
        </Link>
      </div>
      <p className="text-muted mb-4">
        Mostrando los últimos equipos agregados a la tienda.
      </p>

      <div className="row g-4">
        {destacados.map((p) => (
          <div key={p.id} className="col-md-6 col-lg-3">
            <div className="card h-100 shadow-sm border-0">
              {p.imagen && (
                <div
                  className="bg-white d-flex align-items-center justify-content-center"
                  style={{ height: 220 }}
                >
                  <img
                    src={p.imagen}
                    className="card-img-top p-2"
                    alt={p.nombre}
                    style={{
                      objectFit: "contain",
                      maxHeight: "100%",
                      width: "auto",
                    }}
                  />
                </div>
              )}
              <div className="card-body d-flex flex-column">
                <h6 className="text-uppercase text-muted mb-1 small">
                  {p.brand}
                </h6>
                <h5 className="card-title mb-2">{p.nombre}</h5>
                <p className="fw-bold text-primary mb-3">{p.precio}</p>

                <div className="mt-auto d-grid gap-2">
                  <Link
                    to={`/producto/${p.id}`}
                    className="btn btn-outline-secondary btn-sm"
                  >
                    Ver más
                  </Link>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => {
                      add(p);
                      showToast(`✅ ${p.nombre} agregado al carrito`);
                    }}
                  >
                    Añadir al carrito
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {!destacados.length && (
          <p className="text-muted">Pronto agregaremos productos destacados.</p>
        )}
      </div>

      {/* Franja de beneficios + Compra fácil y rápida (abajo) */}
      <div className="mt-5">
        <div className="row text-center gy-3 mb-4">
          <div className="col-12 col-md-4">
            <div className="d-flex flex-column align-items-center">
              <span className="fs-4">🛡️</span>
              <span className="fw-semibold">Garantía en todos los equipos</span>
              <small className="text-muted">Compra con tranquilidad</small>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="d-flex flex-column align-items-center">
              <span className="fs-4">🚚</span>
              <span className="fw-semibold">Envíos a todo Chile</span>
              <small className="text-muted">Seguimiento de tu pedido</small>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="d-flex flex-column align-items-center">
              <span className="fs-4">💳</span>
              <span className="fw-semibold">Múltiples medios de pago</span>
              <small className="text-muted">Tarjetas y transferencias</small>
            </div>
          </div>
        </div>

        <div className="card border-0 shadow-sm mx-auto" style={{ maxWidth: 600 }}>
          <div className="card-body text-center">
            <h5 className="fw-semibold mb-2">🚀 Compra fácil y rápida</h5>
            <p className="text-muted small mb-0">
              Agrega al carrito, paga seguro y recibe tu equipo sin salir de casa.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


