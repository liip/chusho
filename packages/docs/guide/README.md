---
next: /guide/config.md
---

# Getting started

## Installation

Install Chūshō with your favorite package manager:

<CodeGroup>
  <CodeGroupItem title="npm" active>

```bash:no-line-numbers
npm install chusho
```

  </CodeGroupItem>

  <CodeGroupItem title="yarn">

```bash:no-line-numbers
yarn add chusho
```

  </CodeGroupItem>

  <CodeGroupItem title="pnpm">

```bash:no-line-numbers
pnpm add chusho
```

  </CodeGroupItem>
</CodeGroup>

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
