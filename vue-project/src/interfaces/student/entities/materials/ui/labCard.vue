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
                Описание: {{ lab.description ? lab.description : "отсутствует" }}
                <hr class="line" />
                Предмет: {{ lab.desciplines ? lab.desciplines : "отсутствует" }}
                <hr class="line" />
                Файл: {{ lab.files ? lab.files : "отсутствует" }}
                <hr class="line" />
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
