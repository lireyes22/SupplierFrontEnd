
//referencias
import { computed, ref, watch } from 'vue';
import useImages from './useImages';

import type { Product, ProductPaymentMethodsAvailable } from '@interfaces/Product';
import { useUserStore } from '@stores/userStore';
import { addProduct as addProductService, getProduct, updateProduct } from '@/shared/services/productService';
import { useMutation, useQuery } from '@tanstack/vue-query';
import { useToast } from "primevue/usetoast";
import jsonCopy from '@/shared/helpers/jsonCopy';

export default function useModifyProducto(id: string) {
    const toast = useToast();
    const dialogMetod = ref(false);
    const editMetod = ref(false);
    const userStore = useUserStore();
    userStore.loadData();
    
    const { data: product, isLoading: isLoadingProduct, refetch:refetchProduct } = useQuery({
        queryKey: ['product', id],
        queryFn: () => getProduct(id),
    });

    const modelAddMethod = ref<ProductPaymentMethodsAvailable>({
        Product_PaymentMethod: '',
        Product_DiscountAvailable: true,
        Product_Price: 0,
        Product_Discount: 0,
    });

    const producto = ref<Product>({
        Product_ID: "null",
        Product_Category: "",
        Product_Name: "",
        Product_Tags: null,
        Product_Images: [],
        Product_Description: "",
        Product_Availability: true,
        Product_Stock: 0,
        Product_Ratings: null,
        Product_PromoCodes: null,
        Product_ShippingMethods: null,
        Product_PaymentMethodsAvailable: [],
        Product_SupplierID: userStore.user?.Supplier?.Supplier_ID || "",
        Product_Slug: "null",
    });

    watch(product, () => {
        if (product.value) {
            producto.value = jsonCopy(product.value.data);
        }
    }, { immediate: true });    

    const productAddMutation = useMutation({
        mutationFn: () => addProductService(producto.value),
        onSuccess: (product) => {
            toast.add({ severity: 'success', summary: product.message, detail: product.data.Product_Name, group: 'br', life: 3000 });
        },
        onError: (error:any) => {
            toast.add({ severity: 'error', summary: "Error al guardar el producto", detail: error.response.data.message, group: 'br', life: 3000 });
        }
    });  

    const productUpdateMutation = useMutation({
        mutationFn: () => updateProduct(producto.value),
        onSuccess: (product) => {            
            toast.add({ severity: 'success', summary: product.message, detail: product.data.Product_Name, group: 'br', life: 3000 });
            refetchProduct();
        },
        onError: (error:any) => {
            toast.add({ severity: 'error', summary: "Error al guardar el producto", detail: error.response.data.message, group: 'br', life: 3000 });
        }
    });  

    function addMetodoDePago() {
        producto.value.Product_PaymentMethodsAvailable.push(modelAddMethod.value);
        modelAddMethod.value = {
            Product_PaymentMethod: '',
            Product_DiscountAvailable: true,
            Product_Price: 0,
            Product_Discount: 0,
        };
    }

    function editMetodoDePago(index: number) {
        dialogMetod.value = true;
        editMetod.value = true;
        modelAddMethod.value = producto.value.Product_PaymentMethodsAvailable[index];
    }

    function removeMetodoDePago(index: number) {
        if (index >= 0 && index < producto.value.Product_PaymentMethodsAvailable.length) {
            producto.value.Product_PaymentMethodsAvailable.splice(index, 1);
        }
    }

    function cancelDialogMetod() {
        dialogMetod.value = false;
        editMetod.value = false;
        modelAddMethod.value = {
            Product_PaymentMethod: '',
            Product_DiscountAvailable: true,
            Product_Price: 0,
            Product_Discount: 0,
        };
    }
    

    const {
        files,
        onSelectedFiles,
        onDrop,
        formatFileSize,
        removeAllFiles,
        removeFile,
    } = useImages();

    return {
        files,
        producto,
        dialogMetod,
        editMetod,
        modelAddMethod,
        isLoading: computed(() => productAddMutation.isPending.value || isLoadingProduct.value || productUpdateMutation.isPending.value),
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
        addProducto: productAddMutation.mutate,
        updateProducto: productUpdateMutation.mutate,
    }
}