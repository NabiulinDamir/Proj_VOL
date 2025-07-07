<template>
    <div class="auth_container">
        <div class="left_position">Почта или логин</div>
        <myLabel id="login" v-model="userStore.login"></myLabel>
        <div class="left_position">Пароль</div>
        <myLabel id="password" autocomplete="user-password" v-model="userStore.password"></myLabel>

        <div class="helper_container">
            <label class="checkbox-container">
                <input type="checkbox" class="checkbox-input" />
                <span>Не выходить</span>
            </label>
            <div class="opacity-label">Забыли пароль?</div>
        </div>
        <div class="message">{{ textMessage }}</div>
        <div id="button_loader_container">
            <loader v-if="isLoading"></loader>
            <myButton class="button" v-if="!isLoading" @click="login">Войти</myButton>
            <myOpButton class="button reg" v-if="!isLoading" @click="$emit('toReg')">Регистрация</myOpButton>
            <!-- <myButton
                class="button role"
                v-if="!isLoading"
                @click="userStore.changeRole(), changeRole()"
                >{{ roleText }}</myButton
            > -->
        </div>
    </div>
</template>

<script setup>
import loader from "@/shared/ui/loader.vue";

import { useCurrentUserStore } from "../stores/user";
import { ref } from "vue";
import { useRouter } from "vue-router";
import myButton from "@/shared/ui/myButton.vue";
import myOpButton from "@/shared/ui/myButtonOp.vue";
import myLabel from "@/shared/ui/myInputText.vue";

const userStore = useCurrentUserStore();
const router = useRouter();

const textMessage = ref("");
const isLoading = ref(false);
const roleText = ref("cтудент");

const login = async () => {

    isLoading.value = true;
    const result = await userStore.userAuth();
    if (result.success) {
        router.push({ name: 'main' })
    }
    textMessage. value = result.message

    isLoading.value = false;


    // if (isLogined) {
    //     router.push({ name: "users" });
    // } else {
    //     textMessage.value = "Неверный логин или пароль";
    // }

    // try {
    //     isLoading.value = true;
    //     const isLogined = await userStore.login(
    //         userLogin.value,
    //         userPassword.value
    //     );
    //     isLoading.value = false;
    //     if (isLogined) {
    //         router.push({ name: "users" });
    //     } else {
    //         textMessage.value = "Неверный логин или пароль";
    //     }
    // } catch (error) {
    //     console.error("Ошибка при авторизации:", error);
    //     textMessage.value = "Произошла ошибка при авторизации";
    // }
};

const changeRole = () => {
    if (roleText.value === "студент") {
        roleText.value = "препод";
    } else {
        roleText.value = "студент";
    }
};

// //для доступа к хранилищу
// import { useCurrentUserStore } from "../stores/user";
// const userStore = useCurrentUserStore();
// //Для доступа к имени пользователя
// const userName = userStore.user.firstname
// //Для достпа к статусу авторизации
// const isLogined = userStore.isLogined
// //ДЛя доступа к введённому логину
// const login = userStore.login
// //для доступа к введённому паролю
// const password = userStore.password
// //для доступа к токену
// const token = userStore.token

</script>

<style lang="scss" scoped>

.auth_container {
    display: flex;
    flex-direction: column;
    width: 350px;
    padding: 20px 10px;
    border-radius: 14px;
    background-color: var(--main-white-background-color);
    user-select: none;
    gap: 5px;
}

.button {
    width: 140px;
    height: 35px;
}

.reg {
    background-color: #d4d4d4;
    color: #444444;
}

.role {
    position: absolute;
    top: 110px;
}

.message {
    height: 30px;
    color: red;
    font-size: 15px;
    user-select: none;
    padding: 5px 0px;
    display: flex;
    place-content: center;
}

#button_loader_container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    position: relative;
    height: 80px;
}

.left_position {
    display: flex;
    align-items: flex-start;
}

.helper_container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0px;
}


.checkbox-container {
    display: flex;
    align-items: flex-end;
    position: relative;
    cursor: pointer;
    user-select: none;
    gap: 5px;
}

.opacity-label {
    color: var(--main-white-blue-color);
    opacity: 0.7;
    &:hover{
        text-decoration: underline;
    }
}


@media (max-width: 600px) {
    // .reg_container{
    //     width: 100vw;
    // }
    .auth_container{
        width: 100vw;
        background-color: #00000000;
        color: var(--main-grey-stroke-color);
    }
}
</style>
