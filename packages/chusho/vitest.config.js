import { resolve } from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: [resolve(__dirname, 'test/setup.js')],
    coverage: {
      reporter: ['html', 'lcov', 'text'],
      include: ['lib/**/*.ts'],
      exclude: ['**/__mocks__/**'],
    },
  },
});
