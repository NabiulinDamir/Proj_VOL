import { defineStore } from "pinia";
import api from "../api/index";

export const useCurrentUserStore = defineStore("CurrentUser", {
    state: () => ({
        user: null,
        isLogined: false,
        disciplines: null,

        selectedGroupId: null,
        groupUsers: null,

    }),
    getters: {

        getDisciplineById(){
            return (id) => this.disciplines?.find(dis => dis.id == id)
        },

        getGroupById(){
            return (id) => this.user.groups ? this.user.groups.find(gr => gr.id === id) : this.user.group
        },

        
    },
    actions: {

        async login(login, password) {
            try {
                const res = await api.UserLogin(login, password);
                if (res) {
                    this.user = res;
                    this.isLogined = true;
                    if(this.user.role === "Student"){
                        this.selectedGroupId = res.group.id
                    }
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
            this.isLogined = false
            this.user = null
            this.disciplines = null
    
            this.selectedGroupId = null
            this.groupUsers = null
    
        },




        async setDisciplinesByGroup(){
            try {
                console.log("запрос дисциплин")
                this.disciplines = await api.getDisciplinesByUser(this.user.id);
            } catch (error) {
                console.error("Ошибка в запросе к дисциплинам:", error);
            }
        },

        async setUsersByGroup(){
            try{
                const res = await api.getUsersByGroup(this.selectedGroupId)
                this.groupUsers = res
            }catch(error){
                console.error("Ошибка в поиске пользователей", error)
            }
        }
    },
    strict: true,
    persist: true,
});
