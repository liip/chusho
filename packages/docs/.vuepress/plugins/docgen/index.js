const path = require('path');
const docGen = require('vue-docgen-api');
const glob = require('glob');

module.exports = (options, ctx) => {
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

  return {
    name: 'docgen',

    extendsPage: (page) => {
      page.data.componentsDocgen = componentsDocgen;
    },
  };
};
