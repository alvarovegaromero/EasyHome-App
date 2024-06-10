import {useNavigation} from '@react-navigation/native';

const useExpensesHomeController = () => {
  const navigation = useNavigation();

  const navigateToAddExpense = () => {
    navigation.navigate('AddExpenseScreen' as never);
  };

  const navigateToGroupDebts = () => {
    navigation.navigate('GroupDebtsScreen' as never);
  };

  const navigateToGroupExpenses = () => {
    // navigation.navigate("GroupExpensesScreen" as never)
  };

  const navigateGroupHomeScreen = () => {
    navigation.navigate('GroupHomeScreen' as never);
  };

  return {
    navigateToAddExpense,
    navigateToGroupDebts,
    navigateToGroupExpenses,
    navigateGroupHomeScreen,
  };
};

export default useExpensesHomeController;
