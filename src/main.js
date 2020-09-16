import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './bus.js'
import './plugins/axios'
import './plugins/bootstrap-vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

const checkLogin = () => new Promise((resolve, reject) => {
  const token = document.cookie.replace(/(?:(?:^|.*;\s*)AUTH_TOKEN\s*=\s*([^;]*).*$)|^.*$/, '$1')
  Vue.axios.defaults.headers.common.Authorization = `Bearer ${token}`
  Vue.axios.post(`${process.env.VUE_APP_APIPATH}/auth/check`, {
    api_token: token
  }).then((res) => {
    console.log(res)
    if (res.data.success) {
      resolve(res)
    } else {
      reject(res)
    }
  }).catch((err) => {
    console.log(err)
    reject(err)
  })
})

router.beforeEach((to, from, next) => {
  if (to.meta.needLogin) {
    checkLogin().then((res) => {
      console.log('beforeEach check passed', res)
      next()
    }).catch((err) => {
      console.log('beforeEach blocked', err)
      next({
        name: 'Login',
        query: { redirect: to.fullPath }
      })
    })
  } else {
    console.log('no need login')
    next()
  }
})
