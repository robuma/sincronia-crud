import { useEffect, useRef, useState } from 'react'
import { getSupabase } from '../../../lib/supabase'
import type { Cliente } from '../types'

// Confirmación y operación de SC-5, compartidas por el directorio de SC-9.
export function ConfirmarEliminarCliente({ cliente, onCerrar, onEliminado }: {
  cliente: Cliente; onCerrar: () => void; onEliminado: (cliente: Cliente) => void
}) {
  const dialog = useRef<HTMLDialogElement>(null)
  const enviando = useRef(false)
  const [eliminando, setEliminando] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const element = dialog.current
    element?.showModal()
    return () => element?.close()
  }, [])

  async function eliminar() {
    if (enviando.current) return
    enviando.current = true
    setEliminando(true)
    setError('')
    try {
      const { data, error: fallo } = await getSupabase().from('clientes').delete().eq('id', cliente.id).select('id').maybeSingle()
      if (fallo) throw fallo
      if (!data) {
        setError('No se pudo confirmar la eliminación. Cerrá este diálogo y actualizá la lista antes de intentar de nuevo.')
        return
      }
      onEliminado(cliente)
    } catch {
      setError('No pudimos confirmar la eliminación. Revisá tu conexión y actualizá la lista antes de volver a intentarlo.')
    } finally {
      enviando.current = false
      setEliminando(false)
    }
  }

  return <dialog ref={dialog} className="confirm-dialog" aria-labelledby="eliminar-title" aria-describedby="eliminar-description"
    onCancel={event => { event.preventDefault(); if (!enviando.current) onCerrar() }}>
    <h2 id="eliminar-title">¿Eliminar este cliente?</h2>
    <p id="eliminar-description" className="confirm-dialog__description">Se eliminará a <strong>{cliente.nombre}</strong> ({cliente.correo}). Esta acción no se puede deshacer.</p>
    {error && <p className="action-feedback--error" role="alert">{error}</p>}
    <div className="confirm-dialog__actions">
      <button type="button" className="button button--secondary" onClick={onCerrar} disabled={eliminando} autoFocus>Cancelar</button>
      <button type="button" className="button button--danger" onClick={() => void eliminar()} disabled={eliminando}>{eliminando ? 'Eliminando…' : 'Sí, eliminar'}</button>
    </div>
  </dialog>
}
