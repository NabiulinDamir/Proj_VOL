<template>
    <div class="createDisciplineCard_container">
        <div class="label">Название</div>
        <input type="text" class="label_input" v-model="newDisciplineName" placeholder="ООП">
        <div class="label">Описание</div>
        <input type="text" class="label_input" v-model="newDisciplineDescription" placeholder="Обьектно ориентированное программирование">
        <div class="label">Доступно группам</div>

        <mySelector 
            v-model="selectedGroups"
            placeholder="РИС-21-1Б, ИВТ-22-1Б"
            :allElements=allGroups
            />

        <div class="center_position">
            <loader v-if="isLoading"/>
            <myButton v-if="!isLoading" @click="createDiscipline()" >Сохранить</myButton>
        </div>
    </div>
</template>

<script setup>
import { watchEffect, ref, onMounted } from "vue";

import myButton from "@/shared/ui/myButton.vue"
import mySelector from "@/shared/ui/mySelector.vue";
import loader from "@/shared/ui/loader.vue";
import { useDisciplinesStore } from "../stores/disciplines";

const disciplinesStore = useDisciplinesStore()

const allGroups = ref()
const isLoading = ref(false)
const newDisciplineName = ref("")
const newDisciplineDescription = ref("")
const selectedGroups = ref([]);

console.log("hui")

onMounted(async()=> {
    allGroups.value = await disciplinesStore.allGroups
})

const createDiscipline = async() => {
    isLoading.value = true
    if(newDisciplineName.value)
    {
        const res = await disciplinesStore.createDiscipline(newDisciplineName.value, newDisciplineDescription.value, selectedGroups.value)
        if(res.success){
            emit('close')
        }
    }
    isLoading.value = false
    
}
const emit = defineEmits(["close"])
</script>

<style lang="scss" scoped>
.createDisciplineCard_container{
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
}
</style>