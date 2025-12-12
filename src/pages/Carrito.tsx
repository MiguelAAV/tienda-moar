import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { apiFetch } from '../api'
import { calcularSubtotal } from '../utils/cart'


const fmtCLP = (n: number) =>
  new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
  }).format(n)

// Tipos para la boleta que muestra el front
type BoletaItem = {
  productoNombre: string
  cantidad: number
  precioUnitario: number
  subtotal: number
}

type Boleta = {
  id: number
  fecha: string
  clienteNombre: string
  clienteEmail: string
  items: BoletaItem[]
  total: number
}

export default function Carrito() {
  const { state, add, removeOne, removeLine, clear, subtotal } = useCart()
  const lines = Object.values(state.items)

  const [boleta, setBoleta] = useState<Boleta | null>(null)
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  if (lines.length === 0) {
    return (
      <div className="container py-5">
        <h2 className="mb-3">Tu carrito</h2>
        <p className="text-muted">Aún no has agregado productos.</p>
      </div>
    )
  }

  const handleGenerarBoleta = async () => {
    setLoading(true)
    setErrorMsg(null)
    setBoleta(null)

    // Lo que se envía al backend
    const payload = {
      clienteNombre: 'Cliente Tienda MoAr',
      clienteEmail: '',
      items: lines.map(({ product, qty }: any) => ({
        productId: product.id,
        nombre: product.nombre,
        cantidad: qty,
        precioUnitario: product.precioNum ?? 0,
      })),
    }

    try {
      const data = await apiFetch('/api/orders', {
        method: 'POST',
        body: JSON.stringify(payload),
      })

      const b: Boleta = {
        id: data.id,
        fecha: data.fecha,
        clienteNombre: data.clienteNombre,
        clienteEmail: data.clienteEmail,
        items: data.items,
        total: data.total,
      }

      setBoleta(b)
    } catch (err) {
      console.error(err)
      // Fallback: boleta SOLO visual en el navegador
      const itemsLocal: BoletaItem[] = lines.map(({ product, qty }: any) => ({
        productoNombre: product.nombre,
        cantidad: qty,
        precioUnitario: product.precioNum ?? 0,
        subtotal: (product.precioNum ?? 0) * qty,
      }))
      const totalLocal = itemsLocal.reduce((acc, it) => acc + it.subtotal, 0)

      setBoleta({
        id: Math.floor(Math.random() * 1_000_000),
        fecha: new Date().toISOString(),
        clienteNombre: 'Cliente Tienda MoAr',
        clienteEmail: '',
        items: itemsLocal,
        total: totalLocal,
      })

      setErrorMsg(
        'No se pudo conectar al backend. La boleta mostrada es solo visual (generada en el navegador).'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container py-4">
      <h2 className="mb-3">Tu carrito</h2>

      <div className="table-responsive">
        <table className="table align-middle">
          <thead>
            <tr>
              <th>Producto</th>
              <th className="text-center" style={{ width: 160 }}>
                Cantidad
              </th>
              <th className="text-end">Precio</th>
              <th className="text-end">Subtotal</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {lines.map(({ product, qty }: any) => (
              <tr key={product.id}>
                <td>
                  <div className="d-flex align-items-center gap-3">
                    <img
                      src={product.imagen}
                      alt={product.nombre}
                      style={{
                        width: 64,
                        height: 64,
                        objectFit: 'cover',
                        borderRadius: 8,
                      }}
                    />
                    <div>
                      <div className="fw-semibold">{product.nombre}</div>
                      <div className="text-muted" style={{ fontSize: 12 }}>
                        {product.brand}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="text-center">
                  <div className="btn-group" role="group">
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() => removeOne(product.id)}
                    >
                      -
                    </button>
                    <button className="btn btn-outline-secondary disabled">
                      {qty}
                    </button>
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() => add(product)}
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className="text-end">
                  {fmtCLP(product.precioNum ?? 0)}
                </td>
                <td className="text-end">
                  {fmtCLP((product.precioNum ?? 0) * qty)}
                </td>
                <td className="text-end">
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => removeLine(product.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={2}></td>
              <td className="text-end fw-semibold">Total</td>
              <td className="text-end fw-bold">
  {fmtCLP(
    calcularSubtotal(
      lines.map((l: any) => ({
        precioUnitario: l.product.precioNum ?? 0,
        cantidad: l.qty
      }))
    )
  )}
</td>

              <td className="text-end">
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={clear}
                >
                  Vaciar
                </button>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="d-flex justify-content-end">
        <button
          className="btn btn-primary"
          onClick={handleGenerarBoleta}
          disabled={loading}
        >
          {loading ? 'Generando boleta...' : 'Proceder al pago'}
        </button>
      </div>

      {boleta && (
        <div className="card mt-4">
          <div className="card-header">Boleta #{boleta.id}</div>
          <div className="card-body">
            <p className="mb-1">
              <strong>Fecha:</strong>{' '}
              {new Date(boleta.fecha).toLocaleString('es-CL')}
            </p>
            <p className="mb-3">
              <strong>Cliente:</strong> {boleta.clienteNombre}
            </p>

            <div className="table-responsive">
              <table className="table table-sm">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th className="text-center">Cant.</th>
                    <th className="text-end">Precio</th>
                    <th className="text-end">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {boleta.items.map((it, idx) => (
                    <tr key={idx}>
                      <td>{it.productoNombre}</td>
                      <td className="text-center">{it.cantidad}</td>
                      <td className="text-end">{fmtCLP(it.precioUnitario)}</td>
                      <td className="text-end">{fmtCLP(it.subtotal)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h5 className="text-end mt-3">
              Total: {fmtCLP(boleta.total)}
            </h5>

            {errorMsg && (
              <p className="text-warning small mt-2">{errorMsg}</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
