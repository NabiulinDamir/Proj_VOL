<template>
    <div id="Card">
        <div id="Title"  v-if="userStore.user">
            <!-- <div id="img_container"> -->
            <img id="profile_img" src="@/ico/user/icons8-user-90.png" alt="ошибка" />


            <div class="info_container" v-if="userStore.user.role == 'Teather'">
                <div class="info">
                    <div>{{ "Преподаватель" }}</div>
                    <div>{{ userStore.user.lastname }} {{ userStore.user.name }}{{ userStore.user.thirdname }}</div>
                    <div>{{ "Группы: доделать" }}</div>
                </div>
                <div class="info">
                    <div>{{ "Почта: " + userStore.user.email }}</div>
                    <div>{{ "Имя пользователя: " + userStore.user.username }}</div>
                    <div></div>
                </div>
            </div>

            <div class="info_container" v-if="userStore.user.role == 'Student'">
                <div class="info">
                    <div>{{ "Студент" }}</div>
                    <div>{{ userStore.user.lastname }} {{ userStore.user.name }}{{ userStore.user.thirdname }}</div>
                    <div>{{ "Группа: " + userStore.user.group.name }}</div>
                </div>
                <div class="info">
                    <div>{{ "Почта: " + userStore.user.email }}</div>
                    <div>{{ "Имя пользователя: " + userStore.user.username }}</div>
                    <div></div>
                </div>
                <!-- {{ isTeatcher ? "Преподаватель" : "Студент"  }}<br>
                {{ userLastName }} {{ userName }} <br>
                {{ isTeatcher ? "" : `Группа ${studentGroup}` }} -->
            </div>
            
        </div>
        <div id="exit_button" @click="exit"><img id="exit_img" src="@/ico/user/logout.png" alt="Выход"></div>
    </div>
</template>

<script setup>
import { useCurrentUserStore } from "../stores/user";
import { useRouter } from "vue-router";

const userStore = useCurrentUserStore();
const router = useRouter()

const exit = () => {
    userStore.logout();
    router.push('/auth')
}
</script>

<style lang="scss" scoped>
#Card {
    min-height: 80px;
    box-sizing: border-box;
    background-color: var(--main-white-background-color);
    -webkit-box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
    -moz-box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
    box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
    border-radius: 10px;
    min-width: min-content;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: 14px;//сомнительно
    
}
#profile_img {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    border: 2px solid var(--main-white-blue-color);
    border-radius: 8px;
    max-height: 80px;
    object-fit: contain;
}

.info_container {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin-left: 10px;
}

.info {
    display: grid;
    grid-template-rows: 1fr 1fr 1fr;
    // white-space: nowrap;
}

#Title {
    display: flex;
    flex-direction: row;
    padding: 6px;
}
#exit_button{
    width: 30px;
    background-color: var(--main-white-blue-color);
    display: flex;
    padding: 3px;
    
    &:hover{
        background-color: color-mix(in srgb, var(--main-white-blue-color), rgb(0, 0, 0) 20%);
    }
}
#exit_img{
    width: 100%;
    object-fit: contain;
}
</style>
