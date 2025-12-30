import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {
      REACT_APP_API_URL: 'https://us-central1-dnde-f4e90.cloudfunctions.net/api'
    }
  }
})
