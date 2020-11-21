**This project is currently in active development, we’d love to have feedback on existing components but we do not recommend using them in production yet. Stay tuned for more components!**

[![Build Status](https://api.travis-ci.org/liip/chusho.svg?branch=master)](https://travis-ci.org/liip/chusho)
[![npm Package](https://img.shields.io/npm/v/chusho)](https://www.npmjs.com/package/chusho)

# Chūshō

A library of bare accessible Vue components and tools.

[Documentation](https://www.chusho.dev/guide/)

## Project setup

Clone the repository, then install global dependencies to bootstrap the monorepo packages:

```
npm install
lerna bootstrap
```

Then see packages’ own README.

## Packages

-   [chusho](https://github.com/liip/chusho/tree/master/packages/chusho/): the library main source code
-   [playground](https://github.com/liip/chusho/tree/master/packages/playground/): play with Chūshō’s components and tools
-   [docs](https://github.com/liip/chusho/tree/master/packages/docs/): Chūshō’s documentation website

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

### Tests

-   Unit tests are located in the [chusho](https://github.com/liip/chusho/tree/master/packages/chusho/) package
-   End-to-end tests are located in the [playground](https://github.com/liip/chusho/tree/master/packages/chusho/) package
