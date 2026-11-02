import test from 'node:test'
import assert from 'node:assert/strict'
import { buscarClientes, cargarTodosLosClientes } from '../src/features/clientes/consultar/buscarClientes.ts'
import { paginateClientes } from '../src/features/clientes/consultar/paginarClientes.ts'

const clientes = [
  { id: '1', nombre: 'María Solís', correo: 'maria@example.com', telefono: '+506 1234-5678' },
  { id: '2', nombre: 'Bruno Vega', correo: 'bruno@example.com', telefono: '8888-0000' },
  { id: '3', nombre: 'Cliente %_ especial', correo: 'a+b@example.com', telefono: '0000-0000' },
]

test('menos de tres caracteres o espacios no filtran', () => {
  for (const query of ['', '  ', 'ma', ' ma ']) assert.deepEqual(buscarClientes(clientes, query), clientes)
})
test('busca nombre sin mayúsculas ni tildes, correo y teléfono sin separadores', () => {
  for (const query of [' MARIA ', 'sol', 'MARIA@', '12345678']) assert.deepEqual(buscarClientes(clientes, query).map(c => c.id), ['1'])
})
test('trata signos como texto literal y admite resultados vacíos', () => {
  assert.deepEqual(buscarClientes(clientes, '%_ ').map(c => c.id), ['1', '2', '3']) // dos caracteres
  assert.deepEqual(buscarClientes(clientes, '%_ e').map(c => c.id), ['3'])
  assert.deepEqual(buscarClientes(clientes, 'a+b@').map(c => c.id), ['3'])
  assert.deepEqual(buscarClientes(clientes, 'ausente'), [])
})
test('el filtro considera clientes fuera de la página visible', () => {
  const all = Array.from({ length: 30 }, (_, i) => ({ ...clientes[0], id: String(i), nombre: `Registro ${i}`, correo: `demo${i}@example.com` }))
  assert.equal(paginateClientes(buscarClientes(all, 'demo29@'), 10, 1).items[0]?.id, '29')
})
test('carga todos los lotes incluso si la API entrega menos de lo solicitado', async () => {
  const calls: number[] = []
  const result = await cargarTodosLosClientes(async (from) => {
    calls.push(from)
    return { data: clientes.slice(from, from + 1), count: clientes.length, error: null }
  })
  assert.deepEqual(result, clientes)
  assert.deepEqual(calls, [0, 1, 2])
})
test('un fallo parcial no se presenta como colección completa', async () => {
  await assert.rejects(cargarTodosLosClientes(async (from) => from === 0
    ? { data: clientes.slice(0, 1), count: 3, error: null }
    : { data: null, count: null, error: new Error('sin red') }))
})
test('colección vacía y respuesta truncada sin avance', async () => {
  assert.deepEqual(await cargarTodosLosClientes(async () => ({ data: [], count: 0, error: null })), [])
  await assert.rejects(cargarTodosLosClientes(async () => ({ data: [], count: 3, error: null })))
})
