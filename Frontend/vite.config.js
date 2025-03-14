import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(),react()],
  // server: {
  //   host: '0.0.0.0', // This will make your app accessible from other devices on the same local network
  //   port: 5173,       // (optional) you can specify the port, though 5173 is the default
  // },
})
