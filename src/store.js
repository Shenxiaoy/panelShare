import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex)

const state = {
  mans: 1,
  username: ''
}

const mutation = {
  addName (state, view) {
    state.username = view
  }
}

const store = new vuex.Store({
  state,
  mutation
})

export default store

