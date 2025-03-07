<template>
    <MyAccordeon>
        <template #header>
            <div class="Header">
                <img id="profile_img" src="@/ico//user/icons8-user-90.png" alt="">
                {{ user.lastname + " " + user.name }}
                
            </div>
        </template>
        <template #content>
            <div class="Content">
                <hr class="line" />
                Почта: {{ user.email ? user.email : "отсутствует" }}
                <hr class="line" />
                Группа: {{ user.group.name ? user.group.name : "отсутствует" }}
                <hr class="line" />
                Роль: {{ user.role ? user.role : "отсутствует" }}
                <!--<hr class="line" />
                Дедлайн: {{ lab.deadline ? lab.deadline.replace(/T/g, ' ') : "отсутствует" }}
                <hr class="line" /> -->
            </div>
        </template>
    </MyAccordeon>
</template>

<script setup>
import MyAccordeon from "@/shared/ui/myAccordeon.vue";

const props = defineProps({
    user: {type: Object, required: true },
});



// const emit = defineEmits(["selectTheoryId"]);
// const emitSelectTheoryId = (theoryId) => {
//     emit("selectTheoryId", theoryId);
// };

</script>

<style lang="scss" scoped>
.Header{
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    height: 100%;
}
.line {
    height: 1px;
    background-color: #9292929a;
    border: 0px;
}
#profile_img {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    border: 2px solid var(--main-white-blue-color);
    border-radius: 8px;
    max-height: 100%;
    object-fit: contain;
}


</style>
