<template>
    <div class="title">
        <div class="NavbarContainer-left">
            <div class="Logo">
                <img src="../../ico/logo/Logo-title.png" alt="" />
            </div>
        </div>
        <div class="NavbarContainer-center"></div>
        <div class="NavbarContainer-right">
            <userCart> </userCart>
        </div>
    </div>
</template>

<script setup>
import userCart from "@/widgets/cart/cart.vue";

</script>

<style lang="scss" scoped>
.title {
    height: 60px;
    background-color: var(--main-white-blue-color);
    display: flex;
}
.NavbarContainer-left {
    width: 100%;
    display: flex;
}
.NavbarContainer-center {
    width: 100%;
}
.NavbarContainer-right {
    width: 100%;
    display: flex;
    justify-content: flex-end;
}
.Logo {
    width: 200px;
    height: 100%;
    display: flex;

    padding: 5px;
}
.Logo img {
    width: 100%; /* масштабирует изображение по ширине дива */
    height: auto; /* сохраняет пропорции изображения */
    display: block; /* убирает отступы снизу (если есть) */
}
.Position {
    color: black;

    place-content: center;
}
</style>
