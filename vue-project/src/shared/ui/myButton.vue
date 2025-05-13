<template>
    <button>
        <slot>

        </slot>
    </button>
</template>

<script setup>

</script>

<style lang="scss" scoped>
button{
    min-width: 50px;
    min-height: 30px;
    display: flex;
    padding: 4px;
    // border:  1px solid var(--main-grey-stroke-color);
    // background-color: #11111100;
    border-radius: 7px;
    user-select: none;
    cursor: pointer;
    transition: 200ms;
    white-space: nowrap;

    align-items: center;
    place-content: center;
    background-color: var(--main-white-blue-color);
    border: 0;
    // border:  1px solid var(--main-grey-stroke-color);
    color: #ffffff;
    
    &:hover{
        background-color: color-mix(in srgb, var(--main-white-blue-color), rgb(0, 0, 0) 20%);
        color: var(--main-white-background-color);
    }
    &:active{
        scale: 0.97;
    }
}


</style>

<!-- <template>
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
</style> -->