import { describe, it, expect } from 'vitest'

// Simulación de lógica de validación de autenticación y roles para Tienda MoAr (CP1, CP2, CP3, CP21)
function validarCredenciales(email: string, pass: string): { valido: boolean; error?: string } {
  if (!email || !email.trim()) return { valido: false, error: 'El email es obligatorio' }
  if (!pass || !pass.trim()) return { valido: false, error: 'La contraseña es obligatoria' }
  if (!email.includes('@') || !email.includes('.')) return { valido: false, error: 'Formato de email inválido' }
  if (pass.length < 6) return { valido: false, error: 'La contraseña debe tener al menos 6 caracteres' }
  return { valido: true }
}

function obtenerRutaPorRol(rol: string): string {
  switch (rol.toUpperCase()) {
    case 'SUPER_ADMIN':
      return '/superadmin'
    case 'ADMIN':
      return '/admin'
    case 'CLIENTE':
      return '/'
    default:
      return '/login'
  }
}

describe('Módulo Autenticación y Control de Acceso (CP1, CP2, CP3, CP21 - RF1, RF2)', () => {
  it('CP1: Credenciales válidas son aceptadas correctamente', () => {
    const res = validarCredenciales('cliente@tiendamoar.cl', 'password123')
    expect(res.valido).toBe(true)
    expect(res.error).toBeUndefined()
  })

  it('CP2-A: Rechaza email vacío o espacios en blanco', () => {
    const res = validarCredenciales('   ', 'password123')
    expect(res.valido).toBe(false)
    expect(res.error).toBe('El email es obligatorio')
  })

  it('CP2-B: Rechaza formato de correo sin arroba o dominio', () => {
    const res = validarCredenciales('clienteinvalido.cl', 'password123')
    expect(res.valido).toBe(false)
    expect(res.error).toBe('Formato de email inválido')
  })

  it('CP2-C: Rechaza contraseña menor a 6 caracteres', () => {
    const res = validarCredenciales('admin@tiendamoar.cl', '123')
    expect(res.valido).toBe(false)
    expect(res.error).toBe('La contraseña debe tener al menos 6 caracteres')
  })

  it('CP3 & CP21: Redirección estricta según rol asignado', () => {
    expect(obtenerRutaPorRol('SUPER_ADMIN')).toBe('/superadmin')
    expect(obtenerRutaPorRol('ADMIN')).toBe('/admin')
    expect(obtenerRutaPorRol('CLIENTE')).toBe('/')
    expect(obtenerRutaPorRol('INVITADO_DESCONOCIDO')).toBe('/login')
  })
})

