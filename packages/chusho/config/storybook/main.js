/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

module.exports = {
  stories: ['../../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-a11y'],
  webpackFinal: (config) => {
    /**
     * Resolve custom paths starting with "@" just like Vue CLI does
     */
    config.resolve.alias['@'] = path.resolve(__dirname, '../../src');

    return config;
  },
};
