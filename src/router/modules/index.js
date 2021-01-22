import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/page/Layout'
import Companys from './company.js'
import MallSystem from './mallSystem.js'

Vue.use(VueRouter)


const routes = [ {
  path: '/login',
  name: 'login',
  component: () => import( /* webpackChunkName: "home" */ '@/views/login')
},{
    path: '/',
    name: 'layout',
    redirect: '/home',
    component: Layout,
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import( /* webpackChunkName: "home" */ '@/views/home')
      },
      ...Companys, 
      ...MallSystem
    ]
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import( /* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 解决重复选择菜单路由报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router