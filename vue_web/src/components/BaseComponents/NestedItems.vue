<template>
    <div>
      <h2>{{ data.name }}</h2>
      
      <div v-for="(value, key) in data.items" :key="key">
        <h3>{{ value.name }}</h3>
        <div v-for="(item, index) in value.items" :key="index">
          {{ item }}
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      data: {
        type: Object,
        required: true
      }
    }
  };
  </script>
  
  <style scoped>
  /* Ваши стили здесь */
  </style>
  