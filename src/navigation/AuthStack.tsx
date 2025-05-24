// src/navigation/AuthStack.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/Auth/LoginScreen';
import OTPScreen from '../screens/Auth/OTPScreen';

const Stack = createNativeStackNavigator();

export default function AuthStack({ onAuthSuccess }: any) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login">
        {props => <LoginScreen {...props} />}
      </Stack.Screen>
      <Stack.Screen name="OTP">
        {props => <OTPScreen {...props} onOTPVerified={onAuthSuccess} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
