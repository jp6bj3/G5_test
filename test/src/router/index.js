import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
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
      component: () => import('@/views/AboutView.vue')
    },
    {
      path: '/Test',
      name: 'TestView',
      component: () => import('@/views/TestView.vue')
    },
    {
      path: '/EggView',
      name: 'EggView',
      component: () => import('@/views/EggView.vue')
    },
    {
      path: '/11',
      name: '11',
      component: () => import('@/views/11.vue')
    },
    {
      path: '/1',
      name: 'life',
      component: () => import('@/views/0616/1.vue')
    },
    {
      path: '/2',
      name: 'time',
      component: () => import('@/views/0616/2.vue')
    },
    {
      path: '/3',
      name: 'opiton',
      component: () => import('@/views/0616/3.vue')
    },
    {
      path: '/4',
      name: 'from',
      component: () => import('@/views/0616/4.vue')
    },
    {
      path: '/5',
      name: 'search',
      component: () => import('@/views/0616/5.vue')
    },
    {
      path: '/5/:id',
      name: 'searchinfo',
      component: () => import('@/views/0616/6.vue')
      ,meta: {
        title: '搜尋結果'
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notfound',
      component: () => import('@/views/0616/7.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/0616/Login.vue')
    }
  ],
  scrollBehavior(to,from,savedPosition) {
    return { top: 0 }
  }
})

export default router
