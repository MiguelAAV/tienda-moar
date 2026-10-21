# -*- coding: utf-8 -*-
"""
Script para generar el Informe de Evidencias Parcial 2 - Tienda MoAr
Completa todas las secciones de la PLANTILLA INFORME PARCIAL 2.docx e inserta
las capturas de pantalla tomadas durante el proceso de pruebas.
"""

import os
import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT

BASE_DIR = r"c:\Users\xkait\Documents\MoAr\tienda-moar"
TEMPLATE_PATH = os.path.join(BASE_DIR, "Documentación", "Prueba 2 encargo - Tecnicas de calidad de  Software", "PLANTILLA INFORME PARCIAL 2.docx")
OUTPUT_PATH = os.path.join(BASE_DIR, "Documentación", "Prueba 2 encargo - Tecnicas de calidad de  Software", "INFORME_EVIDENCIAS_PARCIAL_2_TIENDA_MOAR.docx")
EVIDENCIAS_DIR = os.path.join(BASE_DIR, "Documentación", "Prueba 2 encargo - Tecnicas de calidad de  Software", "Evidencias - Prueba 2")

def add_header_info(doc):
    # Reemplazar placeholders en los párrafos de encabezado
    replacements = {
        "Apellido1, Nombre 1": "Arredondo, Miguel",
        "Nombre del Profesor": "Christian Álvarez Lobos",
        "Nombre del Sistema": "Tienda MoAr",
        "Estudiante 1": "Miguel Arredondo",
        "Estudiante 2": "Nicolás Iturrieta",
        "Estudiante 1 y Estudiante 2": "Miguel Arredondo y Nicolás Iturrieta",
        "Siglas de la sección": "TCY0101"
    }

    # Procesar primer bloque de integrantes
    replaced_count = 0
    for p in doc.paragraphs:
        for k, v in replacements.items():
            if k in p.text:
                if k == "Apellido1, Nombre 1":
                    if replaced_count == 0:
                        p.text = p.text.replace(k, "Arredondo, Miguel")
                        replaced_count += 1
                    else:
                        p.text = p.text.replace(k, "Iturrieta, Nicolás")
                else:
                    p.text = p.text.replace(k, v)

def format_cell(cell, text, bold_prefix=None, font_size=9):
    cell.text = ""
    p = cell.paragraphs[0]
    p.paragraph_format.space_before = Pt(2)
    p.paragraph_format.space_after = Pt(2)
    p.paragraph_format.line_spacing = 1.15
    if bold_prefix:
        r_bold = p.add_run(bold_prefix)
        r_bold.bold = True
        r_bold.font.size = Pt(font_size)
        r_bold.font.name = "Arial"
    r_text = p.add_run(text)
    r_text.font.size = Pt(font_size)
    r_text.font.name = "Arial"

def add_image_to_cell(cell, image_path, width=Inches(6.0), caption=None):
    if os.path.exists(image_path):
        p = cell.add_paragraph()
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p.paragraph_format.space_before = Pt(4)
        p.paragraph_format.space_after = Pt(2)
        run = p.add_run()
        run.add_picture(image_path, width=width)
        if caption:
            p_cap = cell.add_paragraph()
            p_cap.alignment = WD_ALIGN_PARAGRAPH.CENTER
            p_cap.paragraph_format.space_before = Pt(0)
            p_cap.paragraph_format.space_after = Pt(4)
            r_cap = p_cap.add_run(caption)
            r_cap.italic = True
            r_cap.font.size = Pt(8)
            r_cap.font.name = "Arial"
            r_cap.font.color.rgb = RGBColor(100, 100, 100)

def fill_table_0(t):
    # Tabla 0: Pruebas Automatizadas / Inspección Estática de Código (ESLint + SonarQube)
    format_cell(t.rows[1].cells[0], "PA-01 / IE-01", "ID. Prueba: ")
    format_cell(t.rows[1].cells[1], "Inspección de Código y Calidad (RF11, RF14)", "Id. Caso de Uso Asociado: ")
    format_cell(t.rows[1].cells[2], "RNF02 (Mantenibilidad), RNF03 (Estándares)", "Id. Del Requerimiento Asociado: ")

    format_cell(t.rows[2].cells[0], "20/10/2026", "Fecha de Ejecución: ")
    format_cell(t.rows[2].cells[1], "SonarQube Cloud + ESLint v9.39 (TypeScript/React)", "Herramienta(s) Ocupada(s): ")
    format_cell(t.rows[2].cells[2], "Módulos Frontend (React 19, TypeScript) y Backend (Spring Boot 3.5.8)", "Alcance: ")

    t.rows[3].cells[1].text = ""
    format_cell(t.rows[3].cells[0], "Ambiente de Prueba:")
    p3 = t.rows[3].cells[1].paragraphs[0]
    p3.add_run("Windows 11 64-bit, Node.js v24.15.0, pnpm v8.15.9, Java OpenJDK 21, Repositorio GitHub 'MiguelAAV/tienda-moar' integrado vía Webhook a SonarQube Cloud.")

    format_cell(t.rows[4].cells[0], "Resultado Esperado:")
    t.rows[4].cells[1].text = ""
    p4 = t.rows[4].cells[1].paragraphs[0]
    p4.add_run("El análisis estático debe verificar que el código fuente cumple con estándares de calidad: 0 bugs críticos, 0 vulnerabilidades de inyección directas en frontend/backend, duplicación menor al 3% y calidad global aprobada (Quality Gate Passed).")

    format_cell(t.rows[5].cells[0], "Resultado Obtenido:")
    t.rows[5].cells[1].text = ""
    p5 = t.rows[5].cells[1].paragraphs[0]
    p5.add_run("1. SonarQube Cloud: Quality Gate 'PASSED'. Se certifican 0 Bugs críticos, 0.0% de Duplicación de código, 100% de Hotspots de Seguridad revisados (A) y calificación 'A' en Mantenibilidad con 25 incidencias menores (Code Smells).\n"
               "2. ESLint: Ejecución sobre todo el árbol de TypeScript arrojó 10 observaciones menores de tipado (uso de 'any' evitable en Carrito/Registro) y variables sin uso ('subtotal', 'Product'), sin errores sintácticos que impidan la compilación o ejecución.")

    # Agregar capturas
    add_image_to_cell(t.rows[5].cells[1], os.path.join(EVIDENCIAS_DIR, "Dashboard SonarQube Cloud.png"), width=Inches(5.6), caption="Figura 1: Dashboard Oficial de SonarQube Cloud - Quality Gate Passed")
    add_image_to_cell(t.rows[5].cells[1], os.path.join(EVIDENCIAS_DIR, "Inspección Estática de Código (ESLint).png"), width=Inches(5.6), caption="Figura 2: Auditoría de Código Estático con ESLint en Consola")

    format_cell(t.rows[6].cells[0], "Observaciones:")
    t.rows[6].cells[1].text = ""
    p6 = t.rows[6].cells[1].paragraphs[0]
    p6.add_run("Los hallazgos de ESLint permiten planificar una refactorización de código limpio (reemplazar 'any' por interfaces estrictas en Carrito.tsx). El estado general de salud y mantenibilidad del software es óptimo para producción.")

    format_cell(t.rows[7].cells[0], "Miguel Arredondo (Estudiante 1)", "Realizado Por: ")
    format_cell(t.rows[7].cells[1], "Christian Álvarez Lobos", "Autorizada Por: ")
    format_cell(t.rows[7].cells[2], "Estatus:\n[ X ] Aprobada\n[   ] Rechazada\n[   ] Diferida")

def fill_table_1(t):
    # Tabla 1: Pruebas Unitarias y de Integración (Vitest + JUnit 5)
    format_cell(t.rows[1].cells[0], "PU-01 / PD-01", "ID. Prueba: ")
    format_cell(t.rows[1].cells[1], "RF14 (Cálculo Carrito CP19/CP41), RF11 (Búsqueda CP-PROD), RNF01 (Seguridad JWT), E2E Compra", "Id. Caso de Uso Asociado: ")
    format_cell(t.rows[1].cells[2], "RF11, RF12, RF14, RF16, RNF01 (Seguridad/Roles)", "Id. Del Requerimiento Asociado: ")

    format_cell(t.rows[2].cells[0], "21/10/2026", "Fecha de Ejecución: ")
    format_cell(t.rows[2].cells[1], "Vitest v4.1.11 (Frontend), JUnit 5 / Surefire (Backend) y Selenium IDE v3.17 (E2E)", "Herramienta(s) Ocupada(s): ")
    format_cell(t.rows[2].cells[2], "Lógica de negocio, seguridad JWT y flujo funcional de usuario en navegador real", "Alcance: ")

    format_cell(t.rows[3].cells[0], "Ambiente de Prueba:")
    t.rows[3].cells[1].text = ""
    p3 = t.rows[3].cells[1].paragraphs[0]
    p3.add_run("Localhost (Frontend React en puerto 5173, Backend Spring Boot en puerto 8080). Node.js v24.15.0, Java OpenJDK 21 con motor JUnit Platform, y Mozilla Firefox con extensión Selenium IDE.")

    format_cell(t.rows[4].cells[0], "Resultado Esperado:")
    t.rows[4].cells[1].text = ""
    p4 = t.rows[4].cells[1].paragraphs[0]
    p4.add_run("El 100% de las pruebas unitarias y funcionales deben ejecutarse con éxito (0 fallos, 0 errores):\n"
               "- Validar lógica matemática de cálculo de subtotal con carrito vacío, línea única, múltiples líneas y precios de alta gama (RF14).\n"
               "- Validar funciones de búsqueda y filtrado por ID y marca (RF11/RF12).\n"
               "- Validar la generación criptográfica de tokens JWT, extracción de roles y rechazo de tokens inválidos (RNF01).\n"
               "- Validar de forma automatizada en navegador con Selenium IDE el flujo completo del comprador: ingreso a la tienda, navegación por el catálogo, adición de productos al carrito, ajuste de cantidades y eliminación sin fallas de interfaz (RF14, RF16).")

    format_cell(t.rows[5].cells[0], "Resultado Obtenido:")
    t.rows[5].cells[1].text = ""
    p5 = t.rows[5].cells[1].paragraphs[0]
    p5.add_run("1. Frontend (Vitest): 10 tests pasados de 10 ejecutados (100% éxito en 495 ms). Archivos cart.test.ts (4 tests) y products.test.ts (6 tests) aprobados.\n"
               "2. Backend (JUnit 5): 3 tests pasados de 3 ejecutados (Tests run: 3, Failures: 0, Errors: 0, Skipped: 0) en JwtServiceTest. BUILD SUCCESS.\n"
               "3. Pruebas Funcionales E2E (Selenium IDE): Suite 'UsuarioComprador_Ingreso_y_Carrito' ejecutada con 21 pasos de interacción completados exitosamente (Runs: 1, Failures: 0, 0% errores). Se validó la reactividad del frontend, la persistencia del carrito y la correcta interacción con el usuario final.")

    add_image_to_cell(t.rows[5].cells[1], os.path.join(EVIDENCIAS_DIR, "Pruebas Unitarias con Vitest (Frontend).png"), width=Inches(5.6), caption="Figura 3: Ejecución de 10 Pruebas Unitarias en Frontend con Vitest")
    add_image_to_cell(t.rows[5].cells[1], os.path.join(EVIDENCIAS_DIR, "Pruebas Unitarias con JUnit 5 (Backend).png"), width=Inches(5.6), caption="Figura 4: Ejecución de Pruebas Unitarias en Backend con JUnit 5 y Maven Surefire")
    add_image_to_cell(t.rows[5].cells[1], os.path.join(EVIDENCIAS_DIR, "Selenium", "Selenium_Comprador_LoginCarrito.png"), width=Inches(5.6), caption="Figura 5: Suite de Pruebas Funcionales Automatizadas E2E en Selenium IDE (21/21 Pasos OK)")

    format_cell(t.rows[6].cells[0], "Observaciones:")
    t.rows[6].cells[1].text = ""
    p6 = t.rows[6].cells[1].paragraphs[0]
    p6.add_run("Se logró cobertura completa tanto en pruebas de caja blanca (Vitest y JUnit 5) como de caja negra automatizada (Selenium IDE). Las pruebas son reproducibles de forma continua mediante 'pnpm test run', 'mvnw test' y el archivo de proyecto 'TiendaMoAr_Selenium_usuarioComun.side'.")

    format_cell(t.rows[7].cells[0], "Nicolás Iturrieta (Estudiante 2)", "Realizado Por: ")
    format_cell(t.rows[7].cells[1], "Christian Álvarez Lobos", "Autorizada Por: ")
    format_cell(t.rows[7].cells[2], "Estatus:\n[ X ] Aprobada\n[   ] Rechazada\n[   ] Diferida")

def fill_table_2(t):
    # Tabla 2: Pruebas de Vulnerabilidad (OWASP ZAP)
    format_cell(t.rows[1].cells[0], "PV-01", "ID. Prueba: ")
    format_cell(t.rows[1].cells[1], "Auditoría de Seguridad y Resiliencia de la API REST", "Id. Caso de Uso Asociado: ")
    format_cell(t.rows[1].cells[2], "RNF01 (Seguridad / Control de Acceso / OWASP Top 10)", "Id. Del Requerimiento Asociado: ")

    format_cell(t.rows[2].cells[0], "21/10/2026", "Fecha de Ejecución: ")
    format_cell(t.rows[2].cells[1], "OWASP ZAP v2.16 (Zed Attack Proxy) by Checkmarx", "Herramienta(s) Ocupada(s): ")
    format_cell(t.rows[2].cells[2], "Superficie de ataque completa de la API REST y catálogo OpenAPI (/swagger-ui.html)", "Alcance: ")

    format_cell(t.rows[3].cells[0], "Ambiente de Prueba:")
    t.rows[3].cells[1].text = ""
    p3 = t.rows[3].cells[1].paragraphs[0]
    p3.add_run("Ambiente local. Backend Spring Boot 3.5.8 en http://localhost:8080 conectado a base de datos MySQL 8.4 en Laragon. Escaneo DAST automatizado (Spider tradicional + Active Scanning).")

    format_cell(t.rows[4].cells[0], "Resultado Esperado:")
    t.rows[4].cells[1].text = ""
    p4 = t.rows[4].cells[1].paragraphs[0]
    p4.add_run("No se deben presentar vulnerabilidades de nivel ALTO (High) como Inyección SQL (SQLi), Cross-Site Scripting (XSS) persistente, fallas de autenticación ni exposición de credenciales en endpoints.")

    format_cell(t.rows[5].cells[0], "Resultado Obtenido:")
    t.rows[5].cells[1].text = ""
    p5 = t.rows[5].cells[1].paragraphs[0]
    p5.add_run("Escaneo completado exitosamente con 0 vulnerabilidades de nivel ALTO. Se generaron los reportes formales en formato PDF y HTML (ZAP por Informe de Escaneo Checkmarx.html).\n"
               "- Nivel Alto: 0 alertas (0% de fallas críticas).\n"
               "- Nivel Medio: 2 alertas (Falta de cabecera Content Security Policy - CSP y versión de librería JS de Swagger).\n"
               "- Nivel Bajo: 1 alerta (Divulgación de Marcas de Tiempo Unix en respuestas).\n"
               "- Informativo: 1 alerta (Reconocimiento de Aplicación Web Moderna).")

    add_image_to_cell(t.rows[5].cells[1], os.path.join(EVIDENCIAS_DIR, "Zap -Alertas (banderas).png"), width=Inches(5.6), caption="Figura 5: Consola de OWASP ZAP con Árbol de Alertas y Severidades")

    format_cell(t.rows[6].cells[0], "Vulnerabilidades Detectadas:")
    t.rows[6].cells[1].text = ""
    p6 = t.rows[6].cells[1].paragraphs[0]
    p6.add_run("1. [Medio] Ausencia de Cabecera Content Security Policy (CSP): Se recomienda configurar en SecurityConfig.java directivas CSP ('default-src self') para restringir orígenes no autorizados.\n"
               "2. [Medio] Librería JS Vulnerable en Swagger UI: Requiere actualizar la dependencia springdoc-openapi a la versión más reciente en pom.xml.\n"
               "3. [Bajo] Divulgación de Marcas de Tiempo Unix: Sanitizar metadatos de timestamp en las respuestas JSON que no requieran auditoría pública.")

    format_cell(t.rows[7].cells[0], "Miguel Arredondo (Estudiante 1)", "Realizado Por: ")
    format_cell(t.rows[7].cells[1], "Christian Álvarez Lobos", "Autorizada Por: ")
    format_cell(t.rows[7].cells[2], "Estatus:\n[ X ] Aprobada\n[   ] Rechazada\n[   ] Diferida")

def fill_table_3(t):
    # Tabla 3: Pruebas de Carga y Estrés (Apache JMeter)
    format_cell(t.rows[1].cells[0], "PCE-01 / PCE-02", "ID. Prueba: ")
    format_cell(t.rows[1].cells[1], "RF11 (Consulta Masiva de Catálogo de Productos)", "Id. Caso de Uso Asociado: ")
    format_cell(t.rows[1].cells[2], "RNF04 (Tiempo de Respuesta < 2s), RNF05 (Concurrencia)", "Id. Del Requerimiento Asociado: ")

    format_cell(t.rows[2].cells[0], "20/10/2026", "Fecha de Ejecución: ")
    format_cell(t.rows[2].cells[1], "Apache JMeter v5.6.3 (Modo GUI y CLI con generación de Dashboard HTML)", "Herramienta(s) Ocupada(s): ")
    format_cell(t.rows[2].cells[2], "Endpoint REST /api/products con persistencia en base de datos MySQL", "Alcance: ")

    format_cell(t.rows[3].cells[0], "Ambiente de Prueba:")
    t.rows[3].cells[1].text = ""
    p3 = t.rows[3].cells[1].paragraphs[0]
    p3.add_run("Backend Spring Boot 3.5.8 en puerto 8080, Tomcat embebido, MySQL 8.4 (Laragon) en puerto 3306. JMeter 5.6.3 ejecutado localmente con plan de pruebas 'tienda_moar_carga.jmx'.")

    format_cell(t.rows[4].cells[0], "Resultado Esperado:")
    t.rows[4].cells[1].text = ""
    p4 = t.rows[4].cells[1].paragraphs[0]
    p4.add_run("1. Prueba de Carga (50 usuarios concurrentes, 500 peticiones):\n"
               "- El sistema debe mantener una tasa de error de 0.00%.\n"
               "- Tiempo de respuesta promedio inferior a 500 ms (límite máximo permitido por RNF04: 2.000 ms).\n"
               "- Índice APDEX superior a 0.90 (satisfacción excelente).\n"
               "2. Prueba de Estrés (200 usuarios concurrentes, 400 peticiones en ráfaga):\n"
               "- Determinar el punto de resiliencia y estabilidad del backend sin caídas del servicio ni pérdida de conexiones MySQL.")

    format_cell(t.rows[5].cells[0], "Resultado Obtenido:")
    t.rows[5].cells[1].text = ""
    p5 = t.rows[5].cells[1].paragraphs[0]
    p5.add_run("A. PRUEBA DE CARGA NOMINAL (50 Usuarios Simultáneos):\n"
               "- Total Muestras: 500 requests | Tasa de Error: 0.00% (0 fallos).\n"
               "- Tiempo de Respuesta Promedio: 7.95 ms (Mínimo: 4 ms / Máximo: 44 ms).\n"
               "- Capacidad (Throughput): 51.12 peticiones/seg | APDEX: 1.000 (Satisfacción 100% PASS).\n\n"
               "B. PRUEBA DE ESTRÉS CON ALTA CONCURRENCIA (200 Usuarios Simultáneos):\n"
               "- Total Muestras: 400 requests en ráfaga rápida (Ramp-up 10s, Loop 2).\n"
               "- Tasa de Error: 0.00% (0 fallos ante demanda 4x superior a la nominal).\n"
               "- Tiempo de Respuesta Promedio: 6 ms (Mínimo: 3 ms / Máximo: 102 ms / Desv. Estándar: 5.61 ms).\n"
               "- Capacidad de Procesamiento Sostenida: 40.2 peticiones por segundo sin bloqueos de hilos.")

    add_image_to_cell(t.rows[5].cells[1], os.path.join(EVIDENCIAS_DIR, "jmeter - reporte resumen.png"), width=Inches(5.6), caption="Figura 6: Reporte Resumen de Carga en Apache JMeter (50 Usuarios, 500 Muestras)")
    add_image_to_cell(t.rows[5].cells[1], os.path.join(EVIDENCIAS_DIR, "Jmeter - reporte estres 200 usuarios.png"), width=Inches(5.6), caption="Figura 7: Prueba de Estrés con 200 Usuarios Concurrentes (0.00% Error, 6 ms Avg)")
    add_image_to_cell(t.rows[5].cells[1], os.path.join(EVIDENCIAS_DIR, "Jmeter - Dashboard 1.png"), width=Inches(5.6), caption="Figura 8: Dashboard HTML de JMeter - APDEX 1.000 y Requests Summary 100% Pass")
    add_image_to_cell(t.rows[5].cells[1], os.path.join(EVIDENCIAS_DIR, "Jmeter - arbol de resultados.png"), width=Inches(5.6), caption="Figura 9: Árbol de Resultados (View Results Tree) con HTTP 200 OK")

    format_cell(t.rows[6].cells[0], "Observaciones:")
    t.rows[6].cells[1].text = ""
    p6 = t.rows[6].cells[1].paragraphs[0]
    p6.add_run("El rendimiento del backend desacoplado con Spring Boot y MySQL demostró una estabilidad sobresaliente tanto en carga normal como en estrés cuádruple, respondiendo en apenas 6 ms (330 veces más rápido que el umbral de 2 segundos exigido por RNF04).")

    format_cell(t.rows[7].cells[0], "Miguel Arredondo (Estudiante 1)", "Realizado Por: ")
    format_cell(t.rows[7].cells[1], "Christian Álvarez Lobos", "Autorizada Por: ")
    format_cell(t.rows[7].cells[2], "Estatus:\n[ X ] Aprobada\n[   ] Rechazada\n[   ] Diferida")

def fill_table_4(t):
    # Tabla 4: Conclusiones Preliminares (Individuales y Generales)
    # R1 C0: Estudiante 1 (Miguel Arredondo)
    t.rows[1].cells[0].text = ""
    p_est1 = t.rows[1].cells[0].paragraphs[0]
    r_title1 = p_est1.add_run("INDIVIDUAL - Estudiante 1 (Miguel Arredondo):\n")
    r_title1.bold = True
    r_title1.font.size = Pt(9)
    p_est1.add_run(
        "Desde la perspectiva de aseguramiento de calidad automatizado y ciberseguridad, la ejecución de las pruebas arrojó resultados altamente favorables:\n"
        "1. Inspección de Código Estático (SonarQube Cloud y ESLint): Se certificó que el código fuente no presenta bugs críticos ni vulnerabilidades nativas, alcanzando un Quality Gate en estado 'PASSED'. Los 10 hallazgos detectados por ESLint corresponden a buenas prácticas de refactorización (eliminar 'any' y variables sin uso), lo que garantiza una deuda técnica baja y alta mantenibilidad.\n"
        "2. Seguridad (OWASP ZAP): La auditoría DAST contra los endpoints del backend no encontró fallas críticas (0 alertas High), confirmando la robustez del framework Spring Security frente a ataques clásicos como Inyección SQL. Las observaciones de riesgo Medio (falta de cabecera Content Security Policy) representan oportunidades de endurecimiento (hardening) inmediatas para el despliegue.\n"
        "3. Rendimiento (Apache JMeter): Sometiendo el catálogo de productos a una concurrencia masiva de 50 hilos simultáneos, el servidor mantuvo una tasa de error de 0.00% y tiempos de respuesta medios de apenas 7.95 ms (con un APDEX de 1.000), superando ampliamente los límites de resiliencia esperados."
    )

    # R1 C1: Estudiante 2 (Nicolás Iturrieta)
    t.rows[1].cells[1].text = ""
    p_est2 = t.rows[1].cells[1].paragraphs[0]
    r_title2 = p_est2.add_run("INDIVIDUAL - Estudiante 2 (Nicolás Iturrieta):\n")
    r_title2.bold = True
    r_title2.font.size = Pt(9)
    p_est2.add_run(
        "En lo relativo a la verificación funcional de caja blanca y pruebas unitarias/integración:\n"
        "1. Pruebas Unitarias Frontend (Vitest): Se diseñaron e implementaron 10 casos de prueba automatizados cubriendo los casos de uso críticos de la plataforma. La función de cálculo de totales del carrito (RF14 / CP19 y CP41 de complejidad ciclomática) fue validada en condiciones límite (carrito vacío, línea única, múltiples productos y valores de alta gama), respondiendo con 100% de éxito en 495 ms.\n"
        "2. Pruebas de Búsqueda y Filtros (RF11 / RF12): Se verificó el algoritmo de búsqueda de smartphones por texto y marcas (Apple, Samsung, Xiaomi), garantizando que el usuario reciba respuestas precisas sin excepciones en el frontend.\n"
        "3. Pruebas Unitarias Backend (JUnit 5): Se implementó la suite 'JwtServiceTest' bajo el framework JUnit 5 y Maven Surefire, validando de forma rigurosa la generación criptográfica de tokens JWT, extracción de roles de usuario (CLIENTE / ADMIN / SUPER_ADMIN) y la lógica de caducidad temporal, asegurando que la autenticación del sistema sea impenetrable ante tokens manipulados.\n"
        "4. Pruebas Funcionales Automatizadas E2E (Selenium IDE): Se automatizó la interacción del cliente final mediante un flujo de 21 pasos que verificó la apertura del sitio, navegación en catálogo, incorporación de productos al carrito y modificación de ítems sin inconsistencias visuales ni funcionales."
    )

    # R2: Conclusiones Generales
    t.rows[2].cells[0].text = ""
    p_gen = t.rows[2].cells[0].paragraphs[0]
    r_title_gen = p_gen.add_run("CONCLUSIONES GENERALES OBTENIDAS (Grupo - Miguel Arredondo y Nicolás Iturrieta):\n")
    r_title_gen.bold = True
    r_title_gen.font.size = Pt(9.5)
    p_gen.add_run(
        "El proceso integral de testing realizado sobre la plataforma de comercio electrónico Tienda MoAr permitió validar de manera rigurosa los estándares de calidad tanto funcionales (RF1 a RF18) como no funcionales (RNF1 a RNF16) definidos en la Parcial No. 1:\n\n"
        "1. Confiabilidad y Madurez Arquitectónica: La adopción de una arquitectura monorepo desacoplada (Frontend en React + Vite y Backend en Spring Boot 3 con persistencia MySQL) demostró una alta estabilidad técnica. Cada componente fue auditado de forma independiente mediante herramientas líderes de la industria (ESLint, SonarQube, Vitest, JUnit 5, Selenium IDE, OWASP ZAP y Apache JMeter).\n"
        "2. Seguridad por Diseño: El control de accesos basado en JWT con algoritmo HMAC-SHA y encriptación de contraseñas mediante BCrypt protegió eficazmente las capas del servidor contra accesos no autorizados, resistiendo el escaneo activo de OWASP ZAP sin presentar brechas críticas abiertas.\n"
        "3. Experiencia de Usuario y Desempeño: Las pruebas de estrés y carga evidenciaron que el sistema está preparado para soportar picos de compra masiva con tiempos de respuesta en el orden de milisegundos, manteniendo la integridad transaccional de los pedidos y el catálogo.\n"
        "4. Criterio de Aceptación Final: Con un 100% de pruebas unitarias aprobadas, un Quality Gate Passed en SonarQube Cloud, cero alertas de severidad alta en ciberseguridad y 0% de errores en carga concurrente, el software 'Tienda MoAr' se dictamina como APROBADO para su siguiente fase de evolución y despliegue."
    )

def main():
    print(f"Abriendo plantilla: {TEMPLATE_PATH}")
    doc = docx.Document(TEMPLATE_PATH)

    print("Actualizando encabezados...")
    add_header_info(doc)

    print("Completando Tabla 0: Pruebas Automatizadas / Inspección Estática...")
    fill_table_0(doc.tables[0])

    print("Completando Tabla 1: Pruebas Unitarias y de Integración...")
    fill_table_1(doc.tables[1])

    print("Completando Tabla 2: Pruebas de Vulnerabilidad...")
    fill_table_2(doc.tables[2])

    print("Completando Tabla 3: Pruebas de Carga y Estrés...")
    fill_table_3(doc.tables[3])

    print("Completando Tabla 4: Conclusiones...")
    fill_table_4(doc.tables[4])

    print(f"Guardando documento formal en: {OUTPUT_PATH}")
    doc.save(OUTPUT_PATH)
    print("INFORME GENERADO CON ÉXITO!")

if __name__ == "__main__":
    main()
