import {useNavigation} from '@react-navigation/native';

const useShoppingListHomeController = () => {
  const navigation = useNavigation();

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

  const navigateGroupHomeScreen = () => {
    console.log('navigateGroupHomeScreen');
  };

  return {
    navigateEstablishProductsScreen,
    navigateProductsScreen,
    navigateProductsShoppingListScreen,
    navigateShoppingListStatsScreen,
    navigateGroupHomeScreen,
  };
};

export default useShoppingListHomeController;
