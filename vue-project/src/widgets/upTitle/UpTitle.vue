<template>
    <div id="title_container">
        <div id="nav_info">
            <img id="nav_info_image" v-if="store.selectedMenuItem === 1" src="../../ico/menu/icons8-group-50 (1).png" alt="лабрадудель"/>
            <img id="nav_info_image" v-if="store.selectedMenuItem === 2" src="../../ico/menu/icons8-ellipsis-90.png" alt="лабрадудель"/>
            <img id="nav_info_image" v-if="store.selectedMenuItem === 3" src="../../ico/menu/icons8-calendar-50.png" alt="лабрадудель"/>
            <div id="nav_info_text">
                <div id="discipline_name">{{ store.selectedDisciplineName }}</div>
                <div v-if="store.selectedDisciplineName" id="counter_labs">{{ materialsStore.Labs?.length }} лабораторных {{ materialsStore.TheoryMaterial?.length }} теория</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useAppStore } from '@/app/providers/store';
import { useAllMaterialsStore } from '@/interfaces/student/entities/materials/stores/materials';

const store = useAppStore()
const materialsStore = useAllMaterialsStore()

</script>

<style lang="scss" scoped>
#title_container {
    min-height: 50px;//хуйня какая то
    max-height: 50px;//хуйня какая то
    border-left: 1px solid var(--main-grey-stroke-color);
}
#nav_info {
    height: 100%;
    display: flex;
    flex-direction: row;
}
#nav_info_image {
    height: 100%;
    margin: 0 5px 0 5px;
    padding: 5px;
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
