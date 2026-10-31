import { useEffect, useMemo, useState } from 'react'

import { getSupabase } from '../../../lib/supabase'
import type { Cliente } from '../types'
import { paginateClientes } from './paginarClientes'

const PAGE_SIZE = 10

export function ListarClientes() {
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)

  useEffect(() => {
    let isMounted = true

    async function fetchClientes() {
      const hasEnvironment = Boolean(
        import.meta.env.VITE_APP_ENV &&
          import.meta.env.VITE_SUPABASE_URL &&
          import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
      )

      if (!hasEnvironment) {
        if (isMounted) {
          setClientes([])
          setError('Falta la configuración de Supabase en .env.local para consultar clientes.')
          setLoading(false)
        }
        return
      }

      try {
        const supabase = getSupabase()
        const { data, error: queryError } = await supabase
          .from('clientes')
          .select('id, nombre, correo, telefono')
          .order('nombre', { ascending: true })

        if (!isMounted) return

        if (queryError) {
          throw queryError
        }

        setClientes(data ?? [])
        setError(null)
      } catch (caughtError) {
        const message = caughtError instanceof Error ? caughtError.message : 'No se pudo cargar la lista de clientes.'
        if (isMounted) {
          setError(message)
          setClientes([])
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    void fetchClientes()

    return () => {
      isMounted = false
    }
  }, [])

  const pagination = useMemo(() => paginateClientes(clientes, PAGE_SIZE, page), [clientes, page])
  const currentPage = pagination.page

  if (loading) {
    return (
      <section className="data-panel" aria-live="polite">
        <header className="panel-header">
          <div>
            <p className="eyebrow">Clientes</p>
            <h2>Listado</h2>
          </div>
        </header>
        <p className="status-message">Cargando clientes…</p>
      </section>
    )
  }

  if (error) {
    return (
      <section className="data-panel" aria-live="assertive">
        <header className="panel-header">
          <div>
            <p className="eyebrow">Clientes</p>
            <h2>Listado</h2>
          </div>
        </header>
        <p className="status-message status-message--error">{error}</p>
      </section>
    )
  }

  if (clientes.length === 0) {
    return (
      <section className="data-panel" aria-live="polite">
        <header className="panel-header">
          <div>
            <p className="eyebrow">Clientes</p>
            <h2>Listado</h2>
          </div>
        </header>
        <div className="empty-state">
          <p>No hay clientes registrados todavía.</p>
        </div>
      </section>
    )
  }

  const canGoPrev = currentPage > 1
  const canGoNext = currentPage < pagination.totalPages

  return (
    <section className="data-panel" aria-labelledby="clientes-listado-titulo">
      <header className="panel-header">
        <div>
          <p className="eyebrow">Clientes</p>
          <h2 id="clientes-listado-titulo">Listado</h2>
        </div>
        <span className="status-label">{clientes.length} registros</span>
      </header>

      <div className="table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Correo electrónico</th>
              <th scope="col">Teléfono</th>
            </tr>
          </thead>
          <tbody>
            {pagination.items.map((cliente) => (
              <tr key={cliente.id}>
                <td>{cliente.nombre}</td>
                <td>{cliente.correo}</td>
                <td>{cliente.telefono}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {pagination.totalPages > 1 && (
        <nav className="pagination" aria-label="Paginación de clientes">
          <button
            type="button"
            className="button button--secondary"
            onClick={() => setPage((current) => Math.max(1, current - 1))}
            disabled={!canGoPrev}
          >
            Anterior
          </button>
          <span aria-live="polite">
            Página {currentPage} de {pagination.totalPages}
          </span>
          <button
            type="button"
            className="button button--secondary"
            onClick={() => setPage((current) => Math.min(pagination.totalPages, current + 1))}
            disabled={!canGoNext}
          >
            Siguiente
          </button>
        </nav>
      )}
    </section>
  )
}

export default ListarClientes
