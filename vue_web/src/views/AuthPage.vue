<template>
    <div class="MainContainer">
        <div class="WebName"><img src="../ico/logo/финал 2.png" alt=""></div>
        
        <div class="Text">Добро пожаловать!</div>
        <div class="RegContainer">
        
            <FloatLabel variant="" class="FloatLabel" >
                <InputText id="in_label" size="large" v-model="UserLogin" variant="filled" />
                <label for="in_label">Логин</label>

            </FloatLabel>


            <FloatLabel variant="" class="FloatLabel">
                <Password  v-model="UserPassword" :invalid="!Password_Is_Valid" :feedback="false" inputId="on_label" toggleMask />
                <label  :style="{margin:'1px'}"  for="on_label">Пароль</label>
            </FloatLabel>
            
            <input type="checkbox"  v-model="isEzAuth">

            <div id="StartButton" @click="login">войти</div>

        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import { useAppStore } from '../store/index.js';
import { useRouter } from 'vue-router';
import User from "../services/user.js"
import Password from 'primevue/password';
import FloatLabel from 'primevue/floatlabel';
import InputText from 'primevue/inputtext';

export default {
  data() {
    return {
      InvalidCode: ref(''),
      errorMessage: '',
      router: useRouter(),
      appStore: useAppStore(),
      Password_Is_Valid: ref(false),
      
      UserLogin: "",
      UserPassword: "",

      isEzAuth: true,
    };
  },
  
  methods: {
    showPassword() {
        this.Password_Is_Visible = !this.Password_Is_Visible; 
    },

    login() {
      const result = User.UserLogin(this.UserLogin, this.UserPassword);
      this.Password_Is_Valid = result;
      if (result || this.isEzAuth) {
        console.log(`Успешная авторизация! Имя пользователя: ${User.name}`);

        this.$router.push('/MainPage');
      } else {
        console.log('Неудачная авторизация. Проверьте пароль.');
      }
      console.log(this.Password_Is_Valid)
    }
  }
};

</script>

<style lang="scss" scoped>

.MainContainer{
    display: flex;
    flex-direction: column;
    width: 100%;
    place-content: center;
    align-items: center;
}

.FloatLabel{
    margin-top: 25px;
}

.WebName{
    height: 240px;
    display: flex;
    align-items: center;
    padding-top: 10px;
    & img{
        height: 100%;
        pointer-events: none;
        user-select: none;
        
    }
}
.Text{
    height: 50px;
    display: flex;
    align-items: center;
    font-weight: 650;
    font-size: 1.5rem;
    line-height: 2.5rem;
    user-select: none;
    color: #898989;
}

.RegContainer{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 300px;
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
    color: #ffffff;
    transition:  0.1s;
    text-decoration: none;
    // align-items: center;
    // justify-content: center;
    place-content: center;
    text-align: center;
    user-select: none;
    margin: 20px;
    &:hover{
            // margin: 2px;
            border-color: #e0e0e0;
            // color: #5b68c8;
            // width: 104px;
            // height: 34px;
            
        }
}
#InvalidCodeMessage{
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