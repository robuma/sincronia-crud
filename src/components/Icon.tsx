export type IconName = 'clientes' | 'plus' | 'search' | 'edit' | 'trash' | 'chevron' | 'back' | 'more' | 'menu' | 'close' | 'refresh'

export function Icon({ name, className = '' }: { name: IconName; className?: string }) {
  const paths = {
    clientes: <><circle cx="12" cy="7" r="4" /><path d="M4 21v-2a8 8 0 0 1 16 0v2" /></>,
    plus: <path d="M12 5v14M5 12h14" />,
    search: <><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5" /></>,
    edit: <><path d="m15 5 4 4M5 19l4-1L20 7a2.8 2.8 0 0 0-4-4L5 14l-1 6Z" /></>,
    trash: <path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v5M14 11v5" />,
    chevron: <path d="m7 10 5 5 5-5" />,
    back: <path d="M20 12H4m6-6-6 6 6 6" />,
    more: <><circle cx="5" cy="12" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /></>,
    menu: <path d="M4 6h16M4 12h16M4 18h16" />,
    close: <path d="m6 6 12 12M6 18 18 6" />,
    refresh: <><path d="M20 5v5h-5M4 19v-5h5" /><path d="M6 7a7 7 0 0 1 12-1l2 4M4 14l2 4a7 7 0 0 0 12-1" /></>,
  }
  return <svg className={`icon ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>
}
