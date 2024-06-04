import {Button, SafeAreaView, ScrollView, Text, View} from 'react-native';
import useExpenseDetailController from './hooks/useExpenseDetailController';
import generalStyles from '../../../../styles/styles';

const ExpenseDetailScreen: React.FunctionComponent = () => {
  const {expense, confirmAndDeleteExpense, navigateExpensesHomeScreen} =
    useExpenseDetailController();

  return (
    <SafeAreaView style={generalStyles.defaultSafeAreaView}>
      <ScrollView style={generalStyles.defaultScrollView}>
        <View style={generalStyles.defaultContainerScreen}>
          <View style={generalStyles.defaultContainerHeader}>
            <Text style={generalStyles.defaultHeader}>Expense details:</Text>
          </View>

          <View>
            <Text>Concept:</Text>
            <Text>{expense?.name}</Text>
            <Text>Amount:</Text>
            <Text>{expense?.amount}</Text>
            <Text>Date paid:</Text>
            <Text>{expense?.date_paid.toLocaleDateString()}</Text>
            <Text>Payer:</Text>
            <Text>{expense?.paid_by.username}</Text>
            <Text>Debtors:</Text>
            <Text>
              {expense?.debtors.map(debtor => debtor.username).join(', ')}
            </Text>
            <Text>Date added in the system:</Text>
            <Text>{expense?.date_added.toLocaleDateString()}</Text>
          </View>

          <View>
            <View>
              <View style={generalStyles.defaultButton}>
                <Button
                  title="Edit"
                  disabled={true}
                  onPress={() => {}}
                  accessibilityLabel="Edit the expense"
                  testID="editButton"
                />
              </View>
            </View>

            <View>
              <View style={generalStyles.defaultButton}>
                <Button
                  title="Delete"
                  onPress={confirmAndDeleteExpense}
                  accessibilityLabel="Delete the expense"
                  testID="deleteButton"
                />
              </View>
            </View>

            <View>
              <View style={generalStyles.defaultButton}>
                <Button
                  title="Go back"
                  onPress={navigateExpensesHomeScreen}
                  accessibilityLabel="Go back to the previous screen"
                  testID="goBackButton"
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ExpenseDetailScreen;
