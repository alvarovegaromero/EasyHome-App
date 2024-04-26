import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MyStackParamsList } from './types';

import LoginScreen from '../screens/preLogin/LoginScreen';
import HomeScreen from '../screens/postLoginScreens/User/HomeScreen';
import RegisterScreen from '../screens/preLogin/RegisterScreen';
import ProfileScreen from '../screens/postLoginScreens/User/ProfileScreen';
import ResetPasswordScreen from '../screens/preLogin/ResetPasswordScreen';
import EditProfileScreen from '../screens/postLoginScreens/User/EditProfileScreen';

const Stack = createNativeStackNavigator<MyStackParamsList>()

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="LoginScreen">
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;