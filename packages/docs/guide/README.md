---
next: /guide/config.md
---

# Getting started

## Installation

Install Chūshō with your favorite package manager:

<CodeGroup>
  <CodeGroupItem title="npm" active>

```bash
npm install chusho
```

  </CodeGroupItem>

  <CodeGroupItem title="yarn">

```bash
yarn add chusho
```

  </CodeGroupItem>

  <CodeGroupItem title="pnpm">

```bash
pnpm add chusho
```

  </CodeGroupItem>
</CodeGroup>

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
