<template>
    <div class="title">
        <div class="NavbarContainer-left"></div>
        <div class="NavbarContainer-center"></div>
        <div class="NavbarContainer-right">
            <PrepodCart>
                
            </PrepodCart>
                

        </div>
    </div>
</template>

<script setup>
import PrepodCart from "/src/components/BaseComponents/PrepodCart.vue"
</script>

<style lang="scss" scoped>
.title{
    height: 60px;
    background-color: var(--main-white-blue-color);
    display: flex;
    // -webkit-box-shadow: 0px 4px 8px 0px rgba(34, 60, 80, 0.2);
    // -moz-box-shadow: 0px 4px 8px 0px rgba(34, 60, 80, 0.2);
    // box-shadow: 0px 4px 8px 0px rgba(34, 60, 80, 0.2);
    
}
.NavbarContainer-left{
    width: 100%;
}
.NavbarContainer-center{
    width: 100%;
}
.NavbarContainer-right{
    width: 100%;
    display: flex;
    justify-content: flex-end;
}

</style>