<template>
    <div class="UpTitle_container">
        <div class="menu_visible_toggle"
            @click="$emit('open_menu')">
            <img class="menu_visible_toggle_img" src='@\ico\menu\icons8-menu-50.png' alt="">
        </div>
        <!-- группы преподавателя -->
        <div class="nav_info" v-if="store.selectedMenuItem === 4">
            <img class="nav_info_image" src="../../ico/menu/icon-groups.png" alt="лабрадудель"/>
            <div class="nav_info_text">
                <div class="nav_info_name">{{ groupStore.getSelectedGroupName }}</div>
                <div class="counter" v-if="groupStore.allUsers.length">{{ groupStore.allUsers.length }} пользователей</div>
            </div>
        </div>

        <!-- дисциплины преподавателя -->
        <div class="nav_info" v-if="store.selectedMenuItem === 5">
            <img class="nav_info_image" src="../../ico/menu/icons8-ellipsis-90.png" alt="лабрадудель"/>
            <div class="nav_info_text">
                <div class="nav_info_name">{{ disciplinesStore.getSelectedDisciplineName }}</div>
                <div v-if="disciplinesStore.selectedDisciplineId" class="counter">{{ materialsStore.Labs?.length }} лабораторных {{ materialsStore.TheoryMaterial?.length }} теория</div>
            </div>
        </div>

        <!-- группа студента -->
        <div class="nav_info" v-if="store.selectedMenuItem === 1">
            <img class="nav_info_image" src="../../ico/menu/icons8-group-50 (1).png" alt="лабрадудель"/>
            <div class="nav_info_text">
                <div class="nav_info_name">{{groupStore.getMyGroupName}}</div>
                <div class="counter" v-if="groupStore.myGroup">{{ groupStore.allUsers?.length }} пользователей</div>
            </div>
        </div>

        <!-- дисциплины студента -->
        <div class="nav_info" v-if="store.selectedMenuItem === 2">
            <img class="nav_info_image" src="../../ico/menu/icons8-ellipsis-90.png" alt="лабрадудель"/>
            <div class="nav_info_text">
                <div class="nav_info_name">{{ disciplinesStore.getSelectedDisciplineName }}</div>
                <div v-if="disciplinesStore.selectedDisciplineId" class="counter">{{ materialsStore.Labs?.length }} лабораторных {{ materialsStore.TheoryMaterial?.length }} теория</div>
            </div>
        </div>

        <!-- консультации -->
        <div class="nav_info" v-if="store.selectedMenuItem === 3">
            <img class="nav_info_image" src="../../ico/menu/icons8-calendar-50.png" alt="лабрадудель"/>
            <div class="nav_info_text">
                <div class="nav_info_name">Консультации</div>
            </div>
        </div>

    </div>
</template>

<script setup>
import { useAppStore } from '@/app/providers/store';
import { useAllMaterialsStore } from '@/entities/materials/stores/materials';
import { useCurrentUserStore } from '@/entities/user/stores/user';

import { useDisciplinesStore } from '@/entities/disciplines/stores/disciplines';
import { useGroupStore } from '@/entities/groups/stores/groupStore';
// import { useStudentGroupStore } from '@/entities/groups/stores/studentGroupStore ';

const store = useAppStore()
const materialsStore = useAllMaterialsStore()
const userStore = useCurrentUserStore()

const disciplinesStore = useDisciplinesStore()
const groupStore = useGroupStore()
// const studentGroupStore = useStudentGroupStore()
const emit = defineEmits(["open_menu"])
</script>

<style lang="scss" scoped>
.UpTitle_container {
    height: 50px;
    border-left: 1px solid var(--main-grey-stroke-color);
    display: flex;
    flex-direction: row;
}
.nav_info {
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
}
.nav_info_image {
    height: 100%;
    margin: 0 5px 0 5px;
    padding: 5px;

}
.nav_info_text {
    display: flex;
    flex-direction: column;
    place-content: center;
    height: 100%;

}
.nav_info_name{
    color: var(--main-white-color);
    font-family: "Roboto Flex", sans-serif;
    font-size: 17px;

}
.counter{
    color: var(--main-grey-stroke-color);
    font-family: "Roboto Flex", sans-serif;
    font-size: 15px;

}
.menu_visible_toggle{
    display: none;
    padding: 10px;
    &_img{
        height: 100%;
        
    }
}


@media (max-width: 600px) {
    .menu_visible_toggle {
        display: block;
    }

}
</style>
