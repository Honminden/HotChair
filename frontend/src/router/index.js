import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Conference from '@/components/Conference'
import store from '../store'

Vue.use(Router)

export const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        requireAuth: true // 需要登录权限
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/conference',
      name: 'Conference',
      component: Conference,
      meta: {
        requireAuth: true // 需要登录权限
      }
    }
  ]
})

// 前端登录拦截
router.beforeEach(function (to, from ,next) {
  if (to.matched.some(record => record.meta.requireAuth)) {
    if (store.state.token) {
      next()
    } else {
      next({
        path: '/login',
        query: {redirect: to.fullPath} // 登录成功之后重新跳转到该路由
      })
    }
  } else {
    next()
  }
})
