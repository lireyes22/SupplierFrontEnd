import { ref } from 'vue';
import { useRouter } from 'vue-router';
import useOauthGoogle from '@composables/useOauthGoogle';
import { useLoadingStore } from '@stores/loadingStore';
import { useUserStore } from '@stores/userStore';
import clearAllCookies from '@helpers/clearAllCookies';

export default function useSidebar() {
    const { signOutWithGoogle } = useOauthGoogle();
    const router = useRouter();
    const loadingStore = useLoadingStore();
    const userStore = useUserStore();
    const isRouteSelected = ref(sessionStorage.getItem('isRouteSelected') ?? 'supplier');
    const isExpanded = ref(sessionStorage.getItem('isExpanded') === 'true' ? true : sessionStorage.getItem('isExpanded') === 'false' ? false : true);
    const titlePage = ref('Home');

    const signOut = async () => {
        loadingStore.showLoading();
        signOutWithGoogle().then(() => {
            router.push({ name: 'presentation' });
            clearAllCookies();
            loadingStore.hideLoading();
        });
    };

    const routes = [
        { path: 'home', name: 'supplier', icon: 'pi-home', title: 'Home' },
        { path: 'products-list', name: 'ProductsList', icon: 'pi-table', title: 'Productos' },
        { path: 'add-product', name: 'AddProduct', icon: 'pi-plus-circle', title: 'Agregar Producto' },
    ];

    function toggleSidebar() {
        isExpanded.value = !isExpanded.value;
        sessionStorage.setItem('isExpanded', isExpanded.value.toString());
    };

    function changeRoute(route: string) {
        isRouteSelected.value = route;
        sessionStorage.setItem('isRouteSelected', route);
        titlePage.value = route;
    }

    return {
        //vars
        routes,
        isRouteSelected,
        isExpanded,
        titlePage,
        //functions
        signOut,
        toggleSidebar,
        changeRoute,
        //stores
        userStore,
    };
}
