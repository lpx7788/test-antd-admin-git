import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
import menu from './modules/menu'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    menu
  },
  state: {

  },
  mutations: {

  },
  actions: {

  },
  getters
})
