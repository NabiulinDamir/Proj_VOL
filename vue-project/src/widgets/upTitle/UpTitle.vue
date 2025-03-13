<template>
    <div class="UpTitle_container">
        <div class="nav_info" v-if="store.selectedMenuItem === 1">
            <img class="nav_info_image" src="../../ico/menu/icons8-group-50 (1).png" alt="лабрадудель"/>
            <div class="nav_info_text">
                <div class="nav_info_name">{{userStore.user.group?.name}}</div>
                <div class="counter_labs">{{ userStore.groupUsers?.length }} пользователей</div>
            </div>
        </div>

        <div class="nav_info" v-if="store.selectedMenuItem === 2">
            <img class="nav_info_image" src="../../ico/menu/icons8-ellipsis-90.png" alt="лабрадудель"/>
            <div class="nav_info_text">
                <div class="nav_info_name">{{ store.selectedDisciplineName ? store.selectedDisciplineName : "Дисциплины" }}</div>
                <div v-if="store.selectedDisciplineName" class="counter_labs">{{ materialsStore.Labs?.length }} лабораторных {{ materialsStore.TheoryMaterial?.length }} теория</div>
            </div>
        </div>

        <div class="nav_info" v-if="store.selectedMenuItem === 3">
            <img class="nav_info_image" src="../../ico/menu/icons8-calendar-50.png" alt="лабрадудель"/>
            <div class="nav_info_text">
                <div class="nav_info_name">Консультации</div>
            </div>
        </div>

    </div>
</template>

<script setup>
import { useAppStore } from '@/app/providers/store';
import { useAllMaterialsStore } from '@/entities/materials/stores/materials';
import { useCurrentUserStore } from '@/entities/user/stores/user';

const store = useAppStore()
const materialsStore = useAllMaterialsStore()
const userStore = useCurrentUserStore()

</script>

<style lang="scss" scoped>
.UpTitle_container {
    height: 50px;
    border-left: 1px solid var(--main-grey-stroke-color);
    display: flex;
    flex-direction: row;
}
.nav_info {
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
}
.nav_info_image {
    height: 100%;
    margin: 0 5px 0 5px;
    padding: 5px;

}
.nav_info_text {
    display: flex;
    flex-direction: column;
    place-content: center;
    height: 100%;

}
.nav_info_name{
    color: var(--main-white-color);
    font-family: "Roboto Flex", sans-serif;
    font-size: 17px;

}
.counter_labs{
    color: var(--main-grey-stroke-color);
    font-family: "Roboto Flex", sans-serif;
    font-size: 15px;

}
</style>
