import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login'
import index from '../views/home/index.vue'
import home from '@/views/home/home.vue'
import article from '@/views/article/article-list'
import articlePublish from '@/views/article/article-publish'
import comment from '@/views/article/comment'
import commentDetail from '@/views/article/comment-detail'
import material from '@/views/article/material'
import account from '@/views/account/account.vue'
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
      },
      {
        path: 'publish',
        component: articlePublish
      },
      {
        path: 'publish/:articleId',
        component: articlePublish
      },
      {
        path: 'comment',
        component: comment
      },
      {
        path: 'comment/:commentId',
        component: commentDetail,
        props: true // 把commentId当作属性传给子路由
      },
      {
        path: 'material',
        component: material
      },
      {
        path: '/account',
        component: account
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
