import { defineConfig } from 'cypress';

export default defineConfig({
  retries: {
    runMode: 2,
  },

  e2e: {
    baseUrl: 'http://localhost:3000',
  },

  component: {
    viewportWidth: 800,
    viewportHeight: 600,
    devServer: {
      framework: 'vue',
      bundler: 'vite',
    },
  },
});
