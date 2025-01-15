
//referencias
import { computed, ref } from 'vue';
import useImages from './useImages';

import type { Product } from '@interfaces/Product';
import { useUserStore } from '@stores/userStore';
import jsonCopy from '@helpers/jsonCopy';
import { addProduct as addProductService } from '@/shared/services/productService';
import { useMutation } from '@tanstack/vue-query';
import { useToast } from "primevue/usetoast";

export default function useAddProducto() {
    const toast = useToast();
    
    const userStore = useUserStore();
    userStore.loadData();


    const productMutation = useMutation({
        mutationFn: () => addProductService(producto.value),
        onSuccess: (product) => {
            toast.add({ severity: 'success', summary: product.message, detail: product.data.Product_Name, group: 'br', life: 3000 });
        },
        onError: (error:any) => {
            toast.add({ severity: 'error', summary: "Error al guardar el producto", detail: error.response.data.message, group: 'br', life: 3000 });
        }
    });

    const methodInit = {
        Product_PaymentMethod: '',
        Product_DiscountAvailable: false,
        Product_Price: 0,
        Product_Discount: 0,
    };

    const producto = ref<Product>({
        Product_ID: "null",
        Product_Category: "",
        Product_Name: "",
        Product_Tags: null,
        Product_Images: [''],
        Product_Description: "",
        Product_Availability: true,
        Product_Stock: 0,
        Product_Ratings: null,
        Product_PromoCodes: null,
        Product_ShippingMethods: null,
        Product_PaymentMethodsAvailable: [jsonCopy(methodInit)],
        Product_SupplierID: userStore.user?.Supplier?.Supplier_ID || "",
        Product_Slug: "null",
    });


    function addMetodoDePago() {
        producto.value.Product_PaymentMethodsAvailable.push(jsonCopy(methodInit));
    }

    function removeMetodoDePago() {
        if (producto.value.Product_PaymentMethodsAvailable.length > 1)
            producto.value.Product_PaymentMethodsAvailable.splice(producto.value.Product_PaymentMethodsAvailable.length - 1, 1);
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
        isLoading: computed(() => productMutation.isPending.value),
        addMetodoDePago,
        removeMetodoDePago,
        onSelectedFiles,
        onDrop,
        formatFileSize,
        removeAllFiles,
        removeFile,
        addProducto: productMutation.mutate,
    }
}