import { createRouter, createWebHistory } from 'vue-router'
import AuthPage from '@/interfaces/auth/pages/AuthPage.vue'
import MainPageStudent from '@/interfaces/student/pages/MainPageStudent copy.vue'
import MainPageTeacher from '@/interfaces/teacher/pages/MainPageTeacher.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/Main',
      name: 'MainPage',
      component: MainPageStudent
    },
    {
      path: '/Teacher',
      name: 'TeacherPage',
      component: MainPageTeacher
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
