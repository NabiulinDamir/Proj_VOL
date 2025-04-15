<template>
    <div
        v-if="modalStore.isOpen"
        class="modal-overlay"
        @click.self="modalStore.closeModal()"
    >
        <div class="modal-content">
            <div class="title">
                <div class="blood_label">{{ title }}Создание предмета</div>
                <img src="@/ico/modal/close-50.png" alt="закрыть" @click="modalStore.closeModal()">
            </div>
            

            <!-- <slot>эта модалка</slot> -->
            <createDisciplineCard></createDisciplineCard>
        </div>
    </div>
</template>

<script setup>
import { useModalStore } from "./modal";
import createDisciplineCard from "@/entities/disciplines/ui/createDisciplineCard.vue";

const modalStore = useModalStore();

//   const { isOpen, closeModal } = modalStore;
</script>

<style scoped lang="scss">
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    max-width: 500px;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.title{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

img{
    height: 30px;
    transition: 200ms;
    &:hover{
        opacity: 0.8;
        transform: scale(1.2);

        cursor: pointer;
    }
}

.blood_label{
    font-size: 27px;
    font-weight: bold;
}
</style>
