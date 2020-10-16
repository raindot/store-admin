import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './bus.js'
import './plugins/axios'
import './plugins/bootstrap-vue'
import { ValidationObserver, ValidationProvider, configure, extend, localize } from 'vee-validate'
import * as rules from 'vee-validate/dist/rules' // 規則檔案
import zhTW from 'vee-validate/dist/locale/zh_TW.json'
// import { ValidationProvider } from 'vee-validate/dist/vee-validate.full.esm'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
// import './assets/template.css'
import './assets/css/all.scss'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// vee-validate
Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule])
})
localize('tw', zhTW)
configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid'
  }
})
Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)

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
