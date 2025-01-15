<template>
    <div class="w-full h-full flex items-center justify-center">

        <div class="flex flex-col justify-center space-y-2">
            <h1 class="text-7xl text-center font-semibold" v-if="sesionActive === 'true'">Error {{ error }}</h1>
            <p class="text-center text-lg text-gray-800" v-if="sesionActive === 'true'">Inicia Sesion</p>
            <p class="text-center text-lg text-gray-800" v-else>Lo lamentamos, al parecer hubo un error</p>
            <div class="flex items-center justify-center space-x-4">
                <button
                    class="bg-white border border-yellow-600 hover:bg-yellow-600 rounded-2xl py-1 px-2 hover:text-white text-yellow">
                    <p>Home</p>
                </button>
                <button
                    class="bg-yellow-600 border border-yellow-600 hover:bg-white rounded-2xl py-1 px-2 text-white hover:text-yellow-600">
                    <p>Contáctanos</p>
                </button>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import Cookies from 'js-cookie';
import { defineProps } from 'vue';
const props = defineProps<{
    error: string;
}>();

const sesionActive = Cookies.get('sesionActive');

</script>