import { describe, it, expect } from 'vitest'
import { calcularSubtotal } from '../utils/cart'

describe('calcularSubtotal', () => {
  it('devuelve 0 si no hay productos', () => {
    const resultado = calcularSubtotal([])
    expect(resultado).toBe(0)
  })

  it('suma correctamente una sola línea', () => {
    const resultado = calcularSubtotal([
      { precioUnitario: 1000, cantidad: 3 }
    ])
    expect(resultado).toBe(3000)
  })

  it('suma correctamente varias líneas', () => {
    const resultado = calcularSubtotal([
      { precioUnitario: 1000, cantidad: 2 }, // 2000
      { precioUnitario: 500, cantidad: 4 }   // 2000
    ])
    expect(resultado).toBe(4000)
  })

  it('funciona con valores grandes como precios de celulares', () => {
    const resultado = calcularSubtotal([
      { precioUnitario: 1299990, cantidad: 1 },
      { precioUnitario: 299990, cantidad: 2 }
    ])
    // 1.299.990 + 599.980 = 1.899.970
    expect(resultado).toBe(1899970)
  })
})
