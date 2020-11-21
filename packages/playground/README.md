# Chūshō playground

A Vue app to play with Chūshō’s components and tools.

## Usage

Ensure you have [bootstraped the monorepo](https://github.com/liip/chusho#project-setup) and [build a local version of the library](https://github.com/liip/chusho/tree/master/packages/chusho#build-for-production) first.

Then start the development server:

```bash
npm start
```

## Playing while modifying the library

If you make changes in the core library, you must manually build it again for the playground to pick it up.

## Quode quality

### End-to-end tests

This app is used for a suite of end-to-end tests. To run it, you need to start the development server first:

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
