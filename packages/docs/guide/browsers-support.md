# Browsers support

If you’re using Vite, Webpack, Rollup or another modern bundler, it’s probably going to import the ES Module described above. This is great as it will automatically enable [tree-shaking](https://en.wikipedia.org/wiki/Tree_shaking) and remove unused code from your app bundle.

However this version targets modern browsers (supporting ES2019 features), therefor if you need to support older browsers, you’ll have to transpile Chūshō’s code.

### Vite

See [@vitejs/plugin-legacy](https://github.com/vitejs/vite/tree/main/packages/plugin-legacy).

### Vue CLI

To transpile for older browsers using Vue CLI, you need to add it to the `transpileDependencies` array in [`vue.config.js`](https://cli.vuejs.org/config/#vue-config-js):

```js{4}
// vue.config.js

module.exports = {
  transpileDependencies: ['chusho']
}
```

### Webpack & Babel

To transpile for older browsers using a custom Webpack setup, you need to adapt your JavaScript loader configuration to include Chūshō. Usually it’s configured like this:

```js{10}
// webpack.config.js

module.exports = {
    // ...
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },s
        ],
    },
    // ...
};
```

Instead of excluding all `node_modules`, adapt the Regex to include Chūshō:

```js{5}
// ...
                exclude: /node_modules\/(?!chusho)/,
// ...
```
