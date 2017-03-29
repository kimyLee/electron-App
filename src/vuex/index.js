/**
 * Created by duoyi on 2017/3/24.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import todo from './modules/todo'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    todo
  }
})
