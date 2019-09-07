import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import VeeValidate from 'vee-validate'
import 'vant/lib/index.css'
import './styles/index.less'
import { fmtDate } from '@/utils/dayjs'
Vue.use(Vant)
Vue.use(VeeValidate)
Vue.filter('fmtDate', fmtDate)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
