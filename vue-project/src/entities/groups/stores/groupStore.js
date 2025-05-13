import { defineStore } from "pinia";
import api from "../api/groupsApi";
import { useCurrentUserStore } from "@/entities/user/stores/user";
import { useDisciplinesStore } from "@/entities/disciplines/stores/disciplines";

export const useGroupStore = defineStore("group", {
    state: () => ({
        allGroups: [],
        allUsers: [],

        myGroup: null,
        selectedGroupId: 'without',
    }),
    getters: {

//////////////////////////////////////////////////////////////////////////////////////////////внешние хранилища

        userToken: () => {
            const userStore = useCurrentUserStore();
            return userStore.token;
        },

        selectedDisciplineId: ()=>{
            const disciplinesStore = useDisciplinesStore()
            return disciplinesStore.selectedDisciplineId
        },

//////////////////////////////////////////////////////////////////////////////////////////////

        getGroupById() {
            return (id) => this.allGroups.find((gr) => gr.id === id);
        },

        getSelectedGroupName(){
            if(this.selectedGroupId === "without") return "без группы"
            return this.allGroups.find(g => g.id === this.selectedGroupId)?.name ?? "Группы"
        },

        getMyGroupName(){
            return this.myGroup?.name ?? "Нет группы"
        }

    },
    actions: {

        async setStudentUsers() {
            try {
            const data = await api.getMyGroup(this.userToken);
            if (data) {
                this.myGroup = {id: data.id,name: data.name,};
                this.allUsers = data.users;
            }
            } catch (error) {
            this.myGroup = null;
            this.allUsers = [];
            }
        },
  
        async setTeacherUsers() {
            try {
                let res = null
                if(this.selectedGroupId === 'without'){
                    res = await api.getUsersWithoutGroup(this.userToken,);
                }
                else {
                    res = await api.getUsersByGroup(this.userToken,this.selectedGroupId);
                }
                this.allUsers = res;
            } catch (error) {
                this.allUsers = [];
            }
        },

        async getUsersWithoutGroup(){
            try {
                const res = await api.getUsersWithoutGroup(this.userToken);
                return res
            } catch (error) {
                this.allUsers = [];
                alert(`Ошибка: ${error}`)
            }
        },

        async setGroups() {
            try {
                const res = await this.getGroups();
                this.allGroups = res;
            } catch (error) {
                this.allGroups = [];
            }
        },

        async getGroups(){
            try{
                const res = await api.getAllGroups(this.userToken);
                return res
            }catch(error){
                alert(`Ошибка: ${error}`)
            }
        },

        async createGroup(name) {
            try {
                await api.createGroup(this.userToken, name);
                await this.setGroups()
            } catch(error) {
                alert(`Ошибка: ${error}`)
            }
        },

        async updateGroup(newName){
            try{
                await api.updateGroup(this.userToken, this.selectedGroupId, newName)
                await this.setGroups()
            }catch(error){
                alert(`Ошибка: ${error}`)
            }
        },

        async deleteGroup(){
            try{
                if(this.allUsers.length)
                {
                    for (let i = 0; i < this.allUsers.length; i++) {
                        await api.deleteUserFromGroup(this.userToken, this.selectedGroupId, this.allUsers[i].id)
                    }
                }
                await api.deleteGroup(this.userToken, this.selectedGroupId)
                this.selectedGroupId = 'without'
                await this.setGroups()
                await this.setTeacherUsers()
            }catch(error){
                alert(`Ошибка: ${error}`)
            }
        },

        async addUsersForGroup(users){
            try {
                for (let i = 0; i < users.length; i++) {
                    // console.log(this.userToken, this.selectedGroupId, users[i].id)
                    await api.addUserForGroup(this.userToken, this.selectedGroupId, users[i].id)
                }
                await this.setTeacherUsers()
                // const data = await api.userAuth(this.login, this.password);
                return { success: true };
            } catch (error) {
                alert(`Ошибка: ${error}`)
                return { success: false, message: error.message };
                
            }
        },
        async deleteUserFromGroup(userId){
            try {
                console.log(userId)
                await api.deleteUserFromGroup(this.userToken, this.selectedGroupId, userId)
                await this.setTeacherUsers()
                return { success: true };
            } catch (error) {
                alert(`Ошибка: ${error}`)
                return { success: false, message: error.message };
                
            }
        },

        async changeUserGroup(newGroupId, userId){
            try {
                if(newGroupId != this.selectedGroupId){
                    // await api.deleteUserFromGroup(this.userToken, this.selectedGroupId, userId)
                    await api.addUserForGroup(this.userToken, newGroupId, userId)
                    await this.setTeacherUsers()
                }
                return { success: true };
            } catch (error) {
                alert(`Ошибка: ${error}`)
                return { success: false, message: error.message };
                
            }
        },

        async getGroupsForDiscipline(disciplineId){
            try {
                if(disciplineId){
                    const res = await api.getGroupsForDiscipline(this.userToken, disciplineId)
                    return res
                }
                return []
            } catch (error) {
                alert(`Ошибка: ${error}`)
                
            }
        }

    },

    persist: true,
});
