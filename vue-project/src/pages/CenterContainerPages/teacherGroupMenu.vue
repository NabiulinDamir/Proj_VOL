<template>
    <div>
        <div class="buttons-line">
            <Groupsettings  v-if="groupStore.selectedGroupId != 'without'">Настройки</Groupsettings>
            <Adduser        v-if="groupStore.selectedGroupId != 'without'">Добавить пользователей</Adduser>
            <Deletegroup    v-if="groupStore.selectedGroupId != 'without'">Удалить</Deletegroup>
        </div>

        <usersMenu userRole="Teacher"/>
    </div>
</template>

<script setup>
import usersMenu from '@/entities/groups/ui/usersMenu.vue';
import { Groupsettings } from '@/features';
import { Deletegroup } from '@/features';
import { Adduser } from '@/features';

import { useGroupStore } from '@/entities/groups/stores/groupStore';

const groupStore = useGroupStore()
// import { useGroupStore } from '@/entities/groups/stores/teacherGroupStore';

// const groupStore = useGroupStore()

// onMounted = (()=>{
//     groupStore.setTeacherGroups();
// })
</script>

<style lang="scss" scoped>
.buttons-line{
    display: flex;
    flex-direction: row;
    gap: 7px;
    flex-wrap: wrap; 
    
}
</style>