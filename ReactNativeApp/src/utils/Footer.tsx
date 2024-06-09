import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Footer: React.FunctionComponent = () => {
  const navigation = useNavigation();

  const navigateToScreen1 = () => {
    navigation.navigate('ChoresHomeScreen' as never);
  };

  const navigateToScreen2 = () => {
    navigation.navigate('ShoppingListHomeScreen' as never);
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 20,
      }}>
      <TouchableOpacity
        onPress={navigateToScreen1}
        style={{backgroundColor: 'blue'}}>
        <Text>Navigate to 1</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={navigateToScreen2}
        style={{backgroundColor: 'red'}}>
        <Text>Navigate to 2</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Footer;
