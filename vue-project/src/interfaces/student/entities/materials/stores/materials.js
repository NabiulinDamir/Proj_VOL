import { defineStore } from 'pinia';

import api from '../api/index'


export const useAllMaterialsStore = defineStore('AllMaterials', {
  state: () => ({
    Labs: [],
    TheoryMaterial: [],
    Deadlines: [],

    group_id: null,
    selectedDisciplineId: null,
    navigateLabId: null,
  }),
  getters: {
    getTheoryForLabById() {
      return (id) => {
        const theoryIds = api.GetTheoryIdForLabById(id); // Получаем массив индексов
        return this.TheoryMaterial.filter(the => theoryIds.includes(the.id)); // Проверяем, есть ли id в массиве
      };
    }

  },
  actions: {
    async setDeadlines(YearAndMonth){
      try {  
        this.Deadlines = await api.GetDeadlinesByGroupId(this.group_id, YearAndMonth)
      }catch(error){
        console.error("ошибка в запросе к дедлайнам", error)
      }
    },

    async setLabs(){  
      try {  
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
  persist: true
});
