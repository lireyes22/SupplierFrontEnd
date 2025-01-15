import type { RouteRecordRaw } from "vue-router";
import SupplierSideBar from "@supplier/layouts/SupplierSideBar.vue";
import SupplierHome from "@supplier/pages/SupplierHome.vue";
import ProductsList from "@supplier/pages/ProductsList.vue";
import AddProduct from "@supplier/pages/AddProduct.vue";
import ModifyProduct from "@supplier/pages/ModifyProduct.vue";
import Cookies from 'js-cookie';

const ROUTE_NAME = "supplier";

export const supplierRoute: RouteRecordRaw = {
    path: `/${ROUTE_NAME}`,
    redirect: { name: ROUTE_NAME },
    component: SupplierSideBar,
    meta: { requiresAuth: true },
    children: [
        {
            path: `/${ROUTE_NAME}/home`,
            name: ROUTE_NAME,
            component: SupplierHome,
        },
        {
            path: `/${ROUTE_NAME}/products-list`,
            name: 'ProductsList',
            component: ProductsList,
        },
        {
            path: `/${ROUTE_NAME}/add-product`,
            name: 'AddProduct',
            component: AddProduct,
        },
        {
            path: `/${ROUTE_NAME}/modify-product/:id`,
            name: 'ModifyProduct',
            props: true,
            component: ModifyProduct,
        },
    ],
    beforeEnter: (to, from, next) => {
        if(Cookies.get('isSupplier')){
            next();
        } else {
            if(Cookies.get('sesionActive') === 'true'){
                next({ name: 'principal' });
            } else next({ name: 'presentation' });
        }
    },
}

export default supplierRoute;