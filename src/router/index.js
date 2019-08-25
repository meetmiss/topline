import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login'
import Home from '@/views/home'
import Tabbar from '@/views/tabbar'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/login', name: 'login', component: Login },
    {
      path: '/',
      component: Tabbar,
      children: [
        { path: 'home', name: 'home', component: Home }
      ] }
  ]
})
