import { resolve } from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: [resolve(__dirname, 'test/setup.js')],
    coverage: {
      reporter: ['lcov'],
      include: ['lib/**/*.ts'],
      exclude: ['**/__mocks__/**', 'lib/components/**'],
      reportsDirectory: 'coverage/vitest',
    },
  },
});
