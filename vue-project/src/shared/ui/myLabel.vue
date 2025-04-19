<template>
    <div class="myLabel_container">
        <input
            :id="id"
            :type="shouldHidePassword ? 'password' : 'text'"
            class="label"
            v-model="model"
            :placeholder=placeholder
            :autocomplete = autocomplete
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
    }
});

const model = defineModel()


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
    padding: 8px 30px 8px 5px;
    border: 1px solid #00000000;
    border-radius: 10px;
    width: 100%;
    height: 33px;
    background-color: var(--main-grey-color);
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
