// src/screens/Auth/OTPScreen.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function OTPScreen({ navigation, onOTPVerified }: any) {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const verifyOTP = async () => {
    setLoading(true);
    try {
      const actualOTP = await AsyncStorage.getItem('generatedOTP');
      console.log('Expected OTP:', actualOTP);
      console.log('Entered OTP:', otp);

      if (otp.trim() === actualOTP) {
        await AsyncStorage.setItem('userToken', 'dummy-token');

        if (typeof onOTPVerified === 'function') {
          onOTPVerified(); // Notify App.tsx to switch navigator
        } else {
          navigation.replace('Main'); // Fallback if onOTPVerified not passed
        }
      } else {
        Alert.alert('Error', 'Invalid OTP');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'OTP verification failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ marginBottom: 5 }}>Enter OTP</Text>
      <TextInput
        value={otp}
        onChangeText={setOtp}
        keyboardType="number-pad"
        style={{ borderWidth: 1, marginBottom: 20, padding: 8, color:'gray' }}
      />
      <Button title={loading ? 'Verifying...' : 'Verify'} onPress={verifyOTP} disabled={loading} />
    </View>
  );
}
