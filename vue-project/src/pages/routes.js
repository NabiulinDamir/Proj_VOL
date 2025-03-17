export default [
    {
      path: '/auth',
      component: () => import('@/pages/AuthPage.vue'),
      name: "auth"
        
    },
    {
      path: '/',
      component: () => import('@/pages/MainPageStudent copy.vue'),
      name: 'main',
      children: [
        {
          path: 'materials',
          component: () => import('@/pages/CenterContainerPages/materialsPage.vue'),
          name: 'materials',
        },
        {
          path: 'consultations',
          component: () => import('@/pages/CenterContainerPages/consultationsPage.vue'),
          name: 'consultations',
        },
        {
          path: 'users',
          component: () => import('@/pages/CenterContainerPages/usersMenuPage.vue'),
          name: 'users',
        },
      ],
    },
    {
      path: '/:catchAll(.*)*',
      component: () => import('@/pages/NonePage.vue'),
    },
  ]
  