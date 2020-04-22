[![Build Status](https://api.travis-ci.org/liip/chusho.svg?branch=master)](https://travis-ci.org/liip/chusho)
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

## Quode quality

### Style

To ensure the code match the style with EsLint & Prettier:

```bash
npm run validate
```

Autofix as many offenses as possible:

```bash
npm run format
```

### Unit tests

Run the unit test suites once with Jest:

```bash
npm run test:unit
```

Or start Jest in watch mode:

```bash
npm run test:unit:dev
```

### End-to-end tests

To run the end-to-end tests, you need to start the development server first:

```bash
npm start
```

Then, in another process, you can start Cypress in interactive mode (great for development):

```bash
npm run test:e2e:dev
```

Or in headless mode (great to quickly check once that the suites pass):

```
npm run test:e2e:headless
```
