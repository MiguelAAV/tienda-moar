# Tienda MoAr - Plataforma E-Commerce

[![Frontend Tests](https://img.shields.io/badge/Vitest-25%20Passed-brightgreen)](frontend/)
[![Backend Tests](https://img.shields.io/badge/JUnit%205-10%20Passed-brightgreen)](backend/)
[![Quality Gate](https://img.shields.io/badge/SonarQube-Quality%20Gate%20PASSED-success)](backend/)
[![Security DAST](https://img.shields.io/badge/OWASP%20ZAP-0%20High%20%2F%200%20Medium-blue)](Documentación/)
[![Stress Testing](https://img.shields.io/badge/Apache%20JMeter-200%20Hilos%20--%200%25%20Error-informational)](backend/)

> **Proyecto Académico:** Técnicas de Calidad de Software (TCY0101) — Evaluación Parcial 3.2  
> **Institución:** Duoc UC — Escuela de Informática y Telecomunicaciones  
> **Profesor Guía:** Christian Álvarez Lobos  
> **Equipo de Calidad e Ingeniería:**
> * **Miguel Arredondo** (Estudiante 1 — QA Lead & Backend Developer)
> * **Nicolás Iturrieta** (Estudiante 2 — QA Automation & Frontend Developer)

---

## 1. Descripción del Sistema

**Tienda MoAr** es una plataforma de comercio electrónico de arquitectura desacoplada (*Client-Server Monorepo*) diseñada bajo altos estándares de calidad, seguridad y resiliencia. El sistema proporciona una experiencia de compra completa y segura: registro y autenticación con tokens JWT, gestión de sesiones multirol (Cliente, Administrador y Super Administrador), catálogo interactivo con filtros y búsqueda optimizada, carrito de compras reactivo, validación y canje de cupones de descuento, simulación de pasarela de pago para Producto Mínimo Viable (PMV) y paneles administrativos protegidos mediante control de acceso basado en roles (RBAC).

---

## 2. Arquitectura Tecnológica

| Capa / Módulo | Tecnologías y Frameworks | Descripción y Responsabilidad |
| :--- | :--- | :--- |
| **Frontend** | React 19, TypeScript, Vite, React Router DOM, Context API, Bootstrap 5 | Interfaz de usuario interactiva y SPA responsive con almacenamiento de sesión seguro. |
| **Backend** | Java 21 / Spring Boot 3.5.8, Spring Security 6, Spring Data JPA, JWT | API REST segura, hashing de contraseñas con BCrypt, validación de DTOs y persistencia ORM. |
| **Base de Datos** | MySQL 8.0 (Laragon / Servicio Local) | Base de datos relacional para persistencia de usuarios, roles, catálogo y transacciones. |
| **Testing Frontend** | Vitest 4.1.11, Testing Library | 25 pruebas unitarias automatizadas distribuidas en 6 suites (100% aprobadas en 578 ms). |
| **Testing Backend** | JUnit 5, Mockito, Maven Surefire | 10 pruebas unitarias automatizadas bicapa (100% BUILD SUCCESS en 3.12 s). |
| **Automatización E2E** | Selenium IDE | 4 suites funcionales con 46 comandos registrados y aprobados para navegación multirol. |
| **Rendimiento / Carga** | Apache JMeter 5.6.3 | Prueba de estrés con 200 hilos concurrentes y 800 muestras (APDEX 1.000, 0.00% tasa de error). |
| **Seguridad DAST** | OWASP ZAP 2.15.0 | Auditoría dinámica de seguridad con cabeceras HTTP reforzadas (CSP, X-Frame-Options: DENY). |

---

## 3. Estructura del Repositorio

```text
tienda-moar/
├── backend/                             # API REST Spring Boot y configuración de servidor
│   ├── src/main/java/                   # Controladores, servicios, modelos y seguridad JWT
│   ├── src/test/java/                   # Pruebas unitarias JUnit 5 (Auth, Roles, Catálogo)
│   ├── tienda_moar_carga.jmx            # Plan de pruebas de carga y estrés JMeter (200 usuarios)
│   ├── reporte_dashboard_jmeter/        # Dashboard HTML generado por Apache JMeter
│   ├── poblar_productos.py              # Script utilitario para cargar catálogo inicial en MySQL
│   ├── pom.xml                          # Dependencias y configuración de compilación Maven
│   └── mvnw / mvnw.cmd                  # Maven Wrapper para ejecución sin instalación previa
├── frontend/                            # Aplicación cliente React 19 + TypeScript
│   ├── src/components/                  # Componentes visuales y reutilizables
│   ├── src/context/                     # React Context (AuthContext, CartContext, ProductContext)
│   ├── src/pages/                       # Vistas principales (Catálogo, Carrito, Login, Admin)
│   ├── src/routes/                      # Rutas protegidas (ProtectedRoute, SuperAdminRoute)
│   ├── src/tests/                       # Suites de pruebas unitarias Vitest
│   ├── package.json                     # Definición de scripts y dependencias pnpm
│   ├── eslint.config.js                 # Reglas estrictas de calidad estática de código
│   └── vite.config.ts                   # Configuración del bundler Vite
├── Documentación/                       # Entregables oficiales y evidencias del proceso QA
│   ├── Prueba 1/                        # Matriz de trazabilidad y requerimientos funcionales
│   ├── Prueba 2/                        # Informes DAST (ZAP), métricas SonarQube y JMeter
│   └── Prueba 3/                        # Entrega Final Parcial 3.2
│       ├── INFORME_PARCIAL_3_2_TIENDA_MOAR_FINAL.pdf   # Informe Oficial de Certificación (86 páginas)
│       ├── INFORME_PARCIAL_3_2_TIENDA_MOAR_FINAL.docx  # Documento editable oficial
│       ├── Matriz_Ejecucion_Casos_Prueba_TiendaMoAr_Final.xlsx  # Matriz RTM y Dashboard de 46 casos
│       └── Evidencias - Prueba 3/                      # Capturas de ejecución y trazabilidad
├── .gitignore                           # Exclusiones de dependencias, temporales y builds
└── README.md                            # Guía de instalación, uso y certificación técnica
```

---

## 4. Requisitos del Entorno

Antes de comenzar la instalación, asegúrate de contar con las siguientes herramientas en tu sistema:

* **Node.js:** Versión 20.x o superior ([Descargar Node.js](https://nodejs.org/)).
* **pnpm:** Gestor de paquetes recomendado (`npm install -g pnpm`).
* **Java Development Kit (JDK):** Versión 21 o superior ([Eclipse Temurin / Oracle OpenJDK](https://adoptium.net/)).
* **MySQL Server:** Versión 8.0 o superior (recomendado a través del entorno [Laragon](https://laragon.org/) o XAMPP).
* **Git:** Para control de versiones.

---

## 5. Guía de Instalación y Despliegue Local

### Paso 1: Configurar la Base de Datos MySQL

1. Inicia el motor MySQL (por ejemplo, haciendo clic en *Start All* en Laragon).
2. Conéctate a tu cliente MySQL (HeidiSQL, DBeaver o terminal) y crea la base de datos:
   ```sql
   CREATE DATABASE tienda_moar CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```
3. Verifica los parámetros de conexión en [backend/src/main/resources/application.properties](backend/src/main/resources/application.properties):
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/tienda_moar
   spring.datasource.username=root
   spring.datasource.password=
   spring.jpa.hibernate.ddl-auto=update
   ```

*(Opcional)* Para sembrar el catálogo de productos inicial, puedes ejecutar el script Python de apoyo:
```bash
python backend/poblar_productos.py
```

---

### Paso 2: Ejecutar el Backend (Spring Boot)

Abre una terminal en la raíz del proyecto y dirígete al directorio `backend`:

```bash
cd backend
```

1. **Ejecutar las pruebas unitarias automatizadas (JUnit 5):**
   ```bash
   # En Windows:
   .\mvnw.cmd test -Dtest=JwtServiceTest,RoleAuthorizationTest,ProductServiceTest

   # En Linux / macOS:
   ./mvnw test -Dtest=JwtServiceTest,RoleAuthorizationTest,ProductServiceTest
   ```

2. **Levantar el servidor en desarrollo:**
   ```bash
   # En Windows:
   .\mvnw.cmd spring-boot:run

   # En Linux / macOS:
   ./mvnw spring-boot:run
   ```
   * El servicio backend quedará disponible en: `http://localhost:8080`
   * Endpoint de autenticación base: `http://localhost:8080/api/auth/`
   * Endpoint de productos base: `http://localhost:8080/api/products`

---

### Paso 3: Ejecutar el Frontend (React + Vite)

Abre una segunda terminal en la raíz del proyecto y dirígete a la carpeta `frontend`:

```bash
cd frontend
```

1. **Instalar dependencias:**
   ```bash
   pnpm install
   ```

2. **Verificar calidad de código estática (ESLint):**
   ```bash
   pnpm run lint
   ```
   *(Debe retornar 0 advertencias y 0 errores).*

3. **Ejecutar la suite de pruebas unitarias (Vitest):**
   ```bash
   pnpm run test
   ```
   *(Ejecuta las 25 pruebas unitarias en modo ejecución inmediata).*

4. **Levantar el servidor de desarrollo:**
   ```bash
   pnpm run dev
   ```
   * La aplicación cliente quedará disponible en: `http://localhost:5173`

---

## 6. Credenciales de Prueba y Matriz de Roles (RBAC)

Para la verificación y auditoría del sistema, se han provisto las siguientes cuentas preconfiguradas con diferentes privilegios:

| Rol | Correo Electrónico | Contraseña | Permisos y Alcance del Perfil |
| :--- | :--- | :--- | :--- |
| **Super Administrador** | `superadmin@tienda.com` | `super123` *(o `admin123`)* | Acceso total al panel de administración, control de roles de usuario, auditoría y seguridad. |
| **Administrador** | `admin@moar.cl` | `admin123` | Gestión de catálogo, adición/edición de productos, control de stock y precios. |
| **Cliente Común** | `cliente.moar@tienda.com` | `cliente123` | Exploración de catálogo, carrito de compras, aplicación de cupones y checkout simulado. |

---

## 7. Ejecución de la Estrategia de Pruebas de Calidad

El proyecto fue auditado exhaustivamente bajo una tríada integral de aseguramiento de calidad (QA):

### 1. Pruebas Unitarias Frontend (Vitest)
* **Comando:** `cd frontend && pnpm test run`
* **Cobertura:** 25 casos automatizados en 6 suites:
  * `auth.test.ts`: Validación de formato de credenciales, login y almacenamiento de token.
  * `coupons.test.ts`: Insensibilidad a mayúsculas/minúsculas y control de cupones expirados (DEF-004).
  * `cart.test.ts` & `cartAdvanced.test.ts`: Reglas de subtotal, límites de stock y carrito vacío.
  * `products.test.ts`: Filtros por categoría, búsqueda reactiva y ordenamiento.
  * `securityAndResilience.test.ts`: Resiliencia ante caídas de red y timeout de peticiones (DEF-006).
* **Resultado:** **100% PASS** en 578 ms.

### 2. Pruebas Unitarias Backend (JUnit 5 + Mockito)
* **Comando:** `cd backend && .\mvnw.cmd test -Dtest=JwtServiceTest,RoleAuthorizationTest,ProductServiceTest`
* **Cobertura:** 10 aserciones unitarias en controladores y servicios:
  * `JwtServiceTest` (3 tests): Generación, firma criptográfica y expiración de tokens JWT.
  * `RoleAuthorizationTest` (3 tests): Verificación de permisos y bloqueo HTTP 403 Forbidden para rutas administrativas.
  * `ProductServiceTest` (4 tests): Bloqueo estricto de precios menores o iguales a cero en modificación de productos (DEF-001).
* **Resultado:** **BUILD SUCCESS** (10 tests sin fallas en 3.12 s).

### 3. Pruebas de Rendimiento y Estrés (Apache JMeter)
* **Plan:** [backend/tienda_moar_carga.jmx](backend/tienda_moar_carga.jmx)
* **Dimensionamiento:** 200 hilos concurrentes simulando 800 peticiones combinadas (`GET /api/products` y `POST /api/auth/login`).
* **Resultados:**
  * **Tasa de Error:** **0.00%** (0 fallas en 800 peticiones).
  * **Índice APDEX:** **1.000** (tolerancia perfecta).
  * **Tiempo de Respuesta Promedio Global:** **69 ms** (14 ms en catálogo de productos y 123 ms en autenticación con hashing BCrypt).
  * **Throughput:** **78.5 transacciones por segundo**.

### 4. Automatización de Flujos E2E (Selenium IDE)
* **Archivo de Suite:** `Documentación/Prueba 2/Evidencias - Prueba 2/Selenium/TiendaMoAr_Selenium_usuarioComun.side`
* **Alcance:** Recorrido automatizado completo de navegación, autenticación, adición al carrito, aplicación de cupones y cierre de sesión.

---

## 8. Defectos Corregidos y Cerrados en el Ciclo 2

Durante el ciclo de pruebas se detectaron y cerraron exitosamente 6 defectos críticos:

1. **DEF-001 (Alta / P1 - Backend/Frontend):** Corrección de la permisividad de precios $\le 0$ en la edición de productos (validación en `AdminDashboard.tsx` y guarda en `ProductService.java`).
2. **DEF-002 (Media / P2 - Seguridad DAST):** Restricción de Swagger UI a entorno local e incorporación de cabeceras de seguridad HTTP (`Content-Security-Policy`, `X-Frame-Options: DENY`).
3. **DEF-003 (Baja / P3 - Calidad Estática):** Resolución de 7 violaciones reportadas por ESLint en el frontend (corrección de variables no utilizadas y tipado TypeScript estricto).
4. **DEF-004 (Media / P2 - Funcional):** Corrección de la sensibilidad estricta a mayúsculas/minúsculas en el canje de cupones de descuento (normalización `.toUpperCase()` en frontend).
5. **DEF-005 (Media / P2 - Rendimiento):** Mitigación de cuello de botella de concurrencia en Apache Tomcat ajustando el Thread Pool (`server.tomcat.threads.max = 200`).
6. **DEF-006 (Media / P2 - Resiliencia):** Manejo amigable de errores de red y timeout en Axios (`securityAndResilience.test.ts`), evitando pantallas en blanco.

---

## 9. Documentación y Entregables Académicos

Todos los informes y evidencias formales exigidos para la evaluación se encuentran organizados en la carpeta `Documentación/`:

* **Informe Oficial de Certificación Final (PDF):**  
  [Documentación/Prueba 3/INFORME_PARCIAL_3_2_TIENDA_MOAR_FINAL.pdf](Documentación/Prueba%203/INFORME_PARCIAL_3_2_TIENDA_MOAR_FINAL.pdf) *(86 páginas con estructura IEEE 829, UAT de 18 preguntas, medidas correctivas y catálogo de evidencias técnicas).*
* **Informe Oficial Editable (Word):**  
  [Documentación/Prueba 3/INFORME_PARCIAL_3_2_TIENDA_MOAR_FINAL.docx](Documentación/Prueba%203/INFORME_PARCIAL_3_2_TIENDA_MOAR_FINAL.docx)
* **Matriz de Trazabilidad de Requisitos (RTM Excel):**  
  [Documentación/Prueba 3/Matriz_Ejecucion_Casos_Prueba_TiendaMoAr_Final.xlsx](Documentación/Prueba%203/Matriz_Ejecucion_Casos_Prueba_TiendaMoAr_Final.xlsx) *(Dashboard ejecutivo y matriz de los 46 casos de prueba).*

---

## 10. Licencia y Uso

Este proyecto ha sido desarrollado exclusivamente con fines académicos y de evaluación para la asignatura **Técnicas de Calidad de Software (TCY0101)** de **Duoc UC**. Todos los derechos reservados por sus autores © 2026.
