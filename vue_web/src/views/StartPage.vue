<template>
    <div class="WebName">
        ВИКЕНТЕВА.СРУ
    </div>
    <div class="choice">
        <router-link :to="link_1.href" class="choice__link">{{ link_1.name }}</router-link>
        <router-link :to="link_2.href" class="choice__link">{{ link_2.name }}</router-link>
        <!-- <div class="Choice__Button">ПНИПУ</div>
        <div class="Choice__Button">ПГУ</div> -->
    </div>
</template>

<script setup>
import {ref} from 'vue';


const link_1 = ref({name: 'ПНИПУ', href: '/PnipuPage'})
const link_2 = ref({name: 'ПГУ', href: '/PguPage'})    

</script>

<style lang="scss" scoped>
.WebName{
    height: 200px;
    display: flex;
    align-items: center;
    place-content: center;
}
.choice{
    // background-color: aqua;
    display: flex;
    justify-content: center;
    

    &__link {
        width: 170px;
        height: 60px;
        margin: 40px;
        display: flex;
        border-radius: 12px;
        padding: 10px;
        // border: 2px solid #ffffff;
        background-color: #202020;
        color: #ffffff;
        transition:  0.2s;
        font-weight: bold;
        
        // margin-bottom: 10px;
        place-content: center;
        align-items: center;
        font-size: 1.5em;
        text-decoration: none;
        &:hover{
            font-size: 1.55em;
            // border-color: #5b68c8;
            // color: #5b68c8;
            margin: 35px;
            width: 180px;
            height: 70px;
            
        }
    }
}
</style>