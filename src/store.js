import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex)

const state = {
  mans: 1,
  username: ''
}

const mutations = {
  addName (state, view) {
    state.username = view
  },
  getMans (state, num) {
    state.mans = num
  }

}

const store = new vuex.Store({
  state,
  mutations
})

export default store

