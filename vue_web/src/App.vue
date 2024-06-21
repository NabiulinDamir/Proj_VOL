<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Title from '/src/components/BaseComponents/UpTitle.vue'
</script>

<template>
  <Title></Title>
  <RouterView/>
</template>

<style lang="scss">
@import './styles/global';
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
