// src/utils/cart.ts

export type CartLine = {
  precioUnitario: number
  cantidad: number
}

/**
 * Calcula el subtotal de un carrito.
 * Multiplica precio * cantidad por cada línea y suma.
 */
export function calcularSubtotal(lines: CartLine[]): number {
  return lines.reduce(
    (acc, line) => acc + line.precioUnitario * line.cantidad,
    0
  )
}
