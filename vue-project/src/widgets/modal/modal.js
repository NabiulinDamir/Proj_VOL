import { defineStore } from 'pinia';

export const useModalStore = defineStore('modal', {
  state: () => ({
    isOpen: false,
    modalMod: "none",
  }),
  actions: {
    openModal(newModalMod) {
      this.isOpen = true;
      this.modalMod = newModalMod
      console.log(this.isOpen)
    },
    closeModal() {
      this.isOpen = false;
      console.log(this.isOpen)
    },
    toggleModal() {
      this.isOpen = !this.isOpen;
    },
  },
});