import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import useExpensesHomeController from './hooks/useExpensesHomeController';
import generalStyles from '../../../../styles/styles';
import GroupFooter from '../../../../utils/GroupFooter/GroupFooter';
import {Icon} from '@rneui/themed';
import stylesExpensesHomeScreen from '../../../../styles/stylesExpensesHomeScreen';

const ExpensesHomeScreen: React.FunctionComponent = () => {
  const {
    navigateToAddExpense,
    navigateToGroupDebts,
    navigateToGroupExpenses,
    navigateGroupHomeScreen,
  } = useExpensesHomeController();

  return (
    <SafeAreaView style={generalStyles.defaultSafeAreaView}>
      <ScrollView style={generalStyles.defaultScrollView}>
        <View style={generalStyles.defaultContainerScreen}>
          <View style={generalStyles.defaultContainerHeader}>
            <Text style={generalStyles.defaultHeader}>
              Expense Distribution
            </Text>
          </View>

          <View style={stylesExpensesHomeScreen.containerIcons}>
            <Icon
              name="plus-thick"
              reverse
              reverseColor="white"
              type="material-community"
              color="#2196F3"
              accessibilityLabel="Add an expense"
              onPress={navigateToAddExpense}
              size={50}
            />

            <Icon
              name="currency-usd"
              reverse
              reverseColor="white"
              type="material-community"
              color="#2196F3"
              accessibilityLabel="See group's debts"
              onPress={navigateToGroupDebts}
              size={50}
            />

            <Icon
              name="notebook-outline"
              reverse
              reverseColor="white"
              type="material-community"
              color="#2196F3"
              accessibilityLabel="See group's expenses"
              onPress={navigateToGroupExpenses}
              size={50}
            />

            <Icon
              name="arrow-left-circle"
              reverse
              reverseColor="white"
              type="material-community"
              color="#2196F3"
              accessibilityLabel="Go back to Group Home Screen"
              onPress={navigateGroupHomeScreen}
              size={50}
            />
          </View>
        </View>
      </ScrollView>
      <GroupFooter activeSection="Expenses" />
    </SafeAreaView>
  );
};

export default ExpensesHomeScreen;
