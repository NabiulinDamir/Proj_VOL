import { defineStore } from "pinia";
import api from "../api/index";

export const useCurrentUserStore = defineStore("CurrentUser", {
    state: () => ({
        user: null,



        isLogined: false,
        // disciplines: null,
        allUsers: [],

        login: "user",
        password: "100",
        token: "",

        userGroup: null,

        intervalId: null,

    }),
    getters: {
/////////////////////////////////////////////////////////////////////////////////////////////внешние геттеры


/////////////////////////////////////////////////////////////////////////////////////////////внутренние геттеры

        id() { return this.user?.id },

        name() { return this.user?.firstname ?? "--"} ,

        surename() { return this.user?.surname ?? "--"},

        middleName() { return this.user?.middleName ?? "--"},

        username() { return this.user?.login ?? "--"},

        email() { return this.user?.email ?? "не добавлен" },

        isTeacher() { return this.user?.roles.includes("ROLE_ADMIN")},

        isStudent() { return this.user?.roles.includes("ROLE_USER")},

        group() { return this.user?.group?.name ?? "Группа"},

        myGroup(){ return this.user?.group?.name ?? "нет группы" }




/////////////////////////////////////////////////////////////////////////////////////////////внутренние геттеры


        
    },
    actions: {

        changeRole(){
            this.password = "100"
            if(this.login === "admin"){this.login = "user"}
            else {this.login = "admin"}
        },


        async UserLogin(login, password) {
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

        userLogout() {
            this.isLogined = false
            this.user = null
            this.allUsers = []
            this.token = ""
            this.stopTokenRefresh()
        },

        // async setUsersByGroup(){
        //     try{
        //         const groupsStore = useAllGroupsStore()
        //         if(this.user.role == "Student"){
        //             groupsStore.selectedGroup = this.user.group
        //         }
        //         const res = await api.getUsersByGroup(this.selectedGroup.id)
        //         this.allUsers = res
        //     }catch(error){
        //         console.error("Ошибка в поиске пользователей", error)
        //     }
        // },

        async setInfo() {
            try {
                const data = await api.userInfo(this.token);
                if(data) this.user = data
            } catch (error) {
                console.error(error.message)
            }
        },

        async userAuth() {
            try {
                const data = await api.userAuth(this.login, this.password);
                this.token = data.token;
                this.isLogined = true
                return { success: true };
            } catch (error) {
                this.isLogined = false
                return { success: false, message: error };
            }
        },

        async userReg(regData){// regData = {firstName, surname, middleName, login, password, confirmPassword, email}
            try{
                const res = await api.userReg(regData)
                if(res){
                    this.login = res.login
                    this.password = regData.password
                    return await this.userAuth()
                }
            }catch(error){
                return { success: false, message: error };
            }
        },

        
        startTokenRefresh() {
        // Обновляем сразу при старте
            this.userAuth();
            
            this.intervalId = setInterval(() => {
                this.userAuth();
            }, 540000);
        },
        
        stopTokenRefresh() {
            clearInterval(this.intervalId);
        },



    },
    strict: true,
    persist: true,
});
