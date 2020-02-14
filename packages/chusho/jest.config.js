module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  transform: {
    '^.+\\.stories\\.js$': '@storybook/addon-storyshots/injectFileName',
  },
  testMatch: ['<rootDir>src/**/?(*.)+(spec).[jt]s?(x)'],
};
