import Vue from 'vue'
import Vuex from 'vuex'

import { setItem, getItem } from '@/utils/stroage.js'

Vue.use(Vuex)

const TOKEN_KEY = 'TOUTIAO_USER'

export default new Vuex.Store({
  state: {
    user: getItem(TOKEN_KEY)
  },
  mutations: {
    setUser(state, data) {
      state.user = data

      setItem(TOKEN_KEY, state.user)
    }
  },
  actions: {},
  modules: {}
})
