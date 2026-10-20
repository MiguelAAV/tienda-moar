# 📸 Guía de Evidencias y Pantallazos — Paso 1 (Pruebas Unitarias e Inspección Estática)

**Asignatura:** TCY0101 — Técnicas de Calidad de Software  
**Proyecto:** Tienda MoAr (Monorepo)

---

## 1. Evidencia 1: Pruebas Unitarias con Vitest (Frontend)
* **Criterio de Evaluación:** Criterio 2 (20% de la nota) — *Desarrolla pruebas unitarias efectivas...*
* **Responsable en Plantilla:** **Estudiante 2 (Nicolás Iturrieta)**
* **Sección de la Plantilla:** *Ejecución de Pruebas Unitarias y de Integración*

### 💻 Comando para ejecutar en terminal:
Abre una terminal PowerShell y corre:
```powershell
cd c:\Users\xkait\Documents\MoAr\tienda-moar\frontend
pnpm test run
```

### 📷 ¿Qué capturar en el pantallazo?:
Toma captura de la terminal mostrando el bloque de resultados:
```text
 ✓ src/tests/cart.test.ts (4 tests)
 ✓ src/tests/products.test.ts (6 tests)

 Test Files  2 passed (2)
      Tests  10 passed (10)
```
* **Qué demuestra:** 10 pruebas unitarias exitosas (0 fallos) cubriendo cálculo de subtotal/total del carrito (`cart.test.ts` vinculado a **RF14**) y búsqueda/filtrado de catálogo por marca y texto (`products.test.ts` vinculado a **RF11 / RF12**).

---

## 2. Evidencia 2: Pruebas Unitarias con JUnit 5 (Backend Spring Boot)
* **Criterio de Evaluación:** Criterio 2 (20% de la nota) — *Frameworks JUnit, NUnit y Unittest...*
* **Responsable en Plantilla:** **Estudiante 2 (Nicolás Iturrieta)**
* **Sección de la Plantilla:** *Ejecución de Pruebas Unitarias y de Integración*

### 💻 Comando para ejecutar en terminal:
En la terminal corre:
```powershell
cd c:\Users\xkait\Documents\MoAr\tienda-moar\backend
.\mvnw.cmd test -Dtest=JwtServiceTest
```

### 📷 ¿Qué capturar en el pantallazo?:
Toma captura de la terminal donde aparece:
```text
-------------------------------------------------------
 T E S T S
-------------------------------------------------------
Running com.example.pweb_backend.security.JwtServiceTest
Tests run: 3, Failures: 0, Errors: 0, Skipped: 0

Results:
Tests run: 3, Failures: 0, Errors: 0, Skipped: 0

BUILD SUCCESS
```
* **Qué demuestra:** Uso explícito de **JUnit 5** probando el servicio criptográfico de tokens JWT (`JwtServiceTest.java`) para login y control de accesos por roles (vinculado a **RNF01 / Seguridad**).

---

## 3. Evidencia 3: Inspección Estática de Código (ESLint)
* **Criterio de Evaluación:** Criterio 1 (20% de la nota) — *Inspección del código fuente a través de herramientas de análisis de código estático...*
* **Responsable en Plantilla:** **Estudiante 1 (Miguel Arredondo)**
* **Sección de la Plantilla:** *Ejecución de Pruebas Automatizadas* / *Análisis de Código Estático*

### 💻 Comando para ejecutar en terminal:
En la terminal corre:
```powershell
cd c:\Users\xkait\Documents\MoAr\tienda-moar\frontend
npx eslint .
```

### 📷 ¿Qué capturar en el pantallazo?:
Toma captura del listado de hallazgos en la terminal:
```text
Carrito.tsx: 'subtotal' is assigned a value but never used (@typescript-eslint/no-unused-vars)
Carrito.tsx: Unexpected any. Specify a different type (@typescript-eslint/no-explicit-any)
Productos.tsx: 'Product' is defined but never used
AuthContext.tsx: Fast refresh only works when a file only exports components

✖ 10 problems (10 errors, 0 warnings)
```
* **Qué demuestra:** Detección de *Code Smells* y buenas prácticas de tipado (ausencia de bugs críticos, 10 observaciones de refactorización para mejorar mantenibilidad).

---

## 4. Evidencia 4: Inspección con SonarQube Cloud (Opcional / Complementario)
* **Responsable en Plantilla:** **Estudiante 1 (Miguel Arredondo)**
* **Dónde tomar el pantallazo:**
  1. Ingresa a tu cuenta de [SonarQube Cloud](https://sonarcloud.io/).
  2. Entra al dashboard de tu proyecto `tienda-moar`.
  3. Captura el widget principal:
     * **Bugs:** 0
     * **Vulnerabilities:** 0
     * **Security Hotspots:** 0
     * **Code Smells** y **Maintainability Rating** (A/B)
