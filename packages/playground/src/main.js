import Vue from 'vue';
import App from './App.vue';
import Chusho from 'chusho';

Vue.config.productionTip = false;

Vue.use(Chusho);

new Vue({
  render: h => h(App),
}).$mount('#app');
