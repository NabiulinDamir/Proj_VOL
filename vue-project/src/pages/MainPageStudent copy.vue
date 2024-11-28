<template>
    <div id="MainContainer">
        <LeftBar id="LeftBar"/>
        <div id="CenterContainer">
        <MaterialsMenu/>
        <consultationTable/>
        </div>
        <div id="RightContainer">
            <Calendar/>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'; 
import Calendar from "@/widgets/calendar/Calendar.vue";
import LeftBar from '../entities/student/ui/leftContent.vue'
import MaterialsMenu from '@/entities/materials/ui/materialsMenu.vue';
import consultationTable from '@/entities/consultation/ui/consultationTable.vue';

</script>

<style lang="scss" scoped>
#MainContainer{
    
    width: 100%;
    // height: 92vh;
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
    width: 35vw;
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