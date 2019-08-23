import Vue from 'vue'
import Vuex from 'vuex'
import * as User from '@/utils/user' // 第一种全部加载
// import { saveUser, getUser } from '@/utils/user'  第二种按需加载

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: User.getUser()
  },
  mutations: {
    setUser (state, user) {
      state.user = user
      User.saveUser(state.user)
    }
  },
  actions: {

  }
})
