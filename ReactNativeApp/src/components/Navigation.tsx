import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MyStackParamsList} from './types';

import LoginScreen from '../screens/preLogin/LoginScreen';
import HomeScreen from '../screens/postLogin/User/HomeScreen';
import RegisterScreen from '../screens/preLogin/RegisterScreen';
import ProfileScreen from '../screens/postLogin/User/ProfileScreen';
import ResetPasswordScreen from '../screens/preLogin/ResetPasswordScreen';
import EditProfileScreen from '../screens/postLogin/User/EditProfileScreen';
import CreateGroupScreen from '../screens/postLogin/User/CreateGroupScreen';
import GroupHomeScreen from '../screens/postLogin/Group/GroupHomeScreen';
import GroupSettingsScreen from '../screens/postLogin/Group/GroupSettingsScreen';
import GroupBoardScreen from '../screens/postLogin/Group/Board/GroupBoardScreen';
import ExpensesHomeScreen from '../screens/postLogin/Group/Expenses/ExpensesHomeScreen';
import AddExpenseScreen from '../screens/postLogin/Group/Expenses/AddExpenseScreen';
import ExpenseDetailScreen from '../screens/postLogin/Group/Expenses/ExpenseDetailScreen';
import ChoresHomeScreen from '../screens/postLogin/Group/Chores/ChoresHomeScreen';
import EstablishChoresScreen from '../screens/postLogin/Group/Chores/EstablishChoresScreen';
import TodaysChoresScreen from '../screens/postLogin/Group/Chores/TodaysChoresScreen';
import ChoresStatsScreen from '../screens/postLogin/Group/Chores/ChoresStatsScreen';
import ShoppingListHomeScreen from '../screens/postLogin/Group/ShoppingList/ShoppingListHomeScreen';
// eslint-disable-next-line max-len
import EstablishProductsScreen from '../screens/postLogin/Group/ShoppingList/EstablishProductsScreen';

const Stack = createNativeStackNavigator<MyStackParamsList>();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="LoginScreen">
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen
        name="ResetPasswordScreen"
        component={ResetPasswordScreen}
      />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
      <Stack.Screen name="CreateGroupScreen" component={CreateGroupScreen} />
      <Stack.Screen name="GroupHomeScreen" component={GroupHomeScreen} />
      <Stack.Screen
        name="GroupSettingsScreen"
        component={GroupSettingsScreen}
      />
      <Stack.Screen name="GroupBoardScreen" component={GroupBoardScreen} />
      <Stack.Screen name="ExpensesHomeScreen" component={ExpensesHomeScreen} />
      <Stack.Screen name="AddExpenseScreen" component={AddExpenseScreen} />
      <Stack.Screen
        name="ExpenseDetailScreen"
        component={ExpenseDetailScreen}
      />
      <Stack.Screen name="ChoresHomeScreen" component={ChoresHomeScreen} />
      <Stack.Screen
        name="EstablishChoresScreen"
        component={EstablishChoresScreen}
      />
      <Stack.Screen name="TodaysChoresScreen" component={TodaysChoresScreen} />
      <Stack.Screen name="ChoresStatsScreen" component={ChoresStatsScreen} />
      <Stack.Screen
        name="ShoppingListHomeScreen"
        component={ShoppingListHomeScreen}
      />
      <Stack.Screen
        name="EstablishProductsScreen"
        component={EstablishProductsScreen}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
