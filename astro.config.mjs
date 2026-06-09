// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  // Reemplaza esto con tu URL de GitHub Pages
  // site: 'https://TU_USUARIO.github.io',
  // base: '/CodeCasters', // El nombre de tu repositorio

  vite: {
    plugins: [tailwindcss()]
  },

  adapter: cloudflare()
});