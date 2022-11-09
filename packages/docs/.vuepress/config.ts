import { docsearchPlugin } from '@vuepress/plugin-docsearch';
import { registerComponentsPlugin } from '@vuepress/plugin-register-components';
import { shikiPlugin } from '@vuepress/plugin-shiki';
import { defaultTheme } from '@vuepress/theme-default';
import { viteBundler } from 'vuepress';
import { defineUserConfig } from 'vuepress';

import { path } from '@vuepress/utils';

import docGenPlugin from './plugins/docgen';

export default defineUserConfig({
  title: 'Chūshō',
  description:
    'A library of bare & accessible components and tools for Vue.js 3',

  head: [['link', { rel: 'stylesheet', href: '/dist/tailwind.css' }]],

  markdown: {
    code: {
      lineNumbers: false,
    },
  },

  plugins: [
    docsearchPlugin({
      appId: '0AUNCGL5SK',
      apiKey: '90f8fd3ff1c0ff211678bfd5fbe884b7',
      indexName: 'chusho',
    }),

    registerComponentsPlugin({
      componentsDir: path.resolve(__dirname, './components'),
      getComponentName: (filename) =>
        path.trimExt(filename.replace(/\/|\\/g, '')),
    }),

    shikiPlugin({
      theme: 'one-dark-pro',
    }),

    docGenPlugin(),
  ],

  theme: defaultTheme({
    lastUpdated: true,
    repo: 'liip/chusho',
    docsDir: 'packages/docs',
    editLink: true,
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
          children: [
            '/guide/components/alert.md',
            '/guide/components/button.md',
            '/guide/components/checkbox.md',
            '/guide/components/collapse.md',
            '/guide/components/dialog.md',
            '/guide/components/formgroup.md',
            '/guide/components/icon.md',
            '/guide/components/label.md',
            '/guide/components/menu.md',
            '/guide/components/picture.md',
            '/guide/components/radio.md',
            '/guide/components/select.md',
            '/guide/components/tabs.md',
            '/guide/components/textarea.md',
            '/guide/components/textfield.md',
          ],
        },
        {
          text: 'Directives',
          link: '/guide/directives/',
          children: ['/guide/directives/click-outside.md'],
        },
      ],
    },
    themePlugins: {
      activeHeaderLinks: false,
    },
  }),

  bundler: viteBundler({
    viteOptions: {
      optimizeDeps: {
        exclude: ['chusho'],
      },
    },
  }),
});
