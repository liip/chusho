import { PluginObject } from 'vue/types/plugin';
import components from '@/components';
import { ChushoOptions } from '@/types/globals.d.ts';
import '@/assets/tailwind.css';

const Chusho: PluginObject<ChushoOptions> = {
  install: function (Vue, userOptions?: ChushoOptions) {
    // Provide configuration
    Vue.prototype.$chusho = {
      options: userOptions,
    };

    // Install components
    Object.values(components).forEach((component) => {
      Vue.component(component.name, component);
    });
  },
  ...components,
};

export default Chusho;

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Chusho);
}
