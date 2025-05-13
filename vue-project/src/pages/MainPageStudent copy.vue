<template>
    <div id="main_container">
        <!-- @click.self="closeMenu()" -->
        <LeftMenu @close_menu="closeMenu()"/>
        <div class="not_menu_container" >
            <UpTitle @open_menu="openMenu()"/>
            <div id="content_container" >
                <div id="CenterContainer" >
                    <UserCard/>
                    <router-view></router-view>
                </div>
                <div id="right_container">
                    <Calendar />
                </div>
            </div>
        </div>

    </div>

    

   

</template>

<script setup>
import { onMounted } from "vue";

import Calendar from "@/widgets/calendar/Calendar.vue";
import LeftMenu from "@/widgets/left-menu/LeftMenu.vue";
import UpTitle from "@/widgets/upTitle/UpTitle.vue";
import UserCard from "@/entities/user/ui/UserCard.vue";

import { useCurrentUserStore } from "@/entities/user/stores/user";
const userStore = useCurrentUserStore()

onMounted(() => {
    userStore.startTokenRefresh()
})
//#leftMenu_main_container
const openMenu = () => {
    const menu = document.getElementsByClassName('leftMenu_main_container');
    menu[0].classList.toggle('leftMenu_main_container_opened'); // Добавляем/удаляем класс

}

const closeMenu = () => {
    const menu = document.getElementsByClassName('leftMenu_main_container');
    menu[0].classList.toggle('leftMenu_main_container_opened'); // Добавляем/удаляем класс
    console.log('open');
}
</script>

<style lang="scss" scoped>
#main_container {
    height: 100vh;
    display: grid;
    grid-template-columns: auto 1fr;
    position: relative;

}
.not_menu_container{
    width: 100%;
    height: 100%;
    // display: flex;
    // flex-direction: column;
    height: 100%;
    display: flex;
    flex-direction: column;
    
}
#content_container {
    display: grid;
    grid-template-columns: 2fr 1fr;
    height: calc(100% - 50px);//костыль, убрать не могу
    
}
#CenterContainer {
    padding: 20px;
    background-color: var(--main-white-color);
    overflow-y: scroll;
    display: grid;
    grid-template-rows: auto 1fr;
    gap: 20px;
    height: 0; 
    min-height: 100%; 
    overflow-y: scroll; 
    // border-top-left-radius: 20px;
}
#right_container {
    background-color: var(--main-white-color);
    padding: 20px;
    height: 100%;
}
@media (max-width: 890px) {
    #right_container {
        display: none;
    }
    #content_container {
        grid-template-columns: 100%;
    }
}

@media (max-width: 600px) {
    #CenterContainer{
        width: 100vw;
        padding: 10px;
    }
}

</style>
