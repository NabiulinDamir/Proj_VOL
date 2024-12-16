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
            <div class = "Calendar-grid-OpasytyDay" v-for="date in prevDateGrid" :key="date.id">
                {{ date }}
            </div>
            <div class="Calendar-grid-day" v-for="date in dateGrid" :key="date.id" 
                :class="{'Calendar-grid-CurrentDate' : isCurrentDate(date),
                'Calendar-grid-ImportantDate' : isImportantDate(date)}">
                
                {{ date }}
            </div>
            <div class = "Calendar-grid-OpasytyDay" v-for="date in postDateGrid" :key="date.id">
                {{ date }}
            </div>
        </div>

    </div>
</template>

<script setup>
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import weekOfYear from "dayjs/plugin/weekOfYear";
import { computed, onMounted, ref, watch } from "vue"
import { useConsStore } from "@/entities/consultation/stores";
import { useAllMaterialsStore } from "@/entities/materials/stores/materials";

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

const consStore = useConsStore()
const materialStore = useAllMaterialsStore()

const labs = computed(() => materialStore.Labs);

const deadline = computed(() => {
  if (labs.value.length > 0) {
    return materialStore.getLabDeadlineById(labs.value[0].id);
  }
  return null;
});

const deadlines = computed(() => {
    return materialStore.Labs
        .map(lab => materialStore.getLabDeadlineById(lab.id))
        .filter(deadline => deadline !== null);
});

const formatDateStr = (day, month, year) => `${year}-${month}-${day}`;
const formatDate = (str) => str.split('T')[0];

const isCurrentDate = (date) => date == todayDate && selectedMonth.value == today.getMonth() && selectedYear.value == today.getFullYear();
const isImportantDate = (date) => {
    const formattedDate = formatDateStr(date, selectedMonth.value, selectedYear.value);
    return deadlines.value.some(deadline => formatDate(deadline) === formattedDate);
};




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
    
    // Устанавливаем первый день выбранного месяца
    const startDate = dayjs(`${selectedYear}-${selectedMonth}-01`);

    // Найдем последний день текущего месяца
    const endDate = startDate.endOf('month');

    // Определяем, какой день недели 1-го числа
    const startDayOfWeek = (startDate.day() + 6) % 7; // 0 - воскресенье, 6 - суббота

    // Количество дней в предыдущем месяце, которые нужны для заполнения
    const daysInPreviousMonth = startDayOfWeek; 

    // Создаем массив для хранения всех дат в сетке
    const prevDate = []
    const prezDate = []
    const postDate = []

    // Добавляем дни из предыдущего месяца
    const previousMonthEnd = startDate.subtract(1, 'month').endOf('month');
    for (let i = daysInPreviousMonth; i > 0; i--) {
        prevDate.push(previousMonthEnd.subtract(i, 'day').format('D'));
    }

    // Заполняем текущий месяц
    for (let date = startDate; date <= endDate; date = date.add(1, 'day')) {
        prezDate.push(date.format('D'));
    }

    // Добавляем дни из следующего месяца
    const remainingDays = (42 - prevDate.length - prezDate.length) % 7; // 6 рядов по 7 дней
    for (let i = 0; i < remainingDays; i++) {
        postDate.push(endDate.add(i + 1, 'day').format('D'));
    }

    return [prevDate, prezDate, postDate];
}

// Пример использования функции
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
    height: 50px;
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
@media (max-width: 1400px) {
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
@media (max-width: 1040px) {
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
    
    &-day, &-CurrentDate, &-OpasytyDay, &-ImportantDate{
        // padding: 5px;
        display: flex;
        align-items: center;
        place-content: center;
        border-radius: 100%;
        // width: 27px;
        // height: 27px;
        padding: 3px;
    }
    &-CurrentDate{
        background-color: rgb(0, 0, 0);
        color: rgb(255, 255, 255);
    }
    &-ImportantDate{
        border: 2px solid var(--main-white-blue-color);
        
    }
    &-OpasytyDay{
        opacity: 0.4;
    }
}







</style>
