module.exports = {
  title: 'Chūshō',
  description: 'A library of bare accessible Vue.js components and tools.',
  plugins: [require('./plugins/docgen'), 'live'],
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
          children: ['config'],
        },
        {
          title: 'Components',
          collapsable: false,
          path: '/guide/components/',
          children: [
            'components/button.md',
            'components/flex.md',
            'components/icon.md',
            'components/tabs.md',
            'components/toggle.md',
          ],
        },
        {
          title: 'Presets',
          collapsable: false,
          path: '/guide/presets/',
          children: ['presets/tailwind.md'],
        },
      ],
    },
  },
};
