import {useNavigation} from '@react-navigation/native';

const useShoppingListHomeController = () => {
  const navigation = useNavigation();

  const navigateEstablishProductsScreen = () => {
    navigation.navigate('EstablishProductsScreen' as never);
  };

  const navigateProductsScreen = () => {
    console.log('navigateProductsScreen');
  };

  const navigateProductsShoppingListScreen = () => {
    console.log('navigateProductsShoppingListScreen');
  };

  const navigateStatsShoppingListScreen = () => {
    console.log('navigateStatsShoppingListScreen');
  };

  const navigateGroupHomeScreen = () => {
    console.log('navigateGroupHomeScreen');
  };

  return {
    navigateEstablishProductsScreen,
    navigateProductsScreen,
    navigateProductsShoppingListScreen,
    navigateStatsShoppingListScreen,
    navigateGroupHomeScreen,
  };
};

export default useShoppingListHomeController;
