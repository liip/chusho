# Configuration

Chūshō options can be set by passing an object as the second argument of `app.use` when installing it:

```js{6-14}
import { createApp } from 'vue';
import Chusho from 'chusho';

const app = createApp(App);

app.use(Chusho, {
    components: {
        alert: {
            // Alert component options
        },
        // Other components options…
    },
    // Other options…
});
```

## TypeScript

If you’re using TypeScript, the library expose a `defineConfig` function to help you get types hints:

```ts{8,14}
import Chusho, { defineConfig } from 'chusho';
import { createApp } from 'vue';

const app = createApp(App);

app.use(
  Chusho,
  defineConfig({
    components: {
      alert: {
        // …
      },
    },
  })
);
```

## Dedicated config file

You can also put your configuration in a dedicated file, for example `chusho.config.ts`:

```ts
import { defineConfig } from 'chusho';

export default defineConfig({
  components: {
    alert: {
      // …
    },
  },
});
```

Now import and provide this config where you install Chūshō, usually `main.{js,ts}`:

```ts{4,8}
import Chusho from 'chusho';
import { createApp } from 'vue';

import chushoConfig from './chusho.config.ts';

const app = createApp(App);

app.use(Chusho, chushoConfig);
```

### Hot module replacement

#### Using Vite

To enable HMR of the config in a Vite environment, add the following code to the file where you imported `chusho.config.ts`:

```ts
import Chusho, { $chusho, mergeDeep } from 'chusho';

if (import.meta.hot) {
  // The path below should be the same as the `import chushoConfig` above
  import.meta.hot.accept('./chusho.config.ts', (newConfig) => {
    mergeDeep($chusho.options, newConfig.default);
  });
}
```

#### Using webpack

To enable HMR of the config in a webpack environment, add the following code to the file where you imported `chusho.config.ts`:

```ts
import Chusho, { $chusho, mergeDeep } from 'chusho';

if (import.meta.webpackHot) {
  // The path below should be the same as the `import chushoConfig` above
  import.meta.webpackHot.accept('./chusho.config.ts', (newConfig) => {
    mergeDeep($chusho.options, newConfig.default);
  });
}
```

## Available options

### components

Configure components globally, see [each component](/guide/components/) page for available options.

- **type:** `object`
- **default:** `null`

This object accept the following properties, one for each component:

```ts
{
    alert: {},
    btn: {},
    checkbox: {},
    collapse: {},
    collapseBtn: {},
    collapseContent: {},
    dialog: {},
    formGroup: {},
    icon: {},
    label: {},
    menu: {},
    menuBtn: {},
    menuItem: {},
    menuLink: {},
    menuList: {},
    menuSeparator: {},
    picture: {},
    radio: {},
    select: {},
    selectBtn: {},
    selectGroup: {},
    selectGroupLabel: {},
    selectOption: {},
    selectOptions: {},
    tabs: {},
    tabList: {},
    tab: {},
    tabPanels: {},
    tabPanel: {},
    textField: {},
    textarea: {},
}
```

### rtl

Define if the current document direction is Right-to-left. This is used internally to adapt some behaviors.

- **type:** `function`
- **default:**
  ```js
  function () {
    return document && document.dir === 'rtl';
  }
  ```
