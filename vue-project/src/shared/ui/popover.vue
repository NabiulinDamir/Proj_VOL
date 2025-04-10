<template>
    <div class="Container_main" ref="containerRef" :style="containerStyle">
        <loader v-if="isLoadingRef" />
        <slot v-if="!isLoadingRef" name="content"></slot>
    </div>
</template>

<script setup>
import { onMounted, ref, computed, nextTick, watch, onUnmounted } from "vue";
import loader from "@/shared/ui/loader.vue";

const containerRef = ref(null);
const objectShift = ref(0);
const isLoadingRef = ref(false)

const props = defineProps({
    isLoading: { type: Boolean, required: false, default: false},
});

const containerStyle = computed(() => ({
    '--object-shift': `${objectShift.value}px`,
}));

watch(() => props.isLoading, async (newVal, oldVal) => {
    if (!newVal) {
        adjustPosition();
        console.log("Пропс вызван");
    }
});

onMounted(async () => {
    window.addEventListener("resize", debouncedAdjustPosition);
    isLoadingRef.value = false
    await nextTick();
//изменить!! добавить зависимость от загрузки данных
    setTimeout(()=>{
        adjustPosition();
    }, 1000)
})

onUnmounted(() => {
    window.removeEventListener("resize", debouncedAdjustPosition);
});
//пересчёт положения компонента что бы не выходил за границы экрана
const adjustPosition = () => {

    const element = containerRef.value;
    if (element) {
        objectShift.value = 0;
        requestAnimationFrame(() => {
            const rect = element.getBoundingClientRect();
            const body = document.body;
            const bodyWidth = body.offsetWidth; // Ширина body
            const rightSide = rect.left + element.offsetWidth;
            // console.log("----------------------");
            // console.log("Ширина body:", bodyWidth);
            // console.log("Ширина элемента:", element.offsetWidth);
            // console.log("Левый край:", rect.left);
            // console.log("Правый край:", rightSide);
            // console.log("Требуется сдвиг на", objectShift.value);
            // Проверяем, выходит ли элемент за границы body
            if (rightSide > bodyWidth) {
                objectShift.value = rightSide - bodyWidth + 10;

            } else {
                objectShift.value = 0;
            }
        });
    } else {
        // console.error('Элемент не найден');
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
    z-index: +5;
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
.info_container{
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 10px;
    row-gap: 5px;
    background-color: #000000;

}
// .Container_main.opened {
//     opacity: 1;
//     visibility: visible;
// }
</style>