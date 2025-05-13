<template>
    <div class="reg_container">
        <div class="split_container">
            <div class="child_container">
                Почта
                <myLabel
                    id="new-email"
                    v-model="data.email"
                    autocomplete="new-email"
                    placeholder="govnokrad2003@gmail.com"
                    :is-error="errorHandler.email"
                    @click="regData = ''"
                />
                Логин
                <myLabel
                    id="new-login"
                    v-model="data.login"
                    autocomplete="off"
                    placeholder="govnokrad228"
                    :is-error="errorHandler.login"
                    @click="regData = ''"
                />
                Пароль
                <myLabel
                    id="password"
                    v-model="data.password"
                    autocomplete="new-password"
                    :is-error="errorHandler.password"
                    @click="regData = ''"
                />
                Повторите пароль
                <myLabel
                    id="signup-password-confirm"
                    v-model="data.confirmPassword"
                    :is-error="errorHandler.confirmPassword"
                    @click="regData = ''"
                />
            </div>
            <div class="child_container">
                Имя
                <myLabel
                    id="name"
                    v-model="data.firstName"
                    placeholder="Иван"
                    :is-error="errorHandler.firstName"
                    @click="regData = ''"
                    @change="capitalizeFirstName"
                />
                Фамилия
                <myLabel
                    id="surname"
                    v-model="data.surname"
                    placeholder="Иванов"
                    :is-error="errorHandler.surname"
                    @click="regData = ''"
                    @change="capitalizeSurname"
                />
                Отчество
                <myLabel
                    id="middlename"
                    v-model="data.middleName"
                    placeholder="Иванович"
                    :is-error="errorHandler.middleName"
                    @click="regData = ''"
                    @change="capitalizeMiddleName"
                />
            </div>
        </div>
        <div class="message">{{ regData }}</div>
        <div class="reg_out_container" v-if="!isLoading">
            <myButton :class="{ opasyty: !isFormValid }" @click="registration()"
                >Регистрация</myButton
            >
            <myButton class="exit_button" @click="$emit('exit')"
                >Назад</myButton
            >
        </div>
        <loader v-if="isLoading" />
    </div>
</template>

<script setup>
import { ref, computed } from "vue";

import loader from "@/shared/ui/loader.vue";

import { useCurrentUserStore } from "../stores/user";
import { useRouter } from "vue-router";
import myButton from "@/shared/ui/myButton.vue";
import myLabel from "@/shared/ui/myInputText.vue";

const userStore = useCurrentUserStore();
const router = useRouter()

const isLoading = ref(false);

const data = ref({
    firstName: "",
    surname: "",
    middleName: "",
    login: "",
    password: "",
    confirmPassword: "",
    email: "",
});

const regData = ref("");

const registration = async () => {
    if (isFormValid.value) {
        isLoading.value = true;
        const result = await userStore.userReg(data.value);
        isLoading.value = false;

        if (result.success) {
            router.push({ name: 'main' })
        }
        regData.value = result.message
    }
};

const emit = defineEmits(["exit"]);

const errorHandler = computed(() => ({
    firstName:
        data.value.firstName.length < 2 || data.value.firstName.includes(" "),
    surname: !data.value.surname.length || data.value.surname.includes(" "),
    middleName: data.value.middleName.includes(" "),
    login:
        regData.value === "Пользователь с указанным именем уже существует" ||
        data.value.login.length < 5 ||
        data.value.login.includes(" "),
    password:
        regData.value === "Пароли не совпадают" ||
        !data.value.password.length ||
        data.value.password.includes(" "),
    confirmPassword:
        regData.value === "Пароли не совпадают" ||
        !data.value.confirmPassword.length ||
        data.value.confirmPassword.includes(" "),
    email:
        regData.value === "Пользователь с указанны email уже существует" ||
        data.value.email.includes(" "),
}));

const isFormValid = computed(() => {
    return !Object.values(errorHandler.value).some((error) => error === true);
});



const capitalizeFirstName = () => {
  if (data.value.firstName.length > 0) {
    data.value.firstName = 
      data.value.firstName[0].toUpperCase() + 
      data.value.firstName.slice(1).toLowerCase();
  }
};
const capitalizeSurname = () => {
  if (data.value.surname.length > 0) {
    data.value.surname = 
      data.value.surname[0].toUpperCase() + 
      data.value.surname.slice(1).toLowerCase();
  }
};
const capitalizeMiddleName = () => {
  if (data.value.middleName.length > 0) {
    data.value.middleName = 
      data.value.middleName[0].toUpperCase() + 
      data.value.middleName.slice(1).toLowerCase();
  }
};
</script>

<style lang="scss" scoped>
.reg_container {
    padding: 20px 10px;
    min-width: 300px;
    border-radius: 14px;
    background-color: var(--main-white-background-color);
    display: flex;
    flex-direction: column;
}

.split_container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 20px;
}

.child_container {
    display: flex;
    flex-direction: column;
    width: 280px;
    min-height: 50px;
}

.reg_out_container {
    display: flex;
    flex-direction: row;
    gap: 10px;
    place-content: center;
    height: 100%;
}

.exit_button {
    background-color: #d4d4d4;
    color: #444444;
}

.message {
    display: flex;
    align-items: center;
    place-content: center;
    padding: 10px;
    color: var(--main-red);
    user-select: none;
}

.opasyty {
    opacity: 0.5;
}

@media (max-width: 600px) {
    // .reg_container{
    //     width: 100vw;
    // }
    .reg_container {
        width: 100vw;
        gap: 10px;
    }
    .split_container {
        display: flex;
        flex-direction: column;
        place-content: center;
    }
    .child_container {
        width: 100%;
    }
    .reg_out_container {
        align-items: center;
        height: 100%;
    }
}
</style>
