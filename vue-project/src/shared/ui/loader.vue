<template>
    <div id="loader_container">
        <div class="loader"></div>
    </div>
</template>

<script setup></script>

<style lang="scss" scoped>
#loader_container{
  width: 100%;
  display: flex;
  place-content: center;
}

.loader {
    border: 4px solid #f3f3f3;
    border-top: 4px solid var(--main-white-blue-color);
    border-radius: 50%;
    width: 30px;
    height: 30px;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
