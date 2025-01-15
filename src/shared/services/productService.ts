import getToken from '@helpers/getToken';
import axios from 'axios'
import type { Product, DataProducts, DataProduct } from '../interfaces';
import type { getProducts } from '../interfaces/parameters';



const productsService = axios.create({
    baseURL: import.meta.env.VITE_API_URL + '/products',
    headers: {
        'Accept': 'application/json'
    },
});

export async function getProducts(params?:getProducts): Promise<DataProducts> {
    //Obtenemos el token
    const token = await getToken();
    productsService.defaults.headers['Authorization'] = `Bearer ${token}`;
    //Hacemos la petición
    return productsService.get('', {
        params: params
    }).then(res => res.data);
}


export async function getProduct(id:string, params?:getProducts): Promise<DataProduct> {
    //Obtenemos el token
    const token = await getToken();
    productsService.defaults.headers['Authorization'] = `Bearer ${token}`;
    //Hacemos la petición
    return productsService.get(id, {
        params: params
    }).then(res => res.data);
}

export async function getSlugProduct(slug:string): Promise<Product> {
    //Obtenemos el token
    const token = await getToken();
    productsService.defaults.headers['Authorization'] = `Bearer ${token}`;
    //Hacemos la petición
    return productsService.get(`/slug/${slug}`).then(res => res.data.data);
}

export async function addProduct(product: Product): Promise<DataProduct> {
    //Obtenemos el token
    const token = await getToken();
    productsService.defaults.headers['Authorization'] = `Bearer ${token}`;
    //Hacemos la petición
    return productsService.post('', product).then(res => res.data);
}

export async function updateProduct(product: Product): Promise<DataProduct> {
    //Obtenemos el token
    const token = await getToken();
    productsService.defaults.headers['Authorization'] = `Bearer ${token}`;
    //Hacemos la petición
    return productsService.patch(product.Product_ID, product).then(res => res.data);
}