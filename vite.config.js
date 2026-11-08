import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base '/' is required: nested routes such as /collections/sofas load assets from the site root.
export default defineConfig({ base: '/', plugins: [react()] })
