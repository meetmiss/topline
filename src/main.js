import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from './store/index'
import Vant from 'vant'
import 'vant/lib/index.css'
import '@/styles/index.less'
import Veevalidate, { Validator } from 'vee-validate'
import zhCN from 'vee-validate/dist/locale/zh_CN'

Vue.use(Vant)
Vue.use(Veevalidate, {
  events: ''
})
Validator.localize('zh-CN', zhCN)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
