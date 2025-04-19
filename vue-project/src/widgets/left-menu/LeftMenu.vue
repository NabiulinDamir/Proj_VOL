<template>
    <div id="leftMenu_main_container">
        <img id="logo" src="../../ico/logo/Logo-title.png" alt="" />
        <div class="nav_container">
           <div class="left_container" :class="{'left_container_rollup' : store.menuContainerOpen}">
                <div class="button" :class="{'button_active': store.selectedMenuItem === 1}" @click="clickGroupButton()" v-if="userStore.user.group" >
                    <img class="button_img" :class="{'button_img_active': store.selectedMenuItem === 1}" src="../../ico/menu/icons8-group-50 (1).png" alt="">
                    Группа
                </div>
                <div class="button" :class="{'button_active': store.selectedMenuItem === 4}" @click="clickGroupsButton()" v-if="userStore.user.role === 'Teacher'" >
                    <img class="button_img" :class="{'button_img_active': store.selectedMenuItem === 4}" src="../../ico/menu/icon-groups.png" alt="">
                    Группы
                </div>
                <div class="button" :class="{'button_active': store.selectedMenuItem === 2}" @click="clickDisciplineButton()">
                    <img class="button_img" :class="{'button_img_active': store.selectedMenuItem === 2}" src="../../ico/menu/icons8-ellipsis-90.png" alt="">
                    <div class="button_text">Дисциплины</div>
                </div>
                <div class="button" :class="{'button_active': store.selectedMenuItem === 3}" @click="clickConsultationButton()">
                    <img class="button_img" :class="{'button_img_active': store.selectedMenuItem === 3}" src="../../ico/menu/icons8-calendar-50.png" alt="">
                    Консультации
                </div>
            </div>
            <div id="right_container">
                <Creategroup v-if="(store.selectedMenuItem === 4) && ((userStore.user ? userStore.user.role : '') == 'Teacher')"></Creategroup>
                <div class="button" 
                    v-if="store.selectedMenuItem === 4"
                    :class="{button_active: groupsStore.selectedGroup?.id === item.id}" 
                    @click="groupsStore.selectedGroup = item"
                    v-for="item in groupsStore.allGroups" :key="item.id">
                    {{ item.name }}
                </div>
                <Creatediscipline v-if="(store.selectedMenuItem === 2) && ((userStore.user ? userStore.user.role : '') == 'Teacher')"></Creatediscipline>
                <div class="button"
                    v-if="store.selectedMenuItem === 2" 
                    :class="{button_active: disciplinesStore.getSelectedDisciplineId() === item.id}" 
                    @click="disciplinesStore.selectedDiscipline = item"
                    v-for="item in disciplinesStore.allDisciplines" :key="item.id">
                    {{ item.name }}
                </div>

            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
// import { useAllMaterialsStore } from '@/entities/materials/stores/materials';
import { useCurrentUserStore } from '@/entities/user/stores/user';
import { useAppStore } from '@/app/providers/store';
import { useRouter } from 'vue-router';
import { useAllDisciplinesStore } from '@/entities/disciplines/stores/discipline';
import { useModalStore } from '@/widgets/modal/modal'
import { useAllGroupsStore } from '@/entities/groups/stores/groups';

import { Creatediscipline } from '@/features';
import { Creategroup } from '@/features/createGroup';

const userStore = useCurrentUserStore()
const store = useAppStore()
const groupsStore = useAllGroupsStore()
const router = useRouter()
const disciplinesStore = useAllDisciplinesStore()

const modal = useModalStore();

// materialsStore.group_id = userStore.user.group ? userStore.user.group.id : null
// userStore.setDisciplinesByGroup()

onMounted(() => {
    // materialsStore.group_id = userStore.user.group ? userStore.user.group.id : null
    // userStore.setDisciplinesByGroup()
    groupsStore.setGroups()
    disciplinesStore.setDisciplinesByUser(userStore.user.id)

});

////////////////////////////////////////////////////////////////////////////////////////////выбор пунктов меню

const clickGroupButton = () => {
    store.menuContainerOpen = false
    store.selectedMenuItem = 1
    router.push({ name: 'users' });

}

const clickGroupsButton = () =>{
    if(store.selectedMenuItem === 4){
            store.menuContainerOpen = !store.menuContainerOpen
        }
    else{
        store.menuContainerOpen = true
    }
    store.selectedMenuItem = 4
    router.push({ name: 'users' });
}

const clickDisciplineButton = () => {
    if(store.selectedMenuItem === 2){
        store.menuContainerOpen = !store.menuContainerOpen
    }
    else{
        store.menuContainerOpen = true
    }
    store.selectedMenuItem = 2
    router.push({ name: 'materials' });

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
    modal.openModal("CreateD")
}

</script>

<style lang="scss" scoped>
#leftMenu_main_container{
    width: 230px;
    height: 100%;
    display: flex;
    flex-direction: column;

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
    flex: 1;
    height: 100%;
    background-color: var(--main-white-blue-color);
    display: flex;
    flex-direction: column;
    // overflow: hidden;
    min-width: 0
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



</style>
