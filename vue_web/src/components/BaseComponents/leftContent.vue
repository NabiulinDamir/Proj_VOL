<template>
    <div class="Main-Container">
        <!-- <div class="Buttons" v-for="predmet in Predmets" :key="predmet.name">
            {{ predmet.name }}
             <div class="Buttons" v-for="data in predmet.items" :key="data">{{ data.name }}</div>
        </div>  -->

        <div class="Buttons" @click="SelectDiscipline(item.id)" v-for="item in disciplines" :key="item.id">
            {{ item.name }}
        </div>

        <!-- <NestedItems v-for="predmet in Predmets" :key="predmet.id" :data="predmet" /> -->
        
        <div class="Buttons">Консультации</div>
    </div>
</template>

<script setup>
import NestedItems from './NestedItems.vue';
import { ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { useAppStore } from '../../store/index';
import mainJson from '../../documents/main.json'
import Select from 'primevue/select';
const Disciplines = []
const appStore = useAppStore()
//mainJson.users.find(user => user.id === this.id).username : null

const SelectDiscipline = (index) =>{
    useAppStore().$state.Selected_Discipline_Id = index;
}

const disciplines = [
    {
        id: 1,
        name: "Mathematics",
        description: "Study of numbers, shapes, and patterns."
    },
    {
        id: 2,
        name: "Physics",
        description: "Study of matter, energy, and the fundamental forces of nature."
    }
]





    
</script>

<style lang="scss" scoped>
.Main-Container{
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
    
    
    &:hover {
        transform: scale(1.04);
    }
}
</style>