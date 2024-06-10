import {
  Button,
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
  const {
    settlements,
    confirmAndSettleDebt,
    expenses,
    navigateDetailExpense,
    navigateAddExpense,
    navigateExpensesHome,
  } = useGroupExpensesController();

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
            <Text style={generalStyles.defaultSubHeader}>Settlements</Text>
            <View>
              {settlements.map((settlement, index) => (
                <View
                  key={index}
                  style={
                    stylesGroupExpensesScreen.containerSettlementAndButton
                  }>
                  <View
                    style={stylesGroupExpensesScreen.containerSettlementText}>
                    <Text style={stylesGroupExpensesScreen.styleTextSettlement}>
                      {`● ${settlement.payer.username}`}
                      {` owes ${settlement.receiver.username}`}
                      {` ${settlement.amount}€`}
                    </Text>
                  </View>
                  <View
                    style={stylesGroupExpensesScreen.containerSettlementButton}>
                    <TouchableOpacity
                      onPress={() => {
                        confirmAndSettleDebt(
                          settlement.payer.id.toString(),
                          settlement.receiver.id.toString(),
                          settlement.amount,
                        );
                      }}>
                      <Text
                        style={
                          stylesGroupExpensesScreen.styleSettlementButtonText
                        }>
                        Mark as Paid
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
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

          <View style={stylesGroupExpensesScreen.containerButtons}>
            <View style={stylesGroupExpensesScreen.containerButton}>
              <View style={generalStyles.defaultButton}>
                <Button title="Add Expense" onPress={navigateAddExpense} />
              </View>
            </View>
            <View style={stylesGroupExpensesScreen.containerButton}>
              <View style={generalStyles.defaultButton}>
                <Button title="Go Back" onPress={navigateExpensesHome} />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <GroupFooter activeSection="Expenses" />
    </SafeAreaView>
  );
};

export default GroupExpensesScreen;
