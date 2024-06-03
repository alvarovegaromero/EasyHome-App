import {
  Button,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import useExpensesHomeController from './hooks/useExpenseHomeController';
import generalStyles from '../../../../styles/styles';
import stylesExpenseHomeScreen from '../../../../styles/stylesExpenseHomeScreen';

const ExpensesHomeScreen: React.FunctionComponent = () => {
  const {expenses, navigateAddExpense, navigateGroupHome} =
    useExpensesHomeController();

  return (
    <SafeAreaView style={generalStyles.defaultSafeAreaView}>
      <ScrollView style={generalStyles.defaultScrollView}>
        <View style={generalStyles.defaultContainerScreen}>
          <View style={generalStyles.defaultContainerHeader}>
            <Text style={generalStyles.defaultHeader}>
              Expense Distribution
            </Text>
          </View>

          <View>
            <Text style={generalStyles.defaultSubHeader}>Balances</Text>
          </View>

          <View style={stylesExpenseHomeScreen.containerExpensesAndTitle}>
            <Text style={generalStyles.defaultSubHeader}>Expenses</Text>
            <View style={stylesExpenseHomeScreen.containerExpenses}>
              <View style={stylesExpenseHomeScreen.containerTitle}>
                <View style={stylesExpenseHomeScreen.containerTitleColumn}>
                  <Text style={stylesExpenseHomeScreen.styleTitleColumn}>
                    Concept
                  </Text>
                </View>
                <View style={stylesExpenseHomeScreen.containerTitleColumn}>
                  <Text style={stylesExpenseHomeScreen.styleTitleColumn}>
                    Payer
                  </Text>
                </View>
                <View style={stylesExpenseHomeScreen.containerTitleColumn}>
                  <Text style={stylesExpenseHomeScreen.styleTitleColumn}>
                    Amount
                  </Text>
                </View>
                <View style={stylesExpenseHomeScreen.containerTitleColumn}>
                  <Text style={stylesExpenseHomeScreen.styleTitleColumn}>
                    Date bought
                  </Text>
                </View>
              </View>
              <ScrollView>
                {expenses.map((expense, index) => (
                  <TouchableOpacity
                    key={index}
                    style={stylesExpenseHomeScreen.expenseItem}
                    onPress={() => {
                      console.log(expense.name);
                    }}>
                    <View style={stylesExpenseHomeScreen.expenseDetails}>
                      <View style={stylesExpenseHomeScreen.containerExpense}>
                        <Text
                          style={
                            stylesExpenseHomeScreen.expenseName
                          }>{`${expense.name}`}</Text>
                      </View>

                      <View style={stylesExpenseHomeScreen.containerExpense}>
                        <Text
                          style={
                            stylesExpenseHomeScreen.expensePayer
                          }>{`${expense.paid_by_username}`}</Text>
                      </View>

                      <View style={stylesExpenseHomeScreen.containerExpense}>
                        <Text
                          style={
                            stylesExpenseHomeScreen.expenseAmount
                          }>{`${expense.amount}€`}</Text>
                      </View>
                      <View style={stylesExpenseHomeScreen.containerExpense}>
                        <Text
                          style={
                            stylesExpenseHomeScreen.expenseDate
                          }>{`${expense.date_paid.toLocaleDateString()}`}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>

          <View style={stylesExpenseHomeScreen.containerButtons}>
            <View style={stylesExpenseHomeScreen.containerButton}>
              <View style={generalStyles.defaultButton}>
                <Button title="Add Expense" onPress={navigateAddExpense} />
              </View>
            </View>
            <View style={stylesExpenseHomeScreen.containerButton}>
              <View style={generalStyles.defaultButton}>
                <Button title="Go Back" onPress={navigateGroupHome} />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ExpensesHomeScreen;
