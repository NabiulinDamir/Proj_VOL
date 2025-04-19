<template>
    <div class="button">
        <slot>

        </slot>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.button {
    height: 35px;
    width: min-content;
    min-width: 100px;
    border: 1px solid black;
    padding: 0px 10px 0px 10px;
    font-size: 18px;
    border-radius: 8px;
    background-color: var(--main-white-blue-color);
    border-color: #e0e0e0;
    color: #ffffff;
    transition: 0.1s;
    text-decoration: none;
    // align-items: center;
    // justify-content: center;
    place-content: center;
    text-align: center;
    user-select: none;
    cursor: pointer;
    // margin: 20px;
    &:hover {
        
        // margin: 2px;
        // border: 2px solid rgb(46, 46, 46);
        // color: #5b68c8;
        // width: 104px;
        // height: 34px;
    }
    &:active{
        scale: 0.97;
    }
}
</style>