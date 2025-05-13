<template>
    <div>
        <input
            :id="id"
            type="date"
            :class="['label', { 'error' : isError}]"
            v-model="model"
            @change="$emit('change')"

        />
    </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
    id: {
        type: [String, Number],
        default: "",
    },
    isError: {
        type: Boolean,
        default: false
    },
});

const model = defineModel()

const emit = defineEmits(['change'])




const togglePasswordVisibility = () => {
    shouldHidePassword.value = !shouldHidePassword.value;
};


</script>

<style lang="scss" scoped>

.label {
    padding: 5px;
    border: 2px solid #00000000;
    border-radius: 10px;
    width: 100%;
    height: 33px;
    background-color: var(--main-grey-color);

}

.error{
    border: 2px solid var(--main-red);
}

</style>
