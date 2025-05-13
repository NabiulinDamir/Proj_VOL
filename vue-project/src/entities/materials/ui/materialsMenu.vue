<template>
    <div id="loader_container" v-if="isLoading"><loader /></div>
    <div id="main_container_Menu" v-if="!isLoading">
        <!--nestedrouts-->
        <div class="line" v-if="materialsStore.Labs?.length">
            <div class="line_start"></div>
            <div class="line_text">Задания</div>
            <div class="line_end"></div>
        </div>
        
        <div class="material_card_container" v-for="lab in materialsStore.Labs">
            <labCard
                class="labCart"
                :lab="lab"
                :key="lab.id"
                :id="'lab' + lab.id"
                :theory="materialsStore.getTheoryForLabById(lab.id)"
                @selectTheoryId="handleSelectTheoryId"
            ></labCard>
            <div class="card_options" v-if="materialsStore.userIsTeacher && appStore.selectedMenuItem === 5">
                <LabChange>
                    <img class="delete_img" src="@\ico\user\icons8-edit-24.png" alt="">
                </LabChange>
                <LabDelete>
                    <img class="delete_img" src="@\ico\user\icons8-delete-60.png" alt="">
                </LabDelete>
            </div>
        </div>

        <div class="line" v-if="materialsStore.TheoryMaterial?.length">
            <div class="line_start"></div>
            <div class="line_text">Теоретические материалы</div>
            <div class="line_end"></div>
        </div>

        <div class="material_card_container" v-for="theory in materialsStore.TheoryMaterial">
            <materialCard
                class="labCart"
                :theory="theory"
                :key="theory.id"
                :id="'theory' + theory.id"
            ></materialCard>

            <div class="card_options" v-if="materialsStore.userIsTeacher && appStore.selectedMenuItem === 5">
                <TheoryChange>
                    <img class="delete_img" src="@\ico\user\icons8-edit-24.png" alt="">
                </TheoryChange>
                <TheoryDelete>
                    <img class="delete_img" src="@\ico\user\icons8-delete-60.png" alt="">
                </TheoryDelete>
                <!-- <Deleteuser 
                    :user="user">
                    <img class="delete_img" src="@\ico\user\icons8-delete-60.png" alt="">
                </Deleteuser>
                <Deleteuser 
                    :user="user">
                    <img class="delete_img" src="@\ico\user\icons8-delete-60.png" alt="">
                </Deleteuser> -->
            
            </div>
        </div>
    </div>
    
</template>

<script setup>
import { useAllMaterialsStore } from "../stores/materials";
import labCard from "./labCard.vue";
import materialCard from "./theoryCard.vue";
import { watchEffect, computed, ref, watch, nextTick  } from "vue";
import loader from "@/shared/ui/loader.vue";
import { TheoryDelete } from "@/features";
import { TheoryChange } from "@/features";
import { LabDelete } from "@/features";
import { LabChange } from "@/features";
import Deleteuser from "@/features/groupModalManager/ui/Deleteuser.vue";
import { useAppStore } from "@/app/providers/store";

const appStore = useAppStore();
const materialsStore = useAllMaterialsStore();

const isLoading = ref(false);

const props = defineProps({
    userRole: {
        type: String,
    },
});

watch(
    () => materialsStore.selectedDisciplineId,
    async () => {
        isLoading.value = true;
        await Promise.all([materialsStore.setLabs(), materialsStore.setTheory()]);
        isLoading.value = false;
    },
    { immediate: true }
);

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
#main_container_Menu {
    display: grid;
    grid-template-columns: 100%;
    gap: 3px;
    align-items: center;
    place-content: center;
    // padding: 10px 0px 10px 0px;
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

.material_card_container{
    margin-top: 10px;
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
}

.card_options {
  display: flex;
  flex-direction: column;
  gap: 5px;
  height: 100%; 
  user-select: none;
}

.delete_img{
    height: 20px;
}
</style>
