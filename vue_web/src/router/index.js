import { createRouter, createWebHistory } from 'vue-router'
import AuthPage from '../views/AuthPage.vue'
import MainPageStudent from '@/views/MainPageStudent.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/MainPage',
      name: 'MainPage',
      component: MainPageStudent
    },
    {
      path: '/',
      name: 'AuthPage',
      component: AuthPage
    },
    // {
    //   path: '/Pgu',
    //   name: 'PguPage',
    //   component: PguPage
    // },
    // // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router
