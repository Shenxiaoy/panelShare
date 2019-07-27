import Vue from 'vue'
export const store = Vue.observable({num: 2})

export const main = {
  setNum (value) {
    store.num = value
  }
}