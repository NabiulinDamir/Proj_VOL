<template>
    <div class="consultationsPage_container">
        <createCons/>
        <consultationTable/>
        <consultationsMenu user-role="Teacher"/>
    </div>
</template>

<script setup>
import consultationTable from '@/entities/consultation/ui/consultationTable.vue';
import createCons from '@/features/consultationsModalMenu/ui/createCons.vue';
import consultationsMenu from '@/entities/consultation/ui/consultationsMenu.vue';
</script>

<style lang="scss" scoped>
.consultationsPage_container{
    display: flex;
    flex-direction: column;
    gap: 7px;
    
}
</style> 