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
          path: 'home',
          component: () => import('@/pages/HomePage.vue'),
          name: 'home'
        },
        {
          path: 'teacherGroup',
          component: () => import('@/pages/CenterContainerPages/teacherGroupMenu.vue'),
          name: 'teacherGroup',
        },
        {
          path: 'teacherMaterials',
          component: () => import('@/pages/CenterContainerPages/teacherMaterials.vue'),
          name: 'teacherMaterials'
        },
        {
          path: 'studentMaterials',
          component: () => import('@/pages/CenterContainerPages/studentMaterialsPage.vue'),
          name: 'studentMaterials'
        },
        {
          path: 'studentGroup',
          component: () => import('@/pages/CenterContainerPages/studentGroupMenu.vue'),
          name: 'studentGroup',
        },
        {
          path: 'consultations',
          component: () => import('@/pages/CenterContainerPages/consultationsPage.vue'),
          name: 'consultations',
        },

      ],
    },
    {
      path: '/:catchAll(.*)*',
      component: () => import('@/pages/NonePage.vue'),
    },
  ]
  