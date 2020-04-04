import Vue from 'vue';
import Chusho, { ChushoUserOptions } from 'chusho';
import App from './App.vue';

Vue.config.productionTip = false;

Vue.use(Chusho, {
  components: {
    btn: {
      defaultClass: 'btn',
    },
  },
} as ChushoUserOptions);

new Vue({
  render: h => h(App),
}).$mount('#app');
