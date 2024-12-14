import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: 'localhost',
    cors: {
      origin: '*', // Allow all origins
    },
    hmr: {
      host: 'localhost',
      protocol: 'ws',
    },
  },
  build: {
    outDir: 'build', // Output folder
    emptyOutDir: true, // Clears the folder during rebuild
    minify: true, // Minify the output
    sourcemap: true, // Enable sourcemaps for debugging
    manifest: true, // Generate a manifest file
    rollupOptions: {
      input: './index.html', // Entry point
      output: {
        entryFileNames: 'main.js', // Ensure the file is named main.js
        format: 'es', // ES Module format
        compact: true,
      },
    },
  },
});
