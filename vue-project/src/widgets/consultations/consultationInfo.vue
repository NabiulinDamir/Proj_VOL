<template>
    <div class="main_container">
        <loader v-if="isLoading"/>
        <div class="info_container" v-if="!isLoading">
            Группа:<div>{{consultation.group_name }}</div>
            Предмет:<div>{{consultation.subject_name }}</div>
            Начало:<div>{{consultation.start_time }}</div>
            Конец:<div>{{consultation.end_time }}</div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import loader from '../loader/loader.vue';
import ConsultationTable from '@/entities/consultation/ui/consultationTable.vue';

const isLoading = ref(false)



const props = defineProps({
    consultation: {type: Object, required: true}
});

onMounted(async () => {
    isLoading.value = true

    isLoading.value = false
})
</script>

<style lang="scss" scoped>

// #main_container{
//     position: absolute;
//     top: 50px;
//     z-index: +1;
// }

.main_container {
        display: none;
        opacity: 0;
        visibility: hidden;
        z-index: +1;
        position: absolute;
        background: #ffffff;
        border: 1px solid #ccc;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        padding: 5px;
        top: 125%;
        left: 50%;
        color: #000000;
        font-size: 15px;
        transform: translateX(-50%);
        white-space: nowrap;
        transition: opacity 0.3s ease, visibility 0.3s ease;
    &::before{
        content: '';
        position: absolute;
        top: -20px; /* Расположение стрелочки */
        left: 50%;
        transform: translateX(-50%);
        border-width: 10px;
        border-style: solid;
        border-color: transparent transparent #ffffff transparent; /* Стрелочка вверх */
        z-index: 1; /* Убедитесь, что стрелочка выше .popover */
    }


    .info_container{
        display: grid;
        grid-template-columns: 1fr 1fr;
        column-gap: 10px;
        row-gap: 5px;
    }

    .deadline_info{
        display: flex;
        // justify-content: flex-start;
        // margin: 5px 0px 5px 0px;
        &:hover {
            color: #074396;
            text-decoration: underline;
        }
    }
}
</style>