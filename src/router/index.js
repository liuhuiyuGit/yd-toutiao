import Vue from 'vue'
import Router from 'vue-router'
import Tabbar from '@/views/Tabbar.vue'
import Home from '@/views/home/index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Tabbar,
      children: [
        {
          name: 'home',
          path: '',
          component: Home
        },
        {
          name: 'user',
          path: '/user',
          component: () => import(/* webpackChunkName: "user" */ '../views/User.vue')
        }
      ]
    },
    {
      path: '/follow',
      name: 'follow',
      component: () => import(/* webpackChunkName: "follow" */ '../views/follow/index.vue')
    },
    {
      path: '/chat',
      name: 'chat',
      component: () => import(/* webpackChunkName: "follow" */ '../views/Chat.vue')
    },
    {
      path: '/user-profile',
      name: 'user-profile',
      component: () => import(/* webpackChunkName: "user-profile" */ '../views/user-profile/index.vue')
    },
    {
      path: '/search',
      name: 'search',
      component: () => import(/* webpackChunkName: "search" */ '../views/Search.vue')
    },
    {
      path: '/search-result/:q',
      name: 'search-result',
      // 路由跳转的时候对，对应的组件把动态路由参数，传递给组件
      props: true,
      component: () => import(/* webpackChunkName: "search-result" */ '../views/SearchResult.vue')
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '@/views/login.vue')
    },
    {
      path: '/detail/:id',
      name: 'detail',
      // 路由跳转的时候对，对应的组件把动态路由参数，传递给组件
      props: true,
      component: () => import(/* webpackChunkName: "detail" */ '../views/detail/index.vue')
    }
  ]
})
