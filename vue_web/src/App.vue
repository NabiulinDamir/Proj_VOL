<script setup>
import { ref, watchEffect } from 'vue';
import { useRouter, RouterView } from 'vue-router'
import Title from '/src/components/BaseComponents/UpTitle.vue'
import leftContent from './components/BaseComponents/leftContent.vue';

const router = useRouter();
const isMainPage = ref(false);

// Используем watchEffect для отслеживания изменений текущего маршрута
watchEffect(() => {
    isMainPage.value = router.currentRoute.value.path !== '/';
});

</script>

<template> 
  
  <Title  v-if="isMainPage"></Title>
  <div style="display: flex;">
    <leftContent  v-if="isMainPage" class="leftContent" />
    <!-- <leftContent/> -->
    <RouterView/>
  </div>
</template>

<style lang="scss">
@import './styles/global';
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

</style>
