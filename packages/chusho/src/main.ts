import { PluginObject } from 'vue/types/plugin';
import { mergeDeep } from '@/utils/helpers';
import components from '@/components';
import { ChushoOptions } from '@/types/globals.d.ts';
import '@/assets/tailwind.css';

export const defaultOptions: ChushoOptions = {
  btn: {
    default: '',
    variants: {},
    disabled: '',
  },
  stack: {
    gaps: {},
  },
};

const Chusho: PluginObject<ChushoOptions> = {
  install: function(Vue, userOptions?: ChushoOptions) {
    const options = mergeDeep(defaultOptions, userOptions) as ChushoOptions;

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
};

export default Chusho;

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Chusho);
}
