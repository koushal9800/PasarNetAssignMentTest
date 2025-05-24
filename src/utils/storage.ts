import AsyncStorage from '@react-native-async-storage/async-storage';
import { Product } from '../types/product';


const PRODUCT_KEY = 'product_list';

export const getProducts = async (): Promise<Product[]> => {
  const json = await AsyncStorage.getItem(PRODUCT_KEY);
  return json ? JSON.parse(json) : [];
};

export const saveProducts = async (products: Product[]) => {
  await AsyncStorage.setItem(PRODUCT_KEY, JSON.stringify(products));
};

export const addOrUpdateProduct = async (product: Product) => {
  const products = await getProducts();
  const index = products.findIndex(p => p.id === product.id);
  if (index > -1) {
    products[index] = product;
  } else {
    products.push(product);
  }
  await saveProducts(products);
};
