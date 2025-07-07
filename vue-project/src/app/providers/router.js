import { createRouter, createWebHistory } from 'vue-router'
import routes from '@/pages/routes'
import { useCurrentUserStore } from '@/entities/user/stores/user';
import { useAppStore } from './store';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
    const userStore = useCurrentUserStore()
    const appStore = useAppStore()
  
    // Проверка авторизации
    if (!userStore.isLogined && to.name !== 'auth' && to.name !== 'reg') {
      return next({ name: 'auth' })
    }
  
    // Проверка выбранного элемента меню (только для защищенных маршрутов)
    if (userStore.isLogined) {
      const menuRouteMap = {
        4: 'teacherGroup', // имя маршрута для преподавателя
        5: 'teacherMaterials', // имя маршрута для студента
        1: 'studentGroup', // имя маршрута для администратора
        2: 'studentMaterials', // имя маршрута для администратора
        3: 'consultations', // имя маршрута для администратора
        6: 'home',
      }
  
      const expectedRouteName = menuRouteMap[appStore.selectedMenuItem]
      
      // Если пользователь пытается перейти не на тот маршрут, который соответствует выбранному пункту меню
      if (expectedRouteName && to.name !== expectedRouteName) {
        return next({ name: expectedRouteName })
      }
    }
  
    next()
  })
  
  export default router
