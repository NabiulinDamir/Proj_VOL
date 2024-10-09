<template>
    <div id="MainContainer">
        <leftContent class="leftContent"/>
        <div id="CenterContainer">
            <!-- <div class="Predmet">
                <div class="Predmet__Button">Дискретная математика</div>
                <div class="Predmet__Button">ООП</div>
            </div> -->
            
            <!-- <div id="LabsContainer"> -->
                <div class="LabsCart__Border" v-for="lab in labs" :key="lab.id">
                    <div class="LabsCart">
                        {{ lab.name }}
                    </div>
                </div>
            <!-- </div> -->
        </div>
        <div id="RightContainer">
            <Calendar/>
        </div>
    </div>
</template>

<script setup>
import { useAppStore } from "../store/index.js"
import { ref, watch } from 'vue';
import leftContent from '@/components/BaseComponents/leftContent.vue'
import Calendar from "@/components/Calendar.vue";

const appStore = useAppStore();
const group = "РИС-21-1Б"
const subject = "ООП"

const labs = ref([]);
appStore.fetchItems().then(() => {
  labs.value = appStore.getLabs(group, subject);
});




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
    width: 60vw;
    padding: 20px;
    background-color: var(--main-white-color);
    border-top-left-radius: 20px;
}
.leftContent{
    width: 10vw;
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
        
        // width: calc(90% + 4px);
        // width: 100%;
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