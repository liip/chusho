const path = require('path');

module.exports = {
  title: 'Chūshō',
  description:
    'A library of bare & accessible components and tools for Vue.js 3',
  plugins: [require('./plugins/docgen')],
  themeConfig: {
    lastUpdated: 'Last updated',
    repo: 'liip/chusho',
    docsDir: 'packages/docs',
    editLinks: true,
    editLinkText: 'Edit on GitHub',
    algolia: {
      apiKey: 'b4e0ea7e2c0655dd7ed73efc3acfff0c',
      indexName: 'chusho',
    },
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
    ],
    sidebar: {
      '/guide/': [
        {
          title: 'Getting Started',
          path: '/guide/',
          collapsable: false,
          children: ['config', 'styling-components'],
        },
        {
          title: 'Components',
          collapsable: false,
          path: '/guide/components/',
          children: [
            'components/alert.md',
            'components/button.md',
            'components/dialog.md',
            'components/icon.md',
            'components/tabs.md',
            'components/toggle.md',
          ],
        },
      ],
    },
  },
  chainWebpack: (config) => {
    // For some reasons, Chῡshō’s own dependencies can’t be resolved
    // despite being present in docs’ node_modules
    // Probably related to symlinks but the usual trick doesn’t work
    // https://github.com/vuejs/vuepress/issues/193
    config.resolve.modules.add(
      path.resolve(__dirname, '../../chusho/node_modules')
    );
  },
};
