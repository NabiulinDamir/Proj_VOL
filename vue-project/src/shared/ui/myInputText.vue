<template>
    <div class="myLabel_container">
        <input
            :id="id"
            :type="shouldHidePassword ? 'password' : 'text'"
            :class="['label', { 'error' : isError}]"
            v-model="model"
            :placeholder=placeholder
            :autocomplete = autocomplete
            @change="$emit('change')"

        />
        <div
            v-if="isPasswordField"
            class="toggle_icon"
            @click="togglePasswordVisibility"
        >
            {{ shouldHidePassword ? "🙈" : "🙉" }}
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
    // modelValue: {
    //     type: String,
    //     default: "",
    // },
    placeholder: {
        type: String,
    },
    id: {
        type: [String, Number],
        default: "",
    },
    autocomplete: {
        type: String,
        default:"off",
    },
    isError: {
        type: Boolean,
        default: false
    },
});

const model = defineModel()

const emit = defineEmits(['change'])

const isPasswordField = String(props.id).toLowerCase().includes("password");

const shouldHidePassword = ref(isPasswordField);



const togglePasswordVisibility = () => {
    shouldHidePassword.value = !shouldHidePassword.value;
};


</script>

<style lang="scss" scoped>
.myLabel_container {
    position: relative;
    display: inline-block;
    width: 100%;
}

.label {
    padding: 5px 30px 5px 5px;
    border: 2px solid #00000000;
    border-radius: 10px;
    width: 100%;
    height: 33px;
    background-color: var(--main-grey-color);

}

.error{
    border: 2px solid var(--main-red);
}

.toggle_icon {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    user-select: none;
}
</style>
