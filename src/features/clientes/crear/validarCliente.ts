import type { DatosCliente } from '../types'

export type ErroresCliente = Partial<Record<keyof DatosCliente, string>>
export type ErrorAlCrear = { mensaje: string; campo?: keyof DatosCliente }

// Correo de uso habitual: admite etiquetas y subdominios, sin puntos vacíos.
const FORMATO_CORREO = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)+$/i

export function prepararCliente(valores: DatosCliente): { datos: DatosCliente; errores: ErroresCliente } {
  const datos: DatosCliente = {
    nombre: valores.nombre.trim(),
    correo: valores.correo.trim().toLowerCase(),
    telefono: valores.telefono.trim(),
  }
  const errores: ErroresCliente = {}
  const campos = [
    { campo: 'nombre', etiqueta: 'el nombre', limite: 120 },
    { campo: 'correo', etiqueta: 'el correo electrónico', limite: 254 },
    { campo: 'telefono', etiqueta: 'el teléfono', limite: 40 },
  ] as const

  for (const { campo, etiqueta, limite } of campos) {
    if (!datos[campo]) errores[campo] = `Ingresá ${etiqueta}.`
    else if (Array.from(datos[campo]).length > limite) errores[campo] = `Usá un máximo de ${limite} caracteres.`
  }
  if (!errores.correo && !FORMATO_CORREO.test(datos.correo)) {
    errores.correo = 'Ingresá un correo válido, por ejemplo nombre@example.com.'
  }
  return { datos, errores }
}

export function errorAlCrearCliente(error: unknown): ErrorAlCrear {
  if (typeof error === 'object' && error !== null && 'code' in error && error.code === '23505') {
    return { campo: 'correo', mensaje: 'Este correo ya está registrado. Ingresá uno diferente.' }
  }
  return { mensaje: 'No se pudo confirmar el guardado. Revisá el listado antes de volver a intentarlo; tus datos siguen en el formulario.' }
}
