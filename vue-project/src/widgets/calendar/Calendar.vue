<template>
    <div class="MainContainer">
        <div class="UpTitle">
            <div class="flexDate">
                <div class="DateName" @click="CurrentMonth">{{todayDate}} {{ EditedMonth[today.getMonth()] }},</div>
                <div class="DayOfWeek" @click="CurrentMonth">{{todayOfWeek}}</div>
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
            <div class="Calendar-grid-Day opasyty" v-for="day in prevDateGrid" :key="day.id">{{ day }}</div>

            <div class="Calendar-grid-day" v-for="day in dateGrid" :key="day.id"
                :class="{'Calendar-grid-CurrentDate': isCurrentDate(day),
                         'Calendar-grid-ImportantDate': isImportantDate(day)}">
                {{ day }}
                <div v-if="isImportantDate(day)" class="Calendar-grid-Important-right">
                    Д
                    <div class="popover">
                        <div>Дедлайны:</div>
                        <div class="deadline_info" @click="clickDeadline(deadline)" v-for="deadline in getDedlinesForDate(day, selectedMonth, selectedYear)">
                            {{deadline.lab_name + "(" + userStore.getDisciplineById(deadline.discipline_id).name + ")" }}
                        </div>
                    </div>
                </div>
            </div>

            <div class = "Calendar-grid-Day opasyty" v-for="day in postDateGrid" :key="day.id">{{ day }}</div>


        </div>

    </div>

   



</template>

<script setup>
import { computed, onMounted, ref, watch, watchEffect } from "vue"
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import weekOfYear from "dayjs/plugin/weekOfYear";

// import { useConsStore } from "@/entities/consultation/stores";
import { useAllMaterialsStore } from "@/interfaces/student/entities/materials/stores/materials";
import { useCurrentUserStore } from "@/interfaces/auth/entities/user/stores/user";
import { useAppStore } from "@/app/providers/store";


const materialsStore = useAllMaterialsStore();
const userStore = useCurrentUserStore();
const store = useAppStore();

dayjs.extend(weekday);
dayjs.extend(weekOfYear);
let FullDaysOfWeek = ["Понедельник","Вторник","Среда","Четверг","Пятница","Суббота","Воскресенье",]
let DaysOfWeek = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"]
let Month = ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"]
let EditedMonth = ["Января","Февраля","Мара","Апреля","Мая","Июня","Июля","Авгуса","Сентября","Октября","Ноября","Декабря"]
let today = new Date();
let todayDate = today.getDate();
let todayOfWeek = FullDaysOfWeek[((dayjs().day() + 6) % 7)]
let selectedMonth = ref(today.getMonth());
let selectedYear = ref(today.getFullYear());

// const deadlines = ref(materialsStore.setDeadlines())


watchEffect(async () => {
    // isLoading.value = true;
    await materialsStore.setDeadlines(selectedYear.value + "-" + (selectedMonth.value + 1));
    // isLoading.value = false;
});

const formatDateStr = (day, month, year) => `${year}-${month}-${day}`;
const formatDate = (str) => str.split('T')[0];

const isImportantDate = (day) => {
    const formattedDate = formatDateStr(day, selectedMonth.value + 1, selectedYear.value);
    return materialsStore.Deadlines.some(deadline => formatDate(deadline.date) === formattedDate);

};

const getDedlinesForDate = (day, month, year) => {
    const formatDate = year + "-" + (month + 1) + "-" + day
    return materialsStore.Deadlines.filter(dead => dead.date.includes(formatDate))
}

const clickDeadline = (deadline) => {
    store.selectedMenuItem = 2;
    store.selectedDisciplineName = userStore.getDisciplineById(deadline.discipline_id).name;
    store.menuContainerOpen = true;
    materialsStore.selectedDisciplineId = deadline.discipline_id;
    materialsStore.navigateLabId = deadline.lab_id;
}

const isCurrentDate = (date) => date == todayDate && selectedMonth.value == today.getMonth() && selectedYear.value == today.getFullYear();

const prevMonth  = () => {
    selectedMonth.value -=1
    if (selectedMonth.value < 0) {selectedYear.value--; selectedMonth.value = 11;}
}
const nextMonth  = () => {
    selectedMonth.value +=1
    if (selectedMonth.value > 11) {selectedYear.value++; selectedMonth.value = 0;}
}
const CurrentMonth  = () => {
    selectedYear.value = today.getFullYear()
    selectedMonth.value = today.getMonth();
}



function generateDateGrid(selectedMonth, selectedYear) {
    const startDate = dayjs(`${selectedYear}-${selectedMonth}-01`);
    const endDate = startDate.endOf('month');
    const startDayOfWeek = (startDate.day() + 6) % 7; // 0 - воскресенье, 6 - суббота
    const daysInPreviousMonth = startDayOfWeek; 
    const prevDate = []
    const prezDate = []
    const postDate = []
    const previousMonthEnd = startDate.subtract(1, 'month').endOf('month');
    for (let i = daysInPreviousMonth; i > 0; i--) {
        prevDate.push(previousMonthEnd.subtract(i, 'day').format('D'));
    }
    for (let date = startDate; date <= endDate; date = date.add(1, 'day')) {
        prezDate.push(date.format('D'));
    }
    const remainingDays = (42 - prevDate.length - prezDate.length) % 7; // 6 рядов по 7 дней
    for (let i = 0; i < remainingDays; i++) {
        postDate.push(endDate.add(i + 1, 'day').format('D'));
    }
    return [prevDate, prezDate, postDate];
}

let prevDateGrid = ref([])
let dateGrid = ref([])
let postDateGrid = ref([])

function updateDateGrid() {
    const [prev, prez, post] = generateDateGrid(selectedMonth.value + 1, selectedYear.value);
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
        transition: 200ms;
        &:hover{
            
            
            .popover{
                visibility:visible;
                opacity: 1;
                z-index: +1;
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

}
.opasyty{
        opacity: 0.4;
    }



.popover {
        opacity: 0;
        visibility: hidden;
        z-index: +1;
        position: absolute;
        background: #ffffff;
        border: 1px solid #ccc;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        padding: 5px;
        top: 40px;
        left: -8px;
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




    .deadline_info{
        display: flex;
        justify-content: flex-start;
        margin: 5px 0px 5px 0px;
        &:hover {
            color: #074396;
            text-decoration: underline;
        }
    }
}


// .popover::after {
//   content: '';
//   position: absolute;
//   top: 10px; /* Смещение для обводки */
//   left: 50%;
//   transform: translateX(-50%);
//   border-width: 10px;
//   border-style: solid;
//   border-color: transparent transparent #ccc transparent; /* Обводка стрелочки */
//   z-index: +1; /* Помещаем обводку под стрелочку */
// }



</style>
