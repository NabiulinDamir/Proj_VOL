<template>
    <div>
        <textarea
            :id="id"
            :class="['label', { 'error': isError }]"
            ref="textareaRef"
            v-model="model"
            :placeholder="placeholder"
            @input="adjustHeight"
            @change="$emit('change')"
        ></textarea>
    </div>
</template>

<script setup>
import { ref, watch, nextTick } from "vue";

const props = defineProps({
    placeholder: String,
    id: [String, Number],
    autocomplete: { type: String, default: "off" },
    isError: { type: Boolean, default: false },
});

const model = defineModel();
const textareaRef = ref(null);

const emit = defineEmits(['change'])


const adjustHeight = () => {
  if (!textareaRef.value) return;
  
  // Принудительный сброс к минимальной высоте
  textareaRef.value.style.height = '33px';
  
  // Затем расчёт новой высоты
  const newHeight = Math.min(
    Math.max(textareaRef.value.scrollHeight, 33),
    100
  );
  textareaRef.value.style.height = `${newHeight}px`;
};

// Следим за изменениями модели
watch(model, () => {
    nextTick(adjustHeight);
});

// Вызываем при монтировании
nextTick(adjustHeight);
</script>

<style lang="scss" scoped>
.label {
    box-sizing: border-box;
    font-size: 16px;
    width: 100%;
    min-height: 33px;
    max-height: 100px;
    border-radius: 7px;
    border: 2px solid transparent;
    padding: 5px;
    background-color: var(--main-grey-color);
    resize: none;
    word-wrap: break-word;
    white-space: pre-wrap;
    overflow-y: hidden;
    line-height: 1.2; /* Для более точного расчета высоты */

    &.error {
        border: 2px solid var(--main-red);
    }
}
</style>