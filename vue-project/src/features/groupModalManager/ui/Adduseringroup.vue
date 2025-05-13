<template>
    <div class="geleteGroup-Container">
        <myOpButton class="button" @click="isOpen = true">
            <slot></slot>
        </myOpButton>
        
        <modal :isOpen @close="isOpen = false" title="Добавить в группу">
            <addUserInGroup :user="user" @close="isOpen = false"/>
        </modal>
    </div>
</template>

<script setup>
import { ref } from "vue";
import myOpButton from "@/shared/ui/myButtonOp.vue";

import modal from "@/shared/ui/modal.vue";

import addUserInGroup from "@/entities/groups/ui/addUserInGroupCard.vue";

const props = defineProps({
    user:{
        type: Object,
        require: true,
    }
})
const isOpen = ref(false);
</script>

<style lang="scss" scoped>
.geleteGroup-Container{
    width: min-content;
}
.button{
    // background-color: var(--main-red);
}
</style>