<template>
    <div id="loader_container" v-if="isLoading"><loader /></div>
    <div id="MainContainerMenu" v-if="!isLoading">
        <div>{{message}}</div>

        <div class="line">
            <div class="line_start"></div>
            <div class="line_text">{{ groupStore.allUsers?.length ? `Пользователи ${selectedGroupName}` : "Нет пользователей"}}</div>
            <div class="line_end"></div>
        </div>
        <div class="user_card_container" v-for="user in groupStore.allUsers">
            <userCardMini class="user_card" :user="user" :key=user.id />
            <div class="user_options">
                <ChangeGroup v-if="groupStore.selectedGroupId != 'without' && userRole === 'Teacher' && appStore.selectedMenuItem === 4" :user="user">
                    <img class="delete_img" src="@\ico\user\icons8-change-48.png" alt="">
                </ChangeGroup>
                <Deleteuser v-if="groupStore.selectedGroupId != 'without' && userRole === 'Teacher'" 
                    :user="user">
                    <img class="delete_img" src="@\ico\user\icons8-delete-60.png" alt="">
                </Deleteuser>
                <Adduseringroup v-if="groupStore.selectedGroupId === 'without' && userRole === 'Teacher'" :user="user">
                    <img class="delete_img" src="@\ico\user\icons8-batch-assign-60.png" alt="">
                </Adduseringroup>

            </div>
        </div>
        
    </div>
</template>

<script setup>
import { watchEffect, computed, ref, watch, nextTick, onMounted  } from "vue";
import loader from "@/shared/ui/loader.vue";
import userCardMini from "./userCardMini.vue";
import { Deleteuser } from "@/features";
import { ChangeGroup } from "@/features";
import { Adduseringroup } from "@/features";
import { useAppStore } from "@/app/providers/store";
import { useGroupStore } from "../stores/groupStore";
// import { useStudentGroupStore } from "../stores/studentGroupStore ";
const appStore = useAppStore();
const props = defineProps({
    userRole: {
        type: String,
    },
});

const groupStore = useGroupStore()

// const groupStore = props.userRole === "Teacher" 
//   ? useTeacherGroupStore() 
//   : useStudentGroupStore();

const message = ""
const isLoading = ref(false);

watch(
    () => groupStore.selectedGroupId,
    async () => {
        isLoading.value = true;
        if(props.userRole === "Teacher")await groupStore.setTeacherUsers();
        else if(props.userRole === "Student")await groupStore.setStudentUsers();
        isLoading.value = false;
    },
    { immediate: true }
);

const selectedGroupName = computed(() => {
    if(props.userRole === "Teacher") return groupStore.getSelectedGroupName ?? "--"
    else if(props.userRole === "Student") return groupStore.myGroup.name ?? "--"
})

// const message = computed(() => {
//     if(props.userRole === "Teacher") return !groupStore.allUsers.length ? "нет пользователей в группе" : ""
//     else if(props.userRole === "Student") return !groupStore.myGroup ? "в настоящее время вы не добавленны ни в одну группу :(" : ""
// })

// onMounted(async () => {
//     isLoading.value = true;
//     await userStore.setUsersByGroup();
//     isLoading.value = false;
// });





</script>

<style lang="scss">
#MainContainerMenu {
    display: grid;
    grid-template-columns: 100%;
    gap: 3px;
    align-items: center;
    place-content: center;
}

// .user_card {
//     margin-top: 10px;
// }

.line + .user_card {
    margin-top: 0; 
}

.line {
    display: flex;
    flex-direction: row;
    align-items: center;
    user-select: none;
    height: 25px;
    &_text {
        font-size: 15px;
        font-family: monospace;
        margin: 0px 5px 0px 5px;
        white-space: nowrap;
    }
    &_start {
        height: 1px;
        background-color: #9292929a;
        border: 0px;
        width: 10%;
    }
    &_end {
        height: 1px;
        background-color: #9292929a;
        border: 0px;
        width: 100%;
    }
}

.line {
    display: flex;
    flex-direction: row;
    align-items: center;
    user-select: none;
    height: 25px;
    &_text {
        font-size: 15px;
        font-family: monospace;
        margin: 0px 5px 0px 5px;
        white-space: nowrap;
    }
    &_start {
        height: 1px;
        background-color: #9292929a;
        border: 0px;
        width: 10%;
    }
    &_end {
        height: 1px;
        background-color: #9292929a;
        border: 0px;
        width: 100%;
    }
}

#loader_container {
    padding: 10px;
}

.user_card_container{
    margin-top: 10px;
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
}
.delete_img{
    height: 20px;
}
.user_options {
  display: flex;
  flex-direction: column;
  gap: 5px;
  height: 100%; 
  user-select: none;
}
</style>
