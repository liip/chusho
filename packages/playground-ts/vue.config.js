/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

module.exports = {
  // Avoid EsLint issues caused by Lerna symlinking Chusho
  chainWebpack: (config) => {
    config.resolve.symlinks(false);
  },
  configureWebpack: {
    resolve: {
      alias: {
        // Prevent webpack from resolving local Chucho's Vue from its own dependencies
        // otherwise Vue end-up twice in the bundle and cause many issues.
        // See https://github.com/vuejs/vue-cli/issues/4271
        vue$: path.resolve('./node_modules/vue/dist/vue.runtime.esm.js'),
      },
    },
  },
  devServer: {
    port: 3000,
  },
};
