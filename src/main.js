import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import VueResource from'vue-resource'

/*  组件  */
import Goods from './components/goods/goods'
import Ratings from './components/ratings/ratings'
import Seller from './components/seller/seller'

Vue.use(VueRouter)
Vue.use(VueResource)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/goods'    //首页的重定向
    },
    {
      path: '/goods',
      component: Goods
    },
    {
      path: '/ratings',
      component: Ratings
    },
    {
      path: '/seller',
      component: Seller
    }
  ],
  linkActiveClass: 'tab-link_active',
})

const app = new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})