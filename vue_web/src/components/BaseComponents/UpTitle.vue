<template>
    <div class="title">
        <div class="NavbarContainer-left">
            <div class="Logo" @click="handleClick">
                <img src="../../ico/logo/Logo-title.png" alt="" />
            </div>
            <div class="Position">
                {{ User.Get_Group_Name() }} / {{ User.Get_User_Name() }}
            </div>
        </div>
        <div class="NavbarContainer-center"></div>
        <div class="NavbarContainer-right">
            <PrepodCart> </PrepodCart>
        </div>
    </div>
</template>

<script>
import { ref, watchEffect } from "vue";
import { useRouter } from "vue-router";
import PrepodCart from "/src/components/BaseComponents/PrepodCart.vue";
import User from "@/services/user";

export default {
    components:{
        PrepodCart
    },
    data() {
        return {
            router: useRouter(),
            User: User
        };
    },
    methods: {
        handleClick(){
            this.$router.push("/");
        },
    },
};
</script>

<style lang="scss" scoped>
.title {
    height: 60px;
    background-color: var(--main-white-blue-color);
    display: flex;
    // -webkit-box-shadow: 0px 4px 8px 0px rgba(34, 60, 80, 0.2);
    // -moz-box-shadow: 0px 4px 8px 0px rgba(34, 60, 80, 0.2);
    // box-shadow: 0px 4px 8px 0px rgba(34, 60, 80, 0.2);
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
