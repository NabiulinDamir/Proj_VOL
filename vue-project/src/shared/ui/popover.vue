<template>
    <div class="Container_main" ref="containerRef" :style="containerStyle">
        <loader v-if="isLoading" />
        <slot v-if="!isLoading" name="content"></slot>
    </div>
</template>

<script setup>
import {onMounted, ref, computed } from "vue";
import loader from "@/widgets/loader/loader.vue";

const containerRef = ref(null);
const objectShift = ref(0);

//для загрузки(не используется)
const props = defineProps({
    isLoading: { type: Boolean, required: false, default: false },
});

//ситиль для вычисляемого отступа(наверное можно улучшить)
const containerStyle = computed(() => ({
    '--object-shift': `${objectShift.value}px`,
}));

onMounted(() => {
    adjustPosition()
    window.addEventListener("resize", debouncedAdjustPosition);
});

//пересчёт положения компонента что бы не выходил за границы экрана
const adjustPosition = () => {
    const element = containerRef.value;
    if (element) {
        objectShift.value = 0;
        requestAnimationFrame(() => {
            const rect = element.getBoundingClientRect();
            const scrollX = window.scrollX;
            const windowWidth = window.innerWidth;
            const rightSide = rect.left + scrollX + element.offsetWidth
            //20 - ширина скрола
            if (rightSide > windowWidth - 20) {
                objectShift.value = rightSide - windowWidth + 20
                // console.log("----------------------");
                // console.log("Ширина окна:", windowWidth);
                // console.log("Ширина элемента:", element.offsetWidth);
                // console.log("Левый край:", rect.left + scrollX);
                // console.log("Правый край:", rightSide);
                // console.log("Требуется сдвиг на", objectShift.value);
            }
            else {
                objectShift.value = 0;
            }
        })
    } else {
        console.error('Элемент не найден');
    }
    
}

//оптимизация сужения экрана
const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
};
//задержка 500мс(можно уменьшить)
const debouncedAdjustPosition = debounce(adjustPosition, 500);



</script>

<style lang="scss" scoped>
.Container_main {
    opacity: 0;
    visibility: hidden;
    z-index: +1;
    position: absolute;
    background: #ffffff;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    padding: 5px;
    top: 125%;
    left: calc(50% - var(--object-shift, 0));
    color: #000000;
    font-size: 15px;
    transform: translateX(-50%);
    white-space: nowrap;
    transition: opacity 0.3s ease, visibility 0.3s ease;

    &::before {
        content: '';
        position: absolute;
        top: -20px;
        left: calc(50% + var(--object-shift, 0));
        transform: translateX(-50%);
        border-width: 10px;
        border-style: solid;
        border-color: transparent transparent #ffffff transparent;
        z-index: 1;
    }
}

// .Container_main.opened {
//     opacity: 1;
//     visibility: visible;
// }
</style>