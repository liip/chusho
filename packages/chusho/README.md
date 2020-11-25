[![Build Status](https://img.shields.io/github/workflow/status/liip/chusho/test)](https://github.com/liip/chusho/actions)
[![npm Package](https://img.shields.io/npm/v/chusho)](https://www.npmjs.com/package/chusho)

# Chūshō

A library of bare accessible Vue components and tools.

[Documentation](https://www.chusho.dev/guide/)

## Useful commands

### Compiles and hot-reloads for development

This will initiate the development environment using [Storybook](https://storybook.js.org/).

```
npm start
```

### Build for production

Rollup will create the various bundles in the `dist` folder.

```
npm run build
```

You can also run the build in watch mode with:

```
npm run build:watch
```

To speed it up, for example during development, you can target a specific bundle, here the ES build:

```
TARGET=es npm run build:watch
```

See `rollup.config.js` for available targets.

## Quode quality

### Unit tests

Run the unit test suites once with Jest:

```bash
npm run test:unit
```

Or start Jest in watch mode:

```bash
npm run test:unit:dev
```
