// src/screens/Products/ProductListScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, TouchableOpacity, Image } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { getProducts } from '../utils/storage';


export default function ProductListScreen({ navigation }: any) {
  const [products, setProducts] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchProducts = async () => {
      const items = await getProducts();
      setProducts(items);
    };
    if (isFocused) fetchProducts();
  }, [isFocused]);

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('ProductDetails', { product: item })}
      style={{ padding: 10, borderBottomWidth: 1, flexDirection: 'row' }}
    >
      {item.image ? (
        <Image source={{ uri: item.image }} style={{ width: 50, height: 50, marginRight: 10 }} />
      ) : null}
      <View>
        <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
        <Text>₹{item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Button title="Add Product" onPress={() => navigation.navigate('ProductForm')} />
      <FlatList data={products} keyExtractor={item => item.id} renderItem={renderItem} />
    </View>
  );
}
