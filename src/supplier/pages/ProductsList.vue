<template>
    <!-- paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]"   -->
    <div v-if="isLoading" class="p-6 bg-gray-100 min-h-screen">
        <LoadingTable :headers="['Nombre del Producto', 'Descripción', 'Categoria', 'Stock', 'Image', 'Opciones']"></LoadingTable>
    </div>
    <div class="p-6 bg-gray-100 min-h-screen" v-show="!isLoading">
        <DataTable :value="dataProductos" tableStyle="min-width: 50rem"
            class="shadow-lg border border-gray-200 rounded-lg bg-white">
            <Column field="Product_Name" header="Nombre del Producto" class="px-4 py-2 border-b border-gray-300">
            </Column>
            <Column field="Product_Description" header="Descripción" class="px-4 py-2 border-b border-gray-300">
            </Column>
            <Column field="Product_Category" header="Categoria" class="px-4 py-2 border-b border-gray-300"></Column>
            <Column field="Product_Stock" header="Stock" class="px-4 py-2 border-b border-gray-300"></Column>
            <Column header="Image" class="px-4 py-2 border-b border-gray-300">
                <template #body="slotProps">
                    <img :src="slotProps.data.Product_Images[0]" :alt="slotProps.data.Product_Images[0]"
                        class="w-12 rounded" v-if="slotProps.data.Product_Images[0]" />
                    <Avatar label="X" class="mr-2" style="background-color: #dee9fc; color: #1a2551" v-else />
                </template>
            </Column>
            <Column header="Opciones" class="px-4 py-2 border-b border-gray-300">
                <template #body="slotProps">
                    <div class="size-full flex items-center justify-center">
                        <!-- <IconButton icon="pi pi-eye" text="Detalles" @click="" cyan/> -->
                        <router-link :to="{ name: 'ModifyProduct', params: { id: slotProps.data.Product_ID } }">
                            <IconButton icon="pi pi-eye" text="Detalles" @click="" cyan/>
                        </router-link>
                    </div>
                </template>
            </Column>
        </DataTable>
        <Paginator :rows="dataPagination?.per_page" :totalRecords="dataPagination?.total" class="paginationCli"
            @page="onPageChange" />
    </div>
</template>

<script setup lang="ts">
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Paginator from 'primevue/paginator';

import Avatar from 'primevue/avatar';

import useProducts from '@/supplier/composables/useProducts';
import IconButton from '@/shared/components/IconButton.vue';
import LoadingTable from '@/shared/components/LoadingTable.vue';

const {
    dataProductos,
    dataPagination,
    isLoading,
    onPageChange
} = useProducts();



</script>

<style>
.paginationCli {
    @apply bg-white shadow-lg rounded-md;
}

.paginationCli div {
    @apply bg-transparent;
}

.paginationCli div div {
    @apply bg-transparent;
}

.paginationCli div div span .p-paginator-page-selected {
    @apply bg-black text-white;
}

.paginationCli div div button {
    @apply hover:bg-black hover:text-white;
}
</style>

<style scoped></style>