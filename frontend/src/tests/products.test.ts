import { describe, it, expect } from 'vitest'
import { getProductById, searchProducts } from '../assets/products'

describe('Catálogo de Productos - Búsqueda y Filtros (RF11 / RF12)', () => {
  it('CP-PROD-01: Obtiene producto existente por su ID', () => {
    const prod = getProductById(1)
    expect(prod).toBeDefined()
    expect(prod?.nombre).toContain('iPhone 13 Pro')
    expect(prod?.brand).toBe('Apple')
  })

  it('CP-PROD-02: Devuelve undefined al buscar un ID inexistente', () => {
    const prod = getProductById(9999)
    expect(prod).toBeUndefined()
  })

  it('CP-PROD-03: Filtra productos correctamente por texto de búsqueda', () => {
    const resultados = searchProducts('Ultra')
    expect(resultados.length).toBeGreaterThan(0)
    expect(resultados.every(p => p.nombre.toLowerCase().includes('ultra'))).toBe(true)
  })

  it('CP-PROD-04: Filtra productos correctamente por marca (Brand)', () => {
    const resultados = searchProducts('', 'Samsung')
    expect(resultados.length).toBe(3)
    expect(resultados.every(p => p.brand === 'Samsung')).toBe(true)
  })

  it('CP-PROD-05: Filtra combinando término de búsqueda y marca', () => {
    const resultados = searchProducts('Pro', 'Apple')
    expect(resultados.length).toBe(2) // iPhone 13 Pro y iPhone 16 Pro Max
    expect(resultados.every(p => p.brand === 'Apple' && p.nombre.includes('Pro'))).toBe(true)
  })

  it('CP-PROD-06: Devuelve lista vacía cuando no hay coincidencias', () => {
    const resultados = searchProducts('MarcaInexistenteXYZ')
    expect(resultados).toEqual([])
  })
})
