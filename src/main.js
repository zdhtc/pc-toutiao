import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.less'
import axios from 'axios'
import 'nprogress/nprogress.css'
import JSONbig from 'json-bigint'
import moment from 'moment'

Vue.config.productionTip = false
Vue.use(ElementUI)
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
Vue.prototype.$axios = axios

// 设置axios拦截器
axios.interceptors.request.use(config => {
  // 统一设置token
  // config 就是最后要发给后端的那个配置对象
  const token = window.localStorage.getItem('toutiao-token')

  token && (config.headers.Authorization = `Bearer ${token}`)

  return config
}, err => {
  return Promise.reject(err)
})

axios.interceptors.response.use(response => {
  return response
}, err => {
  return Promise.reject(err)
})

// 改变axios 响应数据的默认转化方式
axios.defaults.transformResponse = [
  function (data, headers) {
    // axios默认使用 JSON.parse(data)
    // 我们这里手动配置使用 JSONbig.parse()
    try {
      return JSONbig.parse(data)
    } catch (err) {
      console.log(err, 'jsonbig parse error')
      return {}
    }
  }
]

// 注册全局过滤器
Vue.filter('dateFormat', (date, format = 'YYYY-MM-DD') => {
  return moment(date).format(format)
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
