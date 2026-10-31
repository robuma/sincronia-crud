export type AppEnvironment = 'development' | 'production'

export const SUPABASE_PROJECTS: Record<AppEnvironment, string> = {
  development: 'wkhbkcggdfmemtgqmjpx',
  production: 'qcbxeirbogtwoaunzbsf',
}

export interface SupabaseConfig {
  environment: AppEnvironment
  url: string
  publishableKey: string
}

export function readSupabaseConfig(input: Record<string, string | undefined>): SupabaseConfig {
  const environment = input.VITE_APP_ENV
  if (environment !== 'development' && environment !== 'production') {
    throw new Error('VITE_APP_ENV debe ser development o production.')
  }

  const url = input.VITE_SUPABASE_URL?.trim()
  const publishableKey = input.VITE_SUPABASE_PUBLISHABLE_KEY?.trim()
  if (!url || !publishableKey) {
    throw new Error('Configurá Supabase en .env.local siguiendo el README.')
  }

  if (url !== `https://${SUPABASE_PROJECTS[environment]}.supabase.co`) {
    throw new Error('El proyecto de Supabase no corresponde al ambiente seleccionado.')
  }

  if (!publishableKey.startsWith('sb_publishable_')) {
    throw new Error('Usá una clave publicable de Supabase; las claves secretas no pertenecen al navegador.')
  }

  return { environment, url, publishableKey }
}
