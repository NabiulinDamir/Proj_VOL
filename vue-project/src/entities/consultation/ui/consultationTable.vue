<template>
    <div id="container_main">
        <div id="control_panel">
            <div id="selector_container">
                <div>Начало:{{ formattedDate(consStore.startDate) }}</div>
                <!-- <input class="date_selector" type="date" v-model="" /> -->
                <div>Конец:{{ formattedDate(consStore.endDate) }}</div>
                <!-- <input class="date_selector" type="date" v-model="" /> -->
            </div>
        </div>
        <loader v-if="isLoading" />
        <div v-if="!isLoading">
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
                        v-for="date in consStore.gapStartAndEndDate"
                    >
                        {{ `${format(date, "MM:dd")}(${DaysOfWeek[format(date, "e")-1]})` }}
                    </div>
                </div>
                <div id="table_container">
                    <div
                        class="cons_content text_container_date"
                        v-for="date in consStore.gapStartAndEndDate"
                    >
                        <div
                            class="cons_container"
                            :style="{
                                width: calculateWidthProcent(cons.start_time, cons.end_time) + '%',
                                left: calculateLeftPosition(cons.start_time) + '%'
                            }"
                            
                            v-for="cons in consStore.getConsForDate(date)"
                            :key="cons.id"
                        >
                        
                            {{
                                formattedDateTime(cons.start_time) +
                                "-" +
                                formattedDateTime(cons.end_time)
                            }}
                            <popover class="popover" :key="date">
                                <template #content>
                                    {{ cons.start_time }}
                                    {{ cons.end_time }}
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
import { ref, onMounted, nextTick } from "vue";
import loader from "@/widgets/loader/loader.vue";
import popover from "@/shared/ui/popover.vue";
import {format, isSameDay, setHours, setMinutes } from 'date-fns';
import { ru } from 'date-fns/locale';

import { useConsStore } from "../stores/consultation";

const consStore = useConsStore();

const timetext = ["08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00",];
const DaysOfWeek = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"];
const isLoading = ref(false);
const dateArray = ref([]);

onMounted(async () => {
    isLoading.value = true;

    // window.addEventListener("resize", optimizedPlaceDiv);

    await consStore.setConsByUser();

    isLoading.value = false;

    nextTick(() => {
        placeDiv() 
    })
        
    



});

//размещение дива
const placeDiv = () => {

    // Находим контейнер по ID
    const tableContainer = document.getElementById('table_container');

    // Находим все элементы с классом cons_content внутри table_container
    const consContents = tableContainer.querySelectorAll('.cons_content');

    // Создаем массив для хранения всех cons_container
    const allConsContainers = Array.from(consContents).flatMap(consContent => 
        Array.from(consContent.querySelectorAll('.cons_container'))
    );

    console.log(allConsContainers)

    // allConsContainers.forEach(consContainer => {
    //     consContainer.style.width = `${calculateWidthProcent(
    //         consInDate.start_time,
    //         consInDate.end_time
    //     )}%`;
    // })

    // // Теперь allConsContainers содержит все cons_container
    // console.log(allConsContainers);

    // dateArray.value.forEach((dates) => {
    //     dates.consultations.forEach((consInDate) => {
    //         const elementParent = document.getElementById("table_container");
    //         const element = document.getElementById("cons" + consInDate.id);
    //         if (element) {
    //             element.style.width = `${calculateWidthProcent(
    //                 consInDate.start_time,
    //                 consInDate.end_time
    //             )}%`;
    //             element.style.left = `${calculateWidthProcent(
    //                 replaceTimeInDate(consInDate.start_time),
    //                 consInDate.start_time,
    //                 elementParent.offsetWidth
    //             )}%`;
    //         }
    //     });
    // });
};

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

//"2025-02-28T11:30:00" >>> "2025-03-03T08:00:00" (нужно для расчёта отступа для дивов слева)
const replaceTimeInDate = (date) => {
    const [datePart] = date.split("T");
    const newDateTime = `${datePart}T${timetext[0]}:00`;
    return newDateTime;
};

//"Wed Mar 05 2025 17:11:01 GMT+0500 (Екатеринбург, стандартное время)" >> "05.03.2025"
const formattedDate = (date) => {
    const newDate = new Date(date);
    const day = String(newDate.getDate()).padStart(2, "0");
    const month = String(newDate.getMonth() + 1).padStart(2, "0");
    const year = newDate.getFullYear();
    return `${day}.${month}.${year}`;
};

//"2025-03-04T12:30:00" >>> "12:30"
const formattedDateTime = (date) => {
    const newDate = new Date(date);
    const hours = String(newDate.getHours()).padStart(2, "0");
    const minutes = String(newDate.getMinutes()).padStart(2, "0");
    //const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}`;
};

//"Fri Feb 28 2025 17:17:34 GMT+0500 (Екатеринбург, стандартное время)" >>> "28.02 (сб)"
const formattedDateForDateContainer = (date) => {
    if (!date) return "Неверная дата";
    const newDate = new Date(date);
    if (isNaN(newDate.getTime())) return "Неверная дата";
    const day = newDate.getDate().toString().padStart(2, "0");
    const month = (newDate.getMonth() + 1).toString().padStart(2, "0");
    const weekDay = DaysOfWeek[newDate.getDay()];
    return `${day}.${month} (${weekDay})`;
};

</script>

<style lang="scss" scoped>
#container_main {
    display: grid;
    // border: 1px solid black;
    margin: 10px 0px 10px 0px;
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
        height: 35px;
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

#selector_container {
    display: grid;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr 2fr;
    gap: 5px;
    place-content: center;
    padding: 5px;
    align-items: center;
}
.cons_content {
    position: relative;
}
.cons_container {
    height: 100%;
    // background-color: color-mix(in srgb, var(--main-white-blue-color), white 60%);
    background-color: #9ab1de;
    // overflow: hidden;
    position: absolute;
    display: flex;
    align-items: center;
    font-size: 0.8vw;
    user-select: none;
    place-content: center;
    border-left: 1px solid var(--main-grey-stroke-color);
    border-right: 1px solid var(--main-grey-stroke-color);
    border-radius: 10px;
    &:hover{
        .popover{
            opacity: 1;
            visibility: visible;

        }
    }
}

.today {
    background-color: var(--main-white-blue-color);
    color: var(--main-white-background-color);
}
</style>
