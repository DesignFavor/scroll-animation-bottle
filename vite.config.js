import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: 'localhost',
    cors: '*',
    hmr: {
      host: 'localhost',
      protocol: 'ws',
    },
  },
  build: {
    minify: true,
    sourcemap: true, // Enable sourcemaps for debugging
    manifest: true,
    outDir: 'build',
    rollupOptions: {
      input: './index.html', // Ensure it points to index.html
      output: {
        format: 'es', // Use ES module format
        entryFileNames: 'main.js',
        compact: true,
        globals: {},
      },
      external: [
        '/build/main.js', // Mark main.js as external
      ],
    },
  },
});