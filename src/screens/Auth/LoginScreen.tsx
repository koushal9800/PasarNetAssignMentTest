// src/screens/Auth/LoginScreen.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }: any) {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!phone || !password) {
      Alert.alert('Error', 'Please enter phone and password');
      return;
    }

    setLoading(true);
    try {
      const generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();
      await AsyncStorage.setItem('userPhone', phone);
      await AsyncStorage.setItem('generatedOTP', generatedOTP);
      Alert.alert('OTP Sent', `Your OTP is ${generatedOTP}`); // For testing
      navigation.navigate('OTP');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to generate OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ marginBottom: 5 }}>Phone</Text>
      <TextInput
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />
      <Text style={{ marginBottom: 5 }}>Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, marginBottom: 20, padding: 8, color:'gray' }}
      />
      <Button title={loading ? 'Processing...' : 'Login'} onPress={handleLogin} disabled={loading} />
    </View>
  );
}
