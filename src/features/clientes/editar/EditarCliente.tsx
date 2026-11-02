import { useEffect, useRef, useState, type SubmitEvent } from 'react'
import { getSupabase } from '../../../lib/supabase'
import type { Cliente, DatosCliente } from '../types'
import { errorAlGuardarCliente, prepararCliente, type ErroresCliente } from './validarEditarCliente'
import './editar-cliente.css'

const CAMPOS = [
  { nombre: 'nombre', etiqueta: 'Nombre', tipo: 'text', ejemplo: 'Ej. Cliente de prueba' },
  { nombre: 'correo', etiqueta: 'Correo electrónico', tipo: 'email', ejemplo: 'Ej. cliente@example.com' },
  { nombre: 'telefono', etiqueta: 'Teléfono', tipo: 'tel', ejemplo: 'Ej. +506 0000-0000' },
] as const

export function EditarCliente({
  cliente,
  onVerClientes,
}: {
  cliente: Cliente
  onVerClientes: () => void
}) {
  const [valores, setValores] = useState<DatosCliente>({
    nombre: cliente.nombre,
    correo: cliente.correo,
    telefono: cliente.telefono,
  })
  const [errores, setErrores] = useState<ErroresCliente>({})
  const [mensajeError, setMensajeError] = useState('')
  const [confirmacion, setConfirmacion] = useState('')
  const [guardando, setGuardando] = useState(false)
  const enviando = useRef(false)
  const formulario = useRef<HTMLFormElement>(null)
  const exito = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setValores({
      nombre: cliente.nombre,
      correo: cliente.correo,
      telefono: cliente.telefono,
    })
    setErrores({})
    setMensajeError('')
    setConfirmacion('')
  }, [cliente])

  useEffect(() => {
    if (confirmacion) exito.current?.focus()
  }, [confirmacion])

  function enfocar(campo: keyof DatosCliente) {
    const input = formulario.current?.elements.namedItem(campo)
    if (input instanceof HTMLInputElement) input.focus()
  }

  function cambiar(campo: keyof DatosCliente, valor: string) {
    setValores((actual) => ({ ...actual, [campo]: valor }))
    setErrores((actual) => ({ ...actual, [campo]: undefined }))
    setMensajeError('')
    setConfirmacion('')
  }

  async function guardar(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    if (enviando.current) return
    setConfirmacion('')
    setMensajeError('')
    const resultado = prepararCliente(valores)
    setErrores(resultado.errores)
    const primerError = CAMPOS.find(({ nombre }) => resultado.errores[nombre])
    if (primerError) {
      setMensajeError('Revisá los campos indicados antes de guardar.')
      enfocar(primerError.nombre)
      return
    }

    enviando.current = true
    setGuardando(true)
    let campoConError: keyof DatosCliente | undefined
    try {
      const { error } = await getSupabase()
        .from('clientes')
        .update(resultado.datos)
        .eq('id', cliente.id)
      if (error) throw error
      setConfirmacion(`Se actualizaron los datos de ${resultado.datos.nombre} correctamente.`)
    } catch (error) {
      const resultadoError = errorAlGuardarCliente(error)
      setMensajeError(resultadoError.mensaje)
      if (resultadoError.campo) {
        campoConError = resultadoError.campo
        setErrores({ [resultadoError.campo]: resultadoError.mensaje })
      }
    } finally {
      enviando.current = false
      setGuardando(false)
    }
    if (campoConError) requestAnimationFrame(() => enfocar(campoConError))
  }

  return (
    <section className="data-panel crear-cliente" aria-labelledby="editar-datos-title">
      <header className="crear-cliente__intro">
        <h2 id="editar-datos-title">Datos del cliente</h2>
        <p>Modificá los campos necesarios para actualizar los datos del cliente.</p>
        <p className="crear-cliente__nota">Esta es una demostración pública. Usá únicamente datos ficticios.</p>
      </header>

      <div className="crear-cliente__confirmacion" ref={exito} tabIndex={-1} role="status" hidden={!confirmacion}>
        <p>{confirmacion}</p>
        <button type="button" className="button button--secondary" onClick={onVerClientes}>
          Ver clientes
        </button>
      </div>

      <form ref={formulario} onSubmit={(event) => void guardar(event)} noValidate aria-busy={guardando}>
        <fieldset disabled={guardando} className="crear-cliente__campos">
          <legend className="crear-cliente__legend">Todos los campos son obligatorios.</legend>
          {CAMPOS.map(({ nombre, etiqueta, tipo, ejemplo }) => (
            <div className="form-field" key={nombre}>
              <label htmlFor={`editar-${nombre}`}>{etiqueta}</label>
              <input
                id={`editar-${nombre}`}
                name={nombre}
                type={tipo}
                value={valores[nombre]}
                onChange={(event) => cambiar(nombre, event.target.value)}
                placeholder={ejemplo}
                autoComplete="off"
                autoCapitalize={nombre === 'correo' ? 'none' : undefined}
                spellCheck={nombre === 'correo' ? false : undefined}
                required
                aria-invalid={Boolean(errores[nombre])}
                aria-describedby={errores[nombre] ? `editar-${nombre}-error` : undefined}
              />
              {errores[nombre] && <span id={`editar-${nombre}-error`} className="field-error">{errores[nombre]}</span>}
            </div>
          ))}
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button type="submit" className="button button--primary crear-cliente__guardar">
              {guardando ? 'Guardando…' : 'Guardar cambios'}
            </button>
            <button type="button" className="button button--secondary" onClick={onVerClientes}>
              Cancelar
            </button>
          </div>
        </fieldset>
        <p className="crear-cliente__estado" role="status">
          {guardando ? 'Esperá un momento mientras se guardan los cambios.' : ''}
        </p>
        <p className="crear-cliente__error" role="alert">
          {mensajeError}
        </p>
      </form>
    </section>
  )
}