[![Build Status](https://img.shields.io/github/workflow/status/liip/chusho/test)](https://github.com/liip/chusho/actions)
[![npm Package](https://img.shields.io/npm/v/chusho)](https://www.npmjs.com/package/chusho)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/chusho)](https://bundlephobia.com/result?p=chusho)
[![GitHub](https://img.shields.io/github/license/liip/chusho)](https://github.com/liip/chusho/blob/master/LICENSE.md)

# Chūshō

A library of bare & accessible components and tools for Vue.js 3

👉️ [Documentation](https://www.chusho.dev/guide/)

## Packages

-   [chusho](https://github.com/liip/chusho/tree/master/packages/chusho/): the library core source code
-   [playground](https://github.com/liip/chusho/tree/master/packages/playground/): used to develop and test Chūshō’s components and tools
-   [docs](https://github.com/liip/chusho/tree/master/packages/docs/): Chūshō’s documentation website

## Contributing

### Project setup

Clone the repository, then install global dependencies to bootstrap the monorepo packages:

```
npm install
lerna bootstrap
```

Then see packages’ own README.

### Quode quality

From the root directory, you can run all the tests in a single command with:

```
npm test
```

#### Style

To ensure the code match the style with EsLint & Prettier:

```bash
npm run validate
```

Autofix as many offenses as possible:

```bash
npm run format
```

#### Tests

-   Unit tests are located in the [chusho](https://github.com/liip/chusho/tree/master/packages/chusho/) package
-   End-to-end tests are located in the [playground](https://github.com/liip/chusho/tree/master/packages/chusho/) package
