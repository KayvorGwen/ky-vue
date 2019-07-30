import Vue from 'vue';
import App from './views/app/app.vue';
import { router } from './router';
import store from './store/store';

import './assets/less/reset.less';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
