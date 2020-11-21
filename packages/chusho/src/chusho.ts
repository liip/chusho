import { App, Plugin, reactive } from 'vue';

import { mergeDeep } from './utils/objects';
import { DollarChusho, ChushoOptions, ChushoUserOptions } from './types';

const defaultOptions: ChushoOptions = {
  rtl: function () {
    return document && document.dir === 'rtl';
  },
  components: {},
};

export const $chusho: DollarChusho = reactive({
  options: defaultOptions,
  openDialogs: [],
});

const Chusho: Plugin = {
  install: function (app: App, userOptions?: ChushoUserOptions) {
    const options = mergeDeep(defaultOptions, userOptions) as ChushoOptions;
    $chusho.options = options;

    app.provide('$chusho', $chusho);
  },
};

export * as components from './components';
export type { ChushoUserOptions } from './types';
export const utils = {
  mergeDeep,
};
export default Chusho;
