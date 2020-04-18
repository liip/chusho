import Vue from 'vue';
import App from './App.vue';
import Chusho, { utils } from 'chusho';
import chushoPresetTailwind from '@chusho/preset-tailwind';
import tailwindConfig from '../tailwind.config.js';
import './assets/tailwind.css';
import { createRouter } from './router';

Vue.config.productionTip = false;

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
  })
);

export async function createApp({
  beforeApp = () => {},
  afterApp = () => {},
} = {}) {
  const router = createRouter();

  await beforeApp({
    router,
  });

  const app = new Vue({
    router,
    render: (h) => h(App),
  });

  const result = {
    app,
    router,
  };

  await afterApp(result);

  return result;
}
