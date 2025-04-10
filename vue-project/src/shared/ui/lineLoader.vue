<template>
    <div id="loader_container">
        <div class="line-loader" v-if="modelValue"></div>
    </div>
</template>

<script setup>
const props = defineProps({
    modelValue: { 
        type: Boolean,
        default: false 
    }
});
</script>

<style lang="scss" scoped>
#loader_container {
    width: 100%;
    display: flex;
    place-content: center;
    height: 3px;
    padding: 0%;
}

.line-loader {

    width: 100%;
    background: rgba(#f3f3f3, 0.3);
    position: relative;
    border-radius: 3px;
    overflow: hidden;
    
    &::after {
        content: '';
        position: absolute;
        left: 0;
        height: 100%;
        width: 50%;
        background: var(--main-white-blue-color);
        border-radius: 3px;
        animation: slide 2.8s cubic-bezier(0.65, 0, 0.35, 1) infinite;
    }
}

@keyframes slide {
    0% {
        transform: translateX(-100%);
    }
    70%, 100% {
        transform: translateX(200%);
    }
}
</style>