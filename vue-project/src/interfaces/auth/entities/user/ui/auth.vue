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
        
        <div class="label" >Логин<input type="text" class="label_input" id="login" v-model="userLogin"></div>

        <div class="label" >Пароль <div style="display: flex;"> <input :type="isPasswordHide ?  'password' : 'text'" class="label_input" id="password" v-model="userPassword">
            <div @click="togglePasswordVisibility">{{ isPasswordHide ? '🙈' : '👁️' }}</div>
        </div></div>

        <div id="Message">{{ textMessage }}</div>

        <div id="StartButton" @click="login">войти</div>

    </div>
</template>

<script setup>
import {useCurrentUserStore} from '../stores/user'
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useCurrentStudentStore } from '@/interfaces/student/entities/student/stores/student'
import { useCurrentTeacherStore } from '@/interfaces/teacher/entities/teacher/stores/teacher'

const userStore = useCurrentUserStore();
const router = useRouter();
const userLogin = ref('');
const userPassword = ref('');
const isPasswordHide = ref(true);
const textMessage = ref('');


const login = () => {
    // console.log(userLogin.value, userPassword.value)
    const isLogined = userStore.login(userLogin.value, userPassword.value)
    if(isLogined){
        if(userStore.user.role === "Teacher"){
            router.push('/Teacher');
        }
        if(userStore.user.role === "Student"){
            router.push('/Main');
        }
        
    }
    else{
        textMessage.value = "неверный логин или пароль"
    }
    
}

const togglePasswordVisibility = () => {
    isPasswordHide.value = !isPasswordHide.value;
}

</script>

<style lang="scss" scoped>
.label{
    width: 90%;
    &_input{
        width: 100%;
        height: 30px;
        border-radius: 7px;
        border: 0px;
        padding: 5px;
    }
}



.WebName{
    height: 240px;
    display: flex;
    align-items: center;
    padding-top: 10px;
    &img{
        height: 100%;
        pointer-events: none;
        user-select: none;
        
    }
}

.RegContainer{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 300px;
    padding: 15px;
    border-radius: 20px;
    background-color: var(--main-white-color);
    -webkit-box-shadow: -1px 1px 10px 1px rgba(34, 60, 80, 0.28);
    -moz-box-shadow: -1px 1px 10px 1px rgba(34, 60, 80, 0.28);
    box-shadow: -1px 1px 10px 1px rgba(34, 60, 80, 0.28);
    user-select: none;
}

#StartButton{
    height: 30px;
    width: 100px;
    border: 1px solid black;
    margin: 4px;
    font-size: 18px;
    border-radius: 5px;
    background-color: #202020;
    border-color: #e0e0e0;
    color: #ffffff;
    transition:  0.1s;
    text-decoration: none;
    // align-items: center;
    // justify-content: center;
    place-content: center;
    text-align: center;
    user-select: none;
    // margin: 20px;
    &:hover{
            // margin: 2px;
            border: 1px solid black;
            // color: #5b68c8;
            // width: 104px;
            // height: 34px;
            
        }
}
#Message{
    height: 20px;
    color: red;
    font-size: 0.9em;
    user-select: none;
}


label{
    width: 100%;
    color: #202020;
    text-align: start;
}
.input{
    background-color: #ffffff;
    border: 1px solid #202020;
    color: #202020;
    font-size: 20px;
    border-radius: 5px;
    width: 100%;
    &:focus-visible{
        border-radius: 5px;
        border: 1px solid #202020;
    }
    &:-webkit-autofill {
        -webkit-text-fill-color: black; /* Цвет текста автозаполнения */
        -webkit-box-shadow: 0 0 0px 1000px white inset; /* Цвет фона автозаполнения */
        transition: background-color 5000s ease-in-out 0s; /* Это нужно для сохранения цвета фона */
    }
}
</style>
