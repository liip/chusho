# Tailwind

A configuration preset to easily integrate with [Tailwind CSS](https://tailwindcss.com/).

## Preconfigured components

### Flex

- `containerClass` set to `flex flex-wrap`
- `defaultWidth` set to `w-full`
- `gaps` (both `x` and `y`) populated using the [spacing settings](https://tailwindcss.com/docs/customizing-spacing/)
- `widths` populated using the [width settings](https://tailwindcss.com/docs/width/)

## Installation

Install with npm:

```bash
npm install @chusho/preset-tailwind
```

Or yarn:

```bash
yarn add @chusho/preset-tailwind
```

Now you can import the preset, extend it and pass its result as Chūshō’s config:

```js
import Vue from 'vue';
import Chusho, { utils } from 'chusho';
import chushoPresetTailwind from '@chusho/preset-tailwind';
// Load your own Tailwind config, real path might be different
import tailwindConfig from '../tailwind.config.js';

Vue.use(
  Chusho,
  // We provide a simple utility method to merge your own config with the preset defaults
  utils.mergeDeep(
    // Call the preset with the Tailwind config as parameter
    chushoPresetTailwind(tailwindConfig),
    {
      // Here goes your own config
    }
  )
);
```

## TypeScript

In a TypeScript environment, you can cast the config object to benefit from autocomplete:

```ts{2,9}
// ...
import Chusho, { ChushoUserOptions, utils } from 'chusho';
// ...

Vue.use(
  Chusho,
  utils.mergeDeep(chushoPresetTailwind(tailwindConfig), {
    // Here goes your own config
  } as ChushoUserOptions)
);
```

Depending on your TypeScript config, you may encounter the following error:

> Could not find a declaration file for module '../tailwind.config.js'. '../tailwind.config.js' implicitly has an 'any' type.ts(7016)

You can get rid of it by adding the following code in one of your definition files (`.d.ts`):

```ts
declare module '*/tailwind.config.js';
```
