import { defineStore } from 'pinia';
import api from '../api/index'


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
      return (dateObject) => this.Deadlines.some(ded => ded.date.includes(format(dateObject, "yyyy-MM-dd")));
    },

    getDedlinesForDate(){
      return (dateObject) => this.Deadlines.filter(ded => ded.date.includes(format(dateObject, "yyyy-MM-dd")));
    }

  },
  actions: {
    async setDeadlines(){
      try {  
        this.Deadlines = await api.GetDeadlinesByGroupId()
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
    },
    async deleteTheory(){  },

    async deleteLab(){  },

    async updateTheory(){  },
    
    async updateLab(){  },

    async createTheory(){  },

    async createLab(){  },
  },
  // persist: true
});
