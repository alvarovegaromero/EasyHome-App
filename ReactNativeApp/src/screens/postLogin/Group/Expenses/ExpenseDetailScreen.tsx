import {Button, SafeAreaView, ScrollView, Text, View} from 'react-native';
import useExpenseDetailController from './hooks/useExpenseDetailController';
import generalStyles from '../../../../styles/styles';
import stylesExpenseDetailScreen from '../../../../styles/stylesExpenseDetailScreen';
import GroupFooter from '../../../../utils/GroupFooter/GroupFooter';

const ExpenseDetailScreen: React.FunctionComponent = () => {
  const {expense, confirmAndDeleteExpense, navigateExpensesHomeScreen} =
    useExpenseDetailController();

  return (
    <SafeAreaView style={generalStyles.defaultSafeAreaView}>
      <ScrollView style={generalStyles.defaultScrollView}>
        <View style={generalStyles.defaultContainerScreen}>
          <View style={generalStyles.defaultContainerHeader}>
            <Text
              accessibilityLabel="Expense details:"
              style={generalStyles.defaultHeader}>
              Expense details:
            </Text>
          </View>

          <View>
            <View style={stylesExpenseDetailScreen.containerTitleAndText}>
              <Text
                accessibilityLabel="Concept:"
                style={stylesExpenseDetailScreen.styleTitle}>
                Concept:
              </Text>
              <Text
                accessibilityLabel={`${expense?.name}`}
                style={stylesExpenseDetailScreen.styleText}>
                {expense?.name}
              </Text>
            </View>
            <View style={stylesExpenseDetailScreen.containerTitleAndText}>
              <Text
                accessibilityLabel="Amount:"
                style={stylesExpenseDetailScreen.styleTitle}>
                Amount:
              </Text>
              <Text
                accessibilityLabel={`${expense?.amount}€`}
                style={stylesExpenseDetailScreen.styleText}>
                {expense?.amount !== undefined ? expense.amount + '€' : '-'}
              </Text>
            </View>
            <View style={stylesExpenseDetailScreen.containerTitleAndText}>
              <Text
                accessibilityLabel="Amount per debtor"
                style={stylesExpenseDetailScreen.styleTitle}>
                Amount per debtor:
              </Text>
              <Text
                accessibilityLabel={
                  expense
                    ? `${(expense.amount / (expense.debtors.length || 1)).toFixed(2)}€`
                    : '-'
                }
                style={stylesExpenseDetailScreen.styleText}>
                {expense?.amount !== undefined
                  ? (expense.amount / (expense?.debtors.length || 1)).toFixed(
                      2,
                    ) + '€'
                  : '-'}
              </Text>
            </View>
            <View style={stylesExpenseDetailScreen.containerTitleAndText}>
              <Text
                accessibilityLabel="Date paid:"
                style={stylesExpenseDetailScreen.styleTitle}>
                Date paid:
              </Text>
              <Text
                accessibilityLabel={`${expense?.date_paid.toLocaleDateString()}`}
                style={stylesExpenseDetailScreen.styleText}>
                {expense?.date_paid.toLocaleDateString()}
              </Text>
            </View>
            <View style={stylesExpenseDetailScreen.containerTitleAndText}>
              <Text
                accessibilityLabel="Payer"
                style={stylesExpenseDetailScreen.styleTitle}>
                Payer:
              </Text>
              <Text
                accessibilityLabel={`${expense?.paid_by.username}`}
                style={stylesExpenseDetailScreen.styleText}>
                {expense?.paid_by.username}
              </Text>
            </View>
            <View style={stylesExpenseDetailScreen.containerTitleAndText}>
              <Text
                accessibilityLabel="Debtors:"
                style={stylesExpenseDetailScreen.styleTitle}>
                Debtors:
              </Text>
              <Text
                accessibilityLabel={`${expense?.debtors.map(debtor => debtor.username).join(', ')}`}
                style={stylesExpenseDetailScreen.styleText}>
                {expense?.debtors.map(debtor => debtor.username).join(', ')}
              </Text>
            </View>
            <View style={stylesExpenseDetailScreen.containerTitleAndText}>
              <Text
                accessibilityLabel="Date added in the system:"
                style={stylesExpenseDetailScreen.styleTitle}>
                Date added in the system:
              </Text>
              <Text
                accessibilityLabel={`${expense?.date_added.toLocaleDateString()}`}
                style={stylesExpenseDetailScreen.styleText}>
                {expense?.date_added.toLocaleDateString()}
              </Text>
            </View>
          </View>

          <View style={stylesExpenseDetailScreen.containerButtons}>
            <View style={stylesExpenseDetailScreen.containerButton}>
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

            <View style={stylesExpenseDetailScreen.containerButton}>
              <View style={generalStyles.defaultButton}>
                <Button
                  title="Delete"
                  onPress={confirmAndDeleteExpense}
                  accessibilityLabel="Delete the expense"
                  testID="deleteButton"
                />
              </View>
            </View>

            <View style={stylesExpenseDetailScreen.containerButton}>
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
      <GroupFooter activeSection="Expenses" />
    </SafeAreaView>
  );
};

export default ExpenseDetailScreen;
