import Vue from 'vue'
import Router from 'vue-router'
import User from '@/views/user'

/* 引入页面 */

import Login from '@/views/login/login.vue'

// import Main from '@/views/main/main.vue'

import Home from '@/views/home/home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/user',
      name: 'User',
      component: User
    },
    // {
    //
    //   path: '/main',
    //
    //   name: 'Main',
    //
    //   component: Main
    //
    // },

    {

      path: '/home',

      name: 'Home',

      component: Home

    }
  ]
})
