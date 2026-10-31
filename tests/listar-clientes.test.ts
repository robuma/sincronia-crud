import test from 'node:test'
import assert from 'node:assert/strict'

import { paginateClientes } from '../src/features/clientes/consultar/paginarClientes.ts'

test('paginación calcula la página correcta para más de 10 clientes', () => {
  const clientes = Array.from({ length: 25 }, (_, index) => ({
    id: `cliente-${index}`,
    nombre: `Cliente ${index + 1}`,
    correo: `cliente${index + 1}@example.com`,
    telefono: `+506 0000 000${index}`,
  }))

  const resultado = paginateClientes(clientes, 10, 2)

  assert.equal(resultado.totalPages, 3)
  assert.equal(resultado.page, 2)
  assert.equal(resultado.items.length, 10)
  assert.equal(resultado.items[0].nombre, 'Cliente 11')
  assert.equal(resultado.items.at(-1)?.nombre, 'Cliente 20')
})

test('paginación devuelve la primera página con menos de 10 clientes', () => {
  const clientes = Array.from({ length: 7 }, (_, index) => ({
    id: `cliente-${index}`,
    nombre: `Cliente ${index + 1}`,
    correo: `cliente${index + 1}@example.com`,
    telefono: `+506 0000 000${index}`,
  }))

  const resultado = paginateClientes(clientes, 10, 1)

  assert.equal(resultado.totalPages, 1)
  assert.equal(resultado.page, 1)
  assert.equal(resultado.items.length, 7)
})
