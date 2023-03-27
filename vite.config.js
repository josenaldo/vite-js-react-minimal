import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import eslint from 'vite-plugin-eslint'

export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react(), eslint()],
    server: {
      port: parseInt(env.VITE_PORT || '3005'),
    },
    // vite config
    define: {
      __APP_ENV__: env.APP_ENV,
    },
  }
})
