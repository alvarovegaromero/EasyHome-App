import {Button, SafeAreaView, ScrollView, Text, View} from 'react-native';
import useExpenseDetailController from './hooks/useExpenseDetailController';
import generalStyles from '../../../../styles/styles';

const ExpenseDetailScreen: React.FunctionComponent = () => {
  const {expense} = useExpenseDetailController();

  return (
    <SafeAreaView style={generalStyles.defaultSafeAreaView}>
      <ScrollView style={generalStyles.defaultScrollView}>
        <View style={generalStyles.defaultContainerScreen}>
          <Text>Expense Detail Screen</Text>
          <Text>{expense?.name}</Text>
          <Text>{expense?.amount}</Text>
          <Text>{expense?.date_paid.toLocaleDateString()}</Text>
          <Text>{expense?.paid_by.username}</Text>
          <Text>
            {expense?.debtors.map(debtor => debtor.username).join(', ')}
          </Text>
          <Text>{expense?.date_added.toLocaleDateString()}</Text>

          <Button
            title="Edit"
            disabled={true}
            onPress={() => {}}
            accessibilityLabel="Edit the expense"
            testID="editButton"
          />

          <Button
            title="Delete"
            onPress={() => {}}
            accessibilityLabel="Delete the expense"
            testID="deleteButton"
          />

          <Button
            title="Go back"
            onPress={() => {}}
            accessibilityLabel="Go back to the previous screen"
            testID="goBackButton"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ExpenseDetailScreen;
