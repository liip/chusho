import { defineConfig } from 'cypress';

export default defineConfig({
  video: false,

  component: {
    viewportWidth: 800,
    viewportHeight: 600,
    devServer: {
      framework: 'vue',
      bundler: 'vite',
    },
  },
});
