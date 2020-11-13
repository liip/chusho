import typescript from 'rollup-plugin-typescript2';
import resolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import replace from 'rollup-plugin-replace';

const builds = {
  'cjs-dev': {
    output: {
      file: './dist/chusho.js',
    },
    format: 'cjs',
    mode: 'development',
  },
  'cjs-prod': {
    output: {
      file: './dist/chusho.min.js',
    },
    format: 'cjs',
    mode: 'production',
  },
  'umd-dev': {
    output: {
      file: './dist/chusho.umd.js',
    },
    format: 'umd',
    mode: 'development',
  },
  'umd-prod': {
    output: {
      file: './dist/chusho.umd.min.js',
    },
    format: 'umd',
    mode: 'production',
  },
  es: {
    output: {
      dir: 'dist/esm',
      preserveModules: true,
      preserveModulesRoot: 'src',
    },
    format: 'es',
    mode: 'development',
  },
};

function genConfig({ input, output, format, mode }) {
  const isProd = mode === 'production';
  input = input || './src/chusho.ts';

  return {
    input,
    output: {
      ...output,
      exports: 'named',
      format: format,
      globals: {
        vue: 'Vue',
      },
      name: format === 'umd' ? 'Chusho' : undefined,
    },
    external: ['vue'],
    plugins: [
      resolve(),
      typescript({
        typescript: require('typescript'),
        tsconfigOverride: {
          compilerOptions: {
            // ESM: transform most recent features such as optional chaining and nullish coalescing
            // since those are currently erroring when using Webpack 4 if not being transpiled first
            target: format === 'es' ? 'es2019' : 'es5',
          },
        },
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
