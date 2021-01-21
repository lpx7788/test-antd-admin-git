import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.less';
import site from '@/config/site'
import '@/util/globalComponent'
import '@/style/index.scss'

Vue.use(Antd)
Vue.prototype.site = site
Vue.config.productionTip = false

export default new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
