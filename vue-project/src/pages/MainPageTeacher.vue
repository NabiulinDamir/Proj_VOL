<template>
    <div id="MainContainer">
        <LeftBar id="LeftBar"/>
        <div id="CenterContainer">
                преподаватель в жопу даватель
        </div>
        <div id="RightContainer">
            <Calendar/>
        </div>
    </div>
</template>

<script setup>
import { useAppStore } from "../app/providers/store.js"
import { ref, watch } from 'vue'; 
import Calendar from "@/widgets/calendar/Calendar.vue";
import mainJson from '../shared/documents/main.json'
import LeftBar from '../entities/student/ui/leftContent.vue'
const appStore = useAppStore();

// const labs = ref([]);
// const fetchAssignments = () => {
//             const assignment = mainJson.assignment.find(
//                 assignment => assignment.discipline_id === appStore.$state.Selected_Discipline_Id
//             );

//             if (assignment) {
//                 labs.value.push(assignment); // Добавляем только если элемент найден
//             } else {
//                 console.warn("Assignment not found for the selected discipline ID:", appStore.$state.Selected_Discipline_Id);
//             }
//         };

//         // Наблюдаем за изменениями в Selected_Discipline_Id
//         watch(
//             () => appStore.$state.Selected_Discipline_Id,
//             (newValue) => {
//                 labs.value = []; // Очищаем массив перед загрузкой новых данных
//                 fetchAssignments(); // Извлекаем новые данные
//             },
//             { immediate: true } // Немедленно вызываем функцию при первом рендере
//         );


// appStore.fetchItems().then(() => {
//   labs.value = appStore.getLabs(group, subject);
// });




</script>

<style lang="scss" scoped>
#MainContainer{
    
    width: 100%;
    height: 92vh;
    // background-color:#f4f4f4;
    background-color: rgba(255, 255, 255, 0);
    display: flex;
    flex-direction: row;
    
}
#CenterContainer{
    flex-grow: 1; 
    padding: 20px;
    background-color: var(--main-white-color);
    border-top-left-radius: 20px;
}
.LeftBar{
    width: 200px;
}
#RightContainer{
    width: 30vw;
    background-color: var(--main-white-color);
    padding-top: 20px;
    padding-right: 20px;
    padding-left: 20px;
}

@media (max-width: 740px) {
  #RightContainer {
    display: none;
  }
  #CenterContainer{
    width: 100%;
  }
}

.LabsCart{
    height: 100%;
    border: 1.5px solid #f4f4f4;
    -webkit-box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
    -moz-box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
    box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
    border-radius: 12px;
    background-color: #f4f4f4;
    // margin: 15px;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 10px;

    transition:  0.2s;
    &__Border{
        height: 70px;
        padding: 3px;
        border-radius: 15px;
        margin-bottom: 15px;
        transition: 0.2s;
        &:hover{
            background: var(--gradient-color);
            
        }
    }
}
</style>