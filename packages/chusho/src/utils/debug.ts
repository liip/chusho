import Vue from 'vue';

export function warn(msg: string, vm?: Vue): void {
  Vue.util.warn(`[Chūshō] ${msg}`, vm);
}
