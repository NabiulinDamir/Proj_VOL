import { defineStore } from "pinia";
import api from "../api/index";
import { useAllGroupsStore } from "@/entities/groups/stores/groups";

export const useCurrentUserStore = defineStore("CurrentUser", {
    state: () => ({
        user: null,
        isLogined: false,
        // disciplines: null,
        allUsers: [],


    }),
    getters: {

        myGroup: () => {
            const groupStore = useAllGroupsStore();
            return groupStore.myGroup ?? null;
        },

        selectedGroup: () => {
            const groupStore = useAllGroupsStore();
            return groupStore.selectedGroup ?? null;
        },

        // getDisciplineById(){
        //     return (id) => this.disciplines?.find(dis => dis.id == id)
        // },

        // getGroupById(){
        //     return (id) => this.user.groups ? this.user.groups.find(gr => gr.id === id) : this.user.group
        // },

        
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
            this.isLogined = false
            this.user = null
            // this.disciplines = null
    
        },

        async setUsersByGroup(){
            try{
                const groupsStore = useAllGroupsStore()
                if(this.user.role == "Student"){
                    groupsStore.selectedGroup = this.user.group
                }
                const res = await api.getUsersByGroup(this.selectedGroup.id)
                this.allUsers = res
            }catch(error){
                console.error("Ошибка в поиске пользователей", error)
            }
        },

    },
    strict: true,
    persist: true,
});
