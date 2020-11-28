# Contributing

## Project setup

Clone the repository, then install the dependencies and bootstrap the monorepo:

```
npm install
lerna bootstrap
```

## Making changes

The easiest way to make changes and see them live is to run Rollup and the playground in parallel.

Bundling with Rollup happens in the `chusho` package, start by going into this directory:

```
cd packages/chusho
```

Then run Rollup in watch mode:

```
TARGET=es npm run build:watch
```

`TARGET=es` tells Rollup to only build the ES bundle, the one used by the playground in development. You can remove this prefix if you want to build all bundles, or change it for a different target, see `rollup.config.js` for available targets.

Now open a new terminal to start the playground in parallel:

```
cd packages/playground
npm start
```

You’re ready to make changes in the library and view them live in your favorite browser.

## Code quality

tl;dr From the root directory, you can run all the tests in a single command with:

```
npm test
```

### Code styling

Code styling is enforced by EsLint & Prettier. The following commands should be run in the root directory.

```bash
npm run validate
```

Autofix as many offenses as possible:

```bash
npm run format
```

### Unit tests

Unit tests are located in the [chusho](https://github.com/liip/chusho/tree/master/packages/chusho/) package, the following commands should therefor be run in the `packages/chusho` directory.

Run the unit test suites once with Jest:

```bash
npm run test:unit
```

Or start Jest in watch mode:

```bash
npm run test:unit:dev
```

### End-to-end tests

End-to-end tests are located in the [playground](https://github.com/liip/chusho/tree/master/packages/chusho/) package, the following commands should therefor be run in the `packages/playground` directory.

To build the library, start the playground and then execute the tests in headless mode once, run:

```bash
npm run test:e2e
```

You can also run Cypress in interactive mode while developing. This requires you to have bundled the library and started the playground server in a separate process (see [Making Changes](#making-changes) above), after which you can run:

```bash
npm run test:e2e:dev
```
