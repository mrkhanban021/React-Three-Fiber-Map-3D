import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // برای اجازه دسترسی از هر IP
    port: 5173, // یا هر پورت دلخواه دیگه
  },
})
