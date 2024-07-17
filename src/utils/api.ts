import axios from 'axios';
import { Product } from '@/components/index/index.types';

export const fetchProducts = async (): Promise<Product[]> => {
    const { data } = await axios.get('https://dummyjson.com/products');
    return data.products;
};
