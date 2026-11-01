import assert from 'node:assert/strict'
import test from 'node:test'
import { errorAlCrearCliente, prepararCliente } from '../src/features/clientes/crear/validarCliente.ts'

const cliente = { nombre: 'Cliente de prueba', correo: 'demo@example.com', telefono: '+506 0000-0000' }

test('rechaza todos los campos vacíos y los espacios sin contenido', () => {
  const { errores } = prepararCliente({ nombre: '  ', correo: '', telefono: '\t' })
  assert.deepEqual(Object.keys(errores).sort(), ['correo', 'nombre', 'telefono'])
})

test('normaliza datos y excluye identificadores y propiedades ajenas del payload', () => {
  const entrada = { id: 'no-enviar', nombre: '  Demo ficticia  ', correo: ' DEMO@Example.COM ', telefono: ' +506 0000-0000 ' }
  assert.deepEqual(prepararCliente(entrada), {
    datos: { nombre: 'Demo ficticia', correo: 'demo@example.com', telefono: '+506 0000-0000' }, errores: {},
  })
})

test('rechaza correos incompletos, con espacios, varios arrobas o caracteres ajenos al formato', () => {
  for (const correo of ['demo', 'demo@', '@example.com', 'demo@example', 'demo @example.com', 'demo@@example.com', 'demo,<x>@example.com', 'demo@-example.com', '.demo@example.com', 'demo..uno@example.com']) {
    assert.ok(prepararCliente({ ...cliente, correo }).errores.correo, correo)
  }
})

test('acepta correo con subdominio, etiquetas y apóstrofe', () => {
  assert.deepEqual(prepararCliente({ ...cliente, correo: "o'connor+demo@clientes.example.com" }).errores, {})
})

test('aplica los límites de la BD después de recortar espacios', () => {
  const alLimite = { nombre: 'a'.repeat(120), correo: `${'a'.repeat(64)}@${'b'.repeat(63)}.${'c'.repeat(63)}.${'d'.repeat(61)}`, telefono: '0'.repeat(40) }
  assert.equal(alLimite.correo.length, 254)
  assert.deepEqual(prepararCliente(alLimite).errores, {})
  for (const campo of ['nombre', 'correo', 'telefono'] as const) {
    assert.ok(prepararCliente({ ...alLimite, [campo]: `${alLimite[campo]}a` }).errores[campo], campo)
  }
  assert.deepEqual(prepararCliente({ ...cliente, nombre: `  ${'a'.repeat(120)}  ` }).errores, {})
})

test('cuenta caracteres Unicode como PostgreSQL sin rechazar nombres válidos', () => {
  assert.deepEqual(prepararCliente({ ...cliente, nombre: '𠮷'.repeat(120) }).errores, {})
  assert.ok(prepararCliente({ ...cliente, nombre: '𠮷'.repeat(121) }).errores.nombre)
})

test('identifica el correo duplicado por el código de PostgreSQL sin filtrar detalles internos', () => {
  const resultado = errorAlCrearCliente({ code: '23505', message: 'private database details' })
  assert.equal(resultado.campo, 'correo')
  assert.match(resultado.mensaje, /correo.*registrado/i)
  assert.doesNotMatch(resultado.mensaje, /private/)
})

test('un fallo desconocido o de red conserva la incertidumbre y permite revisar antes de reintentar', () => {
  for (const error of [new TypeError('Failed to fetch'), { message: 'internal secret', code: '42501' }, null]) {
    const resultado = errorAlCrearCliente(error)
    assert.equal(resultado.campo, undefined)
    assert.match(resultado.mensaje, /confirmar.*guardado/i)
    assert.match(resultado.mensaje, /listado/i)
    assert.doesNotMatch(resultado.mensaje, /secret|Failed to fetch/)
  }
})
