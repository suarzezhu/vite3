import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import WebView from '@/views/WebView.vue'
import Favourite from '@/views/favourite.vue'

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  // 必须使用哈希模式
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/webView',
      name: 'webView',
      component: WebView
    },
    {
      path:'/favourite',
      name: 'favourite',
      component:Favourite

    }
  ]
})

export default router
