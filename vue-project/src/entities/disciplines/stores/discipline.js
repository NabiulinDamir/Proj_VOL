import { defineStore } from 'pinia';
import api from '../api/index'

import { useCurrentUserStore } from '@/entities/user/stores/user';

export const useAllDisciplinesStore = defineStore('AllDisciplines', {
  state: () => ({
    allDisciplines: [],
    selectedDiscipline: null,

  }),
  getters: {

    userId: () => {
      const userStore = useCurrentUserStore();
      return userStore.user?.id ?? null;
    },

    getDisciplineById(){
        return (id) => this.allDisciplines?.find(dis => dis.id == id)
    },
    
    getSelectedDisciplineId(){
        return() => this.selectedDiscipline ? this.selectedDiscipline.id : null
    }
    
  },
  actions: {

    async setDisciplinesByUser() {
        try {  
            console.log(`вызов дисциплин для юзера- ${this.userId}`)
            this.allDisciplines = await api.getDisciplinesByUser(this.userId)
            return
        }
        catch(error){
            console.error("ошибка в запросе к дисциплинам", error)
        }
    },


  },
  persist: true
});
