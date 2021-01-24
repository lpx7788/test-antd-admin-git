import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/page/Layout'
// import Companys from './modules/company.js'
// import MallSystem from './modules/mallSystem.js'
// import { constantRouterMap } from '@/config/router.config'

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
      {
        id: 7,
        path: "mallsystem",
        name: "mallSystem",
        meta: {
            title: "商城系统管理",
            icon: ""
        },
        component: () => import( '@/page/RouteView/index.vue'),
        children: [{
                id: 71,
                path: "role",
                name: "role",
                meta: {
                    title: "商城角色管理",
                    icon: ""
                },
                component: () => import( '@/views/mallSystem/role.vue'),
            },
            {
                id: 72,
                path: "defaultPermission",
                name: "defaultPermission",
                meta: {
                    title: "商城默认权限",
                    icon: ""
                },
                component: () => import( '@/views/mallSystem/defaultPermission.vue'),
            },
            {
                id: 73,
                path: "permissionResource",
                name: "permissionResource",
                meta: {
                    title: "商城权限资源",
                    icon: ""
                },
                component: () => import( '@/views/mallSystem/permissionResource.vue'),
            },
        ]
    }
      // ...MallSystem
    ]
  }
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