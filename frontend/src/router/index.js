import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import Login from '../components/Login'
import Register from '../components/Register'
import Conference from '../components/Conference'
import UserInfo from '../components/UserInfo'
import List from '../components/List'
import Notification from '../components/Notification'
import Submission from '../components/Submission'
import Invitation from '../components/Invitation'
import Detail from '../components/Detail'
import Author from '../components/Author'
import Review from '../components/Review'
import Forum from '../components/Forum'

import store from '../store'

Vue.use(Router)

const confProps = route => ({
  username: route.query.username,
  fullName: route.query.fullName,
  abbreviation: route.query.abbreviation,
  time: route.query.time,
  location: route.query.location,
  submissionDDL: route.query.submissionDDL,
  reviewReleaseDate: route.query.reviewReleaseDate,
  status: route.query.status,
  role: route.query.role
})

export const router = new Router({
  routes: [
    {
      path: '/',
      alias: '/home',
      name: 'Home',
      component: Home,
      meta: {
        title: "Home",
        //requireAuth: true // 需要登录权限
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        title: "Login",
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: {
        title: "Register",
      }
    },
    {
      path: '/conference',
      name: 'Conference',
      component: Conference,
      meta: {
        title: "New Conference",
        requireAuth: true // 需要登录权限
      }
    },
    {
      path: '/userInfo',
      name: 'UserInfo',
      component: UserInfo,
      meta: {
        title: "User Info",
        requireAuth: true // 需要登录权限
      }

    },
    {
      path: '/list',
      name: 'List',
      component: List,
      meta: {
        title: "List of Conferences",
        requireAuth: true // 需要登录权限
      }
    },
    {
      path: '/notification',
      name: 'Notification',
      component: Notification,
      meta: {
        title: "Notification",
        requireAuth: true // 需要登录权限
      }
    },
    {
      path: '/submission',
      name: 'Submission',
      component: Submission,
      meta: {
        title: "Submission",
        requireAuth: true // 需要登录权限
      },
      props: confProps
    },
    {
      path: '/invitation',
      name: 'Invitation',
      component: Invitation,
      meta: {
        title: "Invitations",
        requireAuth: true // 需要登录权限
      },
      props: confProps
    },
    {
      path: '/detail',
      name: 'Detail',
      component: Detail,
      meta: {
        title: "Detail",
        requireAuth: true // 需要登录权限
      },
      props: confProps
    },
    {
      path: '/author',
      name: 'Author',
      component: Author,
      meta: {
        title: "Author",
        requireAuth: true // 需要登录权限
      },
      props: confProps
    },
    {
      path: '/review',
      name: 'Review',
      component: Review,
      meta: {
        title: "Review",
        requireAuth: true // 需要登录权限
      },
      props: confProps
    },
    {
      path: '/forum',
      name: 'Forum',
      component: Forum,
      meta: {
        title: "Forum",
        requireAuth: true // 需要登录权限
      },
      props: confProps
    }
  ]
})

// 前端登录拦截
router.beforeEach(function (to, from ,next) {
  document.title = to.meta.title;
  if (to.matched.some(record => record.meta.requireAuth)) {
    if (store.state.token) {
      next()
    } else {
      next({
        path: '/login',
        // path:'/home',
        query: {redirect: to.fullPath} // 登录成功之后重新跳转到该路由
      })
    }
  } else {
    next()
  }
})
