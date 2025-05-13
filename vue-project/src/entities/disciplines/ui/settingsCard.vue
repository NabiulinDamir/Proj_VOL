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
            :allElements='allGroups'
            :toggle-elements='disciplinesStore.groupsForDiscipline'
            />

        <div class="center_position">
            <loader v-if="isLoading"/>
            <myButton @click="clickSave()" v-if="!isLoading">Сохранить</myButton>
        </div>
    </div>
</template>

<script setup>
import { watchEffect, ref, onMounted } from "vue";
import mySelector from "@/shared/ui/mySelector.vue";
import myButton from "@/shared/ui/myButton.vue"
import loader from "@/shared/ui/loader.vue";
import { useDisciplinesStore } from "../stores/disciplines";

const disciplinesStore = useDisciplinesStore()

const newDisciplineName = ref(disciplinesStore.getDisciplineById(disciplinesStore.selectedDisciplineId).name)
const newDisciplineDescription = ref(disciplinesStore.getDisciplineById(disciplinesStore.selectedDisciplineId).description)
const isLoading = ref(false)
const allGroups = ref([])
const selectedGroups = ref()

onMounted(async()=> {
    allGroups.value = await disciplinesStore.allGroups
    await disciplinesStore.setGroupsForDiscipline()
})

const clickSave = async() => {
    isLoading.value = true
    // if(newDisciplineName.value != disciplinesStore.getDisciplineById(disciplinesStore.selectedDisciplineId).name
    //     || newDisciplineDescription.value != disciplinesStore.getDisciplineById(disciplinesStore.selectedDisciplineId).description)
    // {
        const updateNames = await disciplinesStore.updateDisciplineName(newDisciplineName.value, newDisciplineDescription.value)
        const updateGroup = await disciplinesStore.updateGroups(selectedGroups.value)
        if(updateNames.success && updateGroup.success){
            emit('close')
        }
    // }
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