<template>
    <div class="container">
        <button class="button" @click="isOpen = true">
            <img
                src='@/ico/menu/plus-48.png'
                class="icon"
            />
            Добавить группу
        </button>
        
        <modal :isOpen @close="isOpen = false" title="Добавить группу">
            <createGroupCard @close="isOpen = false"/>
        </modal>
    </div>
</template>

<script setup>
import { ref } from "vue";

import modal from "@/shared/ui/modal.vue";
import createGroupCard from "@/entities/groups/ui/createGroupCard.vue";

const isOpen = ref(false);
</script>

<style lang="scss" scoped>
.container {
    padding: 7px;
}

.icon {
    height: 40px;
}

.button{
    border-radius: 10px;
    border: 2px solid var(--main-white-background-color);
    display: flex;
    width: 100%;
    min-height: 55px;
    color:  var(--main-white-color);
    background-color: #00000000;
    font-family: "Roboto Flex", sans-serif;
    font-size: 17px;
    align-items: center;
    cursor: pointer;
    text-align: left;
    overflow: hidden;
    padding: 5px;
    gap: 10px;
    &:hover{
        background-color: color-mix(in srgb, var(--main-white-blue-color), white 20%);
        .scrollable{
            animation: scroll-text 10s linear infinite; 
        }
    }
    &_active{
        background-color: var(--main-white-color);
        color: #000000;
        &:hover{
            background-color: color-mix(in srgb, var(--main-white-color), rgb(0, 0, 0) 20%);
        }
    }
}
</style>
