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
    'prettier/vue',
    'prettier/@typescript-eslint',
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
  },
  overrides: [
    {
      files: ['**/*.{js,vue}'],
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': 0,
        '@typescript-eslint/no-var-requires': 0,
        '@typescript-eslint/no-non-null-assertion': 0,
      },
    },
    {
      files: ['**/*.spec.{j,t}s', '**/jest/**/*', '**/__mocks__/**'],
      env: {
        jest: true,
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
