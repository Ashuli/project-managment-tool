import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import loadSprites from './plugins/loadSvg'
import apiService from './services/apiService'
import { tokenService } from './services/storageService'

import '@/styles/tailwind.css'
import '@/styles/tooltip.css'

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(fas);
loadSprites()

Vue.config.productionTip = false
Vue.component('icon', FontAwesomeIcon);

apiService.init(apiService.getBaseUrl())
apiService.addInterceptor()

if (tokenService.getToken()) {
  apiService.setHeader()
  apiService.mount401Interceptor()
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
