<template>
    <div class="Card" :class="{ 'Card-open': isOpen }">
     <div id="Title"  v-if="userStore.user">
            <div class="profile_edit">
                <img class="img-profile" :class="{ 'img-profile-hide': !isOpen }" src="@/ico/user/icons8-user-90.png" alt="ошибка" />
                <myButton class="button-edit" :class="{ 'button-edit-hide': !isOpen }">
                    <img class="img-edit" src="@/ico/user/icons8-edit-24.png" alt="ошибка" />
                </myButton>
            </div>
            <div class="info_container">
                <div class="info_container-main">
                    <div class="name_text">{{ userStore.surename }} {{ userStore.name }} {{ userStore.middleName }}</div>

                    <div class="role_text">{{userStore.isTeacher ? "Преподаватель" : "Студент" }}</div>

                        

                    <hr class="line" :class="{ 'line-hide': !isOpen }"></hr>

                    <div class="additional_info_container" :class="{ 'additional_info_container-hide': !isOpen }">


                        <div>{{ `Группа: ${userStore.myGroup}` }}</div>

                        <div>{{ `Почта: ${userStore.user.email}` }}</div>

                        <div>{{ `Имя пользователя: ${userStore.username}` }}</div>
                    </div>
                </div>

                <button class="toggle-card" @click="isOpen = !isOpen">{{isOpen ? "скрыть ▲" : "дополнительно ▼"}}</button>

            </div>
            
        </div>
        <button class="button-exit" @click="exit"><img class="img-exit" src="@/ico/user/logout.png" alt="Выход"></button>   
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useCurrentUserStore } from "../stores/user";
import { useRouter } from "vue-router";
import myButton from "@/shared/ui/myButton.vue";
const userStore = useCurrentUserStore();
const router = useRouter()
const isOpen = ref(false)

onMounted(async() => {
    await userStore.setInfo()
})

const exit = () => {
    userStore.userLogout();
    router.push('/auth')
}

// const openCard = () => {
//     isOpen.value = true
// }

// const closeCard = () => {
//     isOpen.value = false
// }

</script>

<style lang="scss" scoped>
.Card {

    height: 75px;
    // height: min-content;
    // box-sizing: border-box;
    background-color: var(--main-white-background-color);
    -webkit-box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
    -moz-box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
    box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
    border-radius: 10px;
    min-width: min-content;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    transition: 200ms ease;
    &-open{
        height: 155px;
    }
    
}

.img{
    &-exit{
        width: 100%;
        object-fit: contain;
    }

    &-profile{
        height: 100px;
        width: 100px;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        border: 2px solid var(--main-white-blue-color);
        border-radius: 8px;
        object-fit: contain;

        transition: 200ms;
        &-hide{
            height: 63px;
            width: 63px;
        }
    }
}

.button{
    &-edit{
        width: 100%;
        display: flex;
        place-content: center;
        height: 30px;
        &-hide{
            display: none;
        }
    }

    &-exit{
        cursor: pointer;
        width: 30px;
        background-color: var(--main-white-blue-color);
        display: flex;
        padding: 3px;
        border: 0;
        align-items: center;
        &:hover{
            background-color: color-mix(in srgb, var(--main-white-blue-color), rgb(0, 0, 0) 20%);
        }
    }
}


.info_container {
    
    width: 100%;
    padding-right: 5px;
    // display: grid;
    // grid-template-columns: 1fr 1fr;
    // grid-template-rows: auto auto auto;
    // gap: 10px;
    display: flex;
    flex-direction: column;
    // flex-wrap: wrap;
    margin-left: 10px;
    justify-content: space-between;
}




#Title {
    display: grid;
    grid-template-columns: auto 1fr;
    
    padding: 6px;
    width: 100%;
}




.line{
    display: block;
    width: 100%;
    border-top: 0.5px solid var(--main-grey-stroke-color);
    height: 1px;
    margin: 3px 0px;
    &-hide{
        display: none;
    }
}

.name_text{
    font-size: 18px;
    text-wrap: nowrap;
}

.role_text{
    font-size: 14px;
    color: var(--main-white-blue-color);
}
.additional_info_container{
    display: flex;
    flex-direction: column;
    gap: 3px;
    &-hide{
        visibility: hidden;
        height: 0;
    }
}

.toggle-card{
    display: flex;
    align-items: center;
    place-content: center;
    font-size: 13px;
    color: var(--main-grey-stroke-color);
    user-select: none;
    border-radius: 5px;
    border: 0;
    cursor: pointer;
    &:hover{
        background-color: color-mix(in srgb, var(--main-grey-stroke-color), rgb(255, 255, 255) 60%);
    }
    
}

.profile_edit{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

@media (max-width: 500px) {
    .img-profile{
        height: 63px;
        width: 63px;
    }


    .name_text{
        font-size: 14px;
        text-wrap: wrap;
    }
    .role_text{
        font-size: 12px;
    }
    .additional_info_container > *{
        font-size: 12px;
    }

    .Card{
        height: min-content;

    }
    .Card-open{
        height: min-content;
    }

    // .info_container{
    //     transform: scale(0.5vw);
    //     transform-origin: top left;
    // }
    // .info_container {
    //     display: flex;
    //     flex-direction: column;
    //     width: 100%;
    //     overflow-y: auto;
    // }

}
</style>
