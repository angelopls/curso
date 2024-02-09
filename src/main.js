import Axios from 'axios';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

Vue.prototype.$http = Axios;
Axios.defaults.baseURL = import.meta.env.VITE_API_BASEURL;
new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
