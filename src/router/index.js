import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login'
import index from '../views/home/index.vue'
import home from '@/views/home/home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: login
  },
  {
    path: '/index',
    component: index,
    children: [
      {
        path: '',
        component: home
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
