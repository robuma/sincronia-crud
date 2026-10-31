import { readSupabaseConfig } from '../src/lib/config.ts'

const config = readSupabaseConfig(process.env)
if (config.environment !== 'development') {
  throw new Error('Esta comprobación local solo admite la base de desarrollo.')
}

const response = await fetch(`${config.url}/rest/v1/clientes?select=id&limit=0`, {
  headers: { apikey: config.publishableKey },
  signal: AbortSignal.timeout(15_000),
})

if (!response.ok) {
  throw new Error(`Supabase devolvió HTTP ${response.status}. Revisá el proyecto y los permisos.`)
}

console.log('Supabase desarrollo: conexión y lectura pública correctas. No se cambiaron registros.')
