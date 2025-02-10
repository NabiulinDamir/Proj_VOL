<template>
    <div id="Card">
        <div id="Title">
            <div id="img_container">
                <img src='@/ico/user/icons8-user-90.png' alt="ошибка" />
            </div>
            <div id="info" style="display: flex;flex-direction: column;">
                <!-- {{ isTeatcher ? "Преподаватель" : "Студент"  }}<br>
                {{ userLastName }} {{ userName }} <br>
                {{ isTeatcher ? "" : `Группа ${studentGroup}` }} -->
            </div>
        </div>

    </div>
</template>

<script setup>
import { useCurrentStudentStore } from '../stores/student';

const studentStore = useCurrentStudentStore()
</script>

<style lang="scss" scoped>
#Card{
    background-color: var(--main-white-background-color);
    padding: 10px;
    -webkit-box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
    -moz-box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
    box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
    border-radius: 15px;
}
#img_container {
    width: 70px;
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    border: 2px solid var(--main-white-blue-color);
    border-radius: 15px;
    margin-right: 10px;
    & img{
        width: 100%;
        height: auto;
    }
}
#Title{
    display: flex;
    flex-direction: row;
    
}
</style>