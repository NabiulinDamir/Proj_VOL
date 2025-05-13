<template>
    <div class="multi-select">
        <!-- Поле ввода с выпадающим списком -->
        <div class="select-input" @click="toggleDropdown">
            <span v-if="selectedElements === null" class="placeholder">
                {{ placeholder }}
            </span>
            <div v-else class="selected-tags">
                    {{ selectedElements.name }}
                    <!-- <button @click.stop="removeGroup(item)" class="remove-btn">
                        ×
                    </button> -->
            </div>
            <span class="arrow-icon">{{ isOpen ? "▲" : "▼" }}</span>
        </div>

        <!-- Выпадающий список с поиском и чебоксарами -->
        <div v-if="isOpen" class="dropdown">
            <input
                v-model="searchQuery"
                type="text"
                placeholder="Поиск..."
                class="search-input"
                @click.stop
            />
            <div class="options-list">
                <label
                    v-for="item in filteredElements"
                    :key="item.id"
                    class="option"
                >
                    <input
                        type="radio"
                        :checked="selectedElements?.id === item.id"
                        @change="toggleGroup(item), $emit('change')"
                        :value="item.id" 
                        name="radioGroup"
                    />
                    {{ item.name }}
                </label>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
    allElements: {
        type: Array,
        default: () => [{id: 0, name: "ошибка"}, {id: 1, name: "загрузки"}],
    },
    toggleElement: {
        type: Object,
        default: () => null,
    },
    placeholder: {
        type: String,
        default: "",
    },
});

const emit = defineEmits(["update:modelValue", "change"]);

const isOpen = ref(false);
const searchQuery = ref("");
const selectedElements = ref(props.toggleElement);

// Фильтрация групп по поиску
const filteredElements = computed(() => {
    return props.allElements.filter((element) =>
        element.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
});

// Переключение группы
const toggleGroup = (item) => {
    selectedElements.value = item;
    emit("update:modelValue", selectedElements.value);
};

// Открытие/закрытие dropdown
const toggleDropdown = () => {
    isOpen.value = !isOpen.value;
};

// Закрытие dropdown при клике вне компонента
document.addEventListener("click", (e) => {
    if (!e.target.closest(".multi-select")) {
        isOpen.value = false;
    }
});
</script>

<style lang="scss" scoped>
.multi-select {
    position: relative;
    width: 100%;
    font-size: 16px;

    .select-input {
        width: 100%;
        min-height: 35px;
        padding: 8px 12px;
        background-color: var(--main-grey-color);
        border-radius: 7px;
        cursor: pointer;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 6px;

        .placeholder {
            color: rgba(0, 0, 0, 0.5);
        }

        .selected-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
        }

        .tag {
            background: #e0e0e0;
            padding: 0px 8px;
            border-radius: 4px;
            display: flex;
            align-items: center;
            gap: 4px;
        }

        .remove-btn {
            border: none;
            background: none;
            cursor: pointer;
            color: #666;
            font-size: 14px;
            padding: 0;
            margin: 0;
        }

        .arrow-icon {
            margin-left: auto;
            font-size: 12px;
        }
    }
    input[type="checkbox"] {
        accent-color: var(--main-white-blue-color); /* Зелёный цвет галочки */
        width: 16px; /* Размер */
        height: 16px;
    }

    .dropdown {
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        margin-top: 4px;
        background: white;
        border-radius: 7px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 100;
        max-height: 250px;
        overflow-y: auto;

        .search-input {
            width: 100%;
            padding: 8px 12px;
            border: none;
            border-bottom: 1px solid #eee;
            outline: none;
        }

        .options-list {
            padding: 8px 0;

            .option {
                display: flex;
                padding: 8px 12px;
                align-content: center;
                user-select: none;
                cursor: pointer;

                &:hover {
                    background: #f5f5f5;
                }

                input {
                    margin-right: 8px;
                }
            }
        }
        
    }
    input[type="radio"] {
        appearance: none; /* Скрываем стандартный вид */
        -webkit-appearance: none;
        width: 16px;
        height: 16px;
        border: 2px solid var(--main-white-blue-color);
        border-radius: 50%; /* Круглая форма */
        margin-right: 8px;
        position: relative;
        cursor: pointer;
        
        &:checked {
            background-color: var(--main-white-blue-color);
            &::after {
                content: '';
                position: absolute;
                width: 4px;
                height: 4px;
                background: white;
                border-radius: 50%;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }
        }
        
        &:hover {
            opacity: 0.8;
        }
}
}
</style>
