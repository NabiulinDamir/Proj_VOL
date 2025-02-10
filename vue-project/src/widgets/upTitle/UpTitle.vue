<template>
    <div>
        <div id="main_container">
            <div id="nav_info">
                <img id="nav_info_image" src="../../ico/menu/icons8-ellipsis-90.png" alt="лабрадудель"/>
                <div id="nav_info_text">
                    <div id="discipline_name">Проектирование архитектуры программных систем</div>
                    <div id="counter_labs">{{ 2 }} лабораторных {{ 1 }} теория</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup></script>

<style lang="scss" scoped>
#main_container {
    height: 100%;
    border-left: 1px solid var(--main-grey-stroke-color);
}
#nav_info {
    height: 100%;
    display: flex;
    flex-direction: row;
}
#nav_info_image {
    height: 100%;
    margin: 0 10px 0 10px;
}
#nav_info_text {
    display: flex;
    flex-direction: column;
    place-content: center;
}
#discipline_name{
    color: var(--main-white-color);
    font-family: "Roboto Flex", sans-serif;
    font-size: 17px;
}
#counter_labs{
    color: var(--main-grey-stroke-color);
    font-family: "Roboto Flex", sans-serif;
    font-size: 15px;
}
</style>
