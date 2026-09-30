# Informe de Ejecución - Actividad Formativa 2.2.3
## Pruebas Unitarias y de Inspección de Código

**Asignatura:** Técnicas de Calidad de Software (TCY0101)  
**Proyecto:** Tienda MOAR (`tienda-moar`)  
**Tecnologías:** React, TypeScript, Vite, Vitest, ESLint  

---

### 1. Introducción y Contexto

El presente informe documenta la realización de la **Actividad Formativa 2 (2.2.3)** para la asignatura de Técnicas de Calidad de Software, vinculada directamente con los requerimientos del **Plan de Pruebas oficial de la Parcial No. 1** (`Documentación/Prueba_1/Informe_Evidencias_Parcial_1_TiendaMoAr.docx`).

En esta actividad se llevaron a cabo dos procesos clave en la garantía de calidad del sistema **Tienda MoAr**:
1. **Configuración y Ejecución de Pruebas Unitarias (Caja Blanca)** utilizando **Vitest**, seleccionando los casos de prueba documentados en el Plan de Pruebas (específicamente **RF14 / CP19 - Cálculo de subtotal y total del carrito**).
2. **Inspección y Análisis Estático de Código** utilizando **ESLint** / Reglas de Inspección Estática para TypeScript.

---

### 2. Parte I: Pruebas Unitarias (Caja Blanca)

#### 2.1 Identificación del Framework
* **Lenguaje:** TypeScript / JavaScript (Node.js)
* **Framework de Pruebas:** **Vitest** (v4.0.14)
* **Módulo Probado:** `src/utils/cart.ts` (Función `calcularSubtotal`, vinculada al requerimiento **RF14-1 / CP19** del Plan de Pruebas).

#### 2.2 Tabla de Guiones y Casos de Prueba Ejecutados

| Id (Plan / Act.) | Caso de Prueba | Descripción / Requerimiento Vinculado | Datos / Acciones de Entrada | Resultado Esperado | Resultado Obtenido | Observaciones | Evidencia |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **CP19-1 / CP-01** | Carrito Vacío | Verificar que el cálculo con un arreglo de productos vacío devuelva 0 (**RF14-1**). | `lines = []` | `0` | `0` | Prueba de condición límite exitosa. | `✓ src/tests/cart.test.ts` |
| **CP19-2 / CP-02** | Línea Única | Validar multiplicación correcta de precio unitario por cantidad de una sola línea (**RF14-1**). | `lines = [{ precioUnitario: 1000, cantidad: 3 }]` | `3000` | `3000` | Cálculo exacto de multiplicación unitaria. | `✓ src/tests/cart.test.ts` |
| **CP19-3 / CP-03** | Múltiples Líneas | Validar la acumulación de subtotal con múltiples productos distintos en el carrito (**RF14-1**). | `lines = [{ precioUnitario: 1000, cantidad: 2 }, { precioUnitario: 500, cantidad: 4 }]` | `4000` | `4000` | Suma acumulativa correcta (2000 + 2000). | `✓ src/tests/cart.test.ts` |
| **CP19-4 / CP-04** | Precios Elevados | Verificar el comportamiento numérico con valores de precios reales de smartphones (**RF14-1**). | `lines = [{ precioUnitario: 1299990, cantidad: 1 }, { precioUnitario: 299990, cantidad: 2 }]` | `1899970` | `1899970` | Sin problemas de precisión o desbordamiento. | `✓ src/tests/cart.test.ts` |

#### 2.3 Resultado de Ejecución de Pruebas Unitarias
```bash
 RUN  v4.0.14 C:/Users/xkait/Documents/MoAr/tienda-moar

 ✓ src/tests/cart.test.ts (4 tests) 5ms

 Test Files  1 passed (1)
      Tests  4 passed (4)
   Start at  20:27:43
   Duration  2.58s
```

---

### 3. Parte II: Inspección de Código (Análisis Estático)

#### 3.1 Herramienta de Inspección
Se utilizó **ESLint** configurado con reglas recomendadas de React, Hooks y TypeScript para inspección de calidad y detección de *Code Smells*.

#### 3.2 Tabla de Análisis de Resultados de la Inspección

| Categoría | Cantidad | Breve Análisis |
| :--- | :---: | :--- |
| **Bugs** | **0** | No se encontraron errores críticos de sintaxis o fallas que impidan la ejecución de la aplicación web. |
| **Vulnerabilidades** | **0** | No se detectaron patrones de inyección o vulnerabilidades directas en los archivos fuente analizados. |
| **Code Smells** | **10** | Detección de tipos `any` implícitos/explícitos en componentes (`Carrito.tsx`, `RegistroCliente.tsx`), variables declaradas y no utilizadas (`subtotal` y `Product`), y advertencias de *Fast Refresh* en contextos de React. |
| **Cobertura** | **100%** | Cobertura total sobre la función crítica de negocio de cálculo de subtotales de compra en el módulo `cart.ts`. |

#### 3.3 Detalle de Code Smells Detecciones
1. **Variables No Utilizadas (`@typescript-eslint/no-unused-vars`)**:
   - `src/pages/Carrito.tsx`: Variable `subtotal` asignada sin uso.
   - `src/pages/Productos.tsx`: Tipo `Product` importado sin uso.
2. **Tipado Débil (`@typescript-eslint/no-explicit-any`)**:
   - Uso de `any` en parámetros de eventos y respuestas en `src/pages/Carrito.tsx` y `src/pages/RegistroCliente.tsx`. Se recomienda reemplazar por interfaces estrictas de TypeScript.
3. **Estructura de Componentes (`react-refresh/only-export-components`)**:
   - Archivos de Contexto (`AuthContext`, `CartContext`, `ProductContext`) exportan funciones/hooks auxiliares junto con los componentes Proveedores.

---

### 4. Parte III: Conclusiones e Informe de Criterios de Aceptación

1. **Cumplimiento de Pruebas Unitarias (Caja Blanca)**:
   - Se logró el 100% de éxito en los 4 casos de prueba diseñados con Vitest. La función de cálculo de carrito responde correctamente bajo todas las condiciones límite evaluadas.
2. **Calidad de Código y Mantenibilidad**:
   - La herramienta de análisis estático permitió identificar áreas de refactorización clara (eliminar variables muertas y reemplazar el tipo `any`).
3. **Criterio de Aceptación**:
   - El módulo crítico de compras cumple con los estándares exigidos de confiabilidad y precisión de cálculo para su despliegue.

---
*Informe elaborado para la Actividad Formativa 2.2.3 - Duoc UC*
