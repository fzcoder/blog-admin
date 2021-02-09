import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import store from './store'
import './assets/css/global.css'
import './assets/css/icon.css'
import './assets/css/color.css'
import './plugins/clipboard.js'
import './plugins/MavonEditor.js'
// 导入Nprogress
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 配置请求的根路径
axios.defaults.baseURL = 'http://localhost:8081/api'

// axios请求拦截器
axios.interceptors.request.use(config => {
  // 开启进度条
  NProgress.start()
  // 请求携带token令牌
  config.headers.authorization = window.sessionStorage.getItem('token')
  // 返回config
  return config
})

// axios响应拦截器
axios.interceptors.response.use(
  response => {
    // 隐藏进度条
    NProgress.done()
    // 获取状态码
    const status = response.data.status
    // 判断状态
    switch (status) {
      // SC_OK => 成功
      case 200:
        break
      // SC_Unauthorized => 无访问权限
      case 401:
        window.sessionStorage.clear()
        router.push('/login')
        alert(response.data.message)
        break
      // SC_FORBIDDEN => 无访问权限
      case 403:
        window.sessionStorage.clear()
        router.push('/login')
        alert(response.data.message)
        break
      default:
        break
    }
    return response
  },
  error => {
    // 隐藏进度条
    NProgress.done()
    console.log(error)
    window.sessionStorage.clear()
    router.push('/login')
    return Promise.reject(error)
  }
)

Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
