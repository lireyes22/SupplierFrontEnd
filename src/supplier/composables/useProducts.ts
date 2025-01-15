
import { computed, ref, watch } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import { getProducts } from '@/shared/services/productService';
import type { meta, Product } from '@/shared/interfaces';


export default function useProducts() {

    const dataProductos = ref<Product[]>([]); // Almacena los productos
    const dataPagination = ref<meta>();
    const currentPage = ref(1);
    const onPageChange = (event: any) => {
        currentPage.value = event.page + 1;
    };

    const { data:dataQProducts, isLoading:isLoadingProducts } = useQuery({
        queryKey: ['products', currentPage],
        queryFn: async () => getProducts({page: currentPage.value}),
    });

    watch(dataQProducts, ()=>{
        if(dataQProducts.value){
            dataProductos.value = dataQProducts.value.data;
            dataPagination.value = dataQProducts.value.meta;
        }
    }, {immediate: true});

    return {
        dataProductos,
        dataPagination,
        isLoading: computed(()=>isLoadingProducts.value),
        currentPage,
        onPageChange
    }

}