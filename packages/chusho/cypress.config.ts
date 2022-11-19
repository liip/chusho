import coverage from '@cypress/code-coverage/task';
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

    setupNodeEvents(on, config) {
      coverage(on, config);

      return config;
    },
  },
});
