<template>
    <div class="createDisciplineCard_container">
        <div class="label">Название</div>
        <input type="text" class="label_input">
        <div class="label">Описание</div>
        <input type="text" class="label_input">
        <div class="label">Доступно группам</div>
        <input type="text" class="label_input">
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.createDisciplineCard_container{
    width: 100%;
    min-height: 50px;
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.label {
    font-size: 16px;
    width: 100%;
    &_input {
        font-size: 16px;
        width: 100%;
        height: 35px;
        border-radius: 7px;
        border: 0px;
        padding: 5px;
        background-color: var(--main-grey-color);
    }
}
</style>