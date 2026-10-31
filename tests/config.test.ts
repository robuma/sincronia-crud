import assert from 'node:assert/strict'
import test from 'node:test'
import { readSupabaseConfig } from '../src/lib/config.ts'

const development = {
  VITE_APP_ENV: 'development',
  VITE_SUPABASE_URL: 'https://wkhbkcggdfmemtgqmjpx.supabase.co',
  VITE_SUPABASE_PUBLISHABLE_KEY: 'sb_publishable_example_public_key',
}

test('accepts the development project and a publishable key', () => {
  assert.deepEqual(readSupabaseConfig(development), {
    environment: 'development',
    url: development.VITE_SUPABASE_URL,
    publishableKey: development.VITE_SUPABASE_PUBLISHABLE_KEY,
  })
})

test('rejects production database credentials in a development build', () => {
  assert.throws(() => readSupabaseConfig({ ...development,
    VITE_SUPABASE_URL: 'https://qcbxeirbogtwoaunzbsf.supabase.co',
  }), /proyecto de Supabase no corresponde/)
})

test('rejects secret keys in browser configuration', () => {
  assert.throws(() => readSupabaseConfig({ ...development,
    VITE_SUPABASE_PUBLISHABLE_KEY: 'sb_secret_never_expose_this_key',
  }), /clave publicable/)
})

test('rejects missing credentials with an actionable error', () => {
  assert.throws(() => readSupabaseConfig({ VITE_APP_ENV: 'development' }), /\.env\.local/)
})

test('requires an explicit valid environment', () => {
  assert.throws(() => readSupabaseConfig({ ...development, VITE_APP_ENV: 'staging' }), /VITE_APP_ENV/)
})

test('accepts production only with its own database project', () => {
  const config = readSupabaseConfig({ ...development,
    VITE_APP_ENV: 'production',
    VITE_SUPABASE_URL: 'https://qcbxeirbogtwoaunzbsf.supabase.co',
  })
  assert.equal(config.environment, 'production')
  assert.equal(config.url, 'https://qcbxeirbogtwoaunzbsf.supabase.co')
})
