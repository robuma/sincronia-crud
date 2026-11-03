export function hasSupabaseConfig(env: Record<string, string | undefined>): boolean {
  return Boolean(
    env.VITE_APP_ENV &&
      env.VITE_SUPABASE_URL &&
      env.VITE_SUPABASE_PUBLISHABLE_KEY,
  )
}

export function paginateClientes<T>(items: T[], pageSize: number, page: number) {
  const safePageSize = Math.max(1, pageSize)
  const totalItems = items.length
  const totalPages = Math.max(1, Math.ceil(totalItems / safePageSize))
  const safePage = Math.min(Math.max(page, 1), totalPages)
  const start = (safePage - 1) * safePageSize
  const end = start + safePageSize

  return {
    items: items.slice(start, end),
    page: safePage,
    totalPages,
    totalItems,
  }
}
