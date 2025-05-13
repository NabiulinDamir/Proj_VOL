<template>
    <div>
      <input type="file" @change="handleFileUpload" />
      <button @click="submitFile" :disabled="!file || isUploading">
        {{ isUploading ? 'Загрузка...' : 'Отправить' }}
      </button>
      <progress v-if="isUploading" :value="uploadProgress" max="100"></progress>
      <p v-if="uploadStatus">{{ uploadStatus }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import axios from 'axios';
  
  const file = ref(null);
  const isUploading = ref(false);
  const uploadProgress = ref(0);
  const uploadStatus = ref('');
  
  const handleFileUpload = (event) => {
    file.value = event.target.files[0];
  };
  
  const submitFile = async () => {
    if (!file.value) return;
  
    const formData = new FormData();
    formData.append('file', file.value);
  
    isUploading.value = true;
    uploadProgress.value = 0;
    uploadStatus.value = '';
  
    try {
      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          uploadProgress.value = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
        }
      });
  
      uploadStatus.value = 'Файл успешно загружен!';
      emit('upload-success', response.data);
    } catch (error) {
      uploadStatus.value = 'Ошибка при загрузке файла: ' + error.message;
      console.error('Ошибка загрузки:', error);
    } finally {
      isUploading.value = false;
    }
  };
  
  defineEmits(['upload-success']);
  </script>