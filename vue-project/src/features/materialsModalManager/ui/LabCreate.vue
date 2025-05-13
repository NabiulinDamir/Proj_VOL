<template>
    <div class="container">
        <myOpButton class="button" @click="isOpen = true">
            <slot>

            </slot>
        </myOpButton>
        
        <modal :isOpen @close="isOpen = false" title="Создать задание">
            <createCard @close="isOpen = false" @change-discipline="handleChangeDiscipline"/>
        </modal>
    </div>
</template>

<script setup>
import { ref } from "vue";

import modal from "@/shared/ui/modal.vue";
import createCard from "@/entities/materials/ui/labCreateCard.vue";
import myOpButton from "@/shared/ui/myButtonOp.vue";
const emit = defineEmits(['changeDiscipline'])

const handleChangeDiscipline = (id) => {
    emit('changeDiscipline', id); // Пробрасываем событие дальше
};
const isOpen = ref(false);
</script>

<style lang="scss" scoped>



</style>
