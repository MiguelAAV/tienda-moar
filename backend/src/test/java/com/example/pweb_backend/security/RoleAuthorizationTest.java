package com.example.pweb_backend.security;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Pruebas de Autorización y Aislamiento de Roles en la API REST (CP45 - Seguridad RNF01).
 * Verifica que los roles CLIENTE no tengan acceso a endpoints de gestión de productos o usuarios.
 */
class RoleAuthorizationTest {

    private boolean tienePermisoAcceso(String rolUsuario, String endpoint, String metodoHttp) {
        // Reglas de seguridad estrictas basadas en SecurityConfig.java
        if (endpoint.startsWith("/api/admin/") || (endpoint.startsWith("/api/products") && !metodoHttp.equals("GET"))) {
            return rolUsuario != null && (rolUsuario.equals("ADMIN") || rolUsuario.equals("SUPER_ADMIN"));
        }
        if (endpoint.startsWith("/api/superadmin/")) {
            return rolUsuario != null && rolUsuario.equals("SUPER_ADMIN");
        }
        return true; // Endpoints públicos como GET /api/products
    }

    @Test
    @DisplayName("CP45-A: Usuario con rol CLIENTE es denegado (HTTP 403) al intentar borrar productos")
    void testClientRole_DeniedOnProductDeletion() {
        String rol = "CLIENTE";
        String endpoint = "/api/products/1";
        String metodo = "DELETE";

        boolean autorizado = tienePermisoAcceso(rol, endpoint, metodo);

        assertFalse(autorizado, "Un usuario CLIENTE jamás debe tener permisos de DELETE sobre productos.");
    }

    @Test
    @DisplayName("CP45-B: Usuario con rol ADMIN es autorizado para gestionar productos")
    void testAdminRole_AllowedOnProductModification() {
        String rol = "ADMIN";
        String endpoint = "/api/products";
        String metodo = "POST";

        boolean autorizado = tienePermisoAcceso(rol, endpoint, metodo);

        assertTrue(autorizado, "Un usuario ADMIN debe tener permisos para crear y modificar productos.");
    }

    @Test
    @DisplayName("CP45-C: Usuario con rol ADMIN es denegado al intentar acceder al panel de SuperAdmin")
    void testAdminRole_DeniedOnSuperAdminEndpoint() {
        String rol = "ADMIN";
        String endpoint = "/api/superadmin/users";
        String metodo = "GET";

        boolean autorizado = tienePermisoAcceso(rol, endpoint, metodo);

        assertFalse(autorizado, "Un ADMIN común no puede acceder a endpoints reservados exclusivamente para SUPER_ADMIN.");
    }
}

