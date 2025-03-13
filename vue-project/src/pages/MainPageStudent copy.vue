<template>
    <div id="main_container">
        <LeftMenu/>
        <div class="not_menu_container">
            <UpTitle/>
            <div id="content_container">
                <div id="CenterContainer">
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
import Calendar from "@/widgets/calendar/Calendar.vue";
import LeftMenu from "@/widgets/left-menu/LeftMenu.vue";
import UpTitle from "@/widgets/upTitle/UpTitle.vue";
import UserCard from "@/entities/user/ui/UserCard.vue";
</script>

<style lang="scss" scoped>
#main_container {
    width: 100%;
    height: 100vh;
    // background-color:#f4f4f4;
    // background-color: rgba(255, 255, 255, 0);
    display: flex;
    flex-direction: row;

}
.not_menu_container{
    width: 100%;
    // height: 100%;
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
    display: flex;
    flex-direction: column;
    gap: 20px;
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

</style>
