<template>
        <div class="w-screen h-screen flex flex-col bg-gray-100 overflow-x-hidden">
                <RouterView />
                <Loading />
        </div>
</template>

<script setup lang="ts">
import Loading from '@components/Loading.vue';
import { useRouter } from 'vue-router';
import useOauthGoogle from '@composables/useOauthGoogle';
import { useToast } from 'primevue/usetoast';
import Cookies from 'js-cookie';
import clearAllCookies from './shared/helpers/clearAllCookies';
import { useUserStore } from './shared/stores/userStore';

const { signOutWithGoogle } = useOauthGoogle();

const router = useRouter();
const toast = useToast();
const timeSesionExpired = parseInt(Cookies.get('timeSesionExpired') || '0');
const timeResult = timeSesionExpired - new Date().getTime();
console.log('timeResult', timeResult / 1000);
if (timeResult <= 0) {
        clearAllCookies();
        router.push({ name: 'presentation' });
}

if (Cookies.get('sesionActive') === "true") {
        console.log('Sesión Activa');
        useUserStore().loadData();
        setTimeout(() => {
                router.push({ name: 'presentation' });
                toast.add({ severity: 'info', summary: 'Sesión expirada', detail: 'Su sesión ah expirado, Inicie Sesión', life: 3000 });
                signOutWithGoogle();
        }, timeResult);
} else console.log('Sesión No-Activa');

console.log(Cookies.get('token'));


</script>