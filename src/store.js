import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex)

const state = {
  mans: '',
  username: '',
  room: 'world'
}

const mutations = {
  addName (state, view) {
    state.username = view
  },
  getMans (state, num) {
    state.mans = num
  },
  setRoom (state, name) {
    state.room = name
  }

}

const store = new vuex.Store({
  state,
  mutations
})

export default store

