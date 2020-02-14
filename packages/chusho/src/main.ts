import { PluginObject } from 'vue/types/plugin';
import { mergeDeep } from '@/utils/helpers';
import components from '@/components';
import { ChushoOptions } from '@/types/globals.d.ts';
import '@/assets/tailwind.css';

const Chusho = {
  install: function(Vue, userOptions?: ChushoOptions) {
    const options = mergeDeep(
      {
        btn: {
          default: '',
          variants: {},
          disabled: '',
        },
      },
      userOptions
    );

    // Provide configuration
    Vue.prototype.$chusho = {
      options,
    };

    // Install components
    Object.values(components).forEach(component => {
      Vue.component(component.name, component);
    });
  },
  ...components,
} as PluginObject<ChushoOptions>;

export default Chusho;

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Chusho);
}
