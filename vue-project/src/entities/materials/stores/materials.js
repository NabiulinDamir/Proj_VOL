import { defineStore } from 'pinia';
import api from '../api/index'

import { computed } from 'vue'

import { useDisciplinesStore } from '@/entities/disciplines/stores/disciplines';
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

    userToken: () => {
      const userStore = useCurrentUserStore();
      return userStore.token?.id ?? null;
    },
    
    userIsTeacher: () => {
      const userStore = useCurrentUserStore();
      return userStore.isTeacher
    },

    selectedDisciplineId: () => {
      const disciplinesStore = useDisciplinesStore();
      return disciplinesStore.selectedDisciplineId ?? null;
    },

    selectedDiscipline: () => {
      const disciplinesStore = useDisciplinesStore();
      return disciplinesStore.getDisciplineById(disciplinesStore.selectedDisciplineId) ?? null;
    },

    allDiscipline: () => {
      const disciplinesStore = useDisciplinesStore();
      return disciplinesStore.allDisciplines ?? []
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
        this.Deadlines = await api.GetDeadlinesByGroupId(selected_YYYY_MM)
      }catch(error){
        console.error("ошибка в запросе к дедлайнам", error)
      }
    },

    async setLabs(){  
      try {
        this.Labs = await api.GetLabsByGroupAndDisciplineId(this.selectedDisciplineId)
        return
      }catch(error){
        console.error("ошибка в запросе к лабам", error)
      }
    },
    async setTheory(){  
      try {  

        const res = await api.GetTheoryByGroupAndDisciplineId(this.selectedDisciplineId)

        this.TheoryMaterial = res.map(item => ({
          ...item,
          file_load: false
        }))
        return
      }catch(error){
        console.error("ошибка в запросе к теориям", error)
      }
    }
  },
  // persist: true
});
