import { describe, it, expect } from 'vitest'

// Lógica de cálculo y normalización de cupones (CP36, CP37, DEF-004)
interface Cupon {
  codigo: string
  porcentaje: number
  activo: boolean
}

const CUPONES_SISTEMA: Cupon[] = [
  { codigo: 'CUPON25', porcentaje: 25, activo: true },
  { codigo: 'CUPON50', porcentaje: 50, activo: true },
  { codigo: 'EXPIRADO10', porcentaje: 10, activo: false }
]

function aplicarCupon(codigoIngresado: string, montoSubtotal: number): { exitoso: boolean; descuento: number; total: number; mensaje: string } {
  if (!codigoIngresado || !codigoIngresado.trim()) {
    return { exitoso: false, descuento: 0, total: montoSubtotal, mensaje: 'Debe ingresar un código de cupón' }
  }

  // Corrección implementada para DEF-004: Normalización a mayúsculas
  const normalizado = codigoIngresado.trim().toUpperCase()
  const cuponEncontrado = CUPONES_SISTEMA.find(c => c.codigo === normalizado)

  if (!cuponEncontrado) {
    return { exitoso: false, descuento: 0, total: montoSubtotal, mensaje: 'Cupón inexistente o no válido' }
  }

  if (!cuponEncontrado.activo) {
    return { exitoso: false, descuento: 0, total: montoSubtotal, mensaje: 'El cupón ha expirado' }
  }

  const descuento = Math.round(montoSubtotal * (cuponEncontrado.porcentaje / 100))
  const total = Math.max(0, montoSubtotal - descuento)

  return { exitoso: true, descuento, total, mensaje: `Cupón ${normalizado} aplicado con éxito (-${cuponEncontrado.porcentaje}%)` }
}

describe('Módulo de Cupones y Descuentos (CP36, CP37 - RF14 / DEF-004)', () => {
  it('CP36-A: Aplica correctamente CUPON25 (25% descuento)', () => {
    const res = aplicarCupon('CUPON25', 100000)
    expect(res.exitoso).toBe(true)
    expect(res.descuento).toBe(25000)
    expect(res.total).toBe(75000)
  })

  it('CP36-B: DEF-004 Corregido - Acepta cupón válido ingresado en minúsculas (cupon50)', () => {
    const res = aplicarCupon('cupon50', 200000)
    expect(res.exitoso).toBe(true)
    expect(res.descuento).toBe(100000)
    expect(res.total).toBe(100000)
  })

  it('CP37-A: Rechaza cupón expirado (EXPIRADO10)', () => {
    const res = aplicarCupon('EXPIRADO10', 50000)
    expect(res.exitoso).toBe(false)
    expect(res.descuento).toBe(0)
    expect(res.total).toBe(50000)
    expect(res.mensaje).toBe('El cupón ha expirado')
  })

  it('CP37-B: Rechaza cupón ficticio o inexistente', () => {
    const res = aplicarCupon('DESCUENTOFALSO99', 50000)
    expect(res.exitoso).toBe(false)
    expect(res.mensaje).toBe('Cupón inexistente o no válido')
  })
})

