import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductListScreen from '../Products/ProductListScreen';
import ProductDetailsScreen from '../Products/ProductDetailsScreen';
import ProductFormScreen from '../Products/ProductFormScreen';

export type ProductStackParamList = {
  ProductList: undefined;
  ProductDetails: { product: any };
  ProductForm: { product?: any };
};

const Stack = createNativeStackNavigator<ProductStackParamList>();

export default function ProductStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProductList"
        component={ProductListScreen}
        options={{ title: 'Product List' }}
      />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetailsScreen}
        options={{ title: 'Product Details' }}
      />
      <Stack.Screen
        name="ProductForm"
        component={ProductFormScreen}
        options={({ route }) => ({
          title: route.params?.product ? 'Edit Product' : 'Add Product',
        })}
      />
    </Stack.Navigator>
  );
}
