module.exports = {
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/recommended',
    'eslint:recommended',
    '@vue/typescript/recommended',
    '@vue/prettier',
    '@vue/prettier/@typescript-eslint',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    '@typescript-eslint/no-non-null-assertion': 0,
  },
  overrides: [
    {
      files: ['./src/**/*.spec.{j,t}s'],
      env: {
        jest: true,
      },
    },
    {
      files: ['./src/**/*.spec.e2e.{j,t}s'],
      plugins: ['cypress'],
      env: {
        'cypress/globals': true,
      },
    },
  ],
};
