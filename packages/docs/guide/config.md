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

## Available options

### components

Configure components globally, see [each component](/guide/components) page for available options.

-   **type:** `object`
-   **default:** `null`

This object accept the following properties, one for each component:

```ts
{
    alert: {},
    btn: {},
    dialog: {},
    icon: {},
    tabs: {},
    tabList: {},
    tab: {},
    tabPanels: {},
    tabPanel: {},
    toggle: {},
    toggleBtn: {},
    toggleContent: {},
}
```

### rtl

Define if the current document direction is Right-to-left. This is used internally to adapt some behaviors.

-   **type:** `function`
-   **default:**
    ```js
    function () {
      return document && document.dir === 'rtl';
    }
    ```
