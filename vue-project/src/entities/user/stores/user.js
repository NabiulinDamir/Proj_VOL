import { defineStore } from 'pinia'
import { userLogin } from '../api/index'
import mainJson from '@/shared/documents/main.json'

export const useCurrentUserStore = defineStore('CurrentUser', {
  state: () => ({
    user: null,

    id: 0,
    role: 0,
    name: "",
    lastName: "",
    userName: "",
    email: "",
  }),
  getters: {},
  actions: {
    // login(login, password){
    //   const result = userLogin(login, password)
    //   if(result){console.log(`Авторизация прошла успешно, id пользователя ${result.id} роль пользователя ${result.role}`);}
    //   else {
    //     console.error('Пользователь не найден или неверный логин/пароль');
    //   }   
    // },
    login(userLogin, userPassword) {
        
        const user = mainJson.users.find(user => user.email === userLogin && user.password === userPassword);
        if(user){
            this.id = user.id
            this.name = user.name
            this.lastName = user.lastname
            this.userName = user.username
            this.email = user.email
            this.role = this.getRole(user.id)
            console.log(`Авторизация прошла успешно, id пользователя ${this.id} роль пользователя ${this.role}`);
            
        } else {
            console.error('Пользователь не найден или неверный логин/пароль');
        }   
        return user ? true : false;
    },
    logout() {
        this.id = 0; // или null, если вы хотите, чтобы id был null
        this.role = "";
        this.name = "";
        this.lastName = "";
        this.userName = "";
        this.email = "";
        console.log(`Выход из системы, id=${this.id}`);
    },

    getRole(id){
        const role = mainJson.roles.find(role => role.id === mainJson.users_roles.find(users_role => users_role.user_id === id).role_id)
        return role.id
    },


  },
  persist: true
})
