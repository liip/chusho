module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier',
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    '@typescript-eslint/explicit-module-boundary-types': 0,
    'vue/multi-word-component-names': 0,
  },
  overrides: [
    {
      files: ['**/*.{js,vue}'],
      rules: {
        '@typescript-eslint/no-var-requires': 0,
        '@typescript-eslint/no-non-null-assertion': 0,
      },
    },
    {
      files: ['**/*.spec.{j,t}s', '**/test/**/*', '**/__mocks__/**'],
      globals: {
        vi: true,
        describe: true,
        it: true,
        expect: true,
        beforeEach: true,
        afterEach: true,
        beforeAll: true,
        afterAll: true,
      },
    },
    {
      files: ['**/cypress/**/*'],
      plugins: ['cypress'],
      env: {
        mocha: true,
        'cypress/globals': true,
      },
      rules: {
        strict: 'off',
      },
    },
  ],
};
