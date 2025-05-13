<template>
    <div class="geleteGroup-Container">
        <myOpButton class="button" @click="isOpen = true">
            <slot></slot>
        </myOpButton>
        
        <modal :isOpen @close="isOpen = false" title="Удаление группы">
            <deleteGroupCard @close="isOpen = false"/>
        </modal>
    </div>
</template>

<script setup>
import { ref } from "vue";
import myOpButton from "@/shared/ui/myButtonOp.vue";

import modal from "@/shared/ui/modal.vue";

import deleteGroupCard from "@/entities/groups/ui/deleteGroupCard.vue";

const isOpen = ref(false);
</script>

<style lang="scss" scoped>
.geleteGroup-Container{
    width: min-content;
}
.button{
    &:hover{
        background-color: var(--main-red);
        color: black;
    }
}

</style>