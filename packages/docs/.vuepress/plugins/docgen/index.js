import glob from 'glob';
import path from 'path';
import docGen from 'vue-docgen-api';

export default () => {
  const componentsDocgen = {};

  glob(
    '../../../../chusho/lib/components/C*/C*.ts',
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
