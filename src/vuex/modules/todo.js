/**
 * Created by duoyi on 2017/3/24.
 */
import _ from 'lodash'
const state = {
  list: [
    {val: '做事情2', checked: true},
    {val: '做事情1', checked: true}
  ]
}

// getters
const getters = {}

// actions
const actions = {}

// mutations
const mutations = {
  initList (state, arr) {
    state.list = arr
  },
  changeList (state, obj) {
    _.set(state.list[obj.index], [obj.target], obj.val)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
