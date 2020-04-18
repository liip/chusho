# Chūshō playground

A Vue app to play with Chūshō’s components and tools.

## Usage

Ensure you have [bootstraped the monorepo](https://github.com/liip/chusho#project-setup) and [build a local version of the library](https://github.com/liip/chusho/tree/master/packages/chusho#build-for-production) first.

Then start the development server:

```bash
npm start
```

Alternatively, you can start the server with SSR:

```bash
npm run ssr:serve
```

Chucho’s is already loaded in `src/main.js`, you can now start playing in `src/views/Home.vue`.

**Note:** if you make changes in the core library, you must manually build it again for the playground to pick it up.
