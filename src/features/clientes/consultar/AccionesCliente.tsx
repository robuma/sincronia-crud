import { useRef } from 'react'
import { Icon } from '../../../components/Icon'
import type { Cliente } from '../types'

export function AccionesCliente({
  cliente,
  onEditar,
  onEliminar,
}: {
  cliente: Cliente
  onEditar: (cliente: Cliente) => void
  onEliminar: () => void
}) {
  const trigger = useRef<HTMLButtonElement>(null)
  const popover = useRef<HTMLDivElement>(null)
  const id = `acciones-${cliente.id}`

  return (
    <div className="row-actions">
      <button
        type="button"
        className="button button--secondary"
        onClick={() => onEditar(cliente)}
        aria-label={`Editar a ${cliente.nombre}`}
      >
        <Icon name="edit" />
        <span>Editar</span>
      </button>
      <button
        ref={trigger}
        id={`abrir-${id}`}
        type="button"
        className="icon-button"
        popoverTarget={id}
        aria-label={`Más acciones para ${cliente.nombre}`}
      >
        <Icon name="more" />
      </button>
      <div
        ref={popover}
        id={id}
        popover="auto"
        className="row-popover"
        onToggle={(event) => {
          if (event.newState !== 'open' || !trigger.current || !popover.current) return
          const rect = trigger.current.getBoundingClientRect()
          const box = popover.current
          box.style.left = `${Math.max(
            12,
            Math.min(rect.right - box.offsetWidth, window.innerWidth - box.offsetWidth - 12)
          )}px`
          box.style.top = `${
            rect.bottom + box.offsetHeight + 8 < window.innerHeight
              ? rect.bottom + 8
              : rect.top - box.offsetHeight - 8
          }px`
          box.querySelector('button')?.focus()
        }}
      >
        <button
          type="button"
          onClick={() => {
            popover.current?.hidePopover()
            onEliminar()
          }}
        >
          <Icon name="trash" />
          Eliminar cliente
        </button>
      </div>
    </div>
  )
}