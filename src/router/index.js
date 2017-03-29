import Vue from 'vue'
import Router from 'vue-router'
import chatList from '@/view/chat/list'
import todo from '@/view/todo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'chatList',
      component: chatList
    },
    {
      path: '/todo',
      name: 'todo',
      component: todo
    }
  ]
})
