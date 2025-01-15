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

            <!-- <div class="moy">
                <label for="nombre" class="block text-sm font-medium text-gray-700">Imagenes del Producto</label>
                <FileUpload @select="onSelectedFiles" :multiple="true" @dragover.prevent @drop="onDrop">
                    <template #header="{ chooseCallback, uploadCallback, clearCallback, files }">
                        <div class="flex flex-wrap justify-between items-center flex-1 gap-4">
                            <div class="w-full flex">
                                
                                <IconButton @click="chooseCallback()" class="mr-2" color="blue" icon="pi pi-upload"
                                    text="upload" outlined blue />
                                
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
            </div> -->

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
            <!-- <div>
                <div class="flex">
                    <h3 class="text-lg font-semibold text-gray-700 pr-2">Métodos de Pago</h3>
                    <IconButton icon="pi pi-plus-circle" @click="addMetodoDePago" blue />
                    <IconButton icon="pi pi-times-circle" @click="removeMetodoDePago" red />
                </div>
                <div v-for="(metodo, index) in producto.Product_PaymentMethodsAvailable" :key="index" class="space-y-4">
                    <div>
                        <label for="metodo" class="block text-sm font-medium text-gray-700">Método de Pago</label>
                        <select v-model="metodo.Product_PaymentMethod" required
                            class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
                            <option value="">Selecciona un método</option>
                            <option value="efectivo">Contado</option>
                            <option value="credito">Crédito</option>
                        </select>
                    </div>
                    <div>
                        <label for="precio" class="block text-sm font-medium text-gray-700">Precio</label>
                        <input v-model="metodo.Product_Price" type="number" required min="0"
                            class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <br>
                </div>
            </div> -->
            <!-- Botón de Enviar -->
            <div class="flex justify-center">
                <!-- Botón Upload con margen derecho -->
                <IconButton icon="pi pi-plus-circle" text="Agregar" @click="addProducto" blue />
            </div>
        </div>
    </div>
    <Toast position="bottom-right" group="br" />
</template>

<script setup lang="ts">
//COMPONENTES 
import IconButton from '@/shared/components/IconButton.vue';
import useAddProducto from '../composables/useAddProduct';
import FileUpload from 'primevue/fileupload';
import Button from 'primevue/button';
import Image from 'primevue/image';
import Toast from 'primevue/toast';
import LoadingPage from '@/shared/components/LoadingPage.vue';

const {
    producto,
    isLoading,
    addMetodoDePago,
    removeMetodoDePago,
    onSelectedFiles,
    onDrop,
    formatFileSize,
    removeAllFiles,
    removeFile,
    addProducto
} = useAddProducto();

const pathExist = (file:File) => {
    //@ts-ignore
    return file.objectURL || file.url;
}

</script>

<style>
.moy div .p-fileupload-header,
.moy div .p-fileupload-content {
    @apply p-0;
}

.moy div .p-fileupload-header {
    @apply mt-2;
}
</style>