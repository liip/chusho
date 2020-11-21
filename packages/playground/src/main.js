import { createApp } from 'vue';
import Chusho, { $chusho, components, directives } from 'chusho';
import chushoConfig from '../chusho.config.ts';

import './assets/tailwind.css';

import router from './router';
import App from './App.vue';

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
  console.log('register directive', directive);

  app.directive(directive.name, directive);
});

app.mount('#app');

if (import.meta.hot) {
  import.meta.hot.acceptDeps('../chusho.config.ts', (newConfig) => {
    $chusho.options = Object.assign({}, $chusho.options, newConfig.default);
  });
}
