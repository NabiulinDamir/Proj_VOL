import { defineStore } from 'pinia'
import mainJson from '@/shared/documents/main.json'
import { getDisciplines } from '../api/index'


export const useCurrentStudentStore = defineStore('CurrentStudent', {
  state: () => ({
    user: null,

    user_id: 0,
    group_id: 0,
    group_name: "",

    disciplines: [],
  }),
  getters: {

    getDisciplinesByGroupId(){
      return () => {getDisciplines(this.group_id)}
    }



  },
  actions: {

    init(user_id){
      this.user_id = user_id
      this.group_id = this.getStudentGroupId(this.user_id)
      this.group_name = this.getStudentGroupName(this.group_id)
    },

    getStudentGroupId(user_id){
      const group = mainJson.groups.find(group => group.id === (mainJson.users.find(user => user.id === user_id).group_id));
      return group.id
    },
    getStudentGroupName(group_id){
      const group = mainJson.groups.find(group => group.id === group_id);
      return group.name
    },





    logout() {

    },
  },
  persist: true
})
