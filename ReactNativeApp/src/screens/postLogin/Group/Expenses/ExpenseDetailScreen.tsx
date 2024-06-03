import {Text, View} from 'react-native';
import useExpenseDetailController from './hooks/useExpenseDetailController';

const ExpenseDetailScreen: React.FunctionComponent = () => {
  const {} = useExpenseDetailController();

  return (
    <View>
      <Text>Expense Detail Screen</Text>
    </View>
  );
};

export default ExpenseDetailScreen;
