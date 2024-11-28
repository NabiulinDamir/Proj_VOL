<template>
    <!-- <div id="Container_border">
        <div id="Container" v-if="!isOpen" @click="isOpen = true">
            {{ lab?.title }}
            {{ lab.id }}
        </div>
        <div class="Container_open" v-if="isOpen">
            {{ lab?.title }}
            <br />
            Описание: {{ description ? description : "отсутствует" }}
            <br />
            Файл: {{ files ? files : "отсутствует" }}
            <br />
            Дедлайн: {{ deadline ? deadline : "отсутствует" }}
            <br />
            <div id="theory_container">
                Теория:
                <div
                    id="theory_item"
                    @click="emitSelectTheoryId(item.id)"
                    v-for="item in theory"
                    :key="item.id"
                >
                    {{ item.title }}
                </div>
            </div>
            {{ theory ? theory : "отсутствует" }}
        </div>
    </div> -->
    <MyAccordeon>
        <template #header>
            <div class="Header">
                {{ lab?.title }}
                {{ lab.id }}
            </div>
        </template>
        <template #content>
            <div class="Content">
                <hr class="line" />
                Описание: {{ description ? description : "отсутствует" }}
                <hr class="line" />
                Предмет: {{ desciplines ? desciplines : "отсутствует" }}
                <hr class="line" />
                Файл: {{ files ? files : "отсутствует" }}
                <hr class="line" />
                Дедлайн: {{ deadline ? deadline.replace(/T/g, ' ') : "отсутствует" }}
                <hr class="line" />
                <div id="theory_container">
                    Теория:
                    <div
                        id="theory_item"
                        @click="emitSelectTheoryId(item.id)"
                        v-for="item in theory"
                        :key="item.id"
                    >
                        {{ item.title }}
                    </div>
                </div>
            </div>
        </template>
    </MyAccordeon>
</template>

<script setup>
import MyAccordeon from "@/shared/ui/myAccordeon.vue";
import { useAllMaterialsStore } from "../stores/materials";
import { computed, ref } from "vue";

const props = defineProps({
    id: { type: Number, required: true },
});

const emit = defineEmits(["selectTheoryId"]);
const emitSelectTheoryId = (theoryId) => {
    emit("selectTheoryId", theoryId);
};

const materialsStore = useAllMaterialsStore();
const lab = computed(() => materialsStore.getLabById(props.id));

const description = computed(() => lab.value?.description);
const files = computed(() => lab.value?.files);
const deadline = computed(() => materialsStore.getLabDeadlineById(props.id));
const theory = computed(() => materialsStore.getTheoryForLabById(props.id) || []);
const desciplines = computed(() => materialsStore.getDisciplinesForLab(props.id))
</script>

<style lang="scss" scoped>
// #Container {
//     height: 60px;
//     border: 1.5px solid #f4f4f4;
//     -webkit-box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
//     -moz-box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
//     box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
//     border-radius: 12px;
//     background-color: #f4f4f4;
//     display: flex;
//     flex-direction: row;
//     align-items: center;
//     padding: 10px;
//     transition: 0.2s;
//     user-select: none;
//     &_border {
//         // height: 66px;
//         padding: 3px;
//         border-radius: 15px;
//         transition: 0.2s;
//         &:hover {
//             // background: var(--gradient-color);
//             background: var(--main-white-blue-color);
//         }
//     }
// }
// .Container_open {
//     height: 200px;
//     background-color: #f4f4f4;
//     -webkit-box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
//     -moz-box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
//     box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
//     padding: 13px;
//     border-radius: 12px;
// }
#theory {
    &_container {
        display: flex;
    }
    &_item {
        margin-left: 5px;
        user-select: none;
        translate: 100ms;
        &:hover {
            color: #074396;
            text-decoration: underline;
        }
    }
}
.line {
    height: 1px;
    background-color: #9292929a;
    border: 0px;
}

</style>
