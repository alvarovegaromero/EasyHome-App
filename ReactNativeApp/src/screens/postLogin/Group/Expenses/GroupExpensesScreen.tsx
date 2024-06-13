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
import {Icon} from '@rneui/themed';
import Header from '../../../../utils/Header/Header';

const GroupExpensesScreen: React.FunctionComponent = () => {
  const {expenses, navigateDetailExpense} = useGroupExpensesController();

  return (
    <SafeAreaView style={generalStyles.defaultSafeAreaView}>
      <ScrollView style={generalStyles.defaultScrollView}>
        <Header secctionText="Group's Expenses" />
        <View style={generalStyles.defaultContainerScreen}>
          <View style={stylesGroupExpensesScreen.containerExpensesAndTitle}>
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
                <View
                  style={stylesGroupExpensesScreen.containerAccessIconColumn}
                />
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
                          style={stylesGroupExpensesScreen.expenseName}
                          numberOfLines={2}
                          ellipsizeMode="tail">{`${expense.name}`}</Text>
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
                          }>{`${expense.date_paid.toLocaleDateString('en-GB')}`}</Text>
                      </View>
                      <View
                        style={
                          stylesGroupExpensesScreen.containerAccessIconColumn
                        }>
                        <Icon
                          name="chevron-right"
                          type="material-community"
                          color="#2196F3"
                          accessibilityLabel="View detail"
                          size={40}
                        />
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
