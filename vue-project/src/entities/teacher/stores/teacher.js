import { defineStore } from 'pinia'

export const useCurrentTeacherStore = defineStore('CurrentTeacher', {
  state: () => ({
    user_id: 0
    
  }),
  getters: {},
  actions: {
    init(user_id){
      this.user_id = user_id
    },

    onLogin() {
        
    },
    onLogout() {
    },
  },
  persist: true
})
