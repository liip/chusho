module.exports = {
  title: 'Chūshō',
  description: 'A library of bare accessible Vue.js components and tools.',
  plugins: [require('./plugins/docgen'), 'live'],
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'Github', link: 'https://github.com/liip/chusho' },
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
      ],
    },
  },
};
