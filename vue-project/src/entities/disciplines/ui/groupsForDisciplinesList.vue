<template>
    <div>

        <div class="content_container">
            Назначеные группы:
            <!-- <loader v-if="isLoading"/> -->
            <div class="group_text" v-for="item in disciplinesStore.groupsForDiscipline" :key="item.id"
                @click="toggleGroup(item.id)">
                {{ `${item.name},` }}
            </div>
            <div>{{ message }}</div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, watch, ref, computed } from 'vue';
import loader from '@/shared/ui/loader.vue';

import { useDisciplinesStore } from '@/entities/disciplines/stores/disciplines';

const disciplinesStore = useDisciplinesStore()
// const isLoading  = ref(false)
const message = computed(()=>{
    return !disciplinesStore.groupsForDiscipline.length ? "--" : ' '
})

watch(
    () => disciplinesStore.selectedDisciplineId,
    async () => {
        // isLoading.value = true;
        await disciplinesStore.setGroupsForDiscipline()

        // isLoading.value = false;
    },
    { immediate: true }
);

const toggleGroup = (id) => {

    emit('navigateTeacherGroup', id)
}

const emit = defineEmits(['navigateTeacherGroup']);



// //доступ к хранилищу
// import { useDisciplinesStore } from '@/entities/disciplines/stores/disciplines';
// const disciplinesStore = useDisciplinesStore()
// //доступ к списку дисциплин
// const allDisciplines = disciplinesStore.allDisciplines
// //доступ к id выбранной дисциплины
// const selectedDisciplineId = disciplinesStore.selectedDisciplineId
// //доступ к группам, привязаным к дисциплинам
// const groupsForDiscipline = disciplinesStore.groupsForDiscipline



</script>

<style lang="scss" scoped>
.content_container{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap; 
    gap: 5px;
}
.group_text{
    user-select: none;
    cursor: pointer;
    &:hover{
        color: var(--primary-color);
        text-decoration: underline;
    }
}
</style>