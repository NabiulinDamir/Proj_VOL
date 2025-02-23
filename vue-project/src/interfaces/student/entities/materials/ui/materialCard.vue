<template>
    <MyAccordeon>
        <template #header>
            <div>
                {{ theory?.title }}
            </div>
        </template>
        <template #content>
            <div>
                <hr class="line" />
                Описание:  {{ theory.content ? theory.content : "отсутствует" }}
                <hr class="line" />
                Файл: {{ theory.files ? theory.files : "отсутствует" }}      
                
                <!-- {{ theory ? theory : "отсутствует" }} -->
            </div>
        </template>
    </MyAccordeon>
</template>

<script setup>
import MyAccordeon from '@/shared/ui/myAccordeon.vue';

const props = defineProps({
    theory: {type: Object},
});

</script>

<style lang="scss" scoped>

// #Container{
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
//     transition:  0.2s;
//     &_border{
//         height: 66px;
//         padding: 3px;
//         border-radius: 15px;
//         transition: 0.2s;
//         &:hover{
//             // background: var(--gradient-color);
//             background: var(--main-white-blue-color);
            
//         }
//     }

// }
// .Container_open{
//     height: 200px;
//     background-color: #f4f4f4;
//     -webkit-box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
//     -moz-box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
//     box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
//     padding: 13px;
//     border-radius: 12px;
// }
.line {
    height: 1px;
    background-color: #9292929a;
    border: 0px;
}
</style>