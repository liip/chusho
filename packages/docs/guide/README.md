---
next: /guide/config
---

# Getting started

## Installation

Install Chūshō with npm:

```bash
npm install chusho
```

Or yarn:

```bash
yarn add chusho
```

## Setup

In your main entry point, enable Chūshō with:

```js
import { createApp } from 'vue';
import Chusho from 'chusho';

const app = createApp(App);

app.use(Chusho, {
    // Here goes the config
});
```

See the [configuration](/guide/config.html) for available options.

## Using components

You need to register Chūshō’s components you want to use either globally, for example in your main entry point:

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
