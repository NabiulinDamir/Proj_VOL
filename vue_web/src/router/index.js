import { createRouter, createWebHistory } from 'vue-router'
import AuthPage from '../views/AuthPage.vue'
import MainPageStudent from '@/views/MainPageStudent.vue'
import PnipuPage from '../views/PnipuPage.vue'
import PguPage from '../views/PguPage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   name: 'AuthPage',
    //   component: AuthPage
    // },
    {
      path: '/',
      name: 'MainPage',
      component: MainPageStudent
    },
    {
      path: '/Pnipu',
      name: 'PnipuPage',
      component: PnipuPage
    },
    {
      path: '/Pgu',
      name: 'PguPage',
      component: PguPage
    },
    // {
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
