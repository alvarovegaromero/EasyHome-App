import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import useGroupExpensesController from './hooks/useGroupExpensesController';
import generalStyles from '../../../../styles/styles';
import stylesGroupExpensesScreen from '../../../../styles/stylesGroupExpensesScreen';
import GroupFooter from '../../../../utils/GroupFooter/GroupFooter';

const GroupExpensesScreen: React.FunctionComponent = () => {
  const {expenses, navigateDetailExpense} = useGroupExpensesController();

  return (
    <SafeAreaView style={generalStyles.defaultSafeAreaView}>
      <ScrollView style={generalStyles.defaultScrollView}>
        <View style={generalStyles.defaultContainerScreen}>
          <View style={generalStyles.defaultContainerHeader}>
            <Text style={generalStyles.defaultHeader}>Groups's Expenses</Text>
          </View>

          <View style={stylesGroupExpensesScreen.containerExpensesAndTitle}>
            <Text style={generalStyles.defaultSubHeader}>Expenses</Text>
            <View style={stylesGroupExpensesScreen.containerExpenses}>
              <View style={stylesGroupExpensesScreen.containerTitle}>
                <View style={stylesGroupExpensesScreen.containerTitleColumn}>
                  <Text style={stylesGroupExpensesScreen.styleTitleColumn}>
                    Concept
                  </Text>
                </View>
                <View style={stylesGroupExpensesScreen.containerTitleColumn}>
                  <Text style={stylesGroupExpensesScreen.styleTitleColumn}>
                    Payer
                  </Text>
                </View>
                <View style={stylesGroupExpensesScreen.containerTitleColumn}>
                  <Text style={stylesGroupExpensesScreen.styleTitleColumn}>
                    Amount
                  </Text>
                </View>
                <View style={stylesGroupExpensesScreen.containerTitleColumn}>
                  <Text style={stylesGroupExpensesScreen.styleTitleColumn}>
                    Date bought
                  </Text>
                </View>
              </View>
              <ScrollView>
                {expenses.map((expense, index) => (
                  <TouchableOpacity
                    key={index}
                    style={stylesGroupExpensesScreen.expenseItem}
                    onPress={() => {
                      navigateDetailExpense(expense.id.toString());
                    }}>
                    <View style={stylesGroupExpensesScreen.expenseDetails}>
                      <View style={stylesGroupExpensesScreen.containerExpense}>
                        <Text
                          style={
                            stylesGroupExpensesScreen.expenseName
                          }>{`${expense.name}`}</Text>
                      </View>

                      <View style={stylesGroupExpensesScreen.containerExpense}>
                        <Text
                          style={
                            stylesGroupExpensesScreen.expensePayer
                          }>{`${expense.paid_by.username}`}</Text>
                      </View>

                      <View style={stylesGroupExpensesScreen.containerExpense}>
                        <Text
                          style={
                            stylesGroupExpensesScreen.expenseAmount
                          }>{`${expense.amount}€`}</Text>
                      </View>
                      <View style={stylesGroupExpensesScreen.containerExpense}>
                        <Text
                          style={
                            stylesGroupExpensesScreen.expenseDate
                          }>{`${expense.date_paid.toLocaleDateString()}`}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        </View>
      </ScrollView>
      <GroupFooter activeSection="Expenses" />
    </SafeAreaView>
  );
};

export default GroupExpensesScreen;
