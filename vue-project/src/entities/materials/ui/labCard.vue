<template>
    <MyAccordeon>
        <template #header>
            <div class="Header">
                {{ lab?.title }}
            </div>
        </template>
        <template #content>
            <div class="Content">
                <hr class="line"/>
                Описание: {{ lab.description ? lab.description : "отсутствует" }}
                <hr class="line" />
                Предмет: {{ lab.discipline_name ? lab.discipline_name : "отсутствует" }}
                <hr class="line" />
                <!-- Файл: {{ lab.files ? lab.files : "отсутствует" }}
                <hr class="line" /> -->
                Дедлайн: {{ lab.deadline ? lab.deadline.replace(/T/g, ' ') : "отсутствует" }}
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

const props = defineProps({
    lab: {type: Object, required: true },
    theory: {type: Array, required: false}
    // id: { type: Number, required: true },
});



const emit = defineEmits(["selectTheoryId"]);
const emitSelectTheoryId = (theoryId) => {
    emit("selectTheoryId", theoryId);
};

</script>

<style lang="scss" scoped>

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
