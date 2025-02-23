<template>
    <div class="RegContainer">
        <!-- <FloatLabel variant="" class="FloatLabel" >
            <InputText id="in_label" size="large" v-model="UserLogin" variant="filled" />
            <label for="in_label">Логин</label>

        </FloatLabel>


        <FloatLabel variant="" class="FloatLabel">
            <Password  v-model="UserPassword" :invalid="!Password_Is_Valid" :feedback="false" inputId="on_label" toggleMask />
            <label  :style="{margin:'1px'}"  for="on_label">Пароль</label>
        </FloatLabel> -->

        <div class="label">
            Логин<input
                type="text"
                class="label_input"
                id="login"
                v-model="userLogin"
            />
        </div>

        <div class="label">
            Пароль
            <div style="display: flex;">
                <input
                    :type="isPasswordHide ? 'password' : 'text'"
                    class="label_input"
                    id="password"
                    v-model="userPassword"
                />
                <div @click="togglePasswordVisibility">
                    {{ isPasswordHide ? "🙈" : "👁️" }}
                </div>
            </div>
        </div>
        <!-- <div id="radio_help_container">

        </div> -->
        <div id="Message">{{ textMessage }}</div>
        <div id="button_loader_container">
            <loader v-if="isLoading"></loader>
            <div v-if="!isLoading" id="StartButton" @click="login">Войти</div>
        </div>
    </div>
</template>

<script setup>
import loader from "@/widgets/loader/loader.vue";

import { useCurrentUserStore } from "../stores/user";
import { ref } from "vue";
import { useRouter } from "vue-router";

const userStore = useCurrentUserStore();
const router = useRouter();
const userLogin = ref("");
const userPassword = ref("");
const isPasswordHide = ref(true);
const textMessage = ref("");
const isLoading = ref(false);

const login = async () => {
    try {
        isLoading.value = true;
        const isLogined = await userStore.login(userLogin.value, userPassword.value);
        isLoading.value = false;
        if (isLogined) {
            if (userStore.user.role === "Teacher") {
                router.push("/Teacher");
            } else if (userStore.user.role === "Student") {
                router.push("/Main");
            }
        } else {
            textMessage.value = "Неверный логин или пароль";
        }
    } catch (error) {
        console.error("Ошибка при авторизации:", error);
        textMessage.value = "Произошла ошибка при авторизации";
    }
};

const togglePasswordVisibility = () => {
    isPasswordHide.value = !isPasswordHide.value;
};
</script>

<style lang="scss" scoped>
.label {
    width: 100%;
    &_input {
        width: 100%;
        height: 30px;
        border-radius: 7px;
        border: 0px;
        padding: 5px;
        background-color: var(--main-grey-color);
    }
}

.WebName {
    height: 240px;
    display: flex;
    align-items: center;
    padding-top: 10px;
    &img {
        height: 100%;
        pointer-events: none;
        user-select: none;
    }
}

.RegContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 300px;
    padding: 15px;
    border-radius: 14px;
    background-color: var(--main-white-color);
    // -webkit-box-shadow: -1px 1px 10px 1px rgba(34, 60, 80, 0.28);
    // -moz-box-shadow: -1px 1px 10px 1px rgba(34, 60, 80, 0.28);
    // box-shadow: -1px 1px 10px 1px rgba(34, 60, 80, 0.28);
    user-select: none;
    font-family: 'Roboto Flex', sans-serif;
    gap: 5px;
}

#StartButton {
    height: 30px;
    width: 100px;
    border: 1px solid black;
    margin: 4px;
    font-size: 16px;
    border-radius: 5px;
    background-color: var(--main-white-blue-color);
    border-color: #e0e0e0;
    color: #ffffff;
    transition: 0.1s;
    text-decoration: none;
    // align-items: center;
    // justify-content: center;
    place-content: center;
    text-align: center;
    user-select: none;
    // margin: 20px;
    &:hover {
        // margin: 2px;
        border: 1px solid black;
        // color: #5b68c8;
        // width: 104px;
        // height: 34px;
    }
}
#Message {
    height: 25px;
    color: red;
    font-size: 15px;
    user-select: none;
    padding: 5px;
}

label {
    width: 100%;
    // color: #202020;
    text-align: start;
}
.input {
    background-color: #ffffff;
    border: 1px solid #202020;
    color: #202020;
    font-size: 20px;
    border-radius: 5px;
    width: 100%;
    &:focus-visible {
        border-radius: 5px;
        border: 1px solid #202020;
    }
    &:-webkit-autofill {
        -webkit-text-fill-color: black; /* Цвет текста автозаполнения */
        -webkit-box-shadow: 0 0 0px 1000px white inset; /* Цвет фона автозаполнения */
        transition: background-color 5000s ease-in-out 0s; /* Это нужно для сохранения цвета фона */
    }
}
#button_loader_container{
    height: 40px;
    display: flex;
    align-items: center;
}
</style>
