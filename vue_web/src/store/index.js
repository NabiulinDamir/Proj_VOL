import router from '@/router'
import data from '../documents/Labs.json'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({


    id: 1,
    name: 'Викентева Ольга Леонидовна',
    f: false,
    GroupCode: ['HHHHH', 'FFFFF'],
    Labs: [],

    Selected_Discipline_Id: null,


  }),
  getters:{
    isCodeValid: state => code => {
      return state.GroupCode.includes(code);
    },
    getLabs: state => (group, subject) =>{
      const res = state.Labs.filter(lab => lab.group === group && lab.subject === subject);
      return res;
    }
  },
  actions: {
    async fetchItems() {
      this.Labs = data.items
      console.log("данные по лабам извлечены")
    }
  }
})
