import {useNavigation} from '@react-navigation/native';
import {useContext} from 'react';
import {GroupContext} from '../../../../../contexts/GroupContext';

const useShoppingListHomeController = () => {
  const navigation = useNavigation();

  const {isOwner} = useContext(GroupContext);

  const navigateEstablishProductsScreen = () => {
    navigation.navigate('EstablishProductsScreen' as never);
  };

  const navigateProductsScreen = () => {
    navigation.navigate('ProductsScreen' as never);
  };

  const navigateProductsShoppingListScreen = () => {
    navigation.navigate('ShoppingListScreen' as never);
  };

  const navigateShoppingListStatsScreen = () => {
    navigation.navigate('ShoppingListStatsScreen' as never);
  };

  return {
    isOwner,
    navigateEstablishProductsScreen,
    navigateProductsScreen,
    navigateProductsShoppingListScreen,
    navigateShoppingListStatsScreen,
  };
};

export default useShoppingListHomeController;
