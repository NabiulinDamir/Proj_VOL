<template>
    <div class="reg_container">
        <div class="split_container">
            <div class="child_container">
                Почта
                <myLabel id="new-email" autocomplete="new-email" placeholder="govnokrad2003@gmail.com" />
                Логин(необязательно)
                <myLabel id="new-login" autocomplete="off" placeholder="govnokrad228" />
                Пароль
                <myLabel id="password" autocomplete="new-password"/>
                Повторите пароль
                <myLabel id="signup-password-confirm"/>
            </div>
            <div class="child_container">
                Имя
                <myLabel id="name" placeholder="Иван" />
                Фамилия
                <myLabel id="surname" placeholder="Иванов" />
                Отчество(необязательно)
                <myLabel id="middlename" placeholder="Иванович"/>
                <!-- Группа
                <mySingleSelector placeholder="РИС-21-1Б"/> -->

            </div>
        </div>
        <div class="reg_out_container">
            <myButton>Регистрация</myButton>
            <myButton class="exit_button" @click="$emit('exit')">Назад</myButton>
        </div>
    </div>
</template>

<script setup>
import loader from "@/shared/ui/loader.vue";

import { useCurrentUserStore } from "../stores/user";
import { ref } from "vue";
import { useRouter } from "vue-router";
import myButton from "@/shared/ui/myButton.vue";
import myLabel from "@/shared/ui/myLabel.vue";

const userStore = useCurrentUserStore()
</script>

<style lang="scss" scoped>

.reg_container{
    padding: 20px 10px;
    min-width: 300px;
    border-radius: 14px;
    background-color: var(--main-white-background-color);
    display: flex;
    flex-direction: column;
    gap: 20px
}

.split_container{
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 20px;

    
}

.child_container{
    display: flex;
    flex-direction: column;
    width: 280px;
    min-height: 50px;
}

.reg_out_container{
    display: flex;
    flex-direction: row;
    gap: 10px;
    place-content: center;
    height: 100%;
    
}

.exit_button{
    background-color: #d4d4d4;
    color: #444444;
}

@media (max-width: 600px) {
    // .reg_container{
    //     width: 100vw;
    // }
    .reg_container{
        width: 100vw;
        gap: 10px;
    }
    .split_container{
        display: flex;
        flex-direction: column;
        place-content: center;
    }
    .child_container{
        width: 100%;
    }
    .reg_out_container{
        align-items: center;
        height: 100%;
    }
}
</style>
