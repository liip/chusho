---
next: /guide/components/
---

# Using components

Components aren’t registered automatically to take advantage of bundler’s [tree-shaking](https://en.wikipedia.org/wiki/Tree_shaking) optimizations by default.

You need to register Chūshō’s components you want to use either globally, for example in your main entry point:

```js{6-7}
import { createApp } from 'vue';
import { CBtn, CIcon } from 'chusho';

const app = createApp(App);

app.component('CBtn', CBtn);
app.component('CIcon', CIcon);
```

Or locally in the components they are used:

```vue{11,17-19}
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
