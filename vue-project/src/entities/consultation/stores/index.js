import { defineStore } from 'pinia';
import { getAllCons } from '../api/index'

export const useConsStore = defineStore('Consultation', {
  state: () => ({
    group_id: null,
    consultations: []
  }),
  getters:{},
    
  actions: {
    setConsByUser(group_id){
        this.group_id = group_id
        this.consultations = getAllCons(this.group_id)
    },
  },
  persist: true
});
