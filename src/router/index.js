import Vue from 'vue'
import Router from 'vue-router'
import home from '@/view/home/addsale'
import chaxun from '@/view/home/chaxun'
import mingxi from '@/view/home/chaxunMingXi'

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
    }
  ]
})
