import { describe, it, expect, beforeEach } from 'vitest'

// Simulación de lógica de control de stock y persistencia en carrito (CP42, CP43)
interface CartItem {
  id: number
  nombre: string
  precio: number
  cantidad: number
  stockDisponible: number
}

class ShoppingCartManager {
  private items: CartItem[] = []

  addItem(producto: { id: number; nombre: string; precio: number; stock: number }, cantidadSolicitada: number): { exitoso: boolean; mensaje: string } {
    if (cantidadSolicitada <= 0) {
      return { exitoso: false, mensaje: 'La cantidad debe ser mayor a 0' }
    }

    const itemExistente = this.items.find(i => i.id === producto.id)
    const cantidadActual = itemExistente ? itemExistente.cantidad : 0
    const nuevaCantidad = cantidadActual + cantidadSolicitada

    // CP42: Validación de contención de stock
    if (nuevaCantidad > producto.stock) {
      const maximoPermitido = producto.stock - cantidadActual
      if (itemExistente && maximoPermitido > 0) {
        itemExistente.cantidad = producto.stock
      }
      return { 
        exitoso: false, 
        mensaje: `Has alcanzado el límite de unidades disponibles para este producto (Stock máximo: ${producto.stock})` 
      }
    }

    if (itemExistente) {
      itemExistente.cantidad = nuevaCantidad
    } else {
      this.items.push({
        id: producto.id,
        nombre: producto.nombre,
        precio: producto.precio,
        cantidad: cantidadSolicitada,
        stockDisponible: producto.stock
      })
    }

    return { exitoso: true, mensaje: 'Producto agregado al carrito con éxito' }
  }

  getItems(): CartItem[] {
    return [...this.items]
  }

  // CP43: Serialización y persistencia (LocalStorage Mock)
  exportToStorage(): string {
    return JSON.stringify(this.items)
  }

  restoreFromStorage(storageJson: string): void {
    try {
      this.items = JSON.parse(storageJson) || []
    } catch {
      this.items = []
    }
  }

  clear(): void {
    this.items = []
  }
}

describe('Módulo Avanzado de Carrito: Reglas de Negocio y Persistencia (CP42, CP43)', () => {
  let cart: ShoppingCartManager

  beforeEach(() => {
    cart = new ShoppingCartManager()
  })

  it('CP42-A: Agrega producto sin superar el stock disponible', () => {
    const prod = { id: 1, nombre: 'Samsung S24 Ultra', precio: 1199990, stock: 5 }
    const res = cart.addItem(prod, 3)

    expect(res.exitoso).toBe(true)
    expect(cart.getItems()[0].cantidad).toBe(3)
  })

  it('CP42-B: Rechaza agregar unidades si superan el stock máximo y emite alerta amigable', () => {
    const prod = { id: 1, nombre: 'Samsung S24 Ultra', precio: 1199990, stock: 5 }
    cart.addItem(prod, 4) // Quedan 1 disponible

    const resExceso = cart.addItem(prod, 2) // Intenta sumar 2 más (total 6 > 5)
    expect(resExceso.exitoso).toBe(false)
    expect(resExceso.mensaje).toContain('Has alcanzado el límite de unidades disponibles')
  })

  it('CP43: Persiste el estado del carrito en JSON y lo restaura fielmente tras recarga (F5)', () => {
    const prod1 = { id: 1, nombre: 'iPhone 16 Pro Max', precio: 1499990, stock: 10 }
    const prod2 = { id: 2, nombre: 'Xiaomi Redmi 14C', precio: 179990, stock: 20 }

    cart.addItem(prod1, 1)
    cart.addItem(prod2, 2)

    // Simular almacenamiento en LocalStorage
    const serializedData = cart.exportToStorage()
    expect(serializedData).toBeDefined()

    // Crear nueva instancia de carrito (simulando refresco de página)
    const newCartSession = new ShoppingCartManager()
    newCartSession.restoreFromStorage(serializedData)

    const itemsRestaurados = newCartSession.getItems()
    expect(itemsRestaurados.length).toBe(2)
    expect(itemsRestaurados[0].nombre).toBe('iPhone 16 Pro Max')
    expect(itemsRestaurados[1].cantidad).toBe(2)
  })
})

