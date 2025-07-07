<template>
    <div class="leftMenu_main_container">
        <img id="logo" src="../../ico/logo/Logo-title.png" alt="" />
        <div :class='["button", "rolup_button"]'
            @click="emit('close_menu')">
            <img class="arrow" src="@\ico\menu\icons8-arrow-50.png" alt="">
            Свернуть
        </div>
        <div class="nav_container">
           <div class="left_container" :class="{'left_container_rollup' : store.menuContainerOpen}">

                <!-- Домой -->
                <!-- <div class="button" :class="{'button_active': store.selectedMenuItem === 6}" @click="clickHomeButton()" v-if="true" >
                    <img class="button_img" :class="{'button_img_active': store.selectedMenuItem === 6}" src="../../ico/menu/icons8-home-96.png" alt="">
                    Главная
                </div> -->

                <!-- группы преподавателя -->
                <div class="button" :class="{'button_active': store.selectedMenuItem === 4}" @click="clickTeacherGroupButton()" v-if="userStore.isTeacher" >
                    <img class="button_img" :class="{'button_img_active': store.selectedMenuItem === 4}" src="../../ico/menu/icon-groups.png" alt="">
                    Мои группы
                </div>

                <!-- дисциплины преподавателя -->
                <div class="button" :class="{'button_active': store.selectedMenuItem === 5}" @click="clickTeacherDisciplineButton()" v-if="userStore.isTeacher">
                    <img class="button_img" :class="{'button_img_active': store.selectedMenuItem === 5}" src="../../ico/menu/icons8-ellipsis-90.png" alt="">
                    <div class="button_text">Мои дисциплины</div>
                </div>
 
                <!-- группа студента -->
                <div class="button" :class="{'button_active': store.selectedMenuItem === 1}" @click="clickStudentGroupButton()"  v-if="userStore.isStudent">
                    <img class="button_img" :class="{'button_img_active': store.selectedMenuItem === 1}" src="../../ico/menu/icons8-group-50 (1).png" alt="">
                    {{ userStore.group }}
                </div>

                <!-- дисциплины студента -->
                <div class="button" :class="{'button_active': store.selectedMenuItem === 2}" @click="clickStudentDisciplineButton()" v-if="userStore.isStudent">
                    <img class="button_img" :class="{'button_img_active': store.selectedMenuItem === 2}" src="../../ico/menu/icons8-ellipsis-90.png" alt="">
                    <div class="button_text">Дисциплины</div>
                </div>

                <!-- консультации -->
                <div class="button" :class="{'button_active': store.selectedMenuItem === 3}" @click="clickConsultationButton()">
                    <img class="button_img" :class="{'button_img_active': store.selectedMenuItem === 3}" src="../../ico/menu/icons8-calendar-50.png" alt="">
                    Мои консультации
                </div>
            </div>
            <div id="right_container">

                <!-- группы преподавателя -->
                <Creategroup v-if="(store.selectedMenuItem === 4) && (userStore.isTeacher)"></Creategroup>
                <div class="button" 
                    v-if="store.selectedMenuItem === 4"
                    :class="{button_active: groupStore.selectedGroupId === 'without'}" 
                    @click="groupStore.selectedGroupId = 'without'"
                    >Без группы</div>
                <div class="button"
                    v-if="store.selectedMenuItem === 4"
                    :class="{button_active: groupStore.selectedGroupId === item.id}" 
                    @click="groupStore.selectedGroupId = item.id"
                    v-for="item in groupStore.allGroups" :key="item.id">
                    {{ item.name }}

                </div>

                <!-- дисциплины преподавателя и студента-->
                <Creatediscipline v-if="(store.selectedMenuItem === 5) && (userStore.isTeacher)"></Creatediscipline>
                <div class="button"
                    v-if="store.selectedMenuItem === 5 || store.selectedMenuItem === 2" 
                    :class="{button_active: disciplinesStore.selectedDisciplineId === item.id}" 
                    @click="disciplinesStore.selectedDisciplineId = item.id"
                    v-for="item in disciplinesStore.allDisciplines" :key="item.id">
                    <div class="column" >{{ item.name }}<div class="opacityText" v-if="userStore.isTeacher">{{ `(${item.description})` }}</div></div>
                </div>



            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed, onUnmounted } from 'vue';
// import { useAllMaterialsStore } from '@/entities/materials/stores/materials';
import { useCurrentUserStore } from '@/entities/user/stores/user';
import { useAppStore } from '@/app/providers/store';
import { useRouter } from 'vue-router';

import { useDisciplinesStore } from '@/entities/disciplines/stores/disciplines';

import { useGroupStore } from '@/entities/groups/stores/groupStore';

import { Creatediscipline } from '@/features';

import { Creategroup } from '@/features';

const userStore = useCurrentUserStore()
const store = useAppStore()
const groupStore = useGroupStore()
const router = useRouter()

const disciplinesStore = useDisciplinesStore()

const emit = defineEmits(['close_menu'])
// materialsStore.group_id = userStore.user.group ? userStore.user.group.id : null
// userStore.setDisciplinesByGroup()


onMounted(() => {
    // materialsStore.group_id = userStore.user.group ? userStore.user.group.id : null
    // userStore.setDisciplinesByGroup()
    // groupStore.setGroups()
  
});


////////////////////////////////////////////////////////////////////////////////////////////выбор пунктов меню

const clickHomeButton = () => {
    store.menuContainerOpen = false
    store.selectedMenuItem = 6
    router.push({ name: 'home' });
}

const clickStudentGroupButton = () => {
    store.menuContainerOpen = false
    store.selectedMenuItem = 1
    router.push({ name: 'studentGroup' });

}

const clickTeacherGroupButton = () =>{
    groupStore.setGroups()
    if(store.selectedMenuItem === 4){
            store.menuContainerOpen = !store.menuContainerOpen
        }
    else{
        store.menuContainerOpen = true
    }
    store.selectedMenuItem = 4
    router.push({ name: 'teacherGroup' });
}

const clickTeacherDisciplineButton = async() => {
    disciplinesStore.setDisciplinesByTeacher()
    if(store.selectedMenuItem === 5){
        store.menuContainerOpen = !store.menuContainerOpen
    }
    else{
        store.menuContainerOpen = true
    }
    store.selectedMenuItem = 5
    router.push({ name: 'teacherMaterials' });

}

const clickStudentDisciplineButton = async() => {
    disciplinesStore.setDisciplinesByStudent()
    if(store.selectedMenuItem === 2){
        store.menuContainerOpen = !store.menuContainerOpen
    }
    else{
        store.menuContainerOpen = true
    }
    store.selectedMenuItem = 2
    router.push({ name: 'studentMaterials' });

}
const clickConsultationButton = () => {
    store.menuContainerOpen = false
    store.selectedMenuItem = 3
    router.push({ name: 'consultations' });

}

////////////////////////////////////////////////////////////////////////////////////////////созедание (препод)

const addGroup = () => {

}

const addDiscipline = () => {
    // modal.openModal("CreateD")
}




</script>

<style lang="scss" scoped>
.leftMenu_main_container{
    width: 230px;
    height: 100%;
    display: flex;
    flex-direction: column;
    height: 0; /* Важно! */
    min-height: 100%;
    background-color: var(--main-white-blue-color);
    &_opened{
        z-index: +1;
        left: 0px!important; 

        -webkit-box-shadow: 200px 0px 8px 0px rgba(0, 0, 0, 0.24);
        -moz-box-shadow: 200px 0px 8px 0px rgba(0, 0, 0, 0.24);
        box-shadow: 200px 0px 8px 0px rgba(0, 0, 0, 0.24);
    }
}



.nav_container {
    display: flex;
    flex-direction: row;
    border-top: 1px solid var(--main-grey-stroke-color);
    height: 100%;
    // background-color: aqua;
}
#logo{
    width: 100%;
    padding: 7px;
    height: 70px;
}
.left_container {
    width: 100%;
    transition: 100ms;
    &_rollup{
        width: 55px;
        transition: 100ms;
        border-right: 1px solid var(--main-grey-stroke-color);
    }
}
#right_container{
    overflow-y: auto;
    flex: 1;
    height: 100%;
    background-color: var(--main-white-blue-color);
    display: flex;
    flex-direction: column;
    // overflow: hidden;
    min-width: 0;
    height: 0; /* Важно! */
    min-height: 100%;
    scrollbar-width: thin; /* Для Firefox */
    scrollbar-color: #c1c1c1 transparent; /* Для Firefox */

    &::-webkit-scrollbar{
        width: 6px; /* Ширина скроллбара */
        height: 6px; /* Высота горизонтального скроллбара (если нужен) */
    }

    &::-webkit-scrollbar {
        width: 6px; /* Ширина скроллбара */
        height: 6px; /* Высота горизонтального скроллбара (если нужен) */
    }

    &::-webkit-scrollbar-thumb {
        background-color: #c1c1c1; /* Цвет ползунка */
        border-radius: 3px; /* Закругление углов */
    }

    &::-webkit-scrollbar-track {
        background-color: transparent; /* Цвет фона трека */
    }
}


.button{
    display: flex;
    width: 100%;
    min-height: 55px;
    color:  var(--main-white-color);
    font-size: 17px;
    align-items: center;
    user-select: none;
    overflow: hidden;
    padding: 5px;
    gap: 10px;
    &:hover{
        background-color: color-mix(in srgb, var(--main-white-blue-color), white 20%);
        .scrollable{
            animation: scroll-text 10s linear infinite; 
        }
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
    height: 45px;
    &_active{
        filter: brightness(0);
        transition: filter 0.3s;
    } 
}


.scrollable{
    display: inline-block;
}

@keyframes scroll-text {
  from {
    transform: translateX(0); /* Начальное положение текста */
  }
  to {
    transform: translateX(-70%); /* Конечное положение текста */
  }
}

.add_discipline{
    padding: 7px;
    &_button{
        border-radius: 10px;
        border: 2px solid var(--main-white-background-color);
    }
    &_icon{
        height: 40px;
    }
}

.rolup_button{
    border-top: 1px solid var(--main-grey-stroke-color);
    display: none;
}

.arrow{
    transform: rotate(180deg);
    height: 90%;
}



@media (max-width: 600px) {
    .leftMenu_main_container {
        position: absolute;
        left: -230px;
        overflow: hidden;
        transition: left 0.3s ease; 
    }
    .rolup_button{
        display: flex;
    }

}

.opacityText{
    opacity: 0.5;
    font-size: 13px;
}
.column{
    display: flex;
    flex-direction: column;
}
</style>
