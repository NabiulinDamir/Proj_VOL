<template>
    <div class="Main-Container">


        <div class="Buttons" :class="{ Buttons_opened: (item.id === SelectDisciplineId) }" @click="SelectDiscipline(item.id)" v-for="item in studentStore.disciplines" :key="item.id" >
            {{ item.name }}
        </div>

        <!-- <NestedItems v-for="predmet in Predmets" :key="predmet.id" :data="predmet" /> -->
        
        <div class="Buttons" :class="{ Buttons_opened: ('cons' === SelectDisciplineId) }" @click="SelectDiscipline('cons')">Консультации</div>
    </div>
</template>

<script setup>

import { ref, onMounted } from 'vue';
// import { useRouter } from 'vue-router';
import { useAppStore } from '@/app/providers/store';
import { useCurrentStudentStore } from '../stores/student';
import { useAllMaterialsStore } from '../../materials/stores/materials';
const materials = useAllMaterialsStore()
const store = useAppStore()
const studentStore = useCurrentStudentStore()
const SelectDisciplineId = ref(materials.selectedDisciplineId)
const consOpen = ref(false)

onMounted(() => studentStore.setDisciplinesByStudentId())


const SelectDiscipline = (idDiscipline) => {
    materials.selectedDisciplineId = idDiscipline
    SelectDisciplineId.value = idDiscipline
}

// import mainJson from '../../documents/main.json'
// import Select from 'primevue/select';
// const Disciplines = []
// const appStore = useAppStore()
// //mainJson.users.find(user => user.id === this.id).username : null

// const SelectDiscipline = (index) =>{
//     useAppStore().$state.Selected_Discipline_Id = index;
// }







    
</script>

<style lang="scss" scoped>
.Main-Container{
    width: 200px;
    padding-top: 5px;
    display: flex;
    flex-direction: column;
}
.Buttons {
    min-height: 35px;
    background-color: var(--main-white-color);
    border-radius: 10px;
    margin: 5px 10px;
    display: flex; 
    align-items: center; 
    
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    overflow: hidden;
    user-select: none;
    padding: 5px;
    border: 1px solid transparent;

    &_opened{
        width: 100%;
    }
    
    &:hover {
        transform: scale(1.04);
    }
}

</style>