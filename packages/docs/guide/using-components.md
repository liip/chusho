# Using components

Components aren’t registered automatically to take advantage of bundler’s [tree-shaking](https://en.wikipedia.org/wiki/Tree_shaking) optimizations by default.

You need to register Chūshō’s components you want to use either globally, for example in your main entry point:

```js{2,8-9}
import { createApp } from 'vue';
import { CBtn, CIcon } from 'chusho';

const app = createApp(App);

app.use(Chusho, { ... });

app.component('CBtn', CBtn);
app.component('CIcon', CIcon);
```

Or locally in the components they are used:

```vue{11,15-17}
<template>
    <CCollapse>
        <CCollapseBtn>...</CCollapseBtn>
        <CCollapseContent>
            <!-- ... -->
        </CCollapseContent>
    </CCollapse>
</template>

<script setup>
import { CCollapse, CCollapseBtn, CCollapseContent } from 'chusho';

export default {
    components: {
        CCollapse,
        CCollapseBtn,
        CCollapseContent,
    },
};
</script>
```

You can also use a plugin like [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components/) to auto-import components on-demand.
