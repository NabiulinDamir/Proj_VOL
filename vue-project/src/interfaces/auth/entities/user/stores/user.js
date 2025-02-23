import { defineStore } from "pinia";
import api from "../api/index";
import { getDisciplines } from "@/interfaces/student/entities/student/api";

export const useCurrentUserStore = defineStore("CurrentUser", {
    state: () => ({
        user: null,
        isLogined: false,
        disciplines: null,
    }),
    getters: {

        getDisciplineById(){
            return (id) => this.disciplines.find(dis => dis.id == id)
        }
    },
    actions: {

        async login(login, password) {
            try {
                const res = await api.UserLogin(login, password);
                if (res) {
                    this.user = res;
                    this.isLogined = true;
                    console.log("авторизация прошла успешно")
                    return true;
                } else {
                    this.isLogined = false;
                    return false;
                }
            } catch (error) {
                console.error("Ошибка при авторизации:", error);
                return false;
            }
        },

        logout() {
            this.isLogined = false;
            this.user = null;
        },




        async setDisciplinesByGroup(){
            try {
                const res = await api.getDisciplinesByGroupId(this.user.group?.id);
                this.disciplines = res
            } catch (error) {
                console.error("Ошибка в запросе к дисциплинам:", error);
            }
        }
    },
    strict: true,
    persist: true,
});
