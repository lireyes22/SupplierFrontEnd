<template>
    <div class="min-h-screen bg-gradient-to-b from-teal-500 to-gray-100 flex items-center justify-center">
        <!-- Contenedor del login -->
        <div class="bg-white shadow-md rounded-lg p-6 w-96">
            <!-- Título -->
            <h2 class="text-2xl font-bold text-teal-600 text-center mb-4">
                Tienda Virtual
            </h2>

            <!-- Formulario de inicio de sesión -->
            <div class="space-y-4">
                <div>
                    <label for="email" class="block text-sm font-medium text-gray-700">
                        Correo Electrónico
                    </label>
                    <input id="email" type="email" placeholder="Email" v-model="accountSignIn.email"
                        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500" />
                </div>

                <div>
                    <label for="password" class="block text-sm font-medium text-gray-700">
                        Contraseña
                    </label>
                    <input id="password" type="password" placeholder="Password" v-model="accountSignIn.password"
                        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500" />
                </div>

                <a href="#" class="text-sm text-teal-600 hover:underline block text-right">
                    ¿Olvidaste tu contraseña?
                </a>

                <!-- Botón Iniciar sesión -->
                <button type="submit" @click="handleSignIn('email')"
                    class="w-full py-2 px-4 bg-teal-600 text-white font-bold rounded-lg hover:bg-teal-700">
                    Iniciar Sesión
                </button>
            </div>

            <!-- Separador -->
            <div class="flex items-center my-4">
                <hr class="w-full border-gray-300" />
                <span class="px-2 text-gray-500">o</span>
                <hr class="w-full border-gray-300" />
            </div>

            <!-- Botón Google -->
            <IconButton @click="handleSignIn('google')" icon="pi pi-google" text="Iniciar Sesión con Google" green rounded />
        </div>
    </div>
</template>

<script setup lang="ts">
import usePresentationComposable from "@/presentation/composables/usePresentationComposable";
import IconButton from "@/shared/components/IconButton.vue";
const { handleSignIn, accountSignIn } = usePresentationComposable();
</script>