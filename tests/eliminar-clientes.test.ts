import test from 'node:test'
import assert from 'node:assert/strict'

import { filtrarClientesPorNombre } from '../src/features/clientes/eliminar/filtrarClientes.ts'

const clientes = [
  { id: '1', nombre: 'María Solís', correo: 'maria@example.com', telefono: '111' },
  { id: '2', nombre: 'Roberto Mora', correo: 'roberto@example.com', telefono: '222' },
]

test('filtra nombres sin distinguir mayúsculas y espacios exteriores', () => {
  const resultado = filtrarClientesPorNombre(clientes, '  MARÍA ')

  assert.deepEqual(resultado.map((cliente) => cliente.id), ['1'])
})

test('devuelve todos los clientes cuando la búsqueda está vacía', () => {
  assert.deepEqual(filtrarClientesPorNombre(clientes, '  '), clientes)
})
