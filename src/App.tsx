import { useEffect, useRef, useState } from 'react'
import { Brand } from './components/Brand'
import { Icon } from './components/Icon'
import { Portada } from './components/Portada'
import { ListarClientes } from './features/clientes/consultar/ListarClientes'
import { CrearCliente } from './features/clientes/crear/CrearCliente'

type Vista = 'home' | 'clientes' | 'crear'
function leerVista(): Vista {
  return window.location.hash === '#clientes/nuevo' ? 'crear' : window.location.hash === '#clientes' ? 'clientes' : 'home'
}

function App() {
  const [vista, setVista] = useState(leerVista)
  const [menuAbierto, setMenuAbierto] = useState(false)
  const [grupoAbierto, setGrupoAbierto] = useState(true)
  const titulo = useRef<HTMLHeadingElement>(null)
  const menu = useRef<HTMLButtonElement>(null)
  const vistaAnterior = useRef(vista)

  useEffect(() => {
    const cambiar = () => { setVista(leerVista()); setMenuAbierto(false); setGrupoAbierto(true) }
    window.addEventListener('hashchange', cambiar)
    return () => window.removeEventListener('hashchange', cambiar)
  }, [])
  useEffect(() => {
    document.title = vista === 'home' ? 'Sincronía · Gestión de clientes' : `${vista === 'crear' ? 'Nuevo cliente' : 'Clientes'} · Sincronía`
    if (vistaAnterior.current !== vista) {
      window.scrollTo({ top: 0, behavior: 'instant' })
      if (vista === 'home') document.getElementById('contenido')?.focus()
      else titulo.current?.focus()
    }
    vistaAnterior.current = vista
  }, [vista])

  return <>
    <a className="skip-link" href="#contenido" onClick={event => { event.preventDefault(); document.getElementById('contenido')?.focus() }}>Saltar al contenido</a>
    {vista === 'home' ? <Portada /> : <div className="workspace">
      <aside className="sidebar" onKeyDown={event => { if (event.key === 'Escape') { setMenuAbierto(false); menu.current?.focus() } }}>
        <div className="sidebar-brand"><Brand compact /><p>Gestión de clientes</p></div>
        <button type="button" ref={menu} className="icon-button mobile-menu" aria-expanded={menuAbierto} aria-controls="workspace-nav" aria-label={menuAbierto ? 'Cerrar navegación' : 'Abrir navegación'} onClick={() => setMenuAbierto(open => !open)}><Icon name={menuAbierto ? 'close' : 'menu'} /></button>
        <nav id="workspace-nav" className={`workspace-nav ${menuAbierto ? 'is-open' : ''}`} aria-label="Navegación del sistema">
          <div className="nav-parent"><a href="#clientes" aria-current={vista === 'clientes' ? 'page' : undefined} onClick={() => setMenuAbierto(false)}><Icon name="clientes" />Clientes</a><button className="icon-button" type="button" aria-expanded={grupoAbierto} aria-controls="clientes-submenu" aria-label={grupoAbierto ? 'Contraer opciones de clientes' : 'Expandir opciones de clientes'} onClick={() => setGrupoAbierto(open => !open)}><Icon name="chevron" className={grupoAbierto ? '' : 'icon--collapsed'} /></button></div>
          <div id="clientes-submenu" className="nav-child" hidden={!grupoAbierto}><a href="#clientes/nuevo" aria-current={vista === 'crear' ? 'page' : undefined} onClick={() => setMenuAbierto(false)}><Icon name="plus" />Nuevo cliente</a></div>
          <a className="sidebar-home" href="#inicio"><Icon name="back" />Volver a la portada</a>
        </nav>
      </aside>
      <div className="workspace-main">
        <header className="workspace-header"><nav aria-label="Ruta de navegación"><a href="#clientes">Gestión</a><span aria-hidden="true">/</span>{vista === 'crear' ? <><a href="#clientes">Clientes</a><span aria-hidden="true">/</span><span>Nuevo</span></> : <span>Clientes</span>}</nav><p>Demo pública · Datos ficticios</p></header>
        <main id="contenido" tabIndex={-1} className="workspace-content">
          <div className="workspace-heading"><div><h1 ref={titulo} tabIndex={-1}>{vista === 'crear' ? 'Nuevo cliente' : 'Clientes'}</h1><p>{vista === 'crear' ? 'Agregar los datos de contacto a tu directorio.' : 'Consultar y administrar los datos de contacto.'}</p></div>{vista === 'clientes' ? <a className="button button--primary" href="#clientes/nuevo"><Icon name="plus" />Nuevo cliente</a> : <a className="button button--secondary" href="#clientes"><Icon name="back" />Volver a clientes</a>}</div>
          {vista === 'crear' ? <CrearCliente onVerClientes={() => { window.location.hash = 'clientes' }} /> : <ListarClientes />}
        </main>
        <footer className="workspace-footer">Demostración con datos ficticios</footer>
      </div>
    </div>}
  </>
}
export default App
