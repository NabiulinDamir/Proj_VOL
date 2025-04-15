<template>
    <div class="MainContainer">
        <div class="UpTitle">
            <div class="flexDate">
                <div class="DateName" @click="CurrentMonth"> {{todayDateObject.getDate()}} {{ EditedMonth[todayDateObject.getMonth()] }},</div>
                <div class="DayOfWeek" @click="CurrentMonth">{{FullDaysOfWeek[((todayDateObject.getDay() + 6) % 7)]}}</div>
            </div>
            <div class="DateSelector_Container">
                <div class="DateSelector">
                    <div class="DateSelector_Skip" @click="prevMonth"><</div>
                    <div class="DateSelector_CurrentDate" @click="CurrentMonth">
                        <div>{{ Month[selectedMonth] }}</div>
                        <div>{{ selectedYear }}</div>
                    </div>
                    <div class="DateSelector_Skip" @click="nextMonth">></div>
                </div>
            </div>
        </div>

        <div class="WeekContainer">
            <!-- {{ deadline }} -->
            <div class="WeekContainer_Day" v-for="day in DaysOfWeek" :key="day">{{ day }}</div>
        </div>

        <!-- <lineLoader v-model="consStore.uploadRequest"/> -->

        <div class="Calendar_grid" ><!-- @mouseleave="mouseUp()" @mouseup= "mouseUp()" -->
            <div class="Calendar_grid_container" v-for="dateObject in dateGrid" :key="dateObject.id"
                :class="gridContainerClasses(dateObject)">
                <!-- @mousedown="mouseDown(dateObject)"
                @mouseenter="mouseHover(dateObject)" -->
                <div class="Calendar_grid_day" :class="gridDayClasses(dateObject)">

                    {{ dateObject.getDate() }}
                    <div class="Calendar_grid_Important">
                        <div v-if="materialsStore.deadlineOnThisDate(dateObject)" class="Calendar_grid_Important_indicator">Д</div>
                        <div v-if="consStore.getIsConsDate(dateObject)" class="Calendar_grid_Important_indicator">К</div>
                    </div>
                    <popover v-if="(materialsStore.deadlineOnThisDate(dateObject) || consStore.getIsConsDate(dateObject)) && !isNotThisMonth(dateObject)" 
                             class="popover">
                        <template #content>
                            <div v-if="materialsStore.deadlineOnThisDate(dateObject)">Дедлайны:</div>
                                <div  class="deadline_info" @click="clickDeadline(deadline)" v-for="deadline in getDedlinesForDate(dateObject)">
                                {{ `${deadline.lab_name}(${disciplinesStore.getDisciplineById(deadline.discipline_id)?.name ?? "-"})`}}
                            </div>
                            <div v-if="consStore.getIsConsDate(dateObject)">Консультации:</div>
                                <div  class="deadline_info" @click="clickCons(cons)" v-for="cons in consStore.getConsForDate(dateObject)">
                                {{ `${format(cons.start_time, "HH:mm")}-${format(cons.end_time, "HH:mm")}(${cons.subject_name})`}}
                            </div>
                        </template>
                    </popover>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted, ref, watch, watchEffect } from "vue"
import popover from "@/shared/ui/popover.vue";
import {format, endOfMonth, getDay, subDays,startOfDay, getDate, isBefore, addDays, isSameMonth, subMonths, addMonths, getMonth, isSameDay} from 'date-fns';

import { useConsStore } from "@/entities/consultation/stores/consultation";
import { useAllMaterialsStore } from "@/entities/materials/stores/materials";
import { useCurrentUserStore } from "@/entities/user/stores/user";
import { useAppStore } from "@/app/providers/store";
import { useRouter } from "vue-router";
import { useAllDisciplinesStore } from "@/entities/disciplines/stores/discipline.js"

const materialsStore = useAllMaterialsStore();
const userStore = useCurrentUserStore();
const store = useAppStore();
const router = useRouter()
const consStore = useConsStore()
const disciplinesStore = useAllDisciplinesStore()

consStore.group_id = userStore.user.group ? userStore.user.group.id : null

const FullDaysOfWeek = ["Понедельник","Вторник","Среда","Четверг","Пятница","Суббота","Воскресенье",]
const DaysOfWeek =     ["пн", "вт", "ср", "чт", "пт", "сб", "вс"]
const Month =          ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"]
const EditedMonth =    ["Января","Февраля","Марта","Апреля","Мая","Июня","Июля","Авгуса","Сентября","Октября","Ноября","Декабря"]

let dateGrid = ref([]);

const todayDateObject = new Date();

const selectedMonth = ref(todayDateObject.getMonth());
const selectedYear = ref(todayDateObject.getFullYear());




watchEffect(async () => {
    const formattedDate = format(new Date(selectedYear.value, selectedMonth.value), "yyyy-MM")
    await materialsStore.setDeadlines(formattedDate);
    await consStore.setConsByUser();
    // await consStore.setConsByUser();
});


//////////////////////////////////////////////////////////////////////////////////////////////классы для стилей

const gridContainerClasses = computed(() => (dateObject) => ({
//   'Calendar_grid_cons_gap'            : isConsGapDate(dateObject),
//   'Calendar_grid_cons_selector_start' : isConsSelectorStart(dateObject) && consStore.Dates.length > 1,
//   'Calendar_grid_cons_selector_end'   : isConsSelectorEnd(dateObject) && consStore.Dates.length > 1,
  'opasyty'                           : isNotThisMonth(dateObject),
}));
 
const gridDayClasses = computed(() => (dateObject) => ({
  'Calendar_grid_CurrentDate'   : isCurrentDate(dateObject),
  'Calendar_grid_ImportantDate' : materialsStore.deadlineOnThisDate(dateObject) || consStore.getIsConsDate(dateObject),
//   'Calendar_grid_cons_edge'     : (isConsSelectorEnd(dateObject) || isConsSelectorStart(dateObject)) && !isCurrentDate(dateObject),
//   'Calendar_grid_cons_selector_drag'     : isdraggingDate(dateObject)
}));

//////////////////////////////////////////////////////////////////////////////////////////////определения для стилей

const isCurrentDate = (day) => {
    return isSameDay(day, todayDateObject)
}

// const isConsGapDate = (day) => {
//     return store.selectedMenuItem == 3 && consStore.getIncludesDateInDates(day)
// }

const isNotThisMonth = (day) => {
    return (day.getMonth() !== selectedMonth.value)
}

const isConsSelectorStart = (day) => {
    return store.selectedMenuItem == 3 && consStore.getIsStartDate(day)
}

const isConsSelectorEnd = (day) => {
    return store.selectedMenuItem == 3 && consStore.getIsEndDate(day)
}

// const isdraggingDate = (day) => {
//     return isSameDay(day, draggingDate.value)
// }

//////////////////////////////////////////////////////////////////////////////////////////////смена временных промежутков
// const draggingDate = ref(null);
// const isStartDraggingDate = ref(false);
// const isEndDraggingDate = ref(false);


// const mouseDown = (dateObject) => {
//     isStartDraggingDate.value = isConsSelectorStart(dateObject); 
//     isEndDraggingDate.value = isConsSelectorEnd(dateObject); 
//     if(isStartDraggingDate.value || isEndDraggingDate.value){draggingDate.value = dateObject}
// };

// const mouseHover = (dateObject) => {
//     if(isStartDraggingDate.value){
//         consStore.setCalendarStartDate(dateObject)
//         draggingDate.value = dateObject;
//         mouseDown(dateObject)
//     }
//     else if(isEndDraggingDate.value){
//         consStore.setCalendarEndDate(dateObject)
//         draggingDate.value = dateObject;
//         mouseDown(dateObject)
//     }
// };

// const mouseUp = () => {
//     draggingDate.value = null;
//     if(isStartDraggingDate.value || isEndDraggingDate.value)consStore.setConsByUser()
//     isStartDraggingDate.value = false;
//     isEndDraggingDate.value = false;
// };

//////////////////////////////////////////////////////////////////////////////////////////////методы для дедлайнов

const getDedlinesForDate = (day) => {
    const formattedDate = format(day, "yyyy-MM-dd")
    return materialsStore.getDedlinesForDate(formattedDate)
}

const clickDeadline = (deadline) => {
    store.selectedMenuItem = 2;
    // store.selectedDisciplineName = userStore.getDisciplineById(deadline.discipline_id).name;
    store.menuContainerOpen = true;
    disciplinesStore.selectedDiscipline = disciplinesStore.getDisciplineById(deadline.discipline_id);
    materialsStore.navigateLabId = deadline.lab_id;
    router.push({ name: 'materials' });
}

const clickCons = (cons) => {
    store.selectedMenuItem = 3;
    store.menuContainerOpen = false;
    consStore.setScopeDates(cons.start_time)
    router.push({ name: 'consultations' });
}
//////////////////////////////////////////////////////////////////////////////////////////////методы смены месяца

const prevMonth  = () => {
    console.log(selectedMonth.value)
    selectedMonth.value -= 1
    if (selectedMonth.value < 0) {selectedYear.value--; selectedMonth.value = 11;}
}
const nextMonth  = () => {
    console.log(selectedMonth.value)
    selectedMonth.value += 1
    if (selectedMonth.value > 11) {selectedYear.value++; selectedMonth.value = 0;}
}
const CurrentMonth  = () => {
    selectedYear.value = todayDateObject.getFullYear()
    selectedMonth.value = todayDateObject.getMonth();
}

//////////////////////////////////////////////////////////////////////////////////////////////генерация календаря

function generateDateGrid(selectedMonth, selectedYear) {
  const startDate = new Date(selectedYear, selectedMonth, 1); // Первый день выбранного месяца
  const endDate = endOfMonth(startDate); // Последний день выбранного месяца

  const prezDate = []; // Массив для хранения всех дней календаря

  // Добавляем дни предыдущего месяца
  const daysInPreviousMonth = (getDay(startDate) + 6) % 7; // Количество дней из предыдущего месяца
  for (let i = daysInPreviousMonth; i > 0; i--) {
    prezDate.push(subDays(startDate, i));
  }

  // Добавляем дни текущего месяца
  for (let date = startDate; date <= endDate; date = addDays(date, 1)) {
    prezDate.push(date);
  }

  // Добавляем дни следующего месяца
  const remainingDays = 42 - prezDate.length; // Оставшиеся дни для заполнения сетки
  for (let i = 1; i <= remainingDays; i++) {
    prezDate.push(addDays(endDate, i));
  }

  return prezDate;
}

function updateDateGrid() {
    dateGrid.value = generateDateGrid(selectedMonth.value, selectedYear.value);;
}

watch([selectedMonth, selectedYear], updateDateGrid);
updateDateGrid();
//////////////////////////////////////////////////////////////////////////////////////////////

</script>

<style lang="scss" scoped>
.MainContainer{
    user-select: none;
    height: 400px;
    // background-color: rgb(232, 232, 232);
}
.UpTitle{
    padding-left: 3%;
    padding-right: 3%;
    // height: 50px;
    // background-color: aqua;
    display: flex;
    // flex-direction: row;
}
.DateName{
    // font-size: 1.3vw;
    white-space: nowrap;
    font-size: 20px;
    place-content: center;
    padding: 5px;
    font-weight: bold;
}
.DayOfWeek{
    font-size: 20px;
    place-content: center;
    padding: 5px;
    
}
.DateSelector_Container{
    display: flex;
    flex-direction: row;
    flex-grow: 1;
    justify-content: flex-end;
    
}
.flexDate{
    display: flex;
}
@media (max-width: 1800px) {
    .flexDate{
        flex-direction: column;
    }
    .DateName{
        padding: 0;
    }
    .DayOfWeek{
        padding: 0;
    }

}
@media (max-width: 1220px) {
    .flexDate{
        display: none;
    }
    .DateSelector_Container{
        justify-content: center;
        align-items: center
    }
    
}
.DateSelector{
    
    display: flex;
    flex-direction: row;
    align-items: center;
    &_Skip{
        padding: 5px;
        border-radius: 15px;
        font-weight: bold;
        text-align: center;
        // margin: 5px;
        font-size: 25px;
        transition: 200ms;
        &:hover{
            background-color: var(--main-white-blue-color)
        }
    }
    &_CurrentDate{
        padding-left: 4px;
        padding-right: 4px;
        width: 85px;
        // width: 5vw;
        text-align: center;
        // font-size: 1vw;
        display: flex;
        flex-direction: column;
    }
}


.WeekContainer{
    // height: 30px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-bottom: 7px;
    &_Day{
        font-size: 18px;
        font-weight: bold;
        width: 100%;
        text-align: center;
    }
}

.Calendar_grid{
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    font-size: 19px;
    grid-row-gap: 6px;
    // text-align: center;


    &_container{
        width: 100%;
        place-items: center;
    }
    &_cons{
        &_gap{
            background-color: #9ab1de;
        }
        &_selector{
            &_start{
                background: linear-gradient(to left, #9ab1de 51%, transparent 30%);
                border-radius: 100px 0px 0px 100px;
            }
            &_end{
                background: linear-gradient(to right, #9ab1de 51%, transparent 30%);
                border-radius: 0px 100px 100px 0px; 
            }
            &_drag{
                // transition: 200ms;
                transform: scale(1.3);
                & > * {
                    display: none;
                }
            }

        }
    }



    &_day{
        display: flex;
        align-items: center;
        place-content: center;
        border-radius: 100%;
        width: 30px;
        height: 30px;
        padding: 3px;
        position: relative;

    }

    &_ImportantDate{
        border: 2px solid var(--main-white-blue-color);
        &:hover{
            .popover{
                visibility:visible;
                opacity: 1;
            }
        }
    }
    &_Important{
        display: flex;
        position: absolute;
        top: -6px;
        left: 20px;
        &_indicator{
            background-color: var(--main-white-blue-color);
            width: 15px;
            height: 15px;
            border-radius: 10px;
            font-size: 10px;
            color: var(--main-white-color);
            align-items:center; 
            justify-content: center;
            display: flex;
            &:nth-child(2) {
            margin-left: -4px; // Сдвиньте влево
        }
        }
    }

    &_CurrentDate{
        background-color: rgb(0, 0, 0);
        color: rgb(255, 255, 255);
    }

    &_cons_edge{
        background-color: #3e659b;
        // border: 2px solid #074396;
    }
}
.opasyty{
    opacity: 0.4;
}


.deadline_info{
    display: flex;
    justify-content: flex-start;
    margin: 5px 0px 5px 0px;
    &:hover {
        color: #074396;
        text-decoration: underline;
    }
}



</style>
