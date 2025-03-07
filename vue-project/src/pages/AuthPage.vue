<template>
    <div class="MainContainer">
        <div class="WebName"><img src="@/ico/logo/финал 2.png" alt=""></div>
        <div class="Text">Добро пожаловать!</div>
        <UserAuth/>
    </div>
</template>

<script setup>
import UserAuth from '../entities/user/ui/auth.vue'
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
</style>