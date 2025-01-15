// src/stores/loadingStore.ts
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import type { MainUser } from '@interfaces/.';
import Cookies from 'js-cookie';

export const useUserStore = defineStore('user', () => {

    const sesionActive = ref<boolean>(false);
    const user = ref<MainUser>();
    const photoUrl = ref<string>();
    const token = ref<string>();


    const userCookie = Cookies.get('user');
    if (userCookie) {
        user.value = JSON.parse(userCookie);
    }

    function isSupplier() {
        return user.value?.Supplier !== undefined;
    }
    function loadData() {
        //Cookies.set('user', JSON.stringify(data.user), { expires: 1 / 24 });
        photoUrl.value = Cookies.get('photoUrl');

        const userCookie = Cookies.get('user');
        if (userCookie) {
            user.value = JSON.parse(userCookie);
        }
    }

    return {
        user,
        photoUrl,
        token,
        sesionActive,
        //Functions computed
        isSupplier: computed(() => user.value?.Supplier !== undefined),
        loadData
    };
});
