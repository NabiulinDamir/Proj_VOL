<template> 
  <div class="body">
  <RouterView class="router-view" />
  </div>
</template>


<script setup>
import { ref, watchEffect, onMounted } from 'vue';
import { useRouter, RouterView } from 'vue-router'

import { useCurrentUserStore } from '@/entities/user/stores/user';

const router = useRouter();

const userStore = useCurrentUserStore();
// Используем watchEffect для отслеживания изменений текущего маршрута
// watchEffect(() => {
//     isMainPage.value = router.currentRoute.value.path !== '/';
// });
onMounted(() => {
  
});


</script>


<style lang="scss">
@use './styles/global' as *; 

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}
.body{
  display: flex;
  flex-direction: column;
  height: 100vh;
}
// .router-view {
//   flex: 1; /* Занимает оставшееся пространство */
//   overflow-y: auto; /* Добавляет прокрутку, если контент превышает высоту */
// }
</style>
