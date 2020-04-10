import Vue from 'vue';
import App from './App.vue';
import Chusho, { utils } from 'chusho';
import chushoPresetTailwind from '@chusho/preset-tailwind';
import tailwindConfig from '../tailwind.config.js';
import './assets/tailwind.css';

Vue.config.productionTip = false;

Vue.use(
  Chusho,
  utils.mergeDeep(chushoPresetTailwind(tailwindConfig), {
    // Here goes your own config
  })
);

new Vue({
  render: h => h(App),
}).$mount('#app');
