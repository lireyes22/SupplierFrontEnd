<template>
    <DataTable :value="data" tableStyle="min-width: 50rem"
        class="shadow-lg border border-gray-200 rounded-lg bg-white">
        <!-- Definir columnas con Skeleton para simular carga -->
        <Column :header="header" class="px-4 py-2 border-b border-gray-300" v-for="header in props.headers" :key="header">
            <template #body="slotProps">
                <div class="size-full flex items-center justify-center">
                    <Skeleton class="px-4 py-2 border-b border-gray-300"></Skeleton>
                </div>
            </template>
        </Column>        
    </DataTable>
</template>

<script setup lang="ts">


import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Skeleton from 'primevue/skeleton';
import { defineProps } from 'vue';


interface Props {
    headers: string[];
}

const props = defineProps<Props>();


let data:any = []

for (let i = 0; i < 10; i++) {
    data.push(props.headers);
}


</script>

<style scoped></style>