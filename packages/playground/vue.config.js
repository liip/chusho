const path = require('path');

module.exports = {
  chainWebpack: (config) => {
    // Avoid EsLint issues caused by Lerna symlinking Chusho
    config.resolve.symlinks(false);

    // Prevent bundles from being injected twice in the page
    // https://github.com/Akryum/vue-cli-plugin-ssr/issues/158
    const htmlSsrPlugin = config.plugins.get('html-ssr');

    if (htmlSsrPlugin) {
      htmlSsrPlugin.store.get('args')[0].chunks = [];
    }
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
