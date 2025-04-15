import { defineStore } from 'pinia';
import api from '../api/groupsApi'
import { useCurrentUserStore } from '@/entities/user/stores/user';

export const useAllGroupsStore = defineStore('AllGroups', {
  state: () => ({
    allGroups: [],
    // allUsers: [],
    selectedGroup: null,
    myGroup: null,

  }),
  getters: {

    userId: () => {
      const userStore = useCurrentUserStore();
      return userStore.user?.id ?? null;
    },

    getGroupById(){
        return (id) => this.allGroups.find(gr => gr.id === id)
    },
    
  },
  actions: {

    async setGroups(){
        try{
            const res = await api.getGroupsByUser(this.userId)
            this.allGroups = res
        }catch(error){
            console.error("Ошибка в поиске групп", error)
        }
    },

    async setUsersByGroup(){
        try{
            const res = await api.getUsersByGroup(this.selectedGroupId)
            this.allUsers = res
        }catch(error){
            console.error("Ошибка в поиске пользователей для группы", error)
        }
    }


  },
  persist: true
});
