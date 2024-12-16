import { defineStore } from 'pinia'
import { userLogin } from '../api/index'

export const useCurrentUserStore = defineStore('CurrentUser', {
  state: () => ({
    user: null,
  }),
  getters: {},
  actions: {

    login(Login, Password) {
        const res = userLogin(Login, Password)
        if(res){
          this.user = res
          console.log(`Авторизация прошла успешно id пользователя: ${res.id}`)
        }
        else{console.error(`Авторизация не удаласб`)}
        return res ? true : false
    },
    logout() {
    },
  },
  persist: true
})
