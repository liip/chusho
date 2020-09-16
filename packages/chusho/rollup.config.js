import path from 'path';
import typescript from 'rollup-plugin-typescript2';
import resolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import replace from 'rollup-plugin-replace';

const builds = {
  'cjs-dev': {
    outFile: 'chusho.js',
    format: 'cjs',
    mode: 'development',
  },
  'cjs-prod': {
    outFile: 'chusho.min.js',
    format: 'cjs',
    mode: 'production',
  },
  'umd-dev': {
    outFile: 'chusho.umd.js',
    format: 'umd',
    mode: 'development',
  },
  'umd-prod': {
    outFile: 'chusho.umd.min.js',
    format: 'umd',
    mode: 'production',
  },
  es: {
    outFile: 'chusho.module.js',
    format: 'es',
    mode: 'development',
  },
};

function genConfig({ outFile, format, mode }) {
  const isProd = mode === 'production';
  return {
    input: './src/chusho.ts',
    output: {
      file: path.join('./dist', outFile),
      exports: 'named',
      format: format,
      globals: {
        vue: 'Vue',
        '@vue/composition-api': 'vueCompositionApi',
        'portal-vue': 'PortalVue',
        'vue-client-only': 'ClientOnly',
      },
      name: format === 'umd' ? 'Chusho' : undefined,
    },
    external: ['vue', '@vue/composition-api', 'portal-vue', 'vue-client-only'],
    plugins: [
      resolve(),
      typescript({
        typescript: require('typescript'),
      }),
      isProd &&
        replace({
          'process.env.NODE_ENV': JSON.stringify(
            isProd ? 'production' : 'development'
          ),
        }),
      isProd && terser(),
    ].filter(Boolean),
  };
}

function getAllBuilds() {
  return Object.keys(builds).map((key) => genConfig(builds[key]));
}
let buildConfig;

if (process.env.TARGET) {
  buildConfig = genConfig(builds[process.env.TARGET]);
} else {
  buildConfig = getAllBuilds();
}

export default buildConfig;
