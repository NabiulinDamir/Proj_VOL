import { defineStore } from "pinia";
import api from "../api/index";

export const useCurrentUserStore = defineStore("CurrentUser", {
    state: () => ({
        user: null,
        isLogined: false,
        disciplines: null,

        groupUsers: null,
    }),
    getters: {

        getDisciplineById(){
            return (id) => this.disciplines?.find(dis => dis.id == id)
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
        },

        async setGroupUsersByGroup(){
            try{
                const res = await api.getGroupUsersByGroup(this.user.group.id)
                this.groupUsers = res
            }catch(error){
                console.error("Ошибка в поиске пользователей", error)
            }
        }
    },
    strict: true,
    persist: true,
});
