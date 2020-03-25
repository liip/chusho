import Vue from 'vue';

export function warn(msg: string, vm?: Vue) {
  Vue.util.warn(`[Chūshō] ${msg}`, vm);
}
