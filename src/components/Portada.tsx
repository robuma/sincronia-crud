import { Arrow } from './Arrow'
import { Brand } from './Brand'
import { Icon, type IconName } from './Icon'

const ejemplos = [
  { nombre: 'Ana Solís', correo: 'ana@example.com', telefono: '+506 0000-0001' },
  { nombre: 'Bruno Vega', correo: 'bruno@example.com', telefono: '+506 0000-0002' },
  { nombre: 'Carla Mora', correo: 'carla@example.com', telefono: '+506 0000-0003' },
]
const funciones: { nombre: string; detalle: string; icono: IconName; proxima?: boolean }[] = [
  { nombre: 'Registrar', detalle: 'Agregá nombre, correo y teléfono.', icono: 'clientes' },
  { nombre: 'Consultar', detalle: 'Revisá tu directorio de clientes.', icono: 'search' },
  { nombre: 'Actualizar', detalle: 'Mantené los datos al día.', icono: 'edit', proxima: true },
  { nombre: 'Eliminar', detalle: 'Quitá registros con confirmación.', icono: 'trash' },
]

export function Portada() {
  return <div id="inicio" className="site-shell">
    <header className="site-header"><Brand /><nav aria-label="Navegación principal"><a className="nav-link" href="#funcionalidades">Funcionalidades</a><a className="button button--primary" href="#clientes">Ingresar<Arrow /></a></nav></header>
    <main id="contenido" tabIndex={-1}>
      <section className="hero" aria-labelledby="hero-title">
        <h1 id="hero-title">Administrá tus clientes<br />{' '}en un solo lugar.</h1>
        <p className="hero__description">Registrá nombres, correos y teléfonos. Consultá y mantené actualizada la información desde una misma aplicación.</p>
        <a className="button button--primary" href="#clientes">Ingresar al sistema<Arrow /></a>
        <p className="hero__note">Demo pública · Solo datos ficticios</p>
      </section>
      <figure className="product-preview">
        <div className="preview-layout">
          <aside className="preview-sidebar" aria-label="Navegación de la vista de ejemplo"><Brand compact /><a className="preview-selected" href="#clientes"><Icon name="clientes" />Clientes</a><a className="preview-child" href="#clientes/nuevo"><Icon name="plus" />Nuevo cliente</a></aside>
          <div className="preview-directory">
            <div className="preview-heading"><div><h2>Clientes</h2><p>Directorio de contactos</p></div><a className="button button--primary" href="#clientes/nuevo"><Icon name="plus" />Nuevo cliente</a></div>
            <table className="data-table preview-table"><caption className="sr-only">Tres clientes ficticios como ejemplo de la aplicación</caption><thead><tr><th scope="col">Nombre</th><th scope="col">Correo electrónico</th><th scope="col">Teléfono</th></tr></thead><tbody>{ejemplos.map(cliente => <tr key={cliente.correo}><td data-label="Nombre">{cliente.nombre}</td><td data-label="Correo electrónico">{cliente.correo}</td><td data-label="Teléfono">{cliente.telefono}</td></tr>)}</tbody></table>
            <p className="preview-count">3 clientes</p>
          </div>
        </div>
        <figcaption>Vista de ejemplo con datos ficticios</figcaption>
      </figure>
      <section id="funcionalidades" className="features" aria-labelledby="features-title">
        <h2 id="features-title">Lo esencial para gestionar clientes</h2>
        <ul className="features-grid">{funciones.map(funcion => <li key={funcion.nombre}><Icon name={funcion.icono} /><div><h3>{funcion.nombre}</h3><p>{funcion.detalle}</p>{funcion.proxima && <span className="upcoming-note">Próximamente</span>}</div></li>)}</ul>
      </section>
    </main>
    <footer className="site-footer"><Brand compact /><p>Demostración académica · Datos ficticios</p></footer>
  </div>
}
