const useShoppingListHomeController = () => {
  const navigateEstablishProductsScreen = () => {
    console.log('navigateEstablishProducts');
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
