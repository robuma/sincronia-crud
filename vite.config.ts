import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import { validateBuildConfig } from './src/lib/config.ts'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  validateBuildConfig(loadEnv(mode, process.cwd(), 'VITE_'))
  return { plugins: [react()] }
})
