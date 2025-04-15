import { defineStore } from 'pinia';
import api from '../api/index'

import { computed } from 'vue'

import { useAllDisciplinesStore } from '@/entities/disciplines/stores/discipline';
import { useCurrentUserStore } from '@/entities/user/stores/user';

import { format } from 'date-fns'

export const useAllMaterialsStore = defineStore('AllMaterials', {
  state: () => ({
    Labs: [],
    TheoryMaterial: [],
    Deadlines: [],
    navigateLabId: null,
  }),
  
  getters: {

/////////////////////////////////////////////////////////////////////////////////////////////////////внешние хранилища

    group_id: () => {
      const userStore = useCurrentUserStore();
      return userStore.user.group?.id ?? null;
    },
    
    selectedDisciplineId: () => {
      const disciplinesStore = useAllDisciplinesStore();
      return disciplinesStore.selectedDiscipline?.id ?? null;
    },

/////////////////////////////////////////////////////////////////////////////////////////////////////

    getTheoryForLabById() {
      return (id) => {
        const theoryIds = api.GetTheoryIdForLabById(id); // Получаем массив индексов
        return this.TheoryMaterial.filter(the => theoryIds.includes(the.id)); // Проверяем, есть ли id в массиве
      };
    },

    deadlineOnThisDate(){
      return (dateObject) => this.Deadlines.some(deadline => deadline.date.includes(format(dateObject, "yyyy-MM-dd")));
    },

    getDedlinesForDate(){
      return (formattedDate) => this.Deadlines.filter(deadline => deadline.date.includes(formattedDate))
    }

  },
  actions: {
    async setDeadlines(selected_YYYY_MM){
      try {  
        this.Deadlines = await api.GetDeadlinesByGroupId(this.group_id, selected_YYYY_MM)
      }catch(error){
        console.error("ошибка в запросе к дедлайнам", error)
      }
    },

    async setLabs(){  
      try {
        

        console.log("вызов лаб")
        this.Labs = await api.GetLabsByGroupAndDisciplineId(this.group_id, this.selectedDisciplineId)
        return
      }catch(error){
        console.error("ошибка в запросе к лабам", error)
      }
    },
    async setTheory(){  
      try {  
        this.TheoryMaterial = await api.GetTheoryByGroupAndDisciplineId(this.group_id, this.selectedDisciplineId)
        return
      }catch(error){
        console.error("ошибка в запросе к теориям", error)
      }
    }
  },
  // persist: true
});
