import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login'
import Home from '@/views/home'
import Register from '@/views/register'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path:'/',
      name:'/Home',
      component:Home
    },
    {
      path:'/register',
      name:'/Rrgister',
      component:Register
    }
  ]
})
