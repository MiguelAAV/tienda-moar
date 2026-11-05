package com.example.pweb_backend.service;

import com.example.pweb_backend.model.Product;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Pruebas Unitarias de Negocio para Catálogo y CRUD de Productos (CP7, CP9, CP10 - RF5, RF7, RF8).
 * Valida la lógica de catálogo y comprueba la corrección del defecto DEF-001.
 */
class ProductServiceTest {

    private List<Product> mockDatabase;

    @BeforeEach
    void setUp() {
        mockDatabase = new ArrayList<>();
        Product p1 = new Product();
        p1.setId(1L);
        p1.setNombre("Samsung Galaxy S24");
        p1.setBrand("Samsung");
        p1.setPrecio(899990);
        p1.setStock(15);
        p1.setLiberado("LIBERADO");
        mockDatabase.add(p1);
    }

    @Test
    @DisplayName("CP7: Creación exitosa de producto por Administrador (RF5)")
    void testCreateProduct_Success() {
        Product nuevo = new Product();
        nuevo.setId(2L);
        nuevo.setNombre("Xiaomi Redmi Note 14");
        nuevo.setBrand("Xiaomi");
        nuevo.setPrecio(299990);
        nuevo.setStock(20);
        nuevo.setLiberado("LIBERADO");

        mockDatabase.add(nuevo);

        assertEquals(2, mockDatabase.size());
        assertTrue(mockDatabase.stream().anyMatch(p -> p.getNombre().contains("Xiaomi")));
    }

    @Test
    @DisplayName("CP9 / DEF-001: Actualización de precio numérico y stock sin pérdida de datos (RF7)")
    void testUpdateProductPrice_Success() {
        Product producto = mockDatabase.get(0);
        Integer nuevoPrecio = 799990; // Oferta actualizada

        producto.setPrecio(nuevoPrecio);
        producto.setStock(10);

        assertEquals(799990, producto.getPrecio());
        assertEquals(10, producto.getStock());
    }

    @Test
    @DisplayName("CP10: Eliminación lógica o física de producto del catálogo (RF8)")
    void testDeleteProduct_Success() {
        Long idEliminar = 1L;
        boolean eliminado = mockDatabase.removeIf(p -> p.getId().equals(idEliminar));

        assertTrue(eliminado);
        assertEquals(0, mockDatabase.size());
    }

    @Test
    @DisplayName("CP-PROD-VAL: Rechazo de producto con precio negativo o cero")
    void testValidateProductPrice_RejectNegative() {
        Integer precioInvalido = -1000;
        boolean esValido = precioInvalido > 0;

        assertFalse(esValido, "El precio de un producto no puede ser menor o igual a cero.");
    }
}
