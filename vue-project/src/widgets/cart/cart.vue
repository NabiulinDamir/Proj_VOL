<template>
    <!-- <div class="Cart">
        <div class="Container-Up">
            <div class="info">
            {{ isTeatcher ? "Преподаватель" : "Студент"  }}<br>
            {{ userLastName }} {{ userName }} <br>
            {{ isTeatcher ? "" : `Группа ${studentGroup}` }}
        </div>
            <div class="img">
                <img src="../../ico/user/icons8-user-90.png" alt="ошибка" />
            </div>
        </div>

        <div class="Container-Bottom">
            <div class="line_info">
                Имя:
                <div class="line_info_text" v-if="!editMode">
                    {{ userName }}
                </div>
                <input
                    type="text"
                    v-if="editMode"
                    class="line_info_input"
                    :value="userName"
                    :v-model="nevUserName"
                />
            </div>
            <hr class="line" />
            <div class="line_info">
                Фамилия:
                <div class="line_info_text" v-if="!editMode">
                    {{ userLastName }}
                </div>
                <input
                    type="text"
                    v-if="editMode"
                    class="line_info_input"
                    :value="userLastName"
                    :v-model="nevUserLastName"
                />
            </div>
            <hr class="line" />
            <div class="line_info">
                Пользователь:
                <div class="line_info_text" v-if="!editMode">
                    {{ userUserName }}
                </div>
                <input
                    type="text"
                    v-if="editMode"
                    class="line_info_input"
                    :value="userUserName"
                    :v-model="nevUserUserName"
                />
            </div>
            <hr class="line" />
            <div class="line_info">
                Почта:
                <div class="line_info_text" v-if="!editMode">
                    {{ userEmail }}
                </div>
                <input
                    type="text"
                    v-if="editMode"
                    class="line_info_input"
                    :value="userEmail"
                    :v-model="nevUserEmail"
                />
            </div>
            <hr class="line" />

            <div id="down_container">
                <div id="down_container_button" @click="logout()">Выход</div>
                <div style="display: flex">
                    <div id="down_container_edit" @click="save()">
                        <img v-if="editMode" src="../../ico/user/check.png" alt="" />
                    </div>
                    <div id="down_container_save" @click="edit()">
                        <img v-if="!editMode" src="../../ico/user/icons8-edit-24.png" alt="">
                        <img v-if="editMode" src="../../ico/user/crossed.png" alt="">
                    </div>

                </div>
            </div>
        </div>
    </div> -->
</template>

<script setup>
// import { useCurrentUserStore } from "@/entities/user/stores/user";
// import { useCurrentTeacherStore} from "@/entities/teacher/stores/teacher"
// import { useCurrentStudentStore } from "@/entities/student/stores/student";
// import { useRouter } from "vue-router";
// import { ref } from "vue";

// const router = useRouter();
// const User = useCurrentUserStore();
// const userName = User.name;
// const userLastName = User.lastName;
// const userEmail = User.email;
// const userUserName = User.userName;
// const editMode = ref(false);
// const isTeatcher = (User.role === 1)
// const teacher = useCurrentTeacherStore();
// const student = useCurrentStudentStore();
// const studentGroup = student.group_name;

// let nevUserName = ref('')
// let nevUserLastName = ref('')
// let nevUserEmail = ref('')
// let nevUserUserName = ref('')



// const logout = () => {
//     User.logout();
//     router.push("/");
// };

// const edit = () => {
//     editMode.value = !editMode.value;
// };

// const save = () => {
    
// };
</script>

<style lang="scss" scoped>
.Cart {
    width: 250px;
    height: 100%;
    overflow: hidden;
    background-color: var(--main-white-blue-color);
    font-size: 0.8em;
    transition: height 0.5s ease, transform 0.5s ease; // Добавляем переход для height и transform
    color: #000000;

    &:hover {
        height: min-content; // Это может вызвать проблемы с анимацией, если min-content слишком мал
        z-index: 1000;
        border-bottom-left-radius: 15px;

        .Container-Up {
            height: 61px;
            border-bottom: 1px solid rgb(57, 57, 57);
        }
    }
}
.Container-Up {
    width: 100%;
    height: 60px;
    display: flex;
    // align-items: center;
    justify-content: space-between;
}
.Container-Bottom {
    padding: 10px;
}

//line_info_input
.line {
    height: 1px;
    background-color: #9292929a;
    border: 0px;
    &_info {
        display: flex;
        align-items: center;
        height: 19px;
        &_input {
            outline: none;
            width: 100%;
            // background-color:#20202000;
            // border: 0px;
            // margin-left: 2px;
        }
        &_text {
            margin-left: 3px;
        }
    }
}
.info {
    display: flex;
    align-items: start;
    
    font-family: "Geneva", sans-serif;
    font-size: 14px;
    padding-top: 5px;
    
}
.img {
    // aspect-ratio: 1/1;
    height: calc(100% - 4px);
    display: flex;
    // border: 1px solid rgb(72, 72, 72);
    border-radius: 10px;
    overflow: hidden;

    // border-left: 1px solid rgb(223, 223, 223);
}
#down_container {
    align-items: center;
    display: flex;
    justify-content: space-between;
    user-select: none;
    &_button {
        height: 30px;
        width: 75px;
        border: 1px solid black;
        margin: 4px;
        font-size: 16px;
        border-radius: 5px;
        background-color: #202020;
        border-color: var(--main-white-blue-color);
        color: #ffffff;
        transition: 0.1s;
        text-decoration: none;
        place-content: center;
        text-align: center;
        user-select: none;
        &:hover {
            border: 1px solid #202020;
        }
    }
    &_edit, &_save {
        margin-right: 13px;
        height: 24px;
        display: flex;
        overflow: hidden;
    }
}
</style>
