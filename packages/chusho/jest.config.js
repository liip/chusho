module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  transform: {
    '^.+\\.stories\\.js$': '@storybook/addon-storyshots/injectFileName',
  },
  testMatch: ['<rootDir>src/**/?(*.)+(spec).[jt]s?(x)'],
  moduleFileExtensions: ['ts', 'js', 'd.ts', 'json', 'jsx', 'tsx', 'node'],
  setupFiles: ['<rootDir>config/jest/setup.js'],
  globals: {
    'ts-jest': {
      diagnostics: {
        ignoreCodes: [6059, 18002, 18003, 7016],
      },
    },
  },
};
