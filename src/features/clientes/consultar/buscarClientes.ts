import type { Cliente } from '../types'

function normalizar(texto: string) {
  return texto.trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('es')
}

export function buscarClientes(clientes: Cliente[], consulta: string): Cliente[] {
  const termino = normalizar(consulta)
  if ([...termino].length < 3) return clientes
  const telefono = /^[+\d\s().-]+$/.test(termino) ? termino.replace(/\D/g, '') : ''
  return clientes.filter(cliente =>
    [cliente.nombre, cliente.correo, cliente.telefono].some(valor => normalizar(valor).includes(termino)) ||
    (telefono.length >= 3 && cliente.telefono.replace(/\D/g, '').includes(telefono)),
  )
}

type LoteClientes = { data: Cliente[] | null; count: number | null; error: unknown }

// La API puede limitar cada respuesta. No confundir el primer lote con toda la colección.
export async function cargarTodosLosClientes(leer: (desde: number, hasta: number) => PromiseLike<LoteClientes>) {
  const clientes: Cliente[] = []
  let total: number
  do {
    const lote = await leer(clientes.length, clientes.length + 499)
    if (lote.error) throw lote.error
    if (lote.count === null || !lote.data) throw new Error('No se pudo confirmar el listado completo.')
    total = lote.count
    if (!lote.data.length && clientes.length < total) throw new Error('El listado está incompleto. Volvé a cargarlo.')
    clientes.push(...lote.data)
  } while (clientes.length < total)
  return [...new Map(clientes.map(cliente => [cliente.id, cliente])).values()]
}
