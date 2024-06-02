import {Text, View} from 'react-native';
import useExpensesHomeController from './hooks/useExpenseHomeController';

const ExpensesHomeScreen: React.FunctionComponent = () => {
  const {} = useExpensesHomeController();

  return (
    <View>
      <Text>ExpensesHomeScreen</Text>
    </View>
  );
};

export default ExpensesHomeScreen;
