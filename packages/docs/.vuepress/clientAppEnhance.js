import { defineClientAppEnhance } from '@vuepress/client';
import Chusho, { $chusho, components } from 'chusho';

import Docgen from './components/Docgen.vue';
import PropsTable from './components/PropsTable.vue';
import Showcase from './components/Showcase.vue';

import './assets/extras.scss';

import chushoConfig from '../chusho.config';

if (import.meta.hot) {
  import.meta.hot.accept('../chusho.config.js', (newConfig) => {
    $chusho.options = Object.assign({}, $chusho.options, newConfig.default);
  });
}

export default defineClientAppEnhance(({ app }) => {
  app.component('Docgen', Docgen);
  app.component('PropsTable', PropsTable);
  app.component('Showcase', Showcase);

  app.use(Chusho, chushoConfig);

  Object.values(components).forEach((component) => {
    app.component(component.name, component);
  });
});
