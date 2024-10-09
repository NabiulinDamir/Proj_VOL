<template>
    <div class="Main-Conteiner">
        <div class="Buttons">ООП</div>
        <div class="Buttons">Дискретная математика</div>
        <div class="Buttons">Консультации</div>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.Main-Conteiner{
    height: 100%;
    // padding: 10px;
    // opacity: 0;
    // width: 200px;
    // background-color: var(--main-white-blue-color);
    // border-top: 1px solid var(--main-grey-border);
}
.Buttons{
    // width: 100%;
    min-height: 35px;
    background-color: var(--main-white-color);
    border-radius: 10px;
    margin-left: 10px;
    margin-right: 10px;
    place-content: center;
    padding: 5px;
    margin-bottom: 10px;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    // border: 1px solid var(--main-grey-border);
    transition: 200ms;
    overflow: hidden;
    user-select: none;
    &:hover{
        margin-left: 5px;
        margin-right: 5px;
    }
}
</style>