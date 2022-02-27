import Chusho, { $chusho, components, directives, mergeDeep } from 'chusho';
import { createApp } from 'vue';

import App from './App.vue';
import './assets/tailwind.css';
import chushoConfig from './chusho.config.js';
import router from './router';

const app = createApp(App);

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

app.mount('#app');

if (import.meta.hot) {
  import.meta.hot.accept('./chusho.config.js', (newConfig) => {
    mergeDeep($chusho.options, newConfig.default);
  });
}
