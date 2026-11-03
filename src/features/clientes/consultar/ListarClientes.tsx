import { useEffect, useMemo, useRef, useState } from 'react'
import { Icon } from '../../../components/Icon'
import { getSupabase } from '../../../lib/supabase'
import type { Cliente } from '../types'
import { paginateClientes } from './paginarClientes'
import { buscarClientes, cargarTodosLosClientes } from './buscarClientes'
import { AccionesCliente } from './AccionesCliente'
import { ConfirmarEliminarCliente } from '../eliminar/ConfirmarEliminarCliente'
import { EditarCliente } from '../editar/EditarCliente' // 1. Importar EditarCliente

const PAGE_SIZE = 10

export function ListarClientes() {
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const [refreshCount, setRefreshCount] = useState(0)
  const [pendiente, setPendiente] = useState<Cliente | null>(null)
  const [clienteAEditar, setClienteAEditar] = useState<Cliente | null>(null) // 2. Estado para el cliente a editar
  const [notice, setNotice] = useState('')
  const search = useRef<HTMLInputElement>(null)

  useEffect(() => {
    let active = true
    const controller = new AbortController()
    async function cargar() {
      setLoading(true)
      setError('')
      try {
        const supabase = getSupabase()
        const data = await cargarTodosLosClientes((from, to) => supabase.from('clientes')
          .select('id, nombre, correo, telefono', { count: 'exact' })
          .order('nombre', { ascending: true }).order('id', { ascending: true })
          .range(from, to).abortSignal(controller.signal))
        if (active) setClientes(data)
      } catch {
        if (active) {
          setError('No pudimos cargar los clientes. Revisá tu conexión y volvé a intentarlo.')
          setClientes([])
        }
      } finally { if (active) setLoading(false) }
    }
    void cargar()
    return () => { active = false; controller.abort() }
  }, [refreshCount])

  const filtrados = useMemo(() => buscarClientes(clientes, query), [clientes, query])
  const pagination = useMemo(() => paginateClientes(filtrados, PAGE_SIZE, page), [filtrados, page])
  const buscando = [...query.trim()].length >= 3
  const desde = (pagination.page - 1) * PAGE_SIZE + 1
  const cantidad = `${clientes.length} ${clientes.length === 1 ? 'cliente' : 'clientes'}`

  function cerrar() {
    const id = pendiente?.id
    setPendiente(null)
    requestAnimationFrame(() => document.getElementById(`abrir-acciones-${id}`)?.focus())
  }

  // 3. Si se seleccionó un cliente para editar, renderizamos el formulario de edición
  if (clienteAEditar) {
    return (
      <EditarCliente
        cliente={clienteAEditar}
        onVerClientes={() => {
          setClienteAEditar(null)
          setRefreshCount(n => n + 1) // Recargar la lista por si hubo cambios
        }}
      />
    )
  }

  return <section className="directory" aria-label="Directorio de clientes">
    <div className="directory-toolbar">
      <div className="directory-count">
        <p role="status">{loading ? 'Cargando clientes…' : error ? 'Listado no disponible' : buscando ? `${filtrados.length} de ${cantidad}` : `${cantidad} ${clientes.length === 1 ? 'registrado' : 'registrados'}`}</p>
        <button type="button" className="icon-button" aria-label="Actualizar listado" title="Actualizar listado" disabled={loading} onClick={() => { setNotice(''); setRefreshCount(n => n + 1) }}><Icon name="refresh" /></button>
      </div>
      <div className="directory-search">
        <label htmlFor="buscar-clientes">Buscar clientes</label>
        <div className="search-control"><Icon name="search" />
          <input ref={search} id="buscar-clientes" type="search" value={query} onChange={event => { setQuery(event.target.value); setPage(1); setNotice('') }} placeholder="Nombre, correo o teléfono" aria-describedby="buscar-ayuda" autoComplete="off" />
        </div>
        <p id="buscar-ayuda">Escribí al menos 3 caracteres</p>
      </div>
    </div>
    {notice && <p className="action-feedback" role="status">{notice}</p>}
    <div aria-busy={loading}>
      {loading ? <div className="loading-rows" aria-hidden="true"><span /><span /><span /><span /></div>
        : error ? <div className="empty-state"><h2>No se pudo cargar el listado</h2><p role="alert">{error}</p><button type="button" className="button button--secondary" onClick={() => setRefreshCount(n => n + 1)}>Reintentar</button></div>
        : !filtrados.length ? <div className="empty-state"><Icon name={buscando ? 'search' : 'clientes'} /><h2>{buscando ? 'No se encontraron clientes' : 'Tu directorio empieza acá'}</h2><p>{buscando ? 'Probá con otro nombre, correo o teléfono.' : 'Agregá tu primer cliente para tener sus datos a mano. Usá únicamente datos ficticios.'}</p>{buscando ? <button className="button button--secondary" type="button" onClick={() => { setQuery(''); setPage(1); search.current?.focus() }}>Limpiar búsqueda</button> : <a className="button button--primary" href="#clientes/nuevo"><Icon name="plus" />Nuevo cliente</a>}</div>
        : <>
          <table className="data-table clients-table">
            <caption className="sr-only">Directorio de clientes.</caption>
            <thead><tr><th scope="col">Nombre</th><th scope="col">Correo electrónico</th><th scope="col">Teléfono</th><th scope="col">Acciones</th></tr></thead>
            <tbody>{pagination.items.map(cliente => <tr key={cliente.id}>
              <td data-label="Nombre" className="client-name">{cliente.nombre}</td>
              <td data-label="Correo electrónico">{cliente.correo}</td>
              <td data-label="Teléfono">{cliente.telefono}</td>
              <td data-label="Acciones">
                {/* 4. Pasar onEditar a AccionesCliente */}
                <AccionesCliente 
                  cliente={cliente} 
                  onEditar={(item) => setClienteAEditar(item)}
                  onEliminar={() => setPendiente(cliente)} 
                />
              </td>
            </tr>)}</tbody>
          </table>
          <nav className="pagination" aria-label="Paginación de clientes">
            <p>Mostrando {desde}–{Math.min(desde + PAGE_SIZE - 1, filtrados.length)} de {filtrados.length} {filtrados.length === 1 ? 'cliente' : 'clientes'}</p>
            <div className="pagination-controls"><button className="button button--secondary" type="button" onClick={() => { setPage(pagination.page - 1); search.current?.focus() }} disabled={pagination.page === 1}><Icon name="back" />Anterior</button><span className="page-number" aria-label={`Página ${pagination.page} de ${pagination.totalPages}`}>{pagination.page}</span><button className="button button--secondary" type="button" onClick={() => { setPage(pagination.page + 1); search.current?.focus() }} disabled={pagination.page >= pagination.totalPages}>Siguiente<Icon name="back" className="icon--forward" /></button></div>
          </nav>
        </>}
    </div>
    {pendiente && <ConfirmarEliminarCliente cliente={pendiente} onCerrar={cerrar} onEliminado={cliente => {
      setClientes(current => current.filter(item => item.id !== cliente.id))
      setNotice(`Se eliminó a ${cliente.nombre} correctamente.`)
      setPendiente(null)
      requestAnimationFrame(() => search.current?.focus())
    }} />}
  </section>
}
export default ListarClientes