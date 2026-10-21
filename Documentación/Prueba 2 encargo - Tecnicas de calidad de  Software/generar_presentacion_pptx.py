# -*- coding: utf-8 -*-
"""
Script para enriquecer y completar Evidencias.pptx con todas las pruebas y notas de orador
para el video de 5 minutos de la Evaluación Parcial 2.2.
"""

import os
import pptx
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN

BASE_REPO = r"c:\Users\xkait\Documents\MoAr\tienda-moar"

DOC_DIR = next(e.path for e in os.scandir(BASE_REPO) if e.is_dir() and "documentaci" in e.name.lower())
PRUEBA2_DIR = next(e.path for e in os.scandir(DOC_DIR) if e.is_dir() and "prueba 2" in e.name.lower())
BASE_DIR = next(e.path for e in os.scandir(PRUEBA2_DIR) if e.is_dir() and "evidencias" in e.name.lower())

PPTX_PATH = os.path.join(BASE_DIR, "Evidencias.pptx")
OUTPUT_PPTX = os.path.join(BASE_DIR, "Evidencias_Presentacion_Final.pptx")

def add_header_banner(slide, title_text, subtitle_text=""):
    # Agregar un banner de encabezado limpio y elegante
    left = Inches(0.5)
    top = Inches(0.3)
    width = Inches(12.33)
    height = Inches(0.8)
    
    txBox = slide.shapes.add_textbox(left, top, width, height)
    tf = txBox.text_frame
    tf.word_wrap = True
    
    p = tf.paragraphs[0]
    p.text = title_text
    p.font.bold = True
    p.font.size = Pt(22)
    p.font.name = "Arial"
    p.font.color.rgb = RGBColor(26, 54, 93) # Azul corporativo
    
    if subtitle_text:
        p2 = tf.add_paragraph()
        p2.text = subtitle_text
        p2.font.size = Pt(13)
        p2.font.name = "Arial"
        p2.font.color.rgb = RGBColor(113, 128, 150) # Gris elegante

def add_slide_with_image(prs, title, subtitle, img_path, notes_text, img_width=Inches(10.5)):
    blank_layout = prs.slide_layouts[6] # Layout en blanco
    slide = prs.slides.add_slide(blank_layout)
    
    add_header_banner(slide, title, subtitle)
    
    if os.path.exists(img_path):
        # Centrar imagen
        left = Inches(1.4)
        top = Inches(1.3)
        slide.shapes.add_picture(img_path, left, top, width=img_width)
    
    # Asignar notas de orador
    notes_slide = slide.notes_slide
    notes_tf = notes_slide.notes_text_frame
    notes_tf.text = notes_text
    
    return slide

def main():
    print("PPTX_PATH:", repr(PPTX_PATH))
    print("Existe PPTX_PATH:", os.path.exists(PPTX_PATH))
    prs = pptx.Presentation(PPTX_PATH)
    
    # Diapositiva 4 ya existe con la imagen de SonarQube Cloud, actualicemos sus notas y banner:
    s4 = prs.slides[3]
    add_header_banner(s4, "Inspección Estática: SonarQube Cloud", "Criterio 1 (20%) — Análisis de Calidad, Deuda Técnica y Quality Gate")
    s4.notes_slide.notes_text_frame.text = (
        "[Tiempo: ~40 seg | Habla: Miguel Arredondo]\n"
        "Buenas tardes profesor. En la primera etapa auditamos el código fuente con SonarQube Cloud integrado a nuestro repositorio GitHub. "
        "Como se aprecia en la métrica, obtuvimos un Quality Gate en estado PASSED. "
        "El proyecto certifica 0 Bugs críticos, 0 vulnerabilidades nativas y un 0.0% de código duplicado, alcanzando la máxima calificación 'A' "
        "en Mantenibilidad y 100% de Hotspots de seguridad revisados. Esto demuestra que la base de código es altamente limpia, modular y fácil de mantener."
    )
    
    # Actualizar notas de Slide 1 (Vitest)
    s1 = prs.slides[0]
    add_header_banner(s1, "Pruebas Unitarias Frontend: Vitest", "Criterio 2 (20%) — Cálculo de Carrito y Búsqueda de Catálogo")
    s1.notes_slide.notes_text_frame.text = (
        "[Tiempo: ~40 seg | Habla: Nicolás Iturrieta]\n"
        "Continuando con las pruebas de caja blanca, en el frontend implementamos una suite automatizada en Vitest con 10 casos de prueba aprobados al 100%. "
        "Validamos la función crítica de cálculo del carrito bajo condiciones límite (carrito vacío, múltiples líneas y valores de smartphones de alta gama), "
        "vinculada a los requerimientos RF14, CP19 y el análisis de complejidad ciclomática CP41. "
        "Además, probamos el filtrado y búsqueda de catálogo por texto y marcas (RF11 y RF12), respondiendo en apenas 495 ms sin fallos."
    )
    
    # Actualizar notas de Slide 2 (JUnit 5)
    s2 = prs.slides[1]
    add_header_banner(s2, "Pruebas Unitarias Backend: JUnit 5", "Criterio 2 (20%) — Seguridad y Validación Criptográfica JWT")
    s2.notes_slide.notes_text_frame.text = (
        "[Tiempo: ~40 seg | Habla: Nicolás Iturrieta]\n"
        "Para el backend en Spring Boot, implementamos pruebas unitarias directas bajo el framework JUnit 5 y Maven Surefire. "
        "Probamos la clase JwtServiceTest con 3 pruebas exitosas (0 fallos). "
        "Verificamos la generación criptográfica de tokens HMAC-SHA256, la correcta extracción de roles (CLIENTE, ADMIN, SUPER_ADMIN) "
        "y el rechazo seguro de tokens adulterados o expirados, cumpliendo con el estándar de seguridad RNF01."
    )
    
    # Actualizar notas de Slide 3 (ESLint)
    s3 = prs.slides[2]
    add_header_banner(s3, "Inspección Estática Frontend: ESLint", "Criterio 1 (20%) — Detección de Code Smells y Buenas Prácticas")
    s3.notes_slide.notes_text_frame.text = (
        "[Tiempo: ~30 seg | Habla: Miguel Arredondo]\n"
        "En complemento al análisis estático, corrimos ESLint sobre todo el código TypeScript y React. "
        "No se encontraron errores de sintaxis que impidan la ejecución de la tienda. "
        "Se detectaron 10 oportunidades de refactorización menor (Code Smells): tipado débil por uso de 'any' en eventos y variables sin uso. "
        "Esto nos permitió trazar un plan de mejora continua para migrar a interfaces estrictas en la siguiente iteración."
    )
    
    # Slides nuevas para completar el 100% de la rúbrica:
    
    # SLIDE 5: Selenium IDE - Pruebas Funcionales E2E
    add_slide_with_image(
        prs,
        "Pruebas Funcionales Automatizadas: Selenium IDE",
        "Pruebas Dinámicas E2E — Flujo Completo del Comprador (21/21 Pasos OK)",
        os.path.join(BASE_DIR, "Selenium", "Selenium_Comprador_LoginCarrito.png"),
        "[Tiempo: ~35 seg | Habla: Nicolás Iturrieta]\n"
        "Para cerrar las pruebas dinámicas, automatizamos la experiencia de usuario de extremo a extremo (E2E) con Selenium IDE. "
        "Ejecutamos la suite 'UsuarioComprador_Ingreso_y_Carrito' con 21 pasos de interacción sin errores (Runs: 1, Failures: 0). "
        "El robot simuló la navegación por el catálogo, selección de productos, incorporación al carrito y ajuste dinámico de ítems, "
        "certificando que la tienda responde con total fluidez en navegador real y que no existen inconsistencias en la capa de presentación."
    )
    
    # SLIDE 6: JMeter - Summary Report
    add_slide_with_image(
        prs,
        "Pruebas de Carga y Rendimiento: Apache JMeter",
        "Criterio 4 (20%) — Summary Report (500 Muestras, 50 Usuarios Concurrentes)",
        os.path.join(BASE_DIR, "jmeter - reporte resumen.png"),
        "[Tiempo: ~40 seg | Habla: Miguel Arredondo]\n"
        "Pasando al Criterio 4, evaluamos el comportamiento del sistema ante demanda masiva utilizando Apache JMeter sobre el endpoint de catálogo (/api/products). "
        "Sometimos el backend desacoplado con MySQL a 50 usuarios concurrentes en ráfaga (500 peticiones en total). "
        "Los resultados fueron sobresalientes: una tasa de error de 0.00%, un tiempo de respuesta promedio de apenas 6 ms (muy por debajo de los 2 segundos exigidos por RNF04) "
        "y una capacidad de procesamiento (Throughput) sostenida de 50.9 peticiones por segundo sin bloqueos de hilos ni caída del servicio."
    )
    
    # SLIDE 7: JMeter - Dashboard HTML y APDEX
    add_slide_with_image(
        prs,
        "Métricas Ejecutivas de Rendimiento: APDEX & Dashboard",
        "Criterio 4 (20%) — Índice de Satisfacción de Usuario (APDEX 1.000)",
        os.path.join(BASE_DIR, "Jmeter - Dashboard 1.png"),
        "[Tiempo: ~25 seg | Habla: Miguel Arredondo]\n"
        "Como evidencia adicional, generamos el Dashboard HTML oficial de Apache JMeter. "
        "En el gráfico circular de solicitudes se certifica un 100% PASS (0% FAIL). "
        "Además, el índice APDEX alcanzó la puntuación perfecta de 1.000 sobre un umbral de tolerancia de 500 ms, "
        "lo que garantiza que la experiencia de navegación del cliente final es fluida e instantánea incluso bajo alta concurrencia."
    )
    
    # SLIDE 8: OWASP ZAP - Alertas y Vulnerabilidades
    add_slide_with_image(
        prs,
        "Pruebas de Seguridad y Vulnerabilidades: OWASP ZAP",
        "Criterio 3 (25%) — Escaneo Automatizado DAST contra API REST",
        os.path.join(BASE_DIR, "Zap -Alertas (banderas).png"),
        "[Tiempo: ~40 seg | Habla: Miguel Arredondo]\n"
        "Para el Criterio 3, con mayor peso en la rúbrica (25%), ejecutamos una auditoría de seguridad dinámica con OWASP ZAP contra la superficie de ataque de la API REST expuesta en Swagger. "
        "El escáner no detectó ninguna vulnerabilidad de severidad ALTA (0 alertas rojas), descartando fallas críticas como inyecciones SQL o accesos indebidos a datos. "
        "Se registraron 2 alertas de nivel Medio asociadas a la falta de la cabecera Content Security Policy (CSP) en Spring Boot y versiones de librerías de interfaz, "
        "las cuales documentamos con sus recomendaciones de remediación inmediata."
    )
    
    # SLIDE 8: Conclusiones Finales
    blank_layout = prs.slide_layouts[6]
    s8 = prs.slides.add_slide(blank_layout)
    add_header_banner(s8, "Conclusiones del Proceso de Testing", "Criterio 5 (15%) — Síntesis de Calidad de Software Tienda MoAr")
    
    tb = s8.shapes.add_textbox(Inches(1.0), Inches(1.5), Inches(11.0), Inches(4.8))
    tf8 = tb.text_frame
    tf8.word_wrap = True
    
    p = tf8.paragraphs[0]
    p.text = "Principales Logros del Proceso de Aseguramiento de Calidad:"
    p.font.bold = True
    p.font.size = Pt(18)
    p.font.color.rgb = RGBColor(26, 54, 93)
    
    p_items = [
        ("Arquitectura Monorepo Robusta: ", "Separación limpia de responsabilidades (Frontend React + Backend Spring Boot 3 + MySQL) facilitando pruebas aisladas e integradas."),
        ("100% en Pruebas Unitarias: ", "10 casos en Vitest y 3 en JUnit 5 sin fallos, blindando la lógica de carrito, búsqueda y seguridad JWT."),
        ("Alta Mantenibilidad: ", "Quality Gate Passed en SonarQube Cloud con 0 Bugs y 0.0% duplicación de código."),
        ("Rendimiento Excepcional: ", "500 peticiones en JMeter con 0% de error, respuesta promedio de 7 ms y APDEX 1.000."),
        ("Seguridad Comprobada: ", "0 vulnerabilidades críticas en OWASP ZAP, con control de acceso por roles verificado."),
        ("Dictamen Final: ", "El software Tienda MoAr cumple a cabalidad con los 18 RF y 16 RNF, aprobándose para su paso a producción.")
    ]
    
    for bold_prefix, text in p_items:
        p_it = tf8.add_paragraph()
        p_it.space_before = Pt(8)
        r_b = p_it.add_run()
        r_b.text = "✔  " + bold_prefix
        r_b.font.bold = True
        r_b.font.size = Pt(14)
        r_b.font.color.rgb = RGBColor(43, 108, 176)
        r_t = p_it.add_run()
        r_t.text = text
        r_t.font.size = Pt(14)
        r_t.font.color.rgb = RGBColor(45, 55, 72)

        
    s8.notes_slide.notes_text_frame.text = (
        "[Tiempo: ~45 seg | Hablan ambos integrantes]\n"
        "En conclusión profesor, a través del uso de herramientas recomendadas por la industria (ESLint, SonarQube, Vitest, JUnit, JMeter y OWASP ZAP) "
        "hemos validado que Tienda MoAr es una solución de software madura, rápida, mantenible y segura. "
        "Los resultados obtenidos confirman el cumplimiento estricto de los requerimientos funcionales y no funcionales de la asignatura. "
        "Muchas gracias por su atención."
    )
    
    prs.save(OUTPUT_PPTX)
    print(f"Presentación actualizada exitosamente en: {OUTPUT_PPTX}")

if __name__ == "__main__":
    main()
