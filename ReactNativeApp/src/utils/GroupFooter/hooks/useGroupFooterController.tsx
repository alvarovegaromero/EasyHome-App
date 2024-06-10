import {useNavigation} from '@react-navigation/native';

const useGroupFooterController = () => {
  const navigation = useNavigation();

  const navigateToExpenses = () => {
    navigation.navigate('GroupExpensesScreen' as never);
  };

  const navigateToChores = () => {
    navigation.navigate('ChoresHomeScreen' as never);
  };

  const navigateToShoppingList = () => {
    navigation.navigate('ShoppingListHomeScreen' as never);
  };

  const navigateToGroupHome = () => {
    navigation.navigate('GroupHomeScreen' as never);
  };

  const navigateToGroupPantry = () => {
    console.log('not implemented yet');
    //navigation.navigate('GroupPantryScreen' as never);
  };

  const navigateToGroupBoard = () => {
    navigation.navigate('GroupBoardScreen' as never);
  };

  const navigateToGroupSettings = () => {
    navigation.navigate('GroupSettingsScreen' as never);
  };

  return {
    navigateToExpenses,
    navigateToChores,
    navigateToShoppingList,
    navigateToGroupHome,
    navigateToGroupPantry,
    navigateToGroupBoard,
    navigateToGroupSettings,
  };
};

export default useGroupFooterController;
