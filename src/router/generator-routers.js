
import Layout from '@/page/Layout'
import { getMenu} from '@/api/login'
import RouteView from '@/page/RouteView'
// 前端路由表
const constantRouterComponents = {
  RouteView: RouteView,
  Layout: Layout,
  'exc403': () => import(/* webpackChunkName: "error" */ '@/views/exception/403'),
  'exc404': () => import(/* webpackChunkName: "error" */ '@/views/exception/404'),
  'exc500': () => import(/* webpackChunkName: "error" */ '@/views/exception/500'),
  'Home': () => import('@/views/home'),
  'Role': () => import('@/views/mallSystem/role'),
  'DefaultPermission': () => import('@/views/mallSystem/defaultPermission'),
  'PermissionResource': () => import('@/views/mallSystem/permissionResource'),
}

// 前端未找到页面路由（固定不用改）
const notFoundRouter = {
  path: '*',name:'exc404', redirect: '/exc404', hidden: true
}

// 根级菜单
const rootRouter = {
  key: '',
  name: 'index',
  path: '',
  component: 'Layout',
  redirect: '/home',
  meta: {
    title: '首页',
    icon: 'home',
  },
  children: []
}

/**
 * 动态生成菜单
 * @param token
 * @returns {Promise<Router>}
 */
export const generatorDynamicRouter = (token) => {
  return new Promise((resolve, reject) => {
    getMenu(token).then(res => {
      const { data } = res
      const menuNav = []
      const childrenNav = []
      //      后端数据, 根级树数组,  根级 PID
      listToTree(data, childrenNav, 0)
      rootRouter.children = childrenNav

      menuNav.push(rootRouter)
      const routers = generator(menuNav)
      routers.push(notFoundRouter)
       
      resolve(routers)
    }).catch(err => {
      reject(err)
    })
  })
}

/**
 * 格式化树形结构数据 生成 vue-router 层级路由表
 *
 * @param routerMap
 * @param parent
 * @returns {*}
 */
export const generator = (routerMap, parent) => {
  return routerMap.map(item => {
    const { title, show, hideChildren, hiddenHeaderContent, target, icon } = item.meta || {}
    const currentRouter = {
      // 如果路由设置了 path，则作为默认 path，否则 路由地址 动态拼接生成如 /dashboard/workplace
      path: item.path || `${parent && parent.path || ''}/${item.key}`,
      // 路由名称，建议唯一
      name: item.name || item.key || '',
      // 该路由对应页面的 组件 :方案1
      // component: constantRouterComponents[item.component || item.key],
      // 该路由对应页面的 组件 :方案2 (动态加载)
      component: (constantRouterComponents[item.component || item.key]) || (() => import(`@/views/${item.component}`)),
      id:item.id,

      // meta: 页面标题, 菜单图标, 页面权限(供指令权限用，可去掉)
      meta: {
        title: title,
        icon: icon || undefined,
        hiddenHeaderContent: hiddenHeaderContent,
        target: target,
        permission: item.name
      }
    }
    // 是否设置了隐藏菜单
    if (show === false) {
      currentRouter.hidden = true
    }
    // 是否设置了隐藏子菜单
    if (hideChildren) {
      currentRouter.hideChildrenInMenu = true
    }
    // 为了防止出现后端返回结果不规范，处理有可能出现拼接出两个 反斜杠
    if (!currentRouter.path.startsWith('http')) {
      currentRouter.path = currentRouter.path.replace('//', '/')
    }
    // 重定向
    item.redirect && (currentRouter.redirect = item.redirect)
    // 是否有子菜单，并递归处理
    if (item.children && item.children.length > 0) {
      // Recursion
      currentRouter.children = generator(item.children, currentRouter)
    }
    return currentRouter
  })
}

/**
 * 数组转树形结构
 * @param list 源数组
 * @param tree 树
 * @param parentId 父ID
 */
const listToTree = (list, tree, parentId) => {
  list.forEach(item => {
    // 判断是否为父级菜单
    if (item.parentId === parentId) {
      const child = {
        ...item,
        key: item.key || item.name,
        children: []
      }
      // 迭代 list， 找到当前菜单相符合的所有子菜单
      listToTree(list, child.children, item.id)
      // 删掉不存在 children 值的属性
      if (child.children.length <= 0) {
        delete child.children
      }
      // 加入到树中
 
      tree.push(child)
    }
  })
}
