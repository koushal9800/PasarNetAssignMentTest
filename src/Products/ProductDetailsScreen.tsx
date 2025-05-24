// src/screens/Products/ProductDetailsScreen.tsx
import React from 'react';
import { View, Text, Button, Image } from 'react-native';

export default function ProductDetailsScreen({ route, navigation }: any) {
  const { product } = route.params;

  return (
    <View style={{ padding: 20 }}>
      {product.image ? (
        <Image source={{ uri: product.image }} style={{ height: 200, marginBottom: 20 }} />
      ) : null}
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{product.name}</Text>
      <Text style={{ fontSize: 16, marginVertical: 10 }}>₹{product.price}</Text>
      <Text style={{ marginBottom: 20 }}>{product.description}</Text>

      <Button
        title="Edit Product"
        onPress={() => navigation.navigate('ProductForm', { product })}
      />
    </View>
  );
}
