import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import vercel from 'vite-plugin-vercel'

export default defineConfig(() => {
  return {
    server: {
      port: process.env.PORT,
    },
    plugins: [
      react(),
      tailwindcss(),
      vercel(),
    ],
    define: {
      __APP_ENV__: process.env.VITE_VERCEL_ENV,
    },
  }
})
