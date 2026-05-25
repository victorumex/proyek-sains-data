import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            // Mengembalikan fungsi "@" agar merujuk ke folder "src"
            "@": path.resolve(__dirname, "./src"),
        },
    },
})