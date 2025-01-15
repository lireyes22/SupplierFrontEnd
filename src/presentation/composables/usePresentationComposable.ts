// Dependencies
import { useRouter } from 'vue-router';
import { useMutation } from '@tanstack/vue-query';
import { useToast } from 'primevue/usetoast';
import Cookies from 'js-cookie';
//Composables
import useOauthGoogle from '@composables/useOauthGoogle';
//Services
import { auth } from '@services/oauthService';
//Stores
import { useLoadingStore } from '@stores/loadingStore';
import { useUserStore } from '@stores/userStore';
import { ref } from 'vue';


export default function usePresentationComposable() {
    const { signInWithGoogle, signInWithEmail, registerWithEmail } = useOauthGoogle();
    const router = useRouter();
    const loadingStore = useLoadingStore();
    const userStore = useUserStore();
    const toast = useToast();
    const accountSignIn = ref({
        email: '',
        password: '',
    });

    const mutationSignIn = useMutation({
        mutationFn: signIn,
        onSuccess: async (data) => {
            userStore.user = data.user;
            userStore.photoUrl = data.photoURL ?? '';
            userStore.sesionActive = true;
            Cookies.set('sesionActive', 'true', { expires: 1 / 24 });
            Cookies.set('photoUrl', data.photoURL ?? '', { expires: 1 / 24 });
            Cookies.set('user', JSON.stringify(data.user), { expires: 1 / 24 });
            const timeExpired = new Date().getTime() + 3600000;
            Cookies.set('timeSesionExpired', timeExpired.toString(), { expires: 1 / 24 });
            Cookies.set('isSupplier', 'true', { expires: 1 / 24 });
            router.push({ name: 'supplier' });
            loadingStore.hideLoading();
        },
        onError: (error) => {
            toast.add({ severity: 'error', summary: 'Ah Ocurrido Un Error', detail: 'Contacta con un administrador:' + error, life: 3000 });
            loadingStore.hideLoading();
        },
        retry: 0,
        retryDelay: 0,
    });
    async function signIn(type: string) {
        loadingStore.showLoading();
        const [a, photoURL, phoneNumber] = await signInWithGoogle();
        const user = await auth(phoneNumber);
        return { user, photoURL };
    };

    
    

    return {
        handleSignIn: mutationSignIn.mutate,
        isLoading: mutationSignIn.isPending,
        accountSignIn,
    };
}

