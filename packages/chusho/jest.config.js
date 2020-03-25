module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  transform: {
    '^.+\\.stories\\.js$': '@storybook/addon-storyshots/injectFileName',
  },
  testMatch: ['<rootDir>src/**/?(*.)+(spec).[jt]s?(x)'],
  moduleFileExtensions: ['ts', 'js', 'd.ts', 'json', 'jsx', 'tsx', 'node'],
  setupFiles: ['<rootDir>config/jest/setup.js'],
  // Workaround that can be removed once we upgrade to Storybook 6
  // See https://github.com/storybookjs/storybook/issues/9279
  transformIgnorePatterns: ['node_modules/(?!react-syntax-highlighter)'],
};
