<template>

    <LoadingPage v-if="isLoading" color="blue" wh200 />

    <div class="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg" v-if="!isLoading">
        <h2 class="text-2xl font-bold mb-6 text-center">Agregar nuevo producto</h2>

        <div class="space-y-6">

            <!-- Nombre del Producto -->
            <div>
                <label for="nombre" class="block text-sm font-medium text-gray-700">Nombre del Producto</label>
                <input id="nombre" v-model="producto.Product_Name" type="text" required
                    class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" />
            </div>

            <!-- Categoria del Producto -->
            <div>
                <label for="categoria" class="block text-sm font-medium text-gray-700">Categoría del Producto</label>
                <select id="categoria" v-model="producto.Product_Category" required
                    class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm">
                    <option value="">Selecciona una categoría</option>
                    <option value="Aretes">Aretes</option>
                    <option value="Pulseras">Pulseras</option>
                    <option value="Collares">Collares</option>
                    <option value="Anillos">Anillos</option>
                    <option value="Conjuntos">Conjuntos</option>
                </select>
            </div>

            <div class="moy">
                <label for="nombre" class="block text-sm font-medium text-gray-700">Imagenes del Producto</label>
                <FileUpload @select="onSelectedFiles" :multiple="true" @dragover.prevent @drop="onDrop">
                    <template #header="{ chooseCallback, uploadCallback, clearCallback, files }">
                        <div class="flex flex-wrap justify-between items-center flex-1 gap-4">
                            <div class="w-full flex">
                                <!-- Botón Upload con margen derecho -->
                                <IconButton @click="chooseCallback()" class="mr-2" color="blue" icon="pi pi-upload"
                                    text="upload" outlined blue />
                                <!-- Botón Clear -->
                                <IconButton @click="removeAllFiles(clearCallback)" color="red" icon="pi pi-trash"
                                    text="clear" outlined red />
                            </div>
                        </div>
                    </template>
                    <template #content="{ files, uploadedFiles, removeUploadedFileCallback, removeFileCallback }">
                        <div class="flex flex-col gap-8 pt-4">
                            <div v-if="files.length > 0">
                                <div class="flex flex-wrap gap-4">
                                    <div v-for="(file, index) of files" :key="file.name + file.type + file.size"
                                        class="p-8 rounded-border flex flex-col border border-surface items-center gap-4">
                                        <div>

                                            <Image :src="pathExist(file)" :alt="file.name" width="100" height="50"
                                                preview />
                                        </div>
                                        <span
                                            class="font-semibold text-ellipsis max-w-60 whitespace-nowrap overflow-hidden">
                                            {{ file.name }}
                                        </span>
                                        <div>{{ formatFileSize(file.size) }}</div>
                                        <Button icon="pi pi-times" @click="removeFile(files, removeFileCallback(index))"
                                            outlined rounded severity="danger"></Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>
                    <template #empty>
                        <!-- Área de arrastrar y soltar -->
                        <div class="w-full border-dashed border-4 border-gray-300 rounded-lg p-8 text-center cursor-pointer transition-all duration-300 ease-in-out hover:border-blue-400 hover:bg-blue-50"
                            @dragover.prevent @drop="onDrop">
                            <p class="text-gray-500 font-semibold text-lg">
                                Arrastra y suelta los archivos aquí o haz clic en "Upload"
                            </p>
                            <p class="text-sm text-gray-400">
                                (Formatos permitidos: PNG, JPG, JPEG)
                            </p>
                        </div>
                    </template>
                </FileUpload>

            </div>

            <!-- Descripción -->
            <div>
                <label for="descripcion" class="block text-sm font-medium text-gray-700">Descripción</label>
                <textarea id="descripcion" v-model="producto.Product_Description" required rows="4"
                    class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"></textarea>
            </div>

            <!-- Stock -->
            <div>
                <label for="stock" class="block text-sm font-medium text-gray-700">Stock</label>
                <input id="stock" v-model="producto.Product_Stock" type="number" min="1" required
                    class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
            </div>

            <!-- Métodos de Pago -->
            <div>
                <div class="flex items-center justify-between">
                    <label class="block text-sm font-medium text-gray-700">Métodos de Pago</label>
                    <IconButton icon="pi pi-plus" text="Agregar Metodo" @click="dialogMetod = true" green />
                </div>

                <DataTable :value="producto.Product_PaymentMethodsAvailable" class="mt-2 columnsCli">
                    <Column field="Product_PaymentMethod" header="Método de Pago"></Column>
                    <Column field="Product_Price" header="Precio"></Column>
                    <Column field="Product_Discount" header="Descuento"></Column>
                    <Column field="Product_DiscountAvailable" header="Activo">
                        <template #body="slotProps">
                            <ToggleSwitch v-model="slotProps.data.Product_DiscountAvailable" class="mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />

                        </template>
                    </Column>
                    <Column header="Opciones" class="columnsCli">
                        <template #body="slotProps">
                            <div class="size-full flex items-center justify-center">
                                <IconButton icon="pi pi-times" @click="removeMetodoDePago(slotProps.index)" red />
                                <IconButton icon="pi pi-pencil" @click="editMetodoDePago(slotProps.index)" blue />
                            </div>
                        </template>
                    </Column>
                </DataTable>
            </div>
            <!-- Botón de Enviar -->
            <div class="flex justify-center">
                <!-- Botón Upload con margen derecho -->
                <IconButton icon="pi pi-pencil" text="Actualizar" @click="updateProducto" purple />
            </div>
        </div>
    </div>
    <Dialog v-model:visible="dialogMetod" modal header="Agregar Metodo De Pago" :style="{ width: '25rem' }">
        <div class="gap-4 mb-4">
            <label for="stock" class="block text-sm font-medium text-gray-700">Metodo De Pago</label>
            <select v-model="modelAddMethod.Product_PaymentMethod"
                class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
                <option value="">Selecciona un método</option>
                <option value="efectivo">Contado</option>
                <option value="credito">Crédito</option>
            </select>
        </div>
        <div class="gap-4 mb-4">
            <label for="stock" class="block text-sm font-medium text-gray-700">Precio</label>
            <input id="stock" type="number" min="1"  v-model="modelAddMethod.Product_Price"
                class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
        </div>
        <div class="gap-4 mb-4">
            <label for="stock" class="block text-sm font-medium text-gray-700">Descuento</label>
            <input id="stock" type="number" min="1"  v-model="modelAddMethod.Product_Discount"
                class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
        </div>
        <div class="flex gap-4 mb-4">
            <ToggleButton v-model="modelAddMethod.Product_DiscountAvailable" onLabel="Activado" offLabel="Desactivado" class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
        </div>
        <div class="flex justify-end gap-2">
            <ButtonCli text="Cancelar" @click="cancelDialogMetod" red />
            <ButtonCli text="Guardar" @click="cancelDialogMetod" cyan v-if="editMetod" />
            <ButtonCli text="Agregar" @click="addMetodoDePago" cyan v-if="!editMetod"/>
        </div>
    </Dialog>
    <Toast position="bottom-right" group="br" />
</template>

<script setup lang="ts">
//COMPONENTES 
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import IconButton from '@/shared/components/IconButton.vue';
import ButtonCli from '@/shared/components/ButtonCli.vue';
import useModifyProducto from '../composables/useModifyProduct';
import FileUpload from 'primevue/fileupload';
import Button from 'primevue/button';
import Image from 'primevue/image';
import Toast from 'primevue/toast';
import LoadingPage from '@/shared/components/LoadingPage.vue';
import Dialog from 'primevue/dialog';
import ToggleButton from 'primevue/togglebutton';
import ToggleSwitch from 'primevue/toggleswitch';

interface Props {
    id: string;
}

const props = defineProps<Props>();

const {
    producto,
    isLoading,
    dialogMetod,
    modelAddMethod,
    editMetod,
    //saveEditMetodoDePago,
    editMetodoDePago,
    cancelDialogMetod,
    addMetodoDePago,
    removeMetodoDePago,
    onSelectedFiles,
    onDrop,
    formatFileSize,
    removeAllFiles,
    removeFile,
    addProducto,
    updateProducto
} = useModifyProducto(props.id);



const pathExist = (file: File) => {
    //@ts-ignore
    return file.objectURL || file.url;
}

</script>

<style>
.moy div .p-fileupload-header,
.moy div .p-fileupload-content {
    @apply p-0;
}

.columnsCli div thead tr th,
.columnsCli div tbody tr td {
    @apply px-4 py-2 border-b border-gray-300;
}

.columnsCli div thead tr th span {
    @apply size-full flex items-center justify-center;
}

.columnsCli div table tbody tr td {
    @apply text-center;
}

.moy div .p-fileupload-header {
    @apply mt-2;
}
</style>