<template>
    <div id="loader_container" v-if="isLoading"><loader /></div>
    <div id="MainContainerMenu" v-if="!isLoading">
        <!--nestedrouts-->
        <div class="line" v-if="materialsStore.Labs?.length">
            <div class="line_start"></div>
            <div class="line_text">Лабораторные</div>
            <div class="line_end"></div>
        </div>
        <labCard
            class="labCart"
            v-for="lab in materialsStore.Labs"
            :lab="lab"
            :key="lab.id"
            :id="'lab' + lab.id"
            :theory="materialsStore.getTheoryForLabById(lab.id)"
            @selectTheoryId="handleSelectTheoryId"
        ></labCard>
        <div class="line" v-if="materialsStore.TheoryMaterial?.length">
            <div class="line_start"></div>
            <div class="line_text">Теоретические материалы</div>
            <div class="line_end"></div>
        </div>

        <materialCard
            class="labCart"
            v-for="theory in materialsStore.TheoryMaterial"
            :theory="theory"
            :key="theory.id"
            :id="'theory' + theory.id"
        ></materialCard>
    </div>
</template>

<script setup>
import { useAllMaterialsStore } from "../stores/materials";
import labCard from "./labCard.vue";
import materialCard from "./materialCard.vue";
import { watchEffect, computed, ref, watch, nextTick  } from "vue";
import loader from "@/widgets/loader/loader.vue";

const materialsStore = useAllMaterialsStore();

const isLoading = ref(false);

watchEffect(async () => {
    isLoading.value = true;
    await Promise.all([materialsStore.setLabs(), materialsStore.setTheory()]);
    isLoading.value = false;
});

watchEffect(async () => {
    if (materialsStore.navigateLabId && !isLoading.value) {
        await nextTick();
        navigateElement("lab" + materialsStore.navigateLabId)
        materialsStore.navigateLabId = null
    }
});

const handleSelectTheoryId = (theoryId) => {
    navigateElement("theory" + theoryId)
    
};

const navigateElement = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
        const elementHeight = element.offsetHeight;

        if (elementHeight <= 70) {
            element.children[0].children[0].click();
        }

        element.classList.add("hover-effect");

        const elementPosition =
            element.getBoundingClientRect().top + window.scrollY;
        const offset = 200;
        window.scrollTo({
            top: elementPosition - offset,
            behavior: "smooth",
        });

        setTimeout(() => {
            element.classList.remove("hover-effect");
        }, 1000);
    }
}



</script>

<style lang="scss">
#MainContainerMenu {
    display: grid;
    grid-template-columns: 100%;
    gap: 3px;
    align-items: center;
    place-content: center;
    padding: 10px 0px 10px 0px;
}

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

#loader_container {
    padding: 10px;
}
</style>
