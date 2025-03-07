<template>
    <div class="MainContainer">
        <div class="UpTitle">
            <div class="flexDate">
                <div class="DateName" @click="CurrentMonth"> {{todayDateObject.getDate()}} {{ EditedMonth[todayDateObject.getMonth()] }},</div>
                <div class="DayOfWeek" @click="CurrentMonth">{{FullDaysOfWeek[((todayDateObject.getDay() + 6) % 7)]}}</div>
            </div>
            <div class="DateSelector-Container">
                <div class="DateSelector">
                    <div class="DateSelector-Skip" @click="prevMonth"><</div>
                    <div class="DateSelector-CurrentDate" @click="CurrentMonth">
                        <div>{{ Month[selectedMonth] }}</div>
                        <div>{{ selectedYear }}</div>
                    </div>
                    <div class="DateSelector-Skip" @click="nextMonth">></div>
                </div>
            </div>
        </div>

        <div class="WeekContainer">
            <!-- {{ deadline }} -->
            <div class="WeekContainer-Day" v-for="day in DaysOfWeek" :key="day">{{ day }}</div>
        </div>

        <div class="Calendar-grid">
            <div class="Calendar-grid-Day opasyty" v-for="day in prevDateGrid" :key="day.id">{{ day.getDate() }}</div>

            <div class="Calendar-grid-day" v-for="dateObject in dateGrid" :key="dateObject.id"
                :class="{'Calendar-grid-CurrentDate'  : isCurrentDate(dateObject),
                         'Calendar-grid-ImportantDate': isImportantDate(dateObject),
                         'Calendar-grid_consSelector' : isConsSelectorDate(dateObject)}">
                {{ dateObject.getDate() }}
                <div v-if="isImportantDate(dateObject, selectedMonth, selectedYear)" class="Calendar-grid-Important-right">Д</div>
                <popover v-if="isImportantDate(dateObject, selectedMonth, selectedYear)" class="popover">
                    <template #content>
                        <div>Дедлайны:</div>
                            <div class="deadline_info" v-if="userStore.disciplines" @click="clickDeadline(deadline)" v-for="deadline in getDedlinesForDate(dateObject)">
                            {{deadline.lab_name + "(" + userStore.getDisciplineById(deadline.discipline_id).name + ")" }}
                        </div>
                    </template>
                </popover>
            </div>

            <div class = "Calendar-grid-Day opasyty" v-for="day in postDateGrid" :key="day.id">{{ day.getDate() }}</div>


        </div>

    </div>

   



</template>

<script setup>
import { computed, onMounted, ref, watch, watchEffect } from "vue"
import popover from "@/shared/ui/popover.vue";
import {format, endOfMonth, getDay, subDays, getDate, addDays} from 'date-fns';

import { useConsStore } from "@/entities/consultation/stores/consultation";
import { useAllMaterialsStore } from "@/entities/materials/stores/materials";
import { useCurrentUserStore } from "@/entities/user/stores/user";
import { useAppStore } from "@/app/providers/store";
import { useRouter } from "vue-router";


const materialsStore = useAllMaterialsStore();
const userStore = useCurrentUserStore();
const store = useAppStore();
const router = useRouter()
const consStore = useConsStore()

consStore.group_id = userStore.user.group.id
const FullDaysOfWeek = ["Понедельник","Вторник","Среда","Четверг","Пятница","Суббота","Воскресенье",]
const DaysOfWeek =     ["пн", "вт", "ср", "чт", "пт", "сб", "вс"]
const Month =          ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"]
const EditedMonth =    ["Января","Февраля","Марта","Апреля","Мая","Июня","Июля","Авгуса","Сентября","Октября","Ноября","Декабря"]


const todayDateObject = new Date();

const selectedMonth = ref(todayDateObject.getMonth());
const selectedYear = ref(todayDateObject.getFullYear());




watchEffect(async () => {
    const formattedDate = format(new Date(selectedYear.value, selectedMonth.value), "yyyy-MM")
    await materialsStore.setDeadlines(formattedDate);
});

const isCurrentDate = (day) => {
    return format(day, "yyyy-MM-dd") === format(todayDateObject, "yyyy-MM-dd")
}


const isImportantDate = (day) => {
    const formattedDate = format(day, "yyyy-MM-dd")
    return materialsStore.deadlineOnThisDate(formattedDate)
};

const isConsSelectorDate = (day) => {
    const formattedDate = format(day, "yyyy-MM-dd")
    return true
}

const getDedlinesForDate = (day) => {
    const formattedDate = format(day, "yyyy-MM-dd")
    return materialsStore.getDedlinesForDate(formattedDate)
}

const clickDeadline = (deadline) => {
    store.selectedMenuItem = 2;
    store.selectedDisciplineName = userStore.getDisciplineById(deadline.discipline_id).name;
    store.menuContainerOpen = true;
    materialsStore.selectedDisciplineId = deadline.discipline_id;
    materialsStore.navigateLabId = deadline.lab_id;
    router.push({ name: 'materials' });
}

const prevMonth  = () => {
    selectedMonth.value -= 1
    if (selectedMonth.value < 0) {selectedYear.value--; selectedMonth.value = 11;}
}
const nextMonth  = () => {
    selectedMonth.value += 1
    if (selectedMonth.value > 11) {selectedYear.value++; selectedMonth.value = 0;}
}
const CurrentMonth  = () => {
    selectedYear.value = todayDateObject.getFullYear()
    selectedMonth.value = todayDateObject.getMonth();
}



function generateDateGrid(selectedMonth, selectedYear) {
    // Создаем начальную дату (первый день выбранного месяца)
    const startDate = new Date(selectedYear, selectedMonth, 1);
    const endDate = endOfMonth(startDate); // Последний день выбранного месяца

    // Определяем день недели для первого дня месяца (0 - воскресенье, 6 - суббота)
    const startDayOfWeek = (getDay(startDate) + 6) % 7; // Преобразуем в 0 - понедельник, 6 - воскресенье

    // Количество дней из предыдущего месяца, которые нужно отобразить
    const daysInPreviousMonth = startDayOfWeek;

    // Массивы для хранения дней
    const prevDate = []; // Дни предыдущего месяца
    const prezDate = []; // Дни текущего месяца
    const postDate = []; // Дни следующего месяца

    // Получаем последний день предыдущего месяца
    const previousMonthEnd = subDays(startDate, 1);

    // Заполняем дни предыдущего месяца
    for (let i = daysInPreviousMonth; i > 0; i--) {
        const date = subDays(previousMonthEnd, i - 1);
        prevDate.push(date);
    }

    // Заполняем дни текущего месяца
    for (let date = startDate; date <= endDate; date = addDays(date, 1)) {
        prezDate.push(date);
    }

    // Количество оставшихся дней для заполнения сетки (6 рядов по 7 дней = 42)
    const remainingDays = (42 - prevDate.length - prezDate.length);

    // Заполняем дни следующего месяца
    for (let i = 0; i < remainingDays; i++) {
        const date = addDays(endDate, i + 1);
        postDate.push(date);
    }

    return [prevDate, prezDate, postDate];
}

// Пример использования
let prevDateGrid = ref([]);
let dateGrid = ref([]);
let postDateGrid = ref([]);

function updateDateGrid() {
    const [prev, prez, post] = generateDateGrid(selectedMonth.value, selectedYear.value);
    prevDateGrid.value = prev;
    dateGrid.value = prez;
    postDateGrid.value = post;
}


watch([selectedMonth, selectedYear], updateDateGrid);
updateDateGrid();


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
.DateSelector-Container{

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
    .DateSelector-Container{
        justify-content: center;
        align-items: center
    }
    
}
.DateSelector{
    
    display: flex;
    flex-direction: row;
    align-items: center;
    &-Skip{
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
    &-CurrentDate{
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
    &-Day{
        font-size: 18px;
        font-weight: bold;
        width: 100%;
        text-align: center;
    }
}

.Calendar-grid{
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    font-size: 19px;
    grid-row-gap: 10px;
    text-align: center;
    place-items: center;
    
    &-day, &-CurrentDate, &-OpasytyDay, &-ImportantDate, &-Important-right, &-Important-left{
        // padding: 5px;
        display: flex;
        align-items: center;
        place-content: center;
        border-radius: 100%;
        width: 27px;
        height: 27px;
        padding: 3px;
        position: relative;
    }
    &-CurrentDate{
        background-color: rgb(0, 0, 0);
        color: rgb(255, 255, 255);
    }
    &-ImportantDate{
        border: 2px solid var(--main-white-blue-color);
        &:hover{
            .popover{
                visibility:visible;
                opacity: 1;
            }
        }
    }
    &-Important-right{
        background-color: var(--main-white-blue-color);
        position: absolute;
        top: -6px;
        left: 20px;
        width: 15px;
        height: 15px;
        color: var(--main-white-color);
        font-size: 10px;
        padding: 0;
        display: flex;
        align-items:center; 
        border-radius: 10px;


    }
    &-Important-left{
        background-color: var(--main-white-blue-color);
        position: absolute;
        top: -6px;
        left: 32px;
        width: 15px;
        height: 15px;
        color: var(--main-white-color);
        font-size: 10px;
        padding: 0;
        display: flex;
        align-items:center; 
        border-radius: 50%;
    }
    &_consSelector{
        background-color: #2b7fa6;
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
