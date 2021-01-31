import Layout from '@/page/Layout'

// const RouteView = {
//   name: 'RouteView',
//   render: h => h('router-view')
// }

export const asyncRouterMap = [
  // {
  // path: '/',
  // name: 'index',
  // component: Layout,
  // meta: { title: 'menu.home' },
  // redirect: '/dashboard/workplace',
  // children: [
  //   // dashboard
  //   {
  //     path: '/dashboard',
  //     name: 'dashboard',
  //     redirect: '/dashboard/workplace',
  //     component: Layout,
  //     meta: { title: 'menu.dashboard', keepAlive: true, icon: '', permission: ['dashboard'] },
  //     children: [
  //       {
  //         path: '/dashboard/analysis/:pageNo([1-9]\\d*)?',
  //         name: 'Analysis',
  //         component: () => import('@/views/dashboard/Analysis'),
  //         meta: { title: 'menu.dashboard.analysis', keepAlive: false, permission: ['dashboard'] }
  //       },
         
  //     ]
  //   },]}
//    {
//     path: '/',
//     name: 'layout',
//     redirect: '/home',
//     component: Layout,
//     children: [
//   {
//     id: 7,
//     path: "mallsystem",
//     name: "mallSystem",
//     meta: {
//         title: "商城系统管理",
//         icon: "shop"
//     },
//     component: () => import( '@/page/RouteView/index.vue'),
//     children: [{
//             id: 71,
//             path: "role",
//             name: "role",
//             meta: {
//                 title: "商城角色管理",
//                 icon: "team"
//             },
//             component: () => import( '@/views/mallSystem/role.vue'),
//         },
//         {
//             id: 72,
//             path: "defaultPermission",
//             name: "defaultPermission",
//             meta: {
//                 title: "商城默认权限",
//                 icon: "cluster"
//             },
//             component: () => import( '@/views/mallSystem/defaultPermission.vue'),
//         },
//         {
//             id: 73,
//             path: "permissionResource",
//             name: "permissionResource",
//             meta: {
//                 title: "商城权限资源",
//                 icon: "apartment"
//             },
//             component: () => import( '@/views/mallSystem/permissionResource.vue'),
//         },
//     ]
//   }]
// },
// {
//   path: '*',
//   redirect: '/404',
//   hidden: true
// }
]

/**
 * 基础路由
 * @type { *[] }
 */

export const constantRouterMap = [
  // {
  // path: '/',
  // name: 'layout',
  // redirect: '/home',
  // component: Layout,
  // children: [
  //   {
  //     path: '/home',
  //     name: 'home',
  //     component: () => import( /* webpackChunkName: "home" */ '@/views/home')
  //   },
  //   {
  //     id: 7,
  //     path: "mallsystem",
  //     name: "mallSystem",
  //     meta: {
  //         title: "商城系统管理",
  //         icon: "shop"
  //     },
  //     component: () => import( '@/page/RouteView/index.vue'),
  //     children: [{
  //             id: 71,
  //             path: "role",
  //             name: "role",
  //             meta: {
  //                 title: "商城角色管理",
  //                 icon: "team"
  //             },
  //             component: () => import( '@/views/mallSystem/role.vue'),
  //         },
  //         {
  //             id: 72,
  //             path: "defaultPermission",
  //             name: "defaultPermission",
  //             meta: {
  //                 title: "商城默认权限",
  //                 icon: "cluster"
  //             },
  //             component: () => import( '@/views/mallSystem/defaultPermission.vue'),
  //         },
  //         {
  //             id: 73,
  //             path: "permissionResource",
  //             name: "permissionResource",
  //             meta: {
  //                 title: "商城权限资源",
  //                 icon: "apartment"
  //             },
  //             component: () => import( '@/views/mallSystem/permissionResource.vue'),
  //         },
  //     ]
  //   }
  // ],
  // },
  {
    path: '/exc404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import( /* webpackChunkName: "home" */ '@/views/login')
  }
]
