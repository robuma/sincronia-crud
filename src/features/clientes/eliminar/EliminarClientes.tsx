import { useEffect, useMemo, useState } from 'react'

import { getSupabase } from '../../../lib/supabase'
import type { Cliente } from '../types'
import { hasSupabaseConfig, paginateClientes } from '../consultar/paginarClientes'
import { filtrarClientesPorNombre } from './filtrarClientes'

const PAGE_SIZE = 10

export function EliminarClientes() {
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [actionError, setActionError] = useState<string | null>(null)
  const [notice, setNotice] = useState<string | null>(null)
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const [refreshCount, setRefreshCount] = useState(0)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    async function fetchClientes() {
      if (!hasSupabaseConfig(import.meta.env)) {
        if (isMounted) {
          setClientes([])
          setError('Falta la configuración de Supabase en .env.local para consultar clientes.')
          setLoading(false)
        }
        return
      }

      try {
        setLoading(true)
        setError(null)

        const { data, error: queryError } = await getSupabase()
          .from('clientes')
          .select('id, nombre, correo, telefono')
          .order('nombre', { ascending: true })

        if (!isMounted) return

        if (queryError) {
          throw queryError
        }

        setClientes(data ?? [])
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
  }, [refreshCount])

  const filteredClientes = useMemo(() => filtrarClientesPorNombre(clientes, query), [clientes, query])
  const pagination = useMemo(() => paginateClientes(filteredClientes, PAGE_SIZE, page), [filteredClientes, page])
  const currentPage = pagination.page

  const refreshList = () => {
    setRefreshCount((current) => current + 1)
    setActionError(null)
    setNotice(null)
  }

  async function handleDelete(cliente: Cliente) {
    const confirmed = window.confirm(`¿Estás seguro de eliminar a ${cliente.nombre}? Esta acción no se puede deshacer.`)

    if (!confirmed) {
      return
    }

    setDeletingId(cliente.id)
    setActionError(null)
    setNotice(null)

    try {
      const { data, error: deleteError } = await getSupabase()
        .from('clientes')
        .delete()
        .eq('id', cliente.id)
        .select('id')
        .maybeSingle()

      if (deleteError) {
        throw deleteError
      }

      if (!data) {
        throw new Error('No se pudo confirmar la eliminación del cliente. Actualizá la lista e intentá de nuevo.')
      }

      setClientes((current) => current.filter((item) => item.id !== cliente.id))
      setNotice(`Se eliminó a ${cliente.nombre} correctamente.`)
    } catch (caughtError) {
      const message = caughtError instanceof Error ? caughtError.message : 'No se pudo eliminar el cliente.'
      setActionError(message)
    } finally {
      setDeletingId(null)
    }
  }

  const canGoPrev = currentPage > 1
  const canGoNext = currentPage < pagination.totalPages

  return (
    <section className="data-panel" aria-labelledby="clientes-eliminar-titulo">
      <header className="panel-header">
        <div>
          <p className="eyebrow">Clientes</p>
          <h2 id="clientes-eliminar-titulo">Listado</h2>
        </div>
        <div className="panel-header__actions">
          {!loading && !error && (
            <span className="status-label">
              {query.trim() ? `${filteredClientes.length} de ${clientes.length} clientes` : `${clientes.length} registros`}
            </span>
          )}
          <button type="button" className="button button--secondary" onClick={refreshList} disabled={loading || deletingId !== null}>
            {error ? 'Reintentar' : 'Actualizar'}
          </button>
        </div>
      </header>

      <div className="form-field search-field">
        <label htmlFor="buscar-cliente-eliminar">Buscar cliente por nombre</label>
        <input
          id="buscar-cliente-eliminar"
          type="search"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value)
            setPage(1)
          }}
          placeholder="Escribí un nombre"
          disabled={loading || Boolean(error)}
        />
      </div>

      {loading ? (
        <p className="status-message" role="status">Cargando clientes…</p>
      ) : error ? (
        <p className="status-message status-message--error" role="alert">{error}</p>
      ) : clientes.length === 0 ? (
        <div className="empty-state">
          <p>No hay clientes registrados todavía.</p>
        </div>
      ) : filteredClientes.length === 0 ? (
        <div className="empty-state">
          <p>No se encontraron clientes con ese nombre.</p>
        </div>
      ) : (
        <>
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th scope="col">Nombre</th>
                  <th scope="col">Correo electrónico</th>
                  <th scope="col">Teléfono</th>
                  <th scope="col">Acción</th>
                </tr>
              </thead>
              <tbody>
                {pagination.items.map((cliente) => (
                  <tr key={cliente.id}>
                    <td>{cliente.nombre}</td>
                    <td>{cliente.correo}</td>
                    <td>{cliente.telefono}</td>
                    <td>
                      <button
                        type="button"
                        className="button button--danger table-action"
                        onClick={() => void handleDelete(cliente)}
                        disabled={deletingId !== null}
                        aria-label={`Eliminar a ${cliente.nombre}`}
                      >
                        {deletingId === cliente.id ? 'Eliminando…' : 'Eliminar'}
                      </button>
                    </td>
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
                onClick={() => setPage(currentPage - 1)}
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
                onClick={() => setPage(currentPage + 1)}
                disabled={!canGoNext}
              >
                Siguiente
              </button>
            </nav>
          )}
        </>
      )}

      {notice && <p className="action-feedback action-feedback--success" role="status">{notice}</p>}
      {actionError && <p className="action-feedback action-feedback--error" role="alert">{actionError}</p>}
    </section>
  )
}
