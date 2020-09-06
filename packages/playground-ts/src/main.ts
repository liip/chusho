import Vue from 'vue';
import CompositionApi from '@vue/composition-api';
import App from './App.vue';
import Chusho, { ChushoUserOptions, utils } from 'chusho';
import chushoPresetTailwind from '@chusho/preset-tailwind';
import tailwindConfig from '../tailwind.config.js';
import './assets/tailwind.css';

Vue.config.productionTip = false;

Vue.use(CompositionApi);
Vue.use(
  Chusho,
  utils.mergeDeep(chushoPresetTailwind(tailwindConfig), {
    // Here goes your own config
    components: {
      btn: {
        defaultClass: 'inline-block',
        variants: {
          medium: 'py-2 px-4',
          primary: 'bg-blue-600 hover:bg-blue-500 text-white rounded',
        },
      },
    },
  } as ChushoUserOptions)
);

new Vue({
  render: (h) => h(App),
}).$mount('#app');
