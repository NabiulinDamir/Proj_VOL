<template>
    <div class="createGroupCard_container">
        Описание
        <myTextArea placeholder="Консультация перед экзаменом"/>

        Предмет
        <!-- <MySelectorSingle
            :all-elements="materialStore.allDiscipline"
            v-model="selectedDiscipline"
            :toggle-element="materialStore.selectedDiscipline"
            @change="$emit('changeDiscipline', selectedDiscipline.id)"
        /> -->

        <MySelectorSingle
            :all-elements="allDisciplines"
        />
        Группы
        <mySelector
            :all-elements="allGroups"
        />

        Дата
        <myInputDate/>
        <div class="time_line">
            <r>Время начала</r>
            <r>Время конца</r>
            <myInputTime/>

            <myInputTime/>
        </div>
        <div class="center_position">
            <myButton @click="createGroup()" v-if="!isLoading"
                >Сохранить</myButton
            >
            <loader v-if="isLoading" />
        </div>
    </div>
</template>

<script setup>
import { watchEffect, ref, onMounted } from "vue";

import myButton from "@/shared/ui/myButton.vue";
import loader from "@/shared/ui/loader.vue";
import myLabel from "@/shared/ui/myInputText.vue";
import myTextArea from "@/shared/ui/myInputTextArea.vue";
import myInputDate from "@/shared/ui/myInputDate.vue";
import MySelectorSingle from "@/shared/ui/mySelectorSingle.vue";
import mySelector from "@/shared/ui/mySelector.vue";
import myInputTime from "@/shared/ui/myInputTime.vue";
import { useConsStore } from "../stores/consultation";

const consStore = useConsStore();


const allGroups = ref([])
const allDisciplines = ref([])

onMounted(async() => {
    allGroups.value = await consStore.allGroups
    allDisciplines.value = await consStore.allDisciplines
})


const isLoading = ref(false);
const newName = ref("");
const newDdescription = ref("");
const selectedDiscipline = ref()

const createGroup = async () => {
    isLoading.value = true;
    // await groupStore.createGroup(newName.value)
    isLoading.value = false;
    emit("close");
};
const emit = defineEmits(["close",'changeDiscipline']);
</script>

<style lang="scss" scoped>
.createGroupCard_container {
    width: 100%;
    min-height: 50px;
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.label-input {
    font-size: 16px;
    width: 100%;
    min-height: 33px; /* Начальная высота */
    max-height: 100px; /* Максимальная высота */

    border-radius: 7px;
    border: 0px;
    padding: 5px;
    background-color: var(--main-grey-color);
    resize: none; /* Запрещаем ручное изменение размера */
    word-wrap: break-word;
    white-space: pre-wrap;
    overflow-y: hidden; /* Скрываем скролл (он будет появляться только при max-height) */

    &::placeholder {
        color: rgba(0, 0, 0, 0.3);
    }
}

.center_position {
    display: flex;
    align-items: center;
    place-content: center;
}
.time_line{
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    column-gap: 10px;
}
</style>
