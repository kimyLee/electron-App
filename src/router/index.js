import Vue from 'vue'
import Router from 'vue-router'
import home from '@/view/home/addsale'
import chaxun from '@/view/home/chaxun'
import mingxi from '@/view/home/chaxunMingXi'
import store from '@/view/home/store'
import borrow from '@/view/cus/borrow'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/chaxun',
      name: 'chaxun',
      component: chaxun
    },
    {
      path: '/mingxi',
      name: 'mingxi',
      component: mingxi
    },
    {
      path: '/store',
      name: 'store',
      component: store
    },
    {
      path: '/borrow',
      name: 'borrow',
      component: borrow
    }
  ]
})
