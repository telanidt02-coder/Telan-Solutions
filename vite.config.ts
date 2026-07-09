import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');

  // Automatically detect if building on GitHub Actions for GitHub Pages
  const isGithubActions = process.env.GITHUB_ACTIONS === 'true';
  const base = isGithubActions ? '/Telan-Solutions/' : '/';

  return {
    base: '/Telan-Solutions/',
    plugins: [react(), tailwindcss()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        input: 'index.html', // Explicitly set the entry point to HTML, not server.ts
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
