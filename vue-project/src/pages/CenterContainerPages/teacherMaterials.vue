<template>
    <div class="page-container">
        <div class="buttons-line">
            <Disciplinesettings v-if="disciplinesStore.selectedDisciplineId">Настройки</Disciplinesettings>
            <Deletediscipline v-if="disciplinesStore.selectedDisciplineId">Удалить</Deletediscipline>
        </div>
        <groupsForDisciplinesList @navigateTeacherGroup="toTeacherGroup"/>
        <div class="buttons-line">
            <LabCreate v-if="disciplinesStore.selectedDisciplineId" @change-discipline="changeDiscipline">создать задание</LabCreate>
            <TheoryCreate v-if="disciplinesStore.selectedDisciplineId" @change-discipline="changeDiscipline">создать материал</TheoryCreate>
        </div>
        <materialsMenu userRole='Teacher'/>

    </div>
</template>

<script setup>
import materialsMenu from '@/entities/materials/ui/materialsMenu.vue';
import groupsForDisciplinesList from '@/entities/disciplines/ui/groupsForDisciplinesList.vue';
import { Disciplinesettings } from '@/features';
import { Deletediscipline } from '@/features';
import { useRouter } from 'vue-router';
import { useAppStore } from '@/app/providers/store';
import { useDisciplinesStore } from '@/entities/disciplines/stores/disciplines';
import { useGroupStore } from '@/entities/groups/stores/groupStore';
import { LabCreate } from '@/features';
import { TheoryCreate } from '@/features';

const router = useRouter()
const appStore = useAppStore()
const disciplinesStore = useDisciplinesStore()
const groupStore = useGroupStore()

const toTeacherGroup = (groupId) =>{
    groupStore.selectedGroupId = groupId
    appStore.selectedMenuItem = 4
    router.push({name: 'teacherGroup'})
}

const changeDiscipline = (newDisId) => {
    disciplinesStore.selectedDisciplineId = newDisId
}
</script>

<style lang="scss" scoped>
.page-container{
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.buttons-line{
    display: flex;
    flex-direction: row;
    gap: 7px;
}
</style>