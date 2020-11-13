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

::: tip Vue compatibility
Chūshō was started before Vue 3 was finalized. **At the moment it works only with Vue 2 and the Composition API plugin.** A [Vue 3 version](https://github.com/liip/chusho/pull/54) is in progress though. If your project doesn’t use the Composition API already, you should install and load it before Chūshō.
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

## Using components

Components aren’t registered automatically to take advantage of bundler’s [tree shaking](https://en.wikipedia.org/wiki/Tree_shaking) optimizations by default.

You need to register Chūshō’s components you’re using either globally, for example in your main entry point:

```js
import Vue from 'vue';
import { CBtn, CIcon } from 'chusho';

Vue.component('CBtn', CBtn);
Vue.component('CIcon', CIcon);
```

Or locally in the components they are used:

```vue
<template>
  <CToggle>
    <CToggleBtn>...</CToggleBtn>
    <CToggleContent>
      <!-- ... -->
    </CToggleContent>
  </CToggle>
</template>

<script>
import { CToggle, CToggleBtn, CToggleContent } from 'chusho';

export default {
  name: 'MyComponent',

  components: {
    CToggle,
    CToggleBtn,
    CToggleContent,
  },

  // ...
};
</script>
```
