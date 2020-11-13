import { PluginObject } from 'vue/types/plugin';

import { mergeDeep } from './utils/objects';
import { DollarChusho, ChushoOptions, ChushoUserOptions } from './types';

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
      openDialogs: [],
    } as DollarChusho;
  },
};

export * from './components';
export type { ChushoUserOptions } from './types';
export const utils = {
  mergeDeep,
};
export default Chusho;
