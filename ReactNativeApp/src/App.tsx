import React from 'react';
import {
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './Home';
import LoginScreen from './LoginPage';

function App(): React.JSX.Element {

  const Stack = createStackNavigator();

  return (
    <SafeAreaView>
      <ScrollView>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login"> {/* Definir la pantalla inicial */}
            <Stack.Screen name="Login" component={LoginScreen} /> {/* Definir las pantallas */}
            <Stack.Screen name="Home" component={HomeScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
