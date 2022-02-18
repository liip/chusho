const { path } = require('@vuepress/utils');

module.exports = {
  title: 'Chūshō',
  description:
    'A library of bare & accessible components and tools for Vue.js 3',

  head: [['link', { rel: 'stylesheet', href: '/dist/tailwind.css' }]],

  plugins: [
    [
      '@vuepress/plugin-docsearch',
      {
        appId: '0AUNCGL5SK',
        apiKey: '90f8fd3ff1c0ff211678bfd5fbe884b7',
        indexName: 'chusho',
      },
    ],
    [
      '@vuepress/register-components',
      {
        componentsDir: path.resolve(__dirname, './components'),
        getComponentName: (filename) =>
          path.trimExt(filename.replace(/\/|\\/g, '')),
      },
    ],
    [require('./plugins/docgen'), true],
  ],

  themeConfig: {
    lastUpdated: 'Last updated',
    repo: 'liip/chusho',
    docsDir: 'packages/docs',
    editLinks: true,
    editLinkText: 'Edit on GitHub',
    contributors: false,
    navbar: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
    ],
    sidebar: {
      '/guide/': [
        {
          text: 'Getting Started',
          link: '/guide/',
          isGroup: true,
          children: [
            '/guide/config.md',
            '/guide/styling-components.md',
            '/guide/using-components.md',
            '/guide/builds.md',
          ],
        },
        {
          text: 'Components',
          link: '/guide/components/',
          isGroup: true,
          children: [
            '/guide/components/alert.md',
            '/guide/components/button.md',
            '/guide/components/collapse.md',
            '/guide/components/dialog.md',
            '/guide/components/icon.md',
            '/guide/components/picture.md',
            '/guide/components/select.md',
            '/guide/components/tabs.md',
            '/guide/components/textfield.md',
          ],
        },
        {
          text: 'Directives',
          link: '/guide/directives/',
          isGroup: true,
          children: ['/guide/directives/click-outside.md'],
        },
      ],
    },
    themePlugins: {
      activeHeaderLinks: false,
    },
  },

  bundler: '@vuepress/bundler-vite',
  bundlerConfig: {
    viteOptions: {
      optimizeDeps: {
        exclude: ['chusho'],
      },
    },
  },
};
