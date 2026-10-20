import { Routes, Route } from "react-router-dom";

import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home";
import Productos from "./pages/Productos";
import ProductoDetalle from "./pages/ProductoDetalle";
import Carrito from "./pages/Carrito";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import Nosotros from "./pages/Nosotros";
import Blog from "./pages/Blog";

import SuperAdminRoute from "./routes/SuperAdminRoute";
import SuperAdminDashboard from "./pages/SuperAdminDashboard";
import RegistroCliente from "./pages/RegistroCliente";
import MiCuenta from "./pages/MiCuenta";
import Contacto from "./pages/Contacto";
import ProtectedRoute from "./routes/ProtectedRoute";

export default function App() {
return (
<Routes>
<Route path="/" element={<MainLayout />}>
<Route index element={<Home />} />
    <Route path="productos" element={<Productos />} />
    <Route path="producto/:id" element={<ProductoDetalle />} />
    <Route path="carrito" element={<Carrito />} />
    <Route path="nosotros" element={<Nosotros />} />
    <Route path="blog" element={<Blog />} />

    <Route path="registro" element={<RegistroCliente />} />
    <Route path="mi-cuenta" element={<MiCuenta />} />
    <Route path="contacto" element={<Contacto />} />

    {/* Admin normal (ADMIN o SUPER_ADMIN) */}
    <Route
      path="admin"
      element={
        <ProtectedRoute>
          <AdminDashboard />
        </ProtectedRoute>
      }
    />

    {/* SUPER ADMIN */}
    <Route
      path="super-admin"
      element={
        <SuperAdminRoute>
          <SuperAdminDashboard />
        </SuperAdminRoute>
      }
    />

    {/* Login */}
    <Route path="login" element={<Login />} />
  </Route>
</Routes>
);
}
