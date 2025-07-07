<template>
  <div class="myViewFile-container">
    <div class="file_list" v-if="fileList.length">
      <div class="file_list-item" v-for="file in fileList" :key="file.id" >
          <img :src="getFileIcon(file.name)" alt="" class="file_list-item-img"/>
          <div class="file_list-item-name">{{ file.name }}</div>
          <div class="file_list-item-button" @click="downloadFile(file)">
            <img src="/src/ico/material/download.png" alt=""  class="file_list-item-button-img"/>
          </div>
          <!-- <div class="file_list-item-button" @click="removeFile(file.id)">
            <img src="/src/ico/user/icons8-delete-60.png" alt=""  class="file_list-item-button-img"/>
          </div> -->
      </div>
    </div>
    <!-- <div class="addFile_button" @click="triggerFileInput" >
      <img class="addFile_button-img" src="../../ico/cons/icons8-плюс-60.png" alt="Добавить">
      <input
        type="file"
        ref="fileInput"
        @change="handleFileSelect"
        multiple
        style="display: none"
      />
    </div> -->
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

import doc from '@/ico/material/doc.png'
import jpg from '@/ico/material/jpg.png'
import pdf from '@/ico/material/pdf.png'
import ppt from '@/ico/material/ppt.png'
import txt from '@/ico/material/txt.png'
import zip from '@/ico/material/zip.png' 
import xls from '@/ico/material/xls.png' 


const props = defineProps({
  files: {
      type: Array,
      default: []
  },
});

const fileIcons = {
  doc, jpg, pdf, ppt, txt, zip, xls,
  docx: doc,
  pptx: ppt
}

const fileList = ref(props.files)
const fileInput = ref(null);


const triggerFileInput = () => {
  fileInput.value.click();
};

const handleFileSelect = (event) => {
  const selectedFiles = event.target.files;
  
  if (selectedFiles.length > 0) {
    for (let file of selectedFiles) {
      fileList.value.push({
        name: file.name,
        file: file, 
      });
    }
  }
  event.target.value = '';
};

const removeFile = (index) => {
  fileList.value.splice(index, 1);
};

const downloadFile = (file) => {
  console.log(file)
  // Если файл уже загружен через input
  if (true) {
    const url = file.url;
    const link = document.createElement('a');
    link.href = url;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 100);
  }

  else {
    console.warn('Объект File отсутствует, скачивание невозможно');
  }
};

const getFileIcon = (filename) => {
  const ext = filename.split('.').pop().toLowerCase();
  return fileIcons[ext] || doc
};

</script>

<style lang="scss" scoped>
.myViewFile-container {
  min-height: 50px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  border-radius: 10px;
//   padding: 5px;
}

.addFile_button {
  display: flex;
  border: 2px solid var(--main-grey-stroke-color);
  border-radius: 7px;
  height: 40px;
  align-items: center;
  place-content: center;
  transition: 200ms;
  cursor: pointer;

  &:hover {
    background-color: var(--main-grey-stroke-color);
  }

  &-img {
    height: 100%;
    user-select: none;
    pointer-events: none;
    -webkit-user-drag: none;
  }
}

.file_list {
  display: flex;
  flex-direction: column;
  gap: 5px;
  max-height: 130px;
  overflow-y: auto;
  &-item {
    min-height: 40px;
    display: flex;
    gap: 5px;
    flex-direction: row;
    justify-content: space-between;
    border-radius: 7px;
    align-items: center;
    // padding-right: 5px;
    // border: 2px solid var(--main-grey-color);
    &:hover{
    //   border: solid var(--main-grey-stroke-color);
    }
      &-img{
        height: 35px;
        margin-right: 5px;
      }
      &-name{
        overflow: hidden;
        text-overflow: ellipsis; 
        min-width: 0;
          flex: 1;
      }
    &-button{
      display: flex;
      align-items: center;
      border: 2px solid var(--main-grey-stroke-color);
      border-radius: 7px;
      padding: 3px;
      transition: 200ms;
      &:hover{
        background-color: var(--main-grey-stroke-color);
      }
      &-img{
        height: 20px;
      }
    }
  }
}
</style>