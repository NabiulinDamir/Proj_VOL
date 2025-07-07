<template>
    <div id="loader_container" v-if="isLoading"><loader /></div>
    <div id="MainContainerMenu" v-if="!isLoading">
        <div>{{message}}</div>

        <div class="line">
            <div class="line_start"></div>
            <div class="line_text">{{ consStore.consultations?.length ? `Консультации` : "Нет консультаций"}}</div>
            <div class="line_end"></div>
        </div>
        <div class="user_card_container" v-for="cons in sortedCons" >
            <consultationsCard :cons="cons" :id="'cons' + cons.id"/>
            <div class="user_options">
                <ChangeGroup v-if="userRole === 'Teacher'" :user="cons">
                    <img class="delete_img" src="@\ico\user\icons8-edit-24.png" alt="">
                </ChangeGroup>
                <Deleteuser v-if="userRole === 'Teacher'" :user="cons">
                    <img class="delete_img" src="@\ico\user\icons8-delete-60.png" alt="">
                </Deleteuser>

            </div>
        </div>
        
    </div>
</template>

<script setup>
import { watchEffect, computed, ref, watch, nextTick, onMounted   } from "vue";
import {format, isSameDay, setHours, setMinutes, parseISO, compareAsc} from 'date-fns';
import loader from "@/shared/ui/loader.vue";
import { Deleteuser } from "@/features";
import { ChangeGroup } from "@/features";
import { useConsStore } from "../stores/consultation";
import consultationsCard from "./consultationsCard.vue";
const consStore = useConsStore()
// import { useStudentGroupStore } from "../stores/studentGroupStore ";

const props = defineProps({
    userRole: {
        type: String,
    },
});

const message = ""
const isLoading = ref(false);


const selectedGroupName = computed(() => {
    // if(props.userRole === "Teacher") return groupStore.getSelectedGroupName ?? "--"
    // else if(props.userRole === "Student") return groupStore.myGroup.name ?? "--"
})

const sortedCons = ref([]);

watch(
  () => [consStore.startDate, consStore.endDate],
  ([newStartDate, newEndDate]) => {
    if (!newStartDate || !newEndDate) {
      sortedCons.value = [];
      return;
    }

    sortedCons.value = [...consStore.consultations]
      .filter(cons => {
        const startTime = new Date(cons.start_time);
        const startDate = new Date(newStartDate);
        const endDate = new Date(newEndDate);
        
        return startTime >= startDate && startTime <= endDate;
      })
      .sort((a, b) => new Date(a.start_time) - new Date(b.start_time));
  },
  { immediate: true } 
);


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
