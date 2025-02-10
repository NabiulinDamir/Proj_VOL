<template>
    <div id="main_container">
        <div id="menu_container">
            <!-- <LeftBar/> -->
            <LeftMenu id="left_menu" />
        </div>
        <div id="not_menu_container">
            <UpTitle id="title"/>
            <div id="content_container">
                <div id="CenterContainer">
                    <UserCard />
                    <MaterialsMenu />
                    <consultationTable />
                </div>
                <div id="RightContainer">
                    <Calendar />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Calendar from "@/widgets/calendar/Calendar.vue";
import LeftBar from "../entities/student/ui/leftContent.vue";
import MaterialsMenu from "../entities/materials/ui/materialsMenu.vue";
import consultationTable from "../entities/consultation/ui/consultationTable.vue";
import UserCard from "../entities/student/ui/UserCard.vue";
import LeftMenu from "../../../widgets/left-menu/LeftMenu.vue";
import UpTitle from "@/widgets/upTitle/UpTitle.vue";
</script>

<style lang="scss" scoped>
#main_container {
    width: 100%;
    // height: 92vh;
    // background-color:#f4f4f4;
    // background-color: rgba(255, 255, 255, 0);
    display: flex;
    flex-direction: row;
}
#left_menu {
    width: 240px;
    height: 100%;
}
#not_menu_container{
    width: 100%;
    display: flex;
    flex-direction: column;
}
#content_container {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
}
#CenterContainer {
    flex-grow: 1;
    padding: 20px;
    background-color: var(--main-white-color);
    // border-top-left-radius: 20px;
}
#RightContainer {
    background-color: var(--main-white-color);
    padding-top: 20px;
    padding-right: 20px;
    padding-left: 20px;
    width: 30%;
}
#title{
    width: 100%;
    height: 50px;
}
@media (max-width: 740px) {
    #RightContainer {
        display: none;
    }
    #CenterContainer {
        width: 100%;
    }
}

.LabsCart {
    height: 100%;
    border: 1.5px solid #f4f4f4;
    -webkit-box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
    -moz-box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
    box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
    border-radius: 12px;
    background-color: #f4f4f4;
    // margin: 15px;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 10px;

    transition: 0.2s;
    &__Border {
        height: 70px;
        padding: 3px;
        border-radius: 15px;
        margin-bottom: 15px;
        transition: 0.2s;
        &:hover {
            background: var(--gradient-color);
        }
    }
}
</style>
