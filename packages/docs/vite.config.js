import { defineConfig } from 'vite';

import docGen from './plugins/docGen';

export default defineConfig({
  plugins: [docGen()],

  server: {
    port: 8080,
  },
});
