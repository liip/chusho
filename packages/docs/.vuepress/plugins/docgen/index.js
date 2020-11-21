const path = require('path');
const docGen = require('vue-docgen-api');
const glob = require('glob');

const componentsDocgen = {};

glob(
  '../../../../chusho/src/components/C*/C*.ts',
  { cwd: path.resolve(__dirname) },
  (err, components) => {
    components.forEach(async (component) => {
      const parsed = await docGen.parse(path.resolve(__dirname, component));
      componentsDocgen[parsed.displayName] = parsed;
    });
  }
);

module.exports = (options, ctx) => {
  return {
    name: 'Docgen',
    async extendPageData($page) {
      $page.componentsDocgen = componentsDocgen;
    },
    enhanceAppFiles: path.resolve(__dirname, 'client.js'),
  };
};
