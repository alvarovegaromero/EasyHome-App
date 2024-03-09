import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Text, View } from 'react-native';
import Navigation from './components/Navigation';

function App(): React.JSX.Element {

  return (
    
    /*<View>
      <Text> hola, sigo funcionando </Text>
    </View>*/
    
    <NavigationContainer>
      <Navigation />
    </NavigationContainer>
  );
}

export default App;
