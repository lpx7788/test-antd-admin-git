// export default {
//   namespaced: true,
//   state: {
//     user: undefined,
//   },
//   getters: {
//     user: state => {
//       if (!state.user) {
//         try {
//           const user = localStorage.getItem('omp-userInfo')
//           state.user = JSON.parse(user)
//         } catch (e) {
//           console.error(e)
//         }
//       }
//       return state.user
//     }
//   },
//   mutations: {
//     setUser (state, user) {
//       localStorage.setItem('omp-userInfo', JSON.stringify(user))
//     }
//   }
// }


// import storage from 'store'
import { login, getInfo ,logout} from '@/api/login'
// import { ACCESS_TOKEN } from '@/store/mutation-types'
// import { welcome } from '@/utils/util'

const user = {
  state: {
    token: '',
    name: '',
    // welcome: '',
    avatar: '',
    roles: [],
    info: {}
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, { name }) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INFO: (state, info) => {
      state.info = info
    }
  },

  actions: {
    // 登录
    Login ({ commit }, Parmas) {
      return new Promise((resolve, reject) => {
        login(Parmas).then(response => {
          const result = response.data
          localStorage.setItem('omp-token',result.token)
          commit('SET_TOKEN', result.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          const result = response.data
          if (result.role && result.role.permissions.length > 0) {
            const role = result.role
            role.permissions = result.role.permissions
            role.permissions.map(per => {
              if (per.actionEntitySet != null && per.actionEntitySet.length > 0) {
                const action = per.actionEntitySet.map(action => { return action.action })
                per.actionList = action
              }
            })
            role.permissionList = role.permissions.map(permission => { return permission.permissionId })
            commit('SET_ROLES', result.role)
            commit('SET_INFO', result)
          } else {
            reject(new Error('getInfo: roles must be a non-null array !'))
          }

          commit('SET_NAME', { name: result.name })
          commit('SET_AVATAR', result.avatar)

          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    Logout ({ commit, state }) {
      console.log('loginout===')
      return new Promise((resolve) => {
        logout(state.token).then(() => {
          console.log(656466)
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          localStorage.setItem('omp-token','')
          resolve()
        }).catch(() => {
          resolve()
        }).finally(() => {
        })
      })
    }

  }
}

export default user
