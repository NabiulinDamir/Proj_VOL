<template>
    <div id="main_container">
        <img id="logo" src="../../ico/logo/Logo-title.png" alt="" />
        <div id="nav_container">
            <div :id="rightContainerOpened ? 'left_container_rollup' : 'left_container' ">
                <div class="buttons"  @click="clickGroupButton()" >
                    <img class="buttons_img" :class="{active: activeButton === 1}" src="../../ico/menu/icons8-group-50 (1).png" alt="">
                    Группа
                </div>
                <div class="buttons" @click="clickDisciplineButton()">
                    <img class="buttons_img" :class="{active: activeButton === 2}" src="../../ico/menu/icons8-ellipsis-90.png" alt="">
                    Дисциплины
                </div>
                <div class="buttons" @click="clickCnsultationButton()">
                    <img class="buttons_img" :class="{active: activeButton === 3}"  src="../../ico/menu/icons8-calendar-50.png" alt="">
                    Консультации
                </div>
            </div>
            <div id="right_container">
                <div v-for="discipline in studentStore.ge" :key="item.id">
                    {{ item }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useCurrentStudentStore } from '@/interfaces/student/entities/student/stores/student';
import { useAllMaterialsStore } from '@/interfaces/student/entities/materials/stores/materials';

const studentStore = useCurrentStudentStore()
const materialsStore = useAllMaterialsStore()

const activeButton = ref(null);
const rightContainerOpened = ref(false)



const clickGroupButton = () => {
    activeButton.value = 1
    rightContainerOpened.value = false
}
const clickDisciplineButton = () => {
    activeButton.value = 2
    rightContainerOpened.value = !rightContainerOpened.value
}
const clickCnsultationButton = () => {
    activeButton.value = 3
    rightContainerOpened.value = false

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
#hui{
    transition: 200ms;
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
    flex-grow: 1;
    height: 100%;
    background-color: var(--main-white-blue-color);
    // &_open{
    //     width: 75%;

    //     height: 100%;
    //     background-color: rgb(176, 163, 25);
    // }
}
.active{
    filter: brightness(1.5);
    transition: filter 0.3s;
}
.buttons{
    display: flex;
    width: 100%;
    height: 55px;
    color: var(--main-white-color);
    font-family: "Roboto Flex", sans-serif;
    font-size: 17px;
    align-items: center;
    &:hover{
        background-color: color-mix(in srgb, var(--main-white-blue-color), white 20%);
    }
}
.buttons_img{
    height: 100%;
    padding: 5px;
}
</style>
