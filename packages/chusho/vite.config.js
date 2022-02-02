import path from 'path';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

const libraryName = 'Chusho';
const builds = [
  {
    output: {
      format: 'cjs',
      name: libraryName,
    },
  },
  {
    output: {
      format: 'umd',
      name: libraryName,
    },
  },
  {
    output: {
      format: 'es',
      dir: 'dist/esm',
      preserveModules: true,
      preserveModulesRoot: 'src',
    },
  },
];

export default defineConfig(({ mode }) => {
  const isProd = mode === 'production';

  const config = {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        chusho: path.resolve(__dirname, 'lib/chusho.ts'),
      },
    },

    build: {
      minify: false,
      lib: {
        entry: path.resolve(__dirname, 'lib/chusho.ts'),
        name: libraryName,
        fileName: (format) => {
          return format === 'es' ? `[name].js` : `chusho.${format}.js`;
        },
      },
      rollupOptions: {
        external: ['vue'],
        output: builds.map((build) => {
          return {
            ...build.output,
            exports: 'named',
            globals: {
              vue: 'Vue',
            },
          };
        }),
      },
    },

    plugins: [vue()],
  };

  if (isProd) {
    // The library emits warnings and other helpful messages for users in development.
    // They are wrapped in NODE_ENV conditions to be removed from production bundles.
    // This prevents them from being replaced by Vite now and kept in our bundles.
    config.define = {
      'process.env.NODE_ENV': 'process.env.NODE_ENV',
    };

    // Do not copy playground public files (like favicon.ico) to the library dist folder
    config.publicDir = false;
  }

  return config;
});
