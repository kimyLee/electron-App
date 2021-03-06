import Vue from 'vue'
import Router from 'vue-router'
import home from '@/view/home/addsale'
import chaxun from '@/view/home/chaxun'
import mingxi from '@/view/home/chaxunMingXi'
import store from '@/view/home/store'
import borrow from '@/view/cus/borrow'
import back from '@/view/cus/back'
import lentCheck from '@/view/cus/lentCheck'
import customer from '@/view/cus/customer'
import addFee from '@/view/fee/addFee'
import feeDetail from '@/view/fee/feeDetail'
import feeOption from '@/view/fee/feeOption'
import feeIn from '@/view/fee/in'
import feeOut from '@/view/fee/out'
import supplier from '@/view/supplier/supplier'
import transforms from '@/view/supplier/transform'
import ticheng from '@/view/supplier/ticheng'
import goodIn from '@/view/origin/inGood'
import goodOut from '@/view/origin/outGood'
import goodDetail from '@/view/origin/detail'

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
    },
    {
      path: '/back',
      name: 'back',
      component: back
    },
    {
      path: '/lentCheck',
      name: 'lentCheck',
      component: lentCheck
    },
    {
      path: '/customer',
      name: 'customer',
      component: customer
    },
    {
      path: '/addFee',
      name: 'addFee',
      component: addFee
    },
    {
      path: '/feeDetail',
      name: 'feeDetail',
      component: feeDetail
    },
    {
      path: '/feeOption',
      name: 'feeOption',
      component: feeOption
    },
    {
      path: '/feeIn',
      name: 'feeIn',
      component: feeIn
    },
    {
      path: '/feeOut',
      name: 'feeOut',
      component: feeOut
    },
    // 供应商
    {
      path: '/supplier',
      name: 'supplier',
      component: supplier
    },
    {
      path: '/transforms',
      name: 'transforms',
      component: transforms
    },
    {
      path: '/ticheng',
      name: 'ticheng',
      component: ticheng
    },
    {
      path: '/goodIn',
      name: 'goodIn',
      component: goodIn
    },
    {
      path: '/goodOut',
      name: 'goodOut',
      component: goodOut
    },
    {
      path: '/goodDetail',
      name: 'goodDetail',
      component: goodDetail
    }
  ]
})
