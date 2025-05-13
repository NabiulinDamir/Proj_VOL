<template>
    <div class="container">
        <myOpButton class="button" @click="isOpen = true">
            <slot>

            </slot>
        </myOpButton>
        
        <modal :isOpen @close="isOpen = false" title="Пустой титул">
            <!-- <createTheoryCard @close="isOpen = false"/> -->
        </modal>
    </div>
</template>

<script setup>
import { ref } from "vue";

import modal from "@/shared/ui/modal.vue";
// import createTheoryCard from "@/entities/materials/ui/createTheoryCard.vue";
import myOpButton from "@/shared/ui/myButtonOp.vue";


const isOpen = ref(false);
</script>

<style lang="scss" scoped>



</style>
