<template>
    <div id="main_container">
        <img id="logo" src="../../ico/logo/Logo-title.png" alt="" />
        <div id="nav_container">
            <div :id="store.menuContainerOpen ? 'left_container_rollup' : 'left_container' ">
                <div class="button" :class="{button_active: store.selectedMenuItem === 1}" @click="clickGroupButton()" >
                    <img class="button_img" :class="{button_img_active: store.selectedMenuItem === 1}" src="../../ico/menu/icons8-group-50 (1).png" alt="">
                    <div class="button_text">Группа</div>
                </div>
                <div class="button" :class="{button_active: store.selectedMenuItem === 2}" @click="clickDisciplineButton()">
                    <img class="button_img" :class="{button_img_active: store.selectedMenuItem === 2}" src="../../ico/menu/icons8-ellipsis-90.png" alt="">
                    <div class="button_text">Дисциплины</div>
                </div>
                <div class="button" :class="{button_active: store.selectedMenuItem === 3}" @click="clickConsultationButton()">
                    <img class="button_img" :class="{button_img_active: store.selectedMenuItem === 3}" src="../../ico/menu/icons8-calendar-50.png" alt="">
                    <div class="button_text">Консультации</div>
                </div>
            </div>
            <div id="right_container">
                <div class="button" :class="{button_active: materialsStore.selectedDisciplineId === item.id}" @click="SelectDiscipline(item.id)" v-for="item in userStore.disciplines" :key="item.id">
                    <div class="button_text">{{ item.name }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAllMaterialsStore } from '@/interfaces/student/entities/materials/stores/materials';
import { useCurrentUserStore } from '@/interfaces/auth/entities/user/stores/user';
import { useAppStore } from '@/app/providers/store';

const userStore = useCurrentUserStore()
const store = useAppStore()
const materialsStore = useAllMaterialsStore()

onMounted(() => {
    materialsStore.group_id = userStore.user.group.id
    userStore.setDisciplinesByGroup()
});

const clickGroupButton = () => {
    store.selectedMenuItem = 1
    store.menuContainerOpen = false
    materialsStore.selectedDisciplineId = null

}
const clickDisciplineButton = () => {
    store.selectedMenuItem = 2
    store.menuContainerOpen = !store.menuContainerOpen
}
const clickConsultationButton = () => {
    store.selectedMenuItem = 3
    store.menuContainerOpen = false
    materialsStore.selectedDisciplineId = null

}
const SelectDiscipline = (id) => {
    materialsStore.selectedDisciplineId = id
    store.selectedDisciplineName = userStore.disciplines.find(dis => dis.id === id).name
}

</script>

<style lang="scss" scoped>
#nav_container {
    display: flex;
    flex-direction: row;
    height: 100%;
    border-top: 1px solid var(--main-grey-stroke-color);
    // background-color: aqua;
}
#logo{
    width: 100%;
    padding: 7px;
}
#left_container {
    width: 100%;
    height: 100%;
    transition: 100ms;
    &_rollup{
        width: 55px;
        transition: 100ms;
        height: 100%;
        border-right: 1px solid var(--main-grey-stroke-color);
    }
}
#right_container{
    flex: 1;
    height: 100%;
    background-color: var(--main-white-blue-color);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    white-space: nowrap;
    min-width: 0
}

.button{
    display: flex;
    width: 100%;
    height: 55px;
    color:  var(--main-white-color);
    font-family: "Roboto Flex", sans-serif;
    font-size: 17px;
    align-items: center;
    user-select: none;
    &:hover{
        background-color: color-mix(in srgb, var(--main-white-blue-color), white 20%);
    }
    &_active{
        background-color: var(--main-white-color);
        // background: linear-gradient(to right, var(--main-white-blue-color) ,var(--main-white-color));
        color: #000000;
        &:hover{
            background-color: color-mix(in srgb, var(--main-white-color), rgb(0, 0, 0) 20%);
        }
    }
}
.button_img{
    height: 100%;
    padding: 5px;
    &_active{
        filter: brightness(0);
        transition: filter 0.3s;
    } 
}
.button_text{
    margin-left: 5px;
}

</style>
