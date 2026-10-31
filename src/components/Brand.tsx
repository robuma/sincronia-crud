export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <a className="brand" href="#inicio" aria-label="Sincronía, ir al inicio">
      <svg className="brand__mark" viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <path d="M27 9H17a8 8 0 0 0 0 16h6" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
        <path d="M13 31h10a8 8 0 0 0 0-16h-6" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
      </svg>
      <span className="brand__name">Sincronía<span className="brand__dot">.</span></span>
      {!compact && <span className="brand__descriptor">Gestión de clientes</span>}
    </a>
  )
}
