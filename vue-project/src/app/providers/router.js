import { createRouter, createWebHistory } from 'vue-router'
import routes from '@/pages/routes'
import { useCurrentUserStore } from '@/entities/user/stores/user';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
    const userStore = useCurrentUserStore();

    if (!userStore.isLogined && to.name !== "auth") {
        console.log(userStore.isLogined)
        next({ name: "auth" });
    } else {
        next();
    }
});

export default router;
