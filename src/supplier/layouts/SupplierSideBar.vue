<template>
    <div class="flex flex-col h-screen">
        <!-- Header -->
        <header class="bg-teal-900 text-white p-4 h-20 flex items-center justify-between">
            <h1 class="text-lg font-bold mx-auto">{{ titlePage }}</h1>
            <el-dropdown placement="bottom-end">
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="settings">
                            <router-link :to="{ name: ''}" class="flex items-center w-full">
                                <i class="pi pi-cog"></i>
                                <span v-if="isExpanded" class="">Configuración</span>
                            </router-link>
                        </el-dropdown-item>
                        <el-dropdown-item command="logout">
                            <Button class="flex items-center w-full"
                                @click="signOut">
                                <i class="pi pi-power-off"></i>
                                <span v-if="isExpanded">Cerrar Sesión</span>
                            </Button>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
                <button class="flex items-center space-x-2 focus:outline-none">
                    <img v-if="userStore.photoUrl" :src="userStore.photoUrl" alt="Foto de perfil"
                        class="w-10 h-10 rounded-full cursor-pointer" />
                </button>
            </el-dropdown>
        </header>

        <div class="flex flex-1 overflow-hidden">
            <!-- Sidebar -->
            <aside :class="[
                'bg-teal-900 text-white transition-all duration-300 flex flex-col',
                isExpanded ? 'w-64' : 'w-20'
            ]">
                <div class="sticky top-0 w-full">
                    <button @click="toggleSidebar"
                        class="text-white w-full py-4 flex justify-center focus:outline-none hover:bg-teal-700">
                        <i :class="[isExpanded ? 'pi pi-angle-double-left' : 'pi pi-angle-double-right']"></i>
                    </button>
                </div>

                <!-- Menú de íconos y textos -->
                <ul class="mt-8">
                    <li v-for="route in routes">
                        <router-link :to="{name: route.name}"
                            class="flex items-center w-full py-4 px-8 rounded hover:bg-teal-700"
                            :class="{ 'bg-teal-600': isRouteSelected === route.name }" @click="changeRoute(route.name)">
                            <i :class="['pi', route.icon, 'text-xl']"></i>
                            <span v-if="isExpanded" class="ml-4">{{ route.title }}</span>
                        </router-link>
                    </li>
                </ul>

                <!-- Botón de Cerrar sesión, con margen automático para empujarlo hacia abajo -->
                <!-- <div class="mt-auto">
                    <Button class="flex items-center w-full py-4 px-8 rounded hover:bg-teal-700" @click="signOut">
                        <i class="pi pi-power-off"></i>
                        <span v-if="isExpanded" class="ml-4">Cerrar Sesión</span>
                    </Button>
                </div> -->
            </aside>

            <!-- Contenedor Principal -->
            <div class="flex-1 p-6 bg-gray-100 overflow-y-auto">
                <router-view />
            </div>
        </div>
    </div>
</template>



<script setup lang="ts">
import useSidebar from '@supplier/composables/useSideBar';
import { ElMessage } from "element-plus";
const {
    routes,
    isRouteSelected,
    isExpanded,
    titlePage,
    signOut,
    toggleSidebar,
    changeRoute,
    userStore
} = useSidebar();

</script>
