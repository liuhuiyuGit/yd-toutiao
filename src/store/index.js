import Vue from 'vue'
import Vuex from 'vuex'
import * as storageTools from '@/utils/localStorage'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: storageTools.getItem('user'),
    currentComment: null
  },
  mutations: {
    setUser (stste, user) {
      stste.user = user
      storageTools.setItem('user', user)
    },
    setcomment (state, comment) {
      state.currentComment = comment
    }
  },
  actions: {

  }
})
