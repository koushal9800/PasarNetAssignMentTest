import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert, ScrollView, Image } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import uuid from 'react-native-uuid';
import { addOrUpdateProduct } from '../utils/storage';


export default function ProductFormScreen({ navigation, route }: any) {
  const isEdit = !!route.params?.product;
  const existingProduct = route.params?.product;

  // Store price as string for safe input
  const [product, setProduct] = useState({
    id: isEdit ? existingProduct.id : (uuid.v4() as string),
    name: isEdit ? existingProduct.name : '',
    price: isEdit ? existingProduct.price.toString() : '',
    description: isEdit ? existingProduct.description : '',
    image: isEdit ? existingProduct.image : '',
  });

  const handleImagePick = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 0.5,
    });
    if (result.assets && result.assets.length > 0) {
      setProduct({ ...product, image: result.assets[0].uri! });
    }
  };

  const handleSave = async () => {
    if (!product.name || !product.price || !product.description) {
      return Alert.alert('Error', 'All fields are required');
    }

    const parsedPrice = parseFloat(product.price);
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      return Alert.alert('Error', 'Please enter a valid price greater than 0');
    }

    await addOrUpdateProduct({
      ...product,
      price: parsedPrice, // save price as number
    });

    navigation.goBack();
  };

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text>Name</Text>
      <TextInput
        value={product.name}
        onChangeText={(name) => setProduct({ ...product, name })}
        placeholder="Enter product name"
        placeholderTextColor={'gray'}
        style={{ color:'gray', borderBottomColor:'gray', borderBottomWidth:1 }}
      />

      <Text>Price</Text>
      <TextInput
        keyboardType="numeric"
        value={product.price}
        onChangeText={(price) => setProduct({ ...product, price })}
        placeholder="Enter product price"
        placeholderTextColor={'gray'}
        style={{ color:'gray', borderBottomColor:'gray', borderBottomWidth:1 }}
      />

      <Text>Description</Text>
      <TextInput
        multiline
        value={product.description}
        onChangeText={(description) =>
          setProduct({ ...product, description })
        }
        placeholder="Enter product description"
        placeholderTextColor={'gray'}
        style={{ color:'gray', borderBottomColor:'gray', borderBottomWidth:1, marginBottom:20 }}
      />

      <Button title="Select Image" onPress={handleImagePick} />
      {product.image ? (
        <Image
          source={{ uri: product.image }}
          style={{ height: 200, marginVertical: 10 }}
        />
      ) : null}

      <Button
        title={isEdit ? 'Update Product' : 'Create Product'}
        onPress={handleSave}
      />
    </ScrollView>
  );
}
