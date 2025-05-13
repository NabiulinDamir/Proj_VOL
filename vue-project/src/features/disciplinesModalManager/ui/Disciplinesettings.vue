<template>
    <div class="groupSettings-Container">
        <myOpButton class="button" @click="isOpen = true">
            <slot></slot>
        </myOpButton>
        
        <modal :isOpen @close="isOpen = false" title="Настройка дисциплины">
            <settingsCard @close="isOpen = false"/>
        </modal>
    </div>
</template>

<script setup>
import { ref } from "vue";
import myOpButton from "@/shared/ui/myButtonOp.vue";

import modal from "@/shared/ui/modal.vue";

import settingsCard from "@/entities/disciplines/ui/settingsCard.vue";

const isOpen = ref(false);
</script>

<style lang="scss" scoped>
.groupSettings-Container{
    width: min-content;
}
</style>