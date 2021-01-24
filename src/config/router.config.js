// eslint-disable-next-line
// import { UserLayout, BasicLayout, BlankLayout } from '@/layouts'
// import { 'bxAnaalyse' } from '@/core/icons'

const RouteView = {
  name: 'RouteView',
  render: h => h('router-view')
}

export const asyncRouterMap = [
  {
    id: 7,
    path: "mallsystem",
    name: "mallSystem",
    meta: {
        title: "商城系统管理",
        icon: "shop"
    },
    component: () => import( '@/page/RouteView/index.vue'),
    children: [{
            id: 71,
            path: "role",
            name: "role",
            meta: {
                title: "商城角色管理",
                icon: "team"
            },
            component: () => import( '@/views/mallSystem/role.vue'),
        },
        {
            id: 72,
            path: "defaultPermission",
            name: "defaultPermission",
            meta: {
                title: "商城默认权限",
                icon: "cluster"
            },
            component: () => import( '@/views/mallSystem/defaultPermission.vue'),
        },
        {
            id: 73,
            path: "permissionResource",
            name: "permissionResource",
            meta: {
                title: "商城权限资源",
                icon: "apartment"
            },
            component: () => import( '@/views/mallSystem/permissionResource.vue'),
        },
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */

export const constantRouterMap = [


  // {
    // path: '/404',
    // component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  // }
]
