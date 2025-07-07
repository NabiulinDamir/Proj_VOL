<template>
    <div id="consultationTable_container">
        <div id="control_panel">
            <div id="selector_container">
                <myOpButton @click="consStore.setDefaultDates()">сегодня</myOpButton>
                <myOpButton @click="consStore.prevWeek();"><</myOpButton>
                <div>
                    {{ 
                        `${consStore.startDate ? format(consStore.startDate, "dd.MM") : " "} -
                         ${consStore.endDate   ? format(consStore.endDate,   "dd.MM") : " "}`
                    }}
                </div>
                <myOpButton @click="consStore.nextWeek()">></myOpButton>

                <!-- Конец:
                <div class="selected_date_button" @click="consStore.subtractEndtDate()"><</div>
                <div>{{ consStore.endDate ? format(consStore.endDate, "dd.MM.yyyy") : "---"}}</div>
                <div class="selected_date_button" @click="consStore.appendEndtDate()">></div> -->

            </div>
        </div>
        <lineLoader v-model="consStore.uploadRequest"/>
        <div>
            <div id="datetime_time_container" @click="sesDefaultDate">
                <div id="datetime_text" class="text_container">дата</div>
                <div id="time_container">
                    <div class="text_container" v-for="time in timetext">
                        {{ time }}
                    </div>
                </div>
            </div>
            <div id="date_table_container">
                <div id="date_container">
                    <div
                        class="text_container text_container_date"
                        :class="{today : isSameDay(date, new Date())}"
                        v-for="date in consStore.Dates"
                    >
                        {{ `${format(date, "dd.MM")}(${DaysOfWeek[(Number(format(date, "e"))+5)%7]})` }}
                    </div>
                </div>
                <div id="table_container">
                    <div
                        class="cons_content text_container_date"
                        v-for="date in consStore.Dates"
                    >
                        <div
                            class="cons_container"
                            :style="{
                                width: calculateWidthProcent(cons.start_time, cons.end_time) + '%',
                                left: calculateLeftPosition(cons.start_time) + '%'
                            }"
                            
                            v-for="cons in consStore.getConsForDate(date)"
                            :key="cons.id"
                            @click="navigateCons(cons.id)"
                        >
                            <div class="cons_container-top">
                                {{ `${format(cons.start_time, "HH:mm")}-${format(cons.end_time, "HH:mm")}` }}
                            </div>
                            <div class="cons_container-bottom">
                                {{ cons.description }}
                            </div>

                            <popover class="popover" :key="date" :isLoading = 'false'>
                                <template #content>
                                    <div class="info_container">
                                        Группа:<div>{{cons.group_name }}</div>
                                        Предмет:<div>{{cons.subject_name }}</div>
                                        Начало:<div>{{ format(cons.start_time, "HH:mm") }}</div>
                                        Конец:<div>{{ format(cons.end_time, "HH:mm") }}</div>
                                    </div>
                                </template>
                            </popover>
                            
                            <!-- <consultationInfo class="popover" :consultation="cons"/> -->
                        </div>
                        
                    </div>


                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, nextTick, watch } from "vue";
import loader from "@/shared/ui/loader.vue";
import lineLoader from "@/shared/ui/loaderLine.vue";
import myOpButton from "@/shared/ui/myButtonOp.vue";
import popover from "@/shared/ui/popover.vue";
import {format, isSameDay, setHours, setMinutes } from 'date-fns';

import { useConsStore } from "../stores/consultation";

const consStore = useConsStore();

const timetext = ["08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00",];
const DaysOfWeek = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"];
const isLoading = ref(false);



onMounted(async () => {
    isLoading.value = true;
    await consStore.setConsByUser();
    isLoading.value = false;
});


const calculateWidthProcent = (start_time, end_time) => {
    //посчет длительности всего дива в минутах
    const allMinutes = timetext.length * 60;

    //хз что это, но он кароче считает сколько процентов от родителя занимает див
    const start = new Date(start_time);
    const end = new Date(end_time);
    const relativityWidth = (Math.floor((end - start) / (1000 * 60)) * 100 / allMinutes) ;

    return relativityWidth;
};

const calculateLeftPosition = (start_time) => {
    const allMinutes = timetext.length * 60;

    const dateAt8AM = setHours(setMinutes(start_time, 0), 8);//нужно 8 как то заменить на timetext[0]
    const startDiv = new Date(start_time);

    const relativityLeft = (Math.floor((startDiv - dateAt8AM) / (1000 * 60)) * 100 / allMinutes) ;
    return relativityLeft;
}

watch(
  () => consStore.navigateCons,
  (newValue) => {
    if (newValue?.id) {  // Проверяем, что id существует
      navigateCons(newValue.id);
    }
  },
  { deep: true }  // Если navigateCons — объект с вложенными полями
);

const navigateCons = (consId) => {
    const element = document.getElementById('cons' + consId);
    if (element) {
        const elementHeight = element.offsetHeight;

        if (elementHeight <= 70) {
            element.children[0].children[0].click();
        }

        element.classList.add("hover-effect");
        
        const elementPosition =
            element.getBoundingClientRect().top + window.scrollY;
        const offset = 200;
        const menuContainer = document.getElementById('CenterContainer');
        setTimeout(() => {
            menuContainer.scrollTo({
            top: elementPosition - offset,
            behavior: "smooth",
        });
        }, 400);
        setTimeout(() => {
            element.classList.remove("hover-effect");
        }, 1000);
    }
}
</script>

<style lang="scss" scoped>
#consultationTable_container {
    display: grid;
    // border: 1px solid black;

    border-radius: 12px;
    container-type: inline-size;
    background-color: var(--main-white-background-color);

    -webkit-box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
    -moz-box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
    box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
}

#control_panel {
    display: flex;
}

#datetime_time_container {
    height: 30px;
    border-top: 1px solid var(--main-grey-stroke-color);
    border-bottom: 1px solid var(--main-grey-stroke-color);
    display: grid;
    grid-template-columns: 1fr 7fr;
}

#time_container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
    & > div:not(:last-child) {
        border-right: 1px solid var(--main-grey-stroke-color);
    }
}

.text_container {
    display: flex;
    align-items: center;
    place-content: center;
    font-size: 1vw;
    padding: 4px 0px 4px 0px;
    overflow: hidden;
    &_date {
        height: 45px;//было 35

    }
}

@media (max-width: 890px) {
    .text_container {
        font-size: 1.5vw;
    }
    .cons_container {
        font-size: 1vw !important;
    }
}
@media (min-width: 1441px) {
    .text_container {
        font-size: 14px;
    }
    .cons_container {
        font-size: 12px !important;
    }
}

#date_table_container {
    display: grid;
    grid-template-columns: 1fr 7fr;
}

#date_container {
    display: grid;
    border-right: 1px solid var(--main-grey-stroke-color);
    & > div:not(:last-child) {
        border-bottom: 1px solid var(--main-grey-stroke-color);
    }
}

#datetime_text {
    border-right: 1px solid var(--main-grey-stroke-color);
}

#table_container {
    display: grid;
    & > div:not(:last-child) {
        border-bottom: 1px solid var(--main-grey-stroke-color);
    }
}

.date_selector {
    background-color: #ffffff00;
    border: 1px solid var(--main-grey-stroke-color);
    padding: 2px;
    border-radius: 5px;
}

// #selector_container {
//     display: grid;
//     grid-template-rows: 1fr 1fr;
//     grid-template-columns: min-content min-content min-content min-content;
//     column-gap: 5px;
//     row-gap: 5px;

//     place-content: center;
//     padding: 5px;
//     align-items: center;
// }
#selector_container {
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 7px;
}

.cons_content {
    position: relative;
    
}
.cons_container {
    height: 100%;
    // background-color: color-mix(in srgb, var(--main-white-blue-color), white 60%);
    background-color: #9ab1de;
    overflow: hidden;
    position: absolute;
    display: grid;
    grid-template-rows: 30% 70%;
    user-select: none;
    border-left: 1px solid var(--main-grey-stroke-color);
    border-right: 1px solid var(--main-grey-stroke-color);
    border-radius: 10px;
    &:hover{
        .popover{
            opacity: 1;
            visibility: visible;

        }
        background-color: #88a1d3;
    }
    &-top{
        display: flex;
        align-items: center;
        place-content: center;
        width: 100%;
        font-size: 0.8vw;
        background-color: #88a1d3;
    }
    &-bottom{
        display: flex;
        padding: 3px;
        width: 100%;
        font-size: 0.5vw;
    }
}

.today {
    background-color: var(--main-white-blue-color);
    color: var(--main-white-background-color);
}

.info_container{
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 5px;
    row-gap: 5px;

}

// .selected_date_button{
//     padding: 4px;
//     border:  1px solid var(--main-grey-stroke-color);
//     border-radius: 5px;
//     user-select: none;
//     cursor: pointer;
//     transition: 200ms;
//     &:hover{
//         background-color: var(--main-white-blue-color);
//         color: var(--main-white-background-color);
//     }
// }

</style>
