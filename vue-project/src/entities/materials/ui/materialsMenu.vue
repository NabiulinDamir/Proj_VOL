<template>
    <div id="MainContainerMenu" v-if="materialsStore.selectedDisciplineId != 'cons'">
        <div class="line" v-if="LabsByDisciplineId.length">
            <div class="line_start"></div>
            <div class="line_text">Лабораторные</div>
            <div class="line_end"></div>
        </div>

        <labCard
            class="labCart"
            v-for="lab in LabsByDisciplineId"
            :lab="lab"
            :key="lab.id"
            :theory="materialsStore.getTheoryForLabById(lab.id)"
            @selectTheoryId="handleSelectTheoryId"
        ></labCard
        >
        <div class="line" v-if="Materials.length">
            <div class="line_start"></div>
            <div class="line_text">Теоретические материалы</div>
            <div class="line_end"></div>
        </div>

        <materialCard
            class="labCart"
            v-for="lab in Materials"
            :idTheory="lab.id"
            :id="'theory' + lab.id"
            :key="lab.id"
        ></materialCard>
    </div>
</template>

<script setup>
import { useAllMaterialsStore } from "../stores/materials";
import labCard from "./labCard.vue";
import materialCard from "./materialCard.vue";
import { onMounted, computed, ref } from "vue";
import { useCurrentStudentStore } from "@/entities/student/stores/student";

const studentStore = useCurrentStudentStore();
const materialsStore = useAllMaterialsStore();

onMounted(() => {
    materialsStore.setLabsByUser(studentStore.group_id);
    materialsStore.setTheoryByUser(studentStore.group_id);
});

const LabsByDisciplineId = computed(() =>
    materialsStore.getLabsByDisciplineId(materialsStore.selectedDisciplineId)
);

const Materials = computed(() =>
    materialsStore.getTheoryByDisciplineId(materialsStore.selectedDisciplineId)
);

const selectedTheoryId = ref(null)
let handleSelectTheoryId = (theoryId) => {
    selectedTheoryId.value = theoryId

    const element = document.getElementById('theory'+theoryId);
    if (element) {
        element.children[0].children[0].click()

        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        const offset = 200;
        window.scrollTo({
            top: elementPosition - offset,
            behavior: 'smooth'
        });
    }
};
</script>

<style lang="scss">
.labCart {
    margin-top: 10px; /* Устанавливаем отступ сверху для labCart */
}

.line {
    display: flex;
    flex-direction: row;
    align-items: center;
    user-select: none;
    height: 25px;
    &_text {
        font-size: 15px;
        font-family: monospace;
        margin: 0px 5px 0px 5px;
        white-space: nowrap;
    }
    &_start {
        height: 1px;
        background-color: #9292929a;
        border: 0px;
        width: 10%;
    }
    &_end {
        height: 1px;
        background-color: #9292929a;
        border: 0px;
        width: 100%;
    }
}
.line + .labCart {
    margin-top: 0; /* Убираем отступ сверху для labCart, который идет сразу после line */
}
</style>
