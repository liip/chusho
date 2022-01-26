import { defineClientAppEnhance } from '@vuepress/client';
import Chusho, { $chusho, components } from 'chusho';

import './assets/extras.scss';

import chushoConfig from '../chusho.config.js';

if (import.meta.hot) {
  import.meta.hot.accept('../chusho.config.js', (newConfig) => {
    $chusho.options = Object.assign({}, $chusho.options, newConfig.default);
  });
}

export default defineClientAppEnhance(({ app }) => {
  app.use(Chusho, chushoConfig);

  Object.values(components).forEach((component) => {
    app.component(component.name, component);
  });
});
