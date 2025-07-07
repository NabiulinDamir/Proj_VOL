import { defineStore } from "pinia";
import api from "../api/index";

import { useCurrentUserStore } from "@/entities/user/stores/user";
import { useGroupStore } from "@/entities/groups/stores/groupStore";
import groupsApi from "@/entities/groups/api/groupsApi";

export const useDisciplinesStore = defineStore("disciplines", {
  state: () => ({
    allDisciplines: [],
    selectedDisciplineId: null,
    groupsForDiscipline: [],
  }),
  getters: {
    userToken: () => {
      const userStore = useCurrentUserStore();
      return userStore.token ?? null;
    },

    async allGroups() {
      const groupStore = useGroupStore();
      return await groupStore.getGroups();
    },





    getDisciplineById() {
      return (id) => this.allDisciplines?.find((dis) => dis.id == id);
    },

    getSelectedDisciplineName() {
      return this.allDisciplines.find(d => d.id === this.selectedDisciplineId)?.name ?? "Дисциплины"
    }
  },
  actions: {

    ////////////////////////////////////////////////////////////////////////////////////////////////SET

    async setDisciplinesByTeacher() {
      try {
        const data = await api.getDisciplinesByTeacher(this.userToken);
        this.allDisciplines = data;
      } catch (error) {
        this.allDisciplines = [];
        alert(`Ошибка: ${error}`)
      }
    },

    async setDisciplinesByStudent() {
      try {
        const data = await api.getDisciplinesByStudent(this.userToken)
        this.allDisciplines = data;
      }
      catch (error) {
        this.allDisciplines = [];
        alert(`Ошибка: ${error}`)
      }
    },

    async setGroupsForDiscipline() {
      try {
        if (this.selectedDisciplineId) {
          const res = await api.getGroupsForDiscipline(this.userToken, this.selectedDisciplineId);
          if(res){
            this.groupsForDiscipline = res
          }
          else{
            this.groupsForDiscipline = []
          }
          return res;
        }
      }
      catch (error) {
        alert(`Ошибка: ${error}`)
        return { success: false, message: error };
      }
    },

    ////////////////////////////////////////////////////////////////////////////////////////////////GET    

    async getDisciplines() {
    try {
        const res = await api.getDisciplinesByTeacher(this.userToken);
        if(res){
          return res;
        }
      }   
      catch (error) {
        alert(`Ошибка: ${error}`)
        return { success: false, message: error };
      }
    },

    ////////////////////////////////////////////////////////////////////////////////////////////////CREATE

    async createDiscipline(name, description, groups)//groups - object[]
    {
      try {
        const res = await api.addDiscipline(this.userToken, name, description)

        if (res) {
          for (let i = 0; i < groups.length; i++) {
            await api.addGroupForDiscipline(this.userToken, res.id, groups[i].id);
          }
        }

        await this.setDisciplinesByTeacher()
        return { success: true };
      }
      catch (error) {
        alert(`Ошибка: ${error}`)
        return { success: false, message: error };

      }
    },

    ////////////////////////////////////////////////////////////////////////////////////////////////UPDATE

    async updateDisciplineName(name, description)
    {
      try {
        await api.updateDiscipline(this.userToken, this.selectedDisciplineId, name, description)
        await this.setDisciplinesByTeacher()
      
        return { success: true };
      }
      catch (error) {
        alert(`Ошибка: ${error}`)
        return { success: false, message: error };
      }
    },

    async updateGroups(newGroupsArray)//groups - object[]
    {
      // try {
        const oldGroupsArray = await api.getGroupsForDiscipline(this.userToken, this.selectedDisciplineId)
        // await api.updateDiscipline(this.userToken, this.selectedDisciplineId, name, description)
        const addGroups = newGroupsArray.filter(newG => !oldGroupsArray.some(oldG => oldG.id === newG.id))
        const deleteGroups = oldGroupsArray.filter(oldG => !newGroupsArray.some(newG => newG.id === oldG.id))

        for (let i = 0; i < deleteGroups.length; i++) {
          await api.deleteGroupForDiscipline(this.userToken, this.selectedDisciplineId, deleteGroups[i].id)
        }
        for (let i = 0; i < addGroups.length; i++) {
          await api.addGroupForDiscipline(this.userToken, this.selectedDisciplineId, addGroups[i].id)
        }
          
        await this.setGroupsForDiscipline()
        
        return { success: true };
      // }
      // catch (error) {
      //   alert(`Ошибка: ${error}`)
      //   return { success: false, message: error };
      // }
    },

    ////////////////////////////////////////////////////////////////////////////////////////////////DELETE

    async deleteDiscipline() {
      try {
        await api.deleteDiscipline(this.userToken, this.selectedDisciplineId)
        await this.setDisciplinesByTeacher()
        this.selectedDisciplineId = null
        return { success: true };
      }
      catch (error) {
        alert(`Ошибка: ${error}`)
        return { success: false, message: error };
      }
    },

    ////////////////////////////////////////////////////////////////////////////////////////////////


  },
  persist: true,
});
