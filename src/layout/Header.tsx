import { Link, useNavigate } from "react-router-dom";
import SearchBar from "../components/molecules/SearchBar";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Header() {
  const navigate = useNavigate();
  const { user, isAuthenticated, isAdmin, isSuperAdmin, logout } = useAuth();
  const { totalItems } = useCart();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header
      style={{
        backgroundColor: "#14284b",
        borderBottom: "4px solid #ffb400",
      }}
    >
      <div className="container-fluid py-2">
        <div className="d-flex justify-content-between align-items-center text-white gap-3">

          {/* LOGO / MARCA */}
          <div className="fw-bold fs-4">
            <Link
              to="/"
              className="text-decoration-none"
              style={{ color: "#ffffff" }}
            >
              Tienda<span style={{ color: "#ffb400" }}>MoAr</span>
            </Link>
          </div>

          {/* SEARCH BAR */}
          <div className="flex-grow-1 d-none d-md-block px-3">
            <SearchBar placeholder="Buscar modelo o marca..." />
          </div>

          {/* NAV LINKS */}
          <nav className="d-none d-lg-flex gap-3">
            {["Inicio", "Productos", "Blog", "Nosotros", "Contacto"].map(
              (item, i) => (
                <Link
                  key={i}
                  to={item === "Inicio" ? "/" : "/" + item.toLowerCase()}
                  className="nav-link"
                  style={{
                    color: "#ffffff",
                    fontWeight: 500,
                    transition: "0.2s",
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.color = "#ffb400")}
                  onMouseOut={(e) => (e.currentTarget.style.color = "#ffffff")}
                >
                  {item}
                </Link>
              )
            )}
          </nav>

          {/* BOTONES LOGIN / ADMIN / CLIENTE */}
          <div className="d-flex align-items-center gap-2">

            {/* Carrito */}
            <Link
              to="/carrito"
              className="btn position-relative"
              style={{
                border: "1px solid white",
                color: "white",
              }}
            >
              🛒 Carrito
              {totalItems > 0 && (
                <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill"
                  style={{ backgroundColor: "#ff3b3b", fontSize: 12 }}
                >
                  {totalItems}
                </span>
              )}
            </Link>

            {/* SI NO ESTÁ LOGUEADO */}
            {!isAuthenticated && (
              <>
                <Link
                  to="/login"
                  className="btn"
                  style={{ border: "1px solid white", color: "white" }}
                >
                  Login
                </Link>

                <Link
                  to="/registro"
                  className="btn"
                  style={{
                    backgroundColor: "#ffb400",
                    color: "#14284b",
                    fontWeight: 600,
                  }}
                >
                  Registrar
                </Link>
              </>
            )}

            {/* SUPER ADMIN */}
            {isSuperAdmin && (
              <>
                <Link
                  to="/super-admin"
                  className="btn"
                  style={{
                    backgroundColor: "#ffb400",
                    color: "#14284b",
                    fontWeight: 600,
                  }}
                >
                  Super Panel
                </Link>
                <button
                  className="btn"
                  style={{ border: "1px solid white", color: "white" }}
                  onClick={handleLogout}
                >
                  Cerrar sesión
                </button>
              </>
            )}

            {/* ADMIN */}
            {isAdmin && !isSuperAdmin && (
              <>
                <Link
                  to="/admin"
                  className="btn"
                  style={{
                    backgroundColor: "#ffb400",
                    color: "#14284b",
                    fontWeight: 600,
                  }}
                >
                  Panel
                </Link>
                <button
                  className="btn"
                  style={{ border: "1px solid white", color: "white" }}
                  onClick={handleLogout}
                >
                  Cerrar sesión
                </button>
              </>
            )}

            {/* CLIENTE NORMAL */}
            {isAuthenticated && !isAdmin && !isSuperAdmin && (
              <>
                <span className="text-white">
                  Hola, <strong>{user?.nombre}</strong>
                </span>

                <Link
                  to="/mi-cuenta"
                  className="btn"
                  style={{ border: "1px solid white", color: "white" }}
                >
                  Mi Cuenta
                </Link>

                <button
                  className="btn"
                  style={{ border: "1px solid white", color: "white" }}
                  onClick={handleLogout}
                >
                  Cerrar sesión
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}




