import { createRouter, createWebHistory } from "vue-router";
import AuthPage from "@/interfaces/auth/pages/AuthPage.vue";
import MainPageStudent from "@/interfaces/student/pages/MainPageStudent copy.vue";
import MainPageTeacher from "@/interfaces/teacher/pages/MainPageTeacher.vue";

import { useCurrentUserStore } from "@/interfaces/auth/entities/user/stores/user";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/Main",
            name: "MainPage",
            component: MainPageStudent,
        },
        {
            path: "/Teacher",
            name: "TeacherPage",
            component: MainPageTeacher,
        },
        {
            path: "/",
            name: "AuthPage",
            component: AuthPage,
        },
    ],
});

router.beforeEach((to, from, next) => {
    const userStore = useCurrentUserStore();

    if (!userStore.isLogined && to.name !== "AuthPage") {
        console.log(userStore.isLogined)
        next({ name: "AuthPage" });
    } else {
        next();
    }
});

export default router;
