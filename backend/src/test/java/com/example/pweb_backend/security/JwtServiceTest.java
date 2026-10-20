package com.example.pweb_backend.security;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class JwtServiceTest {

    private JwtService jwtService;
    private final String secret = "CLAVE_SUPER_SECRETA_Y_LARGA_DE_PRUEBA_12345678901234567890";
    private final long expirationMs = 3600000; // 1 hora

    @BeforeEach
    void setUp() {
        jwtService = new JwtService(secret, expirationMs);
    }

    @Test
    @DisplayName("CP-JWT-01: Generar token y extraer username y role exitosamente")
    void testGenerateAndExtractClaims() {
        String username = "cliente@tiendamoar.cl";
        String role = "CLIENTE";

        String token = jwtService.generateToken(username, role);

        assertNotNull(token);
        assertFalse(token.isEmpty());
        assertEquals(username, jwtService.extractUsername(token));
        assertEquals(role, jwtService.extractRole(token));
    }

    @Test
    @DisplayName("CP-JWT-02: Validar token vigente para el usuario correcto")
    void testIsTokenValid_Success() {
        String username = "admin@tiendamoar.cl";
        String token = jwtService.generateToken(username, "ADMIN");

        boolean isValid = jwtService.isTokenValid(token, username);
        assertTrue(isValid);
    }

    @Test
    @DisplayName("CP-JWT-03: Rechazar token si el usuario no coincide")
    void testIsTokenValid_WrongUser() {
        String username = "usuario1@tiendamoar.cl";
        String token = jwtService.generateToken(username, "CLIENTE");

        boolean isValid = jwtService.isTokenValid(token, "otro@tiendamoar.cl");
        assertFalse(isValid);
    }
}
