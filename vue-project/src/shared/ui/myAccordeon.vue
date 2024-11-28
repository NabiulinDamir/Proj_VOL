<template>
    <div class="Container_border">
        <div class="Container_main">
            <div class="Container_header" @click="isOpened = !isOpened">
                <slot name="header"></slot>
                <img style="height: 30px; margin-right: 5px;" v-if="!isOpened" src="../../ico/accordeon/icons8-sort-down-50 (1).png" alt="">
                <img style="height: 30px; margin-right: 5px;" v-if="isOpened" src="../../ico/accordeon/icons8-sort-left-50.png" alt="">
            </div>
            <div class="Container_open" :class="{ opened: isOpened }">
                <slot name="content"></slot>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";

const isOpened = ref(false)
</script>

<style lang="scss" scoped>
.Container_header {
    height: 40px;
    border: 1.5px solid #f4f4f4;
    // border-radius: 12px;
    user-select: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    // display: flex;
    // flex-direction: row;
    // align-items: center;
    
    // user-select: none;
    
}
.Container_border{
    
    padding: 3px;
    border-radius: 15px;
    -webkit-box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
    -moz-box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
    box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
    &:hover {
        // background: var(--gradient-color);
        background: var(--main-white-blue-color);
    }
}
.Container_open {
    // display: grid;
    // grid-template-rows: 0fr;
    height: 0px; /* Начальная высота */
    overflow: hidden; /* Скрыть содержимое, когда max-height = 0 */
    // border-radius: 0px 0px 13px 13px;
    
    // transition: height 0.2s ease; /* Плавный переход */
    
    
}
.Container_main{
    border-radius: 12px;
    background-color: #f4f4f4;
    padding: 10px;
    overflow: hidden;
}
.opened {
    // display: block !important;
    // max-height: 250px; /* Максимальная высота при открытии */
    height: min-content;
    

}
</style>
