import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login'
import index from '../views/home/index.vue'
import home from '@/views/home/home.vue'
import article from '@/views/article/article-list'
import NProgress from 'nprogress'

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
      },
      {
        path: 'article',
        component: article
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  console.log('router begin')
  if (to.path === '/login') {
    return next()
  }
  if (!window.localStorage.getItem('toutiao-token')) {
    NProgress.done()
    return next('/login')
  }
  next()
})

router.afterEach((to, from, next) => {
  NProgress.done()
  console.log('router end')
})

export default router
