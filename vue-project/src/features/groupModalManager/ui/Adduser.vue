<template>
    <div class="groupSettings-Container">
        <myOpButton class="button" @click="isOpen = true">
            <slot></slot>
        </myOpButton>
        
        <modal :isOpen @close="isOpen = false" title="Добавление пользователей">
            <addUsersCard @close="isOpen = false"/>
        </modal>
    </div>
</template>

<script setup>
import { ref } from "vue";
import myOpButton from "@/shared/ui/myButtonOp.vue";

import modal from "@/shared/ui/modal.vue";

import addUsersCard from "@/entities/groups/ui/addUsersCard.vue";

const isOpen = ref(false);
</script>

<style lang="scss" scoped>
.groupSettings-Container{
    width: min-content;
}
.button{
    &:hover{
        background-color: var(--main-green);
        color: black;
    }
}
</style>