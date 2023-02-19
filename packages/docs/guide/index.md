# Getting started

:::: tip NOTICE
Chūshō requires Vue.js 3
::::

## Installation

Install Chūshō with your favorite package manager:

::: code-group

```bash [npm]
npm install chusho
```

```bash [yarn]
yarn add chusho
```

```bash [pnpm]
pnpm add chusho
```

:::

## Setup

In your main entry point, enable Chūshō with:

```js
import Chusho from 'chusho';
import { createApp } from 'vue';

const app = createApp(App);

app.use(Chusho, {
  // Here goes the config
});
```

See the [configuration](/guide/config.html) for available options.
