import glob from 'glob';
import path from 'path';
import { parse } from 'vue-docgen-api';

async function parseComponents() {
  const componentsDocgen = {};
  const components = glob.sync('../../chusho/lib/components/C*/C*.ts', {
    cwd: path.resolve(__dirname),
  });

  await Promise.all(
    components.map((component) => {
      return parse(path.resolve(__dirname, component)).then((parsed) => {
        componentsDocgen[parsed.displayName] = parsed;
      });
    })
  );

  return componentsDocgen;
}

export default function docGen() {
  const virtualModuleId = 'virtual:docgen';
  const resolvedVirtualModuleId = '\0' + virtualModuleId;

  return {
    name: 'docGen',

    enforce: 'pre',

    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId;
      }
    },

    /**
     * Initial load of the virtual module
     */
    async load(id) {
      if (id === resolvedVirtualModuleId) {
        const componentsDocgen = await parseComponents();
        return `export default ${JSON.stringify(componentsDocgen)}`;
      }
    },

    configureServer(server) {
      const components = path.resolve(__dirname, '../chusho');
      server.watcher.add(components);
    },

    async handleHotUpdate({ file, server }) {
      if (file.includes('chusho/lib/components')) {
        const module = server.moduleGraph.getModuleById(
          resolvedVirtualModuleId
        );
        server.moduleGraph.invalidateModule(module);

        const data = await parseComponents();
        server.ws.send({
          type: 'custom',
          event: 'docgen-changed',
          data,
        });
      }
    },
  };
}
