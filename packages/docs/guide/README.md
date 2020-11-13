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
