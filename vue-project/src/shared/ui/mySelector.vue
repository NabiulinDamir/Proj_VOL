<template>
    <div class="multi-select">
        <!-- Поле ввода с выпадающим списком -->
        <div class="select-input" @click="toggleDropdown">
            <span v-if="selectedElements.length === 0" class="placeholder">
                {{ placeholder }}
            </span>
            <div v-else class="selected-tags">
                <span v-for="item in selectedElements" :key="item.id" class="tag">
                    {{ item.name }}
                    <button @click.stop="removeGroup(item)" class="remove-btn">
                        ×
                    </button>
                </span>
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
                        type="checkbox"
                        :checked="selectedElements.includes(item)"
                        @change="toggleGroup(item)"
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
        default: () => [{id: 0, name: "ошибка"}],
    },
    toggleElements: {
        type: Array,
        default: () => [],
    },
    placeholder: {
        type: String,
        default: "",
    },
});

const emit = defineEmits(["update:modelValue"]);

const isOpen = ref(false);
const searchQuery = ref("");
const selectedElements = ref(props.toggleElements);

// Фильтрация групп по поиску
const filteredElements = computed(() => {
    return props.allElements.filter((element) =>
        element.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
});

// Переключение группы
const toggleGroup = (item) => {
    if (selectedElements.value.includes(item)) {
        selectedElements.value = selectedElements.value.filter(
            (g) => g.id !== item.id
        );
    } else {
        selectedElements.value = [...selectedElements.value, item];
    }
    emit("update:modelValue", selectedElements.value);
};

// Удаление группы
const removeGroup = (item) => {
    selectedElements.value = selectedElements.value.filter((g) => g.id !== item.id);
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
}
</style>
