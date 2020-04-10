import { PluginObject } from 'vue/types/plugin';
import { Dictionary } from 'ts-essentials';

import { mergeDeep } from './utils/objects';
import { ChushoOptions, ChushoUserOptions } from './types';
import * as components from './components';

const defaultOptions: ChushoOptions = {
  rtl: function () {
    return document && document.dir === 'rtl';
  },
  components: {
    flex: {
      responsiveWidthGenerator(breakpoint: string, width: string) {
        return `${breakpoint}:${width}`;
      },
    },
  },
};

const Chusho: PluginObject<ChushoUserOptions> = {
  install: function (Vue, userOptions?: ChushoUserOptions) {
    const options = mergeDeep(defaultOptions, userOptions) as ChushoOptions;

    // Provide configuration
    Vue.prototype.$chusho = {
      options,
    };

    // Install components
    const pluginComponents = components as Dictionary<object | Function>;

    Object.keys(pluginComponents).forEach((componentName) => {
      Vue.component(componentName, pluginComponents[componentName]);
    });
  },
};

export * from './components';
export { ChushoUserOptions } from './types';
export const utils = {
  mergeDeep,
};
export default Chusho;

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Chusho);
}
