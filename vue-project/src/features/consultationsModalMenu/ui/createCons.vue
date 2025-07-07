<template>
    <div class="groupSettings-Container">
        <myOpButton class="button" @click="isOpen = true">
            <slot>
                <img class="img-plus" src="@/ico/cons/icons8-плюс-60.png" alt="+">
                Создать консультацию
            </slot>
        </myOpButton>
        
        <modal :isOpen @close="isOpen = false" title="Создание консультации">
            <consCreate @close="isOpen = false"/>
        </modal>
    </div>
</template>

<script setup>
import { ref } from "vue";
import myOpButton from "@/shared/ui/myButtonOp.vue";

import modal from "@/shared/ui/modal.vue";
import consCreate from "@/entities/consultation/ui/consCreate.vue";

const isOpen = ref(false);
</script>

<style lang="scss" scoped>
.groupSettings-Container{
    width: 100%;
}
.button{
    width: 100%;
    height: 50px;
    border: 3px solid var(--main-white-blue-color);
    border-radius: 12px;
    opacity: 0.7;
    &:hover{
        .img-plus{
            filter: brightness(0) invert(0.85);
        }
    }
}
.img-plus{
    height: 90%;
}
</style>