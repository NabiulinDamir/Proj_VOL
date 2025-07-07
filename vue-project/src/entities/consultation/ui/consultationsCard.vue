<template>
    <myAccordeon >
        <template #header>
            {{ `${formatDateRange(cons.start_time, cons.end_time)}` }}
        </template>
        <template #content>
            <div class="Content">
                <hr class="line" />
                {{ `Описание: ${cons.description}` }}
                <hr class="line" />
                {{ `Группа: ${cons.group_name}` }}
                <hr class="line" />
                {{ `Предмет: ${cons.subject_name}` }}
                <hr class="line" />
                {{ `Продолжительность: ${(differenceInMinutes(cons.end_time, cons.start_time))} минут` }}
                <!-- Почта: {{ user.email ? user.email : "отсутствует" }} -->
                <!-- <hr class="line" />
                Группа: {{ user.group.name ? user.group.name : "отсутствует" }} -->
                <!-- <hr class="line" />
                Роль: {{ user.role ? user.role : "отсутствует" }} -->
                
                <!--<hr class="line" />
                Дедлайн: {{ lab.deadline ? lab.deadline.replace(/T/g, ' ') : "отсутствует" }}
                <hr class="line" /> -->
            </div>
        </template>
    </myAccordeon>
</template>
<script setup>
import myAccordeon from '@/shared/ui/myAccordeon.vue';
import {format, isSameDay, setHours, getMinutes, parseISO, compareAsc, differenceInMinutes} from 'date-fns';

const props = defineProps({
    cons: {type: Object, required: true },
});


const formatDateRange = (startDateStr, endDateStr) => {
  const startDate = parseISO(startDateStr);
  const endDate = parseISO(endDateStr);
  
  const datePart = format(startDate, 'dd.MM');
  const startTime = format(startDate, 'HH:mm');
  const endTime = format(endDate, 'HH:mm');
  
  return `${datePart} ${startTime}-${endTime}`;
};
</script>

<style lang="scss" scoped>
.line {
    display: flex;
    flex-direction: row;
    align-items: center;
    user-select: none;
    height: 0px;
}
</style>