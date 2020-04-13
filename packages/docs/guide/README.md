---
next: /guide/config.html
---

# Getting started

::: warning
**Chūshō is currently in active development.**

Existing components should be stable but they are pretty young and some edge cases might have been missed. You’re more than welcome to try them now and [report any problem](https://github.com/liip/chusho/issues) you might encounter.

We’ll add more components before releasing the first stable version, you can [follow the progress](https://github.com/liip/chusho/projects/1).
:::

Install Chūshō and its dependencies with npm:

```bash
npm install chusho @vue/composition-api
```

Or yarn:

```bash
yarn add chusho @vue/composition-api
```

::: tip Composition API
Chūshō’s target is Vue 3, but since it’s not finalized yet, we use Vue 2 with the Composition API plugin in the meantime. If your project doesn’t use the Composition API already, you should install and load it before Chūshō.
:::

In your main entry point, provide Chūshō to your app with:

```js
import Vue from 'vue';
import CompositionApi from '@vue/composition-api';
import Chusho from 'chusho';

Vue.use(CompositionApi);
Vue.use(Chusho, {
  // Here goes your own Chūshō config
});
```

See the [config page](/guide/config.html) for available options.
