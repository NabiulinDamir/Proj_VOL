<template>
    <div class="MainContainer">
        <img class="web_name" src="@/ico/logo/финал 2.png" alt="">
        <div class="Text">Добро пожаловать!</div>

            <UserAuth v-if="authVisible" @toReg="openReg()"/>
            <UserReg v-if="regVisible" @exit="openAuth()"/>
    </div>
</template>

<script setup>
import { ref } from 'vue'

import UserAuth from '../entities/user/ui/auth.vue'
import UserReg from '@/entities/user/ui/reg.vue';

const authVisible = ref(true)
const regVisible = ref(false)

const openAuth = () => {
    regVisible.value = false
    authVisible.value = true
}

const openReg = () => {
    authVisible.value = false
    regVisible.value = true
}
</script>

<style lang="scss" scoped>

.MainContainer{
    display: flex;
    flex-direction: column;
    width: 100%;
    place-content: center;
    align-items: center;
}

.WebName{
    height: 240px;
    display: flex;
    align-items: center;
    padding-top: 10px;
    user-select: none;
    & img{
        height: 100%;
        pointer-events: none;
        user-select: none;
        
    }
}

.web_name{
    width: 600px;
    padding: 20px;
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

// .transworm_window{
//     background-color: var(--main-white-background-color);
//     border-radius: 14px;
//     transition: 200ms;
// }

@media (max-width: 600px) {
  /* Стили для телефонов */
  .web_name {
    width: 150px;
    padding: 5px;

  }
  .Text{
    display: none;
  }
}

@media (max-width: 760px) {


}

</style>