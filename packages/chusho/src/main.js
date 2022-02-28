import Chusho, { $chusho, components, directives, mergeDeep } from 'chusho';
import { createSSRApp } from 'vue';

import App from './App.vue';
import './assets/tailwind.css';
import chushoConfig from './chusho.config.js';
import { createRouter } from './router';

export function createApp() {
  const app = createSSRApp(App);
  const router = createRouter();

  app.use(router);
  app.use(Chusho, chushoConfig);

  /**
   * Register all components & directives globally
   */
  Object.values(components).forEach((component) => {
    app.component(component.name, component);
  });

  Object.values(directives).forEach((directive) => {
    app.directive(directive.name, directive);
  });

  return { app, router };
}

if (import.meta.hot) {
  import.meta.hot.accept('./chusho.config.js', (newConfig) => {
    mergeDeep($chusho.options, newConfig.default);
  });
}
