/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

module.exports = {
  stories: ['../../src/**/*.stories.(js|jsx|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-actions',
    {
      name: '@storybook/addon-docs',
      options: {
        babelOptions: {
          presets: [
            [
              '@vue/cli-plugin-babel/preset',
              {
                jsx: false,
              },
            ],
          ],
        },
      },
    },
    '@storybook/addon-knobs',
    '@storybook/addon-links',
  ],
  webpackFinal: config => {
    /**
     * Resolve custom paths starting with "@" just like Vue CLI does
     */
    config.resolve.alias['@'] = path.resolve(__dirname, '../../src');

    /**
     * Enable docs props table for components made as pure TypeScript files
     */
    config.module.rules.push({
      // We should match only component files here, not other TypeScript files
      test: /\/C(\w)+\/C(\w)+\.ts$/,
      include: [path.resolve(__dirname, '../../src/components')],
      use: 'vue-docgen-loader',
      enforce: 'post',
    });

    return config;
  },
};
