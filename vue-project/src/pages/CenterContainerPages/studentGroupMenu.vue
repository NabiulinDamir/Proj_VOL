<template>
    <div>
        <usersMenu userRole="Student"/>
    </div>
</template>

<script setup>
import usersMenu from '@/entities/groups/ui/usersMenu.vue';

import { onMounted } from 'vue';

// import { useGroupStore } from '@/entities/groups/stores/teacherGroupStore';

// const groupStore = useGroupStore()

// onMounted = (()=>{
//     groupStore.setStudentGroup();
// })
</script>

<style lang="scss" scoped>

</style>