import { useEffect, useRef, useState, type SubmitEvent } from 'react'

import { getSupabase } from '../../../lib/supabase'
import type { DatosCliente } from '../types'
import { errorAlCrearCliente, prepararCliente, type ErroresCliente } from './validarCliente'
import './crear-cliente.css'

const VACIO: DatosCliente = { nombre: '', correo: '', telefono: '' }
const CAMPOS = [
  { nombre: 'nombre', etiqueta: 'Nombre', tipo: 'text', ejemplo: 'Ej. Cliente de prueba' },
  { nombre: 'correo', etiqueta: 'Correo electrónico', tipo: 'email', ejemplo: 'Ej. cliente@example.com' },
  { nombre: 'telefono', etiqueta: 'Teléfono', tipo: 'tel', ejemplo: 'Ej. +506 0000-0000' },
] as const

export function CrearCliente({ onVerClientes }: { onVerClientes: () => void }) {
  const [valores, setValores] = useState<DatosCliente>(VACIO)
  const [errores, setErrores] = useState<ErroresCliente>({})
  const [mensajeError, setMensajeError] = useState('')
  const [confirmacion, setConfirmacion] = useState('')
  const [guardando, setGuardando] = useState(false)
  const enviando = useRef(false)
  const formulario = useRef<HTMLFormElement>(null)
  const exito = useRef<HTMLDivElement>(null)

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
    // El ref bloquea también dos eventos antes del siguiente render de React.
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
      const { data, error } = await getSupabase()
        .from('clientes')
        .insert(resultado.datos)
        .select('id')
        .single()
      if (error) throw error
      if (!data?.id) throw new Error('Sin confirmación del registro')
      setValores(VACIO)
      setConfirmacion(`Se creó a ${resultado.datos.nombre} correctamente.`)
    } catch (error) {
      const resultadoError = errorAlCrearCliente(error)
      setMensajeError(resultadoError.mensaje)
      if (resultadoError.campo) {
        campoConError = resultadoError.campo
        setErrores({ [resultadoError.campo]: resultadoError.mensaje })
      }
    } finally {
      enviando.current = false
      setGuardando(false)
    }
    // Esperar a que React vuelva a habilitar el campo después de la petición.
    if (campoConError) requestAnimationFrame(() => enfocar(campoConError))
  }

  return (
    <section className="data-panel crear-cliente" aria-labelledby="crear-datos-title">
      <header className="crear-cliente__intro">
        <h2 id="crear-datos-title">Datos del cliente</h2>
        <p>Completá los tres campos para agregar un cliente.</p>
        <p className="crear-cliente__nota">Esta es una demostración pública. Usá únicamente datos ficticios.</p>
      </header>

      <div className="crear-cliente__confirmacion" ref={exito} tabIndex={-1} role="status" hidden={!confirmacion}>
        <p>{confirmacion}</p>
        <button type="button" className="button button--secondary" onClick={onVerClientes}>Ver clientes</button>
      </div>

      <form ref={formulario} onSubmit={(event) => void guardar(event)} noValidate aria-busy={guardando}>
        <fieldset disabled={guardando} className="crear-cliente__campos">
          <legend className="crear-cliente__legend">Todos los campos son obligatorios.</legend>
          {CAMPOS.map(({ nombre, etiqueta, tipo, ejemplo }) => (
            <div className="form-field" key={nombre}>
              <label htmlFor={`crear-${nombre}`}>{etiqueta}</label>
              <input
                id={`crear-${nombre}`}
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
                aria-describedby={errores[nombre] ? `crear-${nombre}-error` : undefined}
              />
              {errores[nombre] && <span id={`crear-${nombre}-error`} className="field-error">{errores[nombre]}</span>}
            </div>
          ))}
          <button type="submit" className="button button--primary crear-cliente__guardar">
            {guardando ? 'Guardando…' : 'Guardar cliente'}
          </button>
        </fieldset>
        <p className="crear-cliente__estado" role="status">{guardando ? 'Esperá un momento mientras se guarda el cliente.' : ''}</p>
        <p className="crear-cliente__error" role="alert">{mensajeError}</p>
        {mensajeError && !Object.values(errores).some(Boolean) && (
          <button type="button" className="button button--secondary" onClick={onVerClientes}>Revisar listado</button>
        )}
      </form>
    </section>
  )
}
