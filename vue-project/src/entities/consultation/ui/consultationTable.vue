<template>
    <div class="container_main" v-if="store.selectedDisciplineId === 'cons'">
        консультации
        <div v-for="item in consStore.consultations" :key="item.id">
            {{ item.subject }}
        </div>
    </div>
</template>

<script setup>
import { useAppStore } from '@/app/providers/store';
import { useConsStore } from '../stores';
import { useCurrentStudentStore } from '@/entities/student/stores/student';
import { onMounted } from 'vue';
const store = useAppStore()
const consStore = useConsStore()
const studentStore = useCurrentStudentStore()

onMounted(() => {
    consStore.setConsByUser(studentStore.group_id)
})


</script>

<style lang="scss" scoped>

</style>