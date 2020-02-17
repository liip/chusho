module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  transform: {
    '^.+\\.stories\\.js$': '@storybook/addon-storyshots/injectFileName',
  },
  testMatch: ['<rootDir>src/**/?(*.)+(spec).[jt]s?(x)'],
  // Workaround that can be removed once we upgrade to Storybook 6
  // See https://github.com/storybookjs/storybook/issues/9279
  transformIgnorePatterns: ['node_modules/(?!react-syntax-highlighter)'],
};
