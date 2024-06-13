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
    navigation.navigate('GroupExpensesScreen' as never);
  };

  return {
    navigateToAddExpense,
    navigateToGroupDebts,
    navigateToGroupExpenses,
  };
};

export default useExpensesHomeController;
