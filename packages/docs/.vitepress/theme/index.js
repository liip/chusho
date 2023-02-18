import Chusho, { $chusho, components, mergeDeep } from 'chusho';
import DefaultTheme from 'vitepress/theme';
import { defineAsyncComponent } from 'vue';

import Showcase from '../../components/Showcase.vue';

import chushoConfig from '../../chusho.config.ts';
import './custom.css';

if (import.meta.hot) {
  import.meta.hot.accept('../../chusho.config.ts', (newConfig) => {
    mergeDeep($chusho.options, newConfig.default);
  });
}

export default {
  ...DefaultTheme,

  enhanceApp(ctx) {
    DefaultTheme.enhanceApp(ctx);

    /**
     * Install and configure Chūshō
     */
    ctx.app.use(Chusho, chushoConfig);

    Object.values(components).forEach((component) => {
      if (component.name) {
        ctx.app.component(component.name, component);
      }
    });

    /**
     * Extra components for documentation
     */
    ctx.app.component('Showcase', Showcase);
    ctx.app.component(
      'Docgen',
      defineAsyncComponent(() => import('../../components/Docgen.vue'))
    );

    /**
     * Example components
     */
    ctx.app.component(
      'ExampleCheckbox',
      defineAsyncComponent(() =>
        import('../../components/Example/Checkbox.vue')
      )
    );
    ctx.app.component(
      'ExampleRadio',
      defineAsyncComponent(() => import('../../components/Example/Radio.vue'))
    );
    ctx.app.component(
      'ExampleSelect',
      defineAsyncComponent(() => import('../../components/Example/Select.vue'))
    );
    ctx.app.component(
      'ExampleDialog',
      defineAsyncComponent(() => import('../../components/Example/Dialog.vue'))
    );
  },
};
