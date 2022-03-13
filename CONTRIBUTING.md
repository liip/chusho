# Contributing

## Project setup

The Node.js version required is specified in `/.nvmrc`. The project use npm workspaces to manage dependencies.

Start by cloning the repository, then install the dependencies:

```sh
npm install
```

## Working on the library

If you want to make changes to the library, go to the Chūshō package directory:

```sh
cd packages/chusho
```

Then run the playground:

```sh
npm start
```

You’re ready to make changes in the library and view them live in your favorite browser at [localhost:3000](http://localhost:3000).

The library code is in `lib` while the playground and examples are in `src`.

## Working on the docs

To make changes in the documentation, go to the docs package:

```sh
cd packages/docs
```

Then run VuePress in dev mode:

```sh
npm start
```

You can now see your changes live at [localhost:8080](http://localhost:8080).

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

Unit tests are located in the [chusho](https://github.com/liip/chusho/tree/main/packages/chusho/) package, the following commands should therefor be run in the `packages/chusho` directory.

Run the unit test suites once:

```bash
npm run test:unit
```

Or start the runner in watch mode:

```bash
npm run test:unit:dev
```

### End-to-end tests

End-to-end tests are located in the [chusho](https://github.com/liip/chusho/tree/main/packages/chusho/) package, the following commands should therefor be run in the `packages/chusho` directory.

To start the playground server and run the suite in headless mode once, use:

```bash
npm run test:e2e
```

You can also run Cypress in interactive mode while developing. This requires you to have started the playground server in a separate process (see [Working on the library](#working-on-the-library) above), after which you can run:

```bash
npm run test:e2e:dev
```
