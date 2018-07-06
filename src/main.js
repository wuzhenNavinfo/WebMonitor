// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.min.css'
// import './style/main.css'
// import './style/thirdPartsRewrite.css'
import VueRouter from 'vue-router'
import routes from './router' // 或者 import routes from './router/index'

Vue.use(ElementUI)
Vue.use(VueRouter)

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // if (to.path == '/login') {
  //   appUtil.removeCurrentUser();
  // }
  //
  // let user = appUtil.getCurrentUser();
  // if (!user && to.path != '/login' && to.path != '/register' && to.path != '/resetPassword') {
  //   next({ path: '/login' })
  // } else {
  //   next()
  // }
  next()
})


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})


