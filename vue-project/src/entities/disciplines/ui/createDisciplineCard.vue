<template>
    <div class="createDisciplineCard_container">
        <div class="label">Название</div>
        <input type="text" class="label_input" v-model="newDisciplineName" placeholder="ООП">
        <div class="label">Описание</div>
        <input type="text" class="label_input" v-model="newDisciplineDescription" placeholder="Обьектно ориентированное программирование">
        <div class="label">Доступно группам</div>

        <!-- <select 
            class="label_input" 
            multiple 
            v-model="selectedGroups"
        >
            <option value="РИС-21-1Б">РИС-21-1Б</option>
            <option value="РИС-21-2Б">РИС-21-2Б</option>
            <option value="ИВТ-22-3Б">ИВТ-22-3Б</option>
        </select> -->

        <!-- <input type="text" class="label_input" placeholder="РИС-21-1Б"> -->
        <mySelector 
            v-model="selectedGroups"
            placeholder="РИС-21-1Б, ИВТ-22-1Б"
            :allElements=disciplinesStore.allGroups
            />

        <div class="center_position"><myButton @click="createDiscipline()" >Сохранить</myButton></div>
    </div>
</template>

<script setup>
import { watchEffect, ref } from "vue";

import myButton from "@/shared/ui/myButton.vue"
import mySelector from "@/shared/ui/mySelector.vue";

import { useAllDisciplinesStore } from "../stores/discipline";

const disciplinesStore = useAllDisciplinesStore()

const newDisciplineName = ref("")
const newDisciplineDescription = ref("")
const selectedGroups = ref([]);


const createDiscipline = () => {
    console.log(`Название: ${newDisciplineName.value}\nОписание:${newDisciplineDescription.value}\nГруппы:${selectedGroups.value}`)
}

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