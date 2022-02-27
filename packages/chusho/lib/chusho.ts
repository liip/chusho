import { App, Plugin, reactive } from 'vue';

import { ChushoOptions, ChushoUserOptions, DollarChusho } from './types';

import { mergeDeep } from './utils/objects';

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
export * as directives from './directives';
export * from './components';
export * from './directives';
export type { ChushoUserOptions } from './types';
export default Chusho;
