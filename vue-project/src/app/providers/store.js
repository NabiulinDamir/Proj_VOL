import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    // group_id: 0,
    // selectedDisciplineId: null,
    selectedMenuItem: null,
    // selectedDisciplineName: null,
    // selectedGroupName: null,

    menuContainerOpen: false,
  }),
  getters:{},
  actions: {
    
  },
  persist: true
})
