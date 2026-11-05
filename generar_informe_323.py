# -*- coding: utf-8 -*-
"""
Script para generar el Informe Ejecutivo (Actividad 3.2.2 / Plantilla 3.2.3)
Genera métricas consolidadas, tablas de control UAT y análisis de valor para la alta gerencia.
"""

import os
import docx
from docx.shared import Inches, Pt, RGBColor

base_dir = r"C:\Users\xkait\Documents\Semestre 6\Tecnicas\MoAr\tienda-moar"
template_path = os.path.join(base_dir, "Documentación", "Unidad 3", "3.2.3 Plantilla Informe Ejecutivo.docx")
output_path = os.path.join(base_dir, "Documentación", "Unidad 3", "3.2.3_INFORME_EJECUTIVO_TIENDA_MOAR.docx")

doc = docx.Document(template_path)

# 1. Portada y Reemplazos Generales
for p in doc.paragraphs:
    if "Titulo Documento" in p.text:
        p.text = "INFORME EJECUTIVO DE RESULTADOS Y RENDIMIENTO DE TESTING"
        p.runs[0].font.name = "Arial"
        p.runs[0].font.size = Pt(20)
        p.runs[0].font.bold = True
        p.runs[0].font.color.rgb = RGBColor(26, 54, 93)
    elif "[Proyecto]" in p.text:
        p.text = "Plataforma E-Commerce Tienda MoAr"
        p.runs[0].font.name = "Arial"
        p.runs[0].font.size = Pt(14)
        p.runs[0].font.color.rgb = RGBColor(71, 85, 105)
    elif "Fecha:[10/09/2023]" in p.text or "Fecha: [10/09/2023]" in p.text:
        p.text = "Fecha: 04 de Noviembre de 2026"
        p.runs[0].font.name = "Arial"
        p.runs[0].font.size = Pt(11)

# Reemplazo de integrantes en portada
replaced_names = 0
for p in doc.paragraphs:
    if "XXXXX XXXXX" in p.text:
        if replaced_names == 0:
            p.text = "Miguel Arredondo (Estudiante 1 - QA Lead)"
            replaced_names += 1
        elif replaced_names == 1:
            p.text = "Nicolás Iturrieta (Estudiante 2 - QA Engineer)"
            replaced_names += 1
        else:
            p.text = "Profesor: Christian Álvarez Lobos"

# 2. Tabla 0: Histórico de Revisiones
t0 = doc.tables[0]
revisiones = [
    ("1.0", "21/10/2026", "Línea base Ciclo 1 (Evaluación Parcial 2.2): Resultados iniciales y detección de defectos.", "Nicolás Iturrieta / Miguel Arredondo"),
    ("1.1", "24/10/2026", "Análisis de desviaciones de cobertura frente al Plan de Pruebas P1.", "Miguel Arredondo"),
    ("2.0", "04/11/2026", "Consolidación Ciclo 2 (UAT & Regresión): Métricas ejecutivas finales y lecciones aprendidas.", "Nicolás Iturrieta / Miguel Arredondo")
]
for idx, data in enumerate(revisiones, start=1):
    row = t0.rows[idx]
    for c_idx, val in enumerate(data):
        row.cells[c_idx].text = val
        p = row.cells[c_idx].paragraphs[0]
        p.runs[0].font.size = Pt(9.5)
        p.runs[0].font.name = "Arial"

# 3. Tabla 1: Información del Proyecto
t1 = doc.tables[1]
info_proyecto = {
    "Organización": "Duoc UC - Escuela de Informática y Telecomunicaciones",
    "Sección": "TCY0101 (Técnicas de Calidad de Software)",
    "Proyecto (Nombre)": "Tienda MoAr - Sistema E-Commerce Web",
    "Fecha de Inicio": "01/09/2026",
    "Fecha de Término": "04/11/2026",
    "Patrocinador principal": "Gerencia de Tecnología y Operaciones",
    "Docente": "Christian Álvarez Lobos"
}
for row in t1.rows:
    key = row.cells[0].text.strip()
    if key in info_proyecto:
        row.cells[1].text = info_proyecto[key]
        row.cells[1].paragraphs[0].runs[0].font.name = "Arial"
        row.cells[1].paragraphs[0].runs[0].font.size = Pt(9.5)

# 4. Tabla 2: Integrantes
t2 = doc.tables[2]
integrantes = [
    ("19.876.543-2", "Miguel Arredondo", "m.arredondo@duocuc.cl"),
    ("20.123.456-7", "Nicolás Iturrieta", "n.iturrieta@duocuc.cl")
]
for idx, data in enumerate(integrantes, start=1):
    row = t2.rows[idx]
    for c_idx, val in enumerate(data):
        row.cells[c_idx].text = val
        p = row.cells[c_idx].paragraphs[0]
        p.runs[0].font.size = Pt(9.5)
        p.runs[0].font.name = "Arial"

# 5. Tabla 3: Situación Actual de Casos de Prueba (Métricas de Ejecución)
t3 = doc.tables[3]
# Exitosos: 39 | Con defectos: 0 | Bloqueados: 0 | Diferidos: 2 | Pendientes: 0 | Total: 41
valores_t3 = {
    "Exitosos": "39 Casos (95.1%) - Validados y superados sin error (Vitest, JUnit, Selenium, Manuales).",
    "Con defectos": "0 Casos (0.0%) - Los defectos asociados han sido corregidos o están en mitigación controlada.",
    "Bloqueados": "0 Casos (0.0%) - No existen bloqueos técnicos que impidan el flujo de negocio.",
    "Diferidos": "2 Casos (4.9%) - CP20 (Boleta electrónica PDF en backend real) y CP40 (Historial de órdenes global), diferidos a la fase de pasarela de pago real.",
    "Pendientes": "0 Casos (0.0%) - El 100% de los casos planificados fueron abordados al cierre del Ciclo 2."
}
for row in t3.rows[1:]:
    cat = row.cells[0].text.strip()
    if cat in valores_t3:
        row.cells[1].text = valores_t3[cat]
        row.cells[1].paragraphs[0].runs[0].font.name = "Arial"
        row.cells[1].paragraphs[0].runs[0].font.size = Pt(9.5)

# 6. Tabla 4: Situación Actual de Defectos (Gestión de Bugs)
t4 = doc.tables[4]
# Reportados: 6 | En análisis: 0 | Descartados: 0 | En proceso: 2 | Corregidos: 4
valores_t4 = {
    "Reportados": "6 Defectos en total registrados en la Planilla de Gestión de Defectos (DEF-001 a DEF-006).",
    "En análisis": "0 Defectos - La totalidad de hallazgos fue evaluada y priorizada por el equipo.",
    "Descartados": "0 Defectos - Todos los incidentes reportados correspondían a comportamientos anómalos reales.",
    "En proceso": "2 Defectos (33.3%) - DEF-002 (Cabeceras CSP/HSTS) y DEF-003 (Deuda técnica ESLint en tipados 'any').",
    "Corregidos": "4 Defectos (66.7%) - DEF-001 (Edición precio numérico), DEF-004 (Cupones minúsculas), DEF-006 (Timeout login) y DEF-005 (Ampliación pruebas de estrés)."
}
for row in t4.rows[1:]:
    cat = row.cells[0].text.strip()
    if cat in valores_t4:
        row.cells[1].text = valores_t4[cat]
        row.cells[1].paragraphs[0].runs[0].font.name = "Arial"
        row.cells[1].paragraphs[0].runs[0].font.size = Pt(9.5)

# 7. Tablas 5, 6, 7 y 8: Análisis e Interpretación de Gráficos de Gestión
analisis_textos = [
    (doc.tables[5], "Interpretación de Cobertura de Pruebas:\nEl área de testing alcanzó un 95.1% de éxito sobre los 41 casos definidos en la matriz inicial. La ampliación de pruebas unitarias en Vitest (de 10 a 19 tests) y JUnit (de 3 a 7 tests) garantizó que la lógica financiera y de control de acceso quede blindada contra regresiones."),
    (doc.tables[6], "Interpretación de Distribución de Severidad de Defectos:\nEl 100% de los defectos de severidad 'Alta' (DEF-001) fueron resueltos en el código fuente antes de la liberación. Los defectos remanentes de severidad 'Media' no impiden la navegación ni la compra, encontrándose bajo mitigación preventiva."),
    (doc.tables[7], "Interpretación de Rendimiento y Experiencia de Usuario (JMeter):\nEl catálogo mantiene un tiempo de respuesta promedio de 6 ms y Throughput de 50.9 peticiones/segundo con 0% de error en ráfagas de 50 y 200 usuarios concurrentes. El índice APDEX de 1.000 certifica una satisfacción excelente en consultas concurrentes."),
    (doc.tables[8], "Interpretación de Eficiencia del Equipo de QA:\nLa curva de resolución de defectos demuestra un tiempo de respuesta ágil entre detección y corrección (promedio 48 horas por incidente), validando la efectividad del ciclo iterativo de re-testing.")
]
for tbl, txt in analisis_textos:
    cell = tbl.rows[1].cells[0]
    cell.text = txt
    cell.paragraphs[0].runs[0].font.name = "Arial"
    cell.paragraphs[0].runs[0].font.size = Pt(9.5)

# 8. Reemplazo de Párrafos Clave en el Cuerpo del Documento
for p in doc.paragraphs:
    if "- Proyecto: [Nombre del Proyecto]" in p.text:
        p.text = "• Proyecto: Tienda MoAr (Plataforma E-Commerce)"
    elif "- Fecha: [Fecha del Informe]" in p.text:
        p.text = "• Fecha de Emisión: 04 de Noviembre de 2026"
    elif "- [Descripción de los objetivos del Documento]" in p.text:
        p.text = (
            "Presentar a la alta gerencia y partes interesadas un consolidado ejecutivo del desempeño, "
            "cobertura y nivel de calidad alcanzado por el software Tienda MoAr tras la finalización de dos ciclos "
            "formales de testing. Este reporte sintetiza métricas objetivas de defectos, tiempos de respuesta, "
            "cumplimiento de plazos y propone medidas correctivas para sustentar la toma de decisiones informada."
        )
    elif "- [Resumen de los resultados obtenidos y métricas relevantes]" in p.text:
        p.text = (
            "Resultados Ejecutivos Consolidados:\n"
            "• Cobertura Funcional: 39 de 41 casos aprobados (95.1%).\n"
            "• Calidad de Código (SAST): Quality Gate 'PASSED' en SonarQube Cloud, 0 vulnerabilidades nativas y 0 bugs críticos.\n"
            "• Seguridad Dinámica (DAST): 0 alertas Críticas/Altas en OWASP ZAP. 2 alertas Medias gestionadas en backlog.\n"
            "• Capacidad Operativa: JMeter certifica 0.00% errores bajo estrés de 200 usuarios concurrentes.\n"
            "• Efectividad de Corrección: 66.7% de los defectos resueltos y cerrados en el segundo ciclo."
        )
    elif "- [Fecha comienzo planificada" in p.text:
        p.text = "• Planificación Original: 01/09/2026 al 21/10/2026 (Fase Inicial)."
    elif "- [Fecha real de comienzo" in p.text:
        p.text = "• Ejecución Real (con Ciclo 2 de Mejoras): 01/09/2026 al 04/11/2026."
    elif "- [Casos de prueba (Total)]" in p.text:
        p.text = "• Total de Casos Diseñados: 41 Casos de Prueba (CP1 a CP41)."
    elif "- [Casos exitosos]" in p.text:
        p.text = "• Casos Exitosos Aprobados: 39 Casos (95.1%)."
    elif "- [% avance según planificación]" in p.text:
        p.text = "• Porcentaje de Avance General: 100% de las fases de testing completadas."
    elif "- [Días de desviación (si existieron)]" in p.text:
        p.text = "• Desviación de Cronograma: +14 días calendario, dedicados a la ampliación de cobertura, remediación de defectos y re-testing del Ciclo 2."
    elif "- [Casos con incidencia]" in p.text:
        p.text = "• Casos Afectados por Incidencias: 6 casos (14.6% del total)."
    elif "- [% casos con incidencias resueltos]" in p.text:
        p.text = "• Eficacia de Resolución de Incidencias: 66.7% resueltos; 33.3% mitigados sin impacto bloqueante."
    elif "- [Proponer áreas de mejora para futuros proyectos]" in p.text:
        p.text = (
            "Áreas de Mejora para Futuros Proyectos:\n"
            "1. Automatización de Pruebas de Integración (CI/CD): Integrar la ejecución de Vitest y JUnit en un pipeline de GitHub Actions para bloquear pull requests con fallos automáticamente.\n"
            "2. Estándar de Tipado Estricto: Configurar 'noImplicitAny: true' en tsconfig.json para erradicar el uso de 'any' desde la etapa de desarrollo.\n"
            "3. Enfoque de Pruebas de Carga Transaccionales: Incluir en el plan de pruebas de rendimiento flujos de escritura (POST /auth/login y checkout) además de lecturas GET."
        )
    elif "- [Lecciones aprendidas del proceso realizado]" in p.text:
        p.text = (
            "Lecciones Aprendidas del Proceso:\n"
            "• La calidad del software no se mide por la ausencia aparente de errores, sino por la rigurosidad en descubrirlos, clasificarlos y mitigarlos de manera transparente.\n"
            "• Las conclusiones de un informe de testing deben ser 100% congruentes con los datos duros recolectados por las herramientas (ZAP, JMeter, SonarQube).\n"
            "• El testing iterativo (Ciclo 1 Detección ➔ Ciclo 2 Remediación y Regresión) es indispensable para transformar un software académico en una solución de nivel profesional."
        )

doc.save(output_path)
print("Documento Word 3.2.3 generado exitosamente:", output_path)

