import type { FormEvent } from "react";
import MoarLogo from "../assets/images/logo_marcas/Moar4.jpg";

export default function Contacto() {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <div
      className="py-5"
      style={{
        backgroundColor: "#f5f7fa", // fondo general suave
        minHeight: "100vh",
      }}
    >
      <div className="container" style={{ maxWidth: "1050px" }}>
        {/* TÍTULO */}
        <div className="text-center mb-5">
          <h1 className="fw-bold" style={{ color: "#14284b" }}>
            Contáctanos
          </h1>
          <p className="text-muted">
            Estamos aquí para ayudarte con dudas sobre productos, compras o envíos.
          </p>
        </div>

        <div className="row g-4">
          {/* COLUMNA IZQUIERDA */}
          <div className="col-md-5">
            <div
              className="card shadow-sm h-100"
              style={{
                border: "none",
                backgroundColor: "#ffffff",
              }}
            >
              <div className="card-body">
                <h4 className="fw-bold mb-3" style={{ color: "#14284b" }}>
                  Información de Contacto
                </h4>

                <p className="mb-2">
                  <strong>Teléfono / WhatsApp:</strong> +56 9 1234 5678
                </p>
                <p className="mb-2">
                  <strong>Email:</strong> contacto@tiendamoar.cl
                </p>
                <p className="mb-3">
                  <strong>Horario:</strong> Lunes a viernes · 10:00 a 19:00 hrs
                </p>

                <hr />

                <h5 className="fw-semibold mt-3" style={{ color: "#14284b" }}>
                  Nuestra ubicación
                </h5>
                <p>Somos una <strong>tienda online</strong> con centro logístico en:</p>

                <p
                  className="fw-semibold"
                  style={{ color: "#14284b" }}
                >
                  📍 Av. Apoquindo 4500, Las Condes, Santiago
                </p>

                <p className="text-muted small">
                  Atención presencial solo con coordinación previa.
                </p>

                <hr />

                <h5 className="fw-semibold mt-3" style={{ color: "#14284b" }}>
                  Envíos a todo Chile
                </h5>
                <ul>
                  <li>Starken</li>
                  <li>Chilexpress</li>
                  <li>Correos de Chile</li>
                </ul>
              </div>
            </div>
          </div>

          {/* COLUMNA DERECHA — FORMULARIO */}
          <div className="col-md-7">
            <div
              className="card shadow-sm h-100"
              style={{
                border: "none",
                backgroundColor: "#ffffff",
              }}
            >
              <div className="card-body">
                <h4 className="fw-bold mb-2" style={{ color: "#14284b" }}>
                  Envíanos un mensaje
                </h4>
                <p className="text-muted">Responderemos lo antes posible.</p>

                <form className="d-grid gap-3 mt-3" onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Nombre</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Tu nombre"
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Correo electrónico</label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="tucorreo@ejemplo.cl"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="form-label">Asunto</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Consulta sobre producto, compra o envío"
                      required
                    />
                  </div>

                  <div>
                    <label className="form-label">Mensaje</label>
                    <textarea
                      className="form-control"
                      rows={5}
                      placeholder="Cuéntanos cómo podemos ayudarte..."
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn fw-semibold"
                    style={{
                      backgroundColor: "#ffb400",
                      color: "#14284b",
                    }}
                  >
                    Enviar mensaje
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* LOGO ELEGANTE ABAJO */}
        <div className="d-flex flex-column align-items-center mt-5">
          <img
            src={MoarLogo}
            alt="Logo Tienda MoAr"
            style={{ height: "50px", opacity: 0.95 }}
          />
          <span className="text-muted small mt-2">
            Tienda MoAr · Tecnología y telefonía móvil en todo Chile
          </span>
        </div>
      </div>
    </div>
  );
}

