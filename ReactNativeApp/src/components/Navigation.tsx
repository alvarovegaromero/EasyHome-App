import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MyStackParamList } from './types';

import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createNativeStackNavigator<MyStackParamList>()

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="LoginScreen">
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;