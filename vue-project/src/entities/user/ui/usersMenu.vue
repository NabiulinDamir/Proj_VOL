<template>
    <div id="loader_container" v-if="isLoading"><loader /></div>
    <div id="MainContainerMenu" v-if="!isLoading">
        <div class="line" v-if="userStore.groupUsers?.length">
            <div class="line_start"></div>
            <div class="line_text">Пользователи РИС-21-1Б</div>
            <div class="line_end"></div>
        </div>
        <userCardMini class="user_card" :user="user" :key=user.id v-for="user in userStore.groupUsers"/>
    </div>
</template>

<script setup>
import { watchEffect, computed, ref, watch, nextTick, onMounted  } from "vue";
import loader from "@/widgets/loader/loader.vue";
import userCardMini from "./userCardMini.vue";

import { useCurrentUserStore } from "../stores/user";

const userStore = useCurrentUserStore()

const isLoading = ref(false);

onMounted(async () => {
    isLoading.value = true;
    await userStore.setGroupUsersByGroup();
    isLoading.value = false;
});





</script>

<style lang="scss">
#MainContainerMenu {
    display: grid;
    grid-template-columns: 100%;
    gap: 3px;
    align-items: center;
    place-content: center;
    padding: 10px 0px 10px 0px;
}

.user_card {
    margin-top: 10px;
}

.line + .user_card {
    margin-top: 0; 
}

.line {
    display: flex;
    flex-direction: row;
    align-items: center;
    user-select: none;
    height: 25px;
    &_text {
        font-size: 15px;
        font-family: monospace;
        margin: 0px 5px 0px 5px;
        white-space: nowrap;
    }
    &_start {
        height: 1px;
        background-color: #9292929a;
        border: 0px;
        width: 10%;
    }
    &_end {
        height: 1px;
        background-color: #9292929a;
        border: 0px;
        width: 100%;
    }
}

.line {
    display: flex;
    flex-direction: row;
    align-items: center;
    user-select: none;
    height: 25px;
    &_text {
        font-size: 15px;
        font-family: monospace;
        margin: 0px 5px 0px 5px;
        white-space: nowrap;
    }
    &_start {
        height: 1px;
        background-color: #9292929a;
        border: 0px;
        width: 10%;
    }
    &_end {
        height: 1px;
        background-color: #9292929a;
        border: 0px;
        width: 100%;
    }
}

#loader_container {
    padding: 10px;
}
</style>
