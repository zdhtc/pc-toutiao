import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.less'
import axios from 'axios'
import 'nprogress/nprogress.css'

Vue.config.productionTip = false
Vue.use(ElementUI)
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
Vue.prototype.$axios = axios

// 设置axios拦截器
axios.interceptors.request.use(config => {
  // 统一设置token
  // config 就是最后要发给后端的那个配置对象
  const token = window.localStorage.getItem('toutiao-token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, err => {
  return Promise.reject(err)
})

axios.interceptors.response.use(response => {
  return response
}, err => {
  return Promise.reject(err)
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
