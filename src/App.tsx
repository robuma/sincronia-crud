import { Arrow } from './components/Arrow'
import { Brand } from './components/Brand'

const modules = [
  { title: 'Crear', detail: 'El inicio de una nueva relación.', icon: 'plus' },
  { title: 'Consultar', detail: 'La información que necesitás, a mano.', icon: 'search' },
  { title: 'Actualizar', detail: 'Cada dato, siempre al día.', icon: 'edit' },
  { title: 'Eliminar', detail: 'Un registro ordenado y relevante.', icon: 'remove' },
] as const

function ModuleIcon({ type }: { type: typeof modules[number]['icon'] }) {
  const paths = {
    plus: <path d="M12 5v14M5 12h14" />,
    search: <><circle cx="10.5" cy="10.5" r="6" /><path d="m15 15 5 5" /></>,
    edit: <><path d="m15 5 4 4M5 19l4-1L20 7a2.8 2.8 0 0 0-4-4L5 14l-1 6 5-2" /><path d="M14 20h6" /></>,
    remove: <><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v5M14 11v5" /></>,
  }
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[type]}</svg>
}

function App() {
  return (
    <>
      <a className="skip-link" href="#contenido">Saltar al contenido</a>
      <div id="inicio" className="site-shell">
        <header className="site-header">
          <Brand />
          <nav aria-label="Navegación principal">
            <a className="nav-link" href="#sistema">El sistema <Arrow diagonal /></a>
          </nav>
        </header>

        <main id="contenido">
          <section className="hero" aria-labelledby="hero-title">
            <div className="hero__copy">
              <h1 id="hero-title">Buenas relaciones.<br /><span>Todo en sintonía.</span></h1>
              <p className="hero__description">Un espacio para organizar tus clientes y cuidar lo que hace única cada relación.</p>
              <a className="button button--primary" href="#sistema">Conocé Sincronía <Arrow /></a>
              <p className="launch-note"><span className="status-dot" />Estamos preparando tu próximo espacio de trabajo.</p>
            </div>

            <div className="hero__visual" aria-hidden="true">
              <div className="visual-orbit visual-orbit--outer" />
              <div className="visual-orbit visual-orbit--inner" />
              <svg className="connection-lines" viewBox="0 0 480 440" fill="none">
                <path d="M106 126h68c36 0 32 94 66 94s36 92 72 92h60M116 314h58c36 0 32-94 66-94s36-94 72-94h62" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              <div className="visual-core"><svg viewBox="0 0 120 120" fill="none"><path d="M80 30H50a23 23 0 0 0 0 46h20" stroke="currentColor" strokeWidth="13" strokeLinecap="round" /><path d="M40 90h30a23 23 0 0 0 0-46H50" stroke="currentColor" strokeWidth="13" strokeLinecap="round" /></svg></div>
              <div className="visual-node visual-node--one"><ModuleIcon type="plus" /></div>
              <div className="visual-node visual-node--two"><ModuleIcon type="search" /></div>
              <div className="visual-node visual-node--three"><ModuleIcon type="edit" /></div>
              <div className="visual-node visual-node--four"><ModuleIcon type="remove" /></div>
              <span className="visual-caption">Cada conexión cuenta.</span>
            </div>
          </section>

          <section id="sistema" className="system-section" aria-labelledby="system-title">
            <div className="section-heading">
              <div><h2 id="system-title">Lo esencial, en un solo lugar.</h2><p>Estamos dando forma a una gestión de clientes más simple.</p></div>
              <span className="status-label">En preparación</span>
            </div>
            <ul className="module-list">
              {modules.map((module) => (
                <li className="module" key={module.title}>
                  <span className="module__icon"><ModuleIcon type={module.icon} /></span>
                  <h3>{module.title}</h3>
                  <p>{module.detail}</p>
                  <span className="module__availability">Próximamente</span>
                </li>
              ))}
            </ul>
          </section>
        </main>

        <footer className="site-footer">
          <Brand compact />
          <p>Demostración académica · Solo datos ficticios</p>
          <span>PF-3872 · Universidad de Costa Rica</span>
        </footer>
      </div>
    </>
  )
}

export default App
