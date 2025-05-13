<template>
    <button class="button">
        <slot>

        </slot>
    </button>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.button{
    display: flex;
    padding: 4px;
    border:  1px solid var(--main-grey-stroke-color);
    background-color: #11111100;
    border-radius: 7px;
    user-select: none;
    cursor: pointer;
    transition: 200ms;
    white-space: nowrap;

    align-items: center;
    place-content: center;
    &:hover{
        background-color: var(--main-white-blue-color);
        color: var(--main-white-background-color);
    }
}


</style>