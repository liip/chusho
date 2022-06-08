import { defineClientConfig } from '@vuepress/client';
import Chusho, { $chusho, components, mergeDeep } from 'chusho';

import chushoConfig from '../chusho.config.js';
import './assets/extras.scss';

if (import.meta.hot) {
  import.meta.hot.accept('../chusho.config.js', (newConfig) => {
    mergeDeep($chusho.options, newConfig.default);
  });
}

export default defineClientConfig({
  enhance: ({ app }) => {
    app.use(Chusho, chushoConfig);

    Object.values(components).forEach((component) => {
      app.component(component.name, component);
    });
  },
});
