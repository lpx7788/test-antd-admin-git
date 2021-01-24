import { asyncRouterMap, constantRouterMap } from '@/config/router.config'



/**
 * 过滤账户是否拥有某一个权限，并将菜单从加载列表移除
 *
 * @param permission
 * @param route
 * @returns {boolean}
 */
function hasPermission (permission, route) {
  if (route.meta && route.meta.permission) {
    let flag = false
    for (let i = 0, len = permission.length; i < len; i++) {
      flag = route.meta.permission.includes(permission[i])
      if (flag) {
        return true
      }
    }
    return false
  }
  return true
}

/**
 * 单账户多角色时，使用该方法可过滤角色不存在的菜单
 *
 * @param roles
 * @param route
 * @returns {*}
 */
// eslint-disable-next-line
function hasRole(roles, route) {
  if (route.meta && route.meta.roles) {
    return route.meta.roles.includes(roles.id)
  } else {
    return true
  }
}

function filterAsyncRouter (routerMap, roles) {
  console.log('处理--',routerMap, roles)
  const accessedRouters = routerMap.filter(route => {
    if (hasPermission(roles.permissionList, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles)
        console.log('ici=on',route)
      }
      return true
    }
    return false
  })
  return accessedRouters
}

const menu = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      console.log('routers',routers)
      state.routers = constantRouterMap.concat(routers)
      console.log('concat==', state.routers);
    }
  },
  actions: {
    GenerateRoutes ({ commit }, data) {
      return new Promise(resolve => {
        const { roles } = data
        const accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
        // console.log('roles',roles)
        // console.log('constantRouterMap',constantRouterMap)
        // console.log('asyncRouterMap0000',asyncRouterMap)
        // console.log('accessedRouters',accessedRouters)
        commit('SET_ROUTERS', roles)
        resolve()
      })
    }
  }
}

export default menu