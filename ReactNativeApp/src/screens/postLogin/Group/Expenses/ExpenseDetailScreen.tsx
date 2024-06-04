import {Button, SafeAreaView, ScrollView, Text, View} from 'react-native';
import useExpenseDetailController from './hooks/useExpenseDetailController';
import generalStyles from '../../../../styles/styles';
import stylesExpenseDetailScreen from '../../../../styles/stylesExpenseDetailScreen';

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
            <View style={stylesExpenseDetailScreen.containerTitleAndText}>
              <Text style={stylesExpenseDetailScreen.styleTitle}>Concept:</Text>
              <Text style={stylesExpenseDetailScreen.styleText}>{expense?.name}</Text>
            </View>
            <View style={stylesExpenseDetailScreen.containerTitleAndText}>              
              <Text style={stylesExpenseDetailScreen.styleTitle}>Amount:</Text>
              <Text style={stylesExpenseDetailScreen.styleText}>{expense?.amount !== undefined ? (expense.amount)+"€" : "-"}</Text>
            </View>
            <View style={stylesExpenseDetailScreen.containerTitleAndText}>              
              <Text style={stylesExpenseDetailScreen.styleTitle}>Amount per debtor:</Text>
              <Text style={stylesExpenseDetailScreen.styleText}>{expense?.amount !== undefined ? (expense.amount / (expense?.debtors.length || 1)).toFixed(2)+"€" : "-"}</Text>
            </View>
            <View style={stylesExpenseDetailScreen.containerTitleAndText}>              
              <Text style={stylesExpenseDetailScreen.styleTitle}>Date paid:</Text>
              <Text style={stylesExpenseDetailScreen.styleText}>{expense?.date_paid.toLocaleDateString()}</Text>
            </View>
            <View style={stylesExpenseDetailScreen.containerTitleAndText}>              
              <Text style={stylesExpenseDetailScreen.styleTitle}>Payer:</Text>
              <Text style={stylesExpenseDetailScreen.styleText}>{expense?.paid_by.username}</Text>
            </View>
            <View style={stylesExpenseDetailScreen.containerTitleAndText}>              
              <Text style={stylesExpenseDetailScreen.styleTitle}>Debtors:</Text>
              <Text style={stylesExpenseDetailScreen.styleText}>
                {expense?.debtors.map(debtor => debtor.username).join(', ')}
              </Text>
            </View>
            <View style={stylesExpenseDetailScreen.containerTitleAndText}>              
              <Text style={stylesExpenseDetailScreen.styleTitle}>Date added in the system:</Text>
              <Text style={stylesExpenseDetailScreen.styleText}>{expense?.date_added.toLocaleDateString()}</Text>
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
    </SafeAreaView>
  );
};

export default ExpenseDetailScreen;
