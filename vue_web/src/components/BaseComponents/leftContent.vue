<template>
    <div class="Main-Container">
        <!-- <div class="Buttons" v-for="predmet in Predmets" :key="predmet.name">
            {{ predmet.name }}
             <div class="Buttons" v-for="data in predmet.items" :key="data">{{ data.name }}</div>
        </div>  -->


        <!-- <NestedItems v-for="predmet in Predmets" :key="predmet.id" :data="predmet" /> -->
        
        <div class="Buttons">Консультации</div>
    </div>
</template>

<script setup>
import NestedItems from './NestedItems.vue';
import { ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';

    

    
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