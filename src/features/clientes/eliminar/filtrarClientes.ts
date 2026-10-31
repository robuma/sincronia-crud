import type { Cliente } from '../types'

export function filtrarClientesPorNombre(clientes: Cliente[], query: string): Cliente[] {
  const normalizedQuery = query.trim().toLocaleLowerCase('es')

  if (!normalizedQuery) {
    return clientes
  }

  return clientes.filter((cliente) => cliente.nombre.toLocaleLowerCase('es').includes(normalizedQuery))
}
