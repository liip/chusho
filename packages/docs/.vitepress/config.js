export default {
  lang: 'en',
  title: 'Chūshō',
  description:
    'A library of bare & accessible components and tools for Vue.js 3',

  lastUpdated: true,
  cleanUrls: true,

  head: [
    ['script', { src: '/showcase.js', type: 'module' }],
    ['link', { rel: 'preload', href: '/dist/showcase.css', as: 'style' }],
  ],

  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tag) => ['showcase-root'].includes(tag),
      },
    },
  },

  themeConfig: {
    logo: {
      light: '/logo.svg',
      dark: '/logo-dark.svg',
    },

    editLink: {
      pattern: 'https://github.com/liip/chusho/edit/main/packages/docs/:path',
      text: 'Edit this page on GitHub',
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/liip/chusho' }],

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Getting Started',
          link: '/guide/',
          items: [
            { text: 'Config', link: '/guide/config.md' },
            {
              text: 'Styling components',
              link: '/guide/styling-components.md',
            },
            { text: 'Using components', link: '/guide/using-components.md' },
            { text: 'Browsers support', link: '/guide/browsers-support.md' },
          ],
        },
        {
          text: 'Components',
          link: '/guide/components/',
          items: [
            { text: 'Alert', link: '/guide/components/alert.md' },
            { text: 'Button', link: '/guide/components/button.md' },
            { text: 'Checkbox', link: '/guide/components/checkbox.md' },
            { text: 'Collapse', link: '/guide/components/collapse.md' },
            { text: 'Combobox', link: '/guide/components/combobox.md' },
            { text: 'Dialog', link: '/guide/components/dialog.md' },
            { text: 'FormGroup', link: '/guide/components/formgroup.md' },
            { text: 'Icon', link: '/guide/components/icon.md' },
            { text: 'Label', link: '/guide/components/label.md' },
            { text: 'Menu', link: '/guide/components/menu.md' },
            { text: 'Picture', link: '/guide/components/picture.md' },
            { text: 'Radio', link: '/guide/components/radio.md' },
            { text: 'Select', link: '/guide/components/select.md' },
            { text: 'Tabs', link: '/guide/components/tabs.md' },
            { text: 'Textarea', link: '/guide/components/textarea.md' },
            { text: 'TextField', link: '/guide/components/textfield.md' },
          ],
        },
        {
          text: 'Directives',
          link: '/guide/directives/',
          items: [
            {
              text: 'Click Outside',
              link: '/guide/directives/click-outside.md',
            },
          ],
        },
      ],
    },

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2019-present Liip',
    },

    algolia: {
      appId: '0AUNCGL5SK',
      apiKey: '90f8fd3ff1c0ff211678bfd5fbe884b7',
      indexName: 'chusho',
    },
  },
};
