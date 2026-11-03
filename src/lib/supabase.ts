import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '../types/database'
import { readSupabaseConfig } from './config'

let client: SupabaseClient<Database> | undefined

/** Cliente compartido. Usar al iniciar una operación, no al importar una pantalla. */
export function getSupabase(): SupabaseClient<Database> {
  if (!client) {
    const config = readSupabaseConfig(import.meta.env)
    client = createClient<Database>(config.url, config.publishableKey, {
      auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
    })
  }
  return client
}
