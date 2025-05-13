<template>
    <div class="settingsGroupCard-container">
        <div class="label">{{`Вы точно хотите удалить дисциплину: ${disciplinesStore.getSelectedDisciplineName}?`}}</div>
        <div class="center_position">
            <myButton @click="toggleButton()" v-if="!isLoading">Да</myButton>
            <myButton @click="emit('close')" v-if="!isLoading">Нет</myButton>
            <loader v-if="isLoading"/>
        </div>
    </div>
</template>

<script setup>
import { watchEffect, ref } from "vue";

import myButton from "@/shared/ui/myButton.vue"
import loader from "@/shared/ui/loader.vue";
import { useDisciplinesStore } from "../stores/disciplines";

const disciplinesStore = useDisciplinesStore()

const isLoading = ref(false)


const toggleButton = async() => {
    isLoading.value = true

    const res = await disciplinesStore.deleteDiscipline()
    if(res.success){

        emit('close')
    }
    
    isLoading.value = false
    
}
const emit = defineEmits(["close"])
</script>

<style lang="scss" scoped>
.settingsGroupCard-container{
    width: 100%;
    min-height: 50px;
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.label {
    font-size: 16px;
    width: 100%;
    &_input {
        font-size: 16px;
        width: 100%;
        height: 35px;
        border-radius: 7px;
        border: 0px;
        padding: 5px;
        background-color: var(--main-grey-color);
    }
    &_input{
        &::placeholder{
            color: rgba(0, 0, 0, 0.3);
        }
    }

}

.center_position{
    display: flex;
    align-items: center;
    place-content: center;
    gap: 10px;
}
</style>