import {SafeAreaView, ScrollView, View} from 'react-native';
import useExpensesHomeController from './hooks/useExpensesHomeController';
import generalStyles from '../../../../styles/styles';
import GroupFooter from '../../../../utils/GroupFooter/GroupFooter';
import {Icon} from '@rneui/themed';
import stylesGroupHomeScreen from '../../../../styles/stylesGroupHomeScreen';
import Header from '../../../../utils/Header/Header';

const ExpensesHomeScreen: React.FunctionComponent = () => {
  const {navigateToAddExpense, navigateToGroupDebts, navigateToGroupExpenses} =
    useExpensesHomeController();

  return (
    <SafeAreaView style={generalStyles.defaultSafeAreaView}>
      <ScrollView style={generalStyles.defaultScrollView}>
        <Header secctionText="Expense Distribution Home" />
        <View style={generalStyles.defaultContainerScreen}>
          <View style={stylesGroupHomeScreen.containerButtons}>
            <View style={stylesGroupHomeScreen.containerButton}>
              <Icon
                name="plus-thick"
                reverse
                reverseColor="white"
                type="material-community"
                color="#2196F3"
                accessibilityLabel="Add an expense"
                onPress={navigateToAddExpense}
                size={55}
              />
            </View>

            <View style={stylesGroupHomeScreen.containerButton}>
              <Icon
                name="currency-usd"
                reverse
                reverseColor="white"
                type="material-community"
                color="#2196F3"
                accessibilityLabel="See group's debts"
                onPress={navigateToGroupDebts}
                size={55}
              />
            </View>

            <View style={stylesGroupHomeScreen.containerButton}>
              <Icon
                name="notebook-outline"
                reverse
                reverseColor="white"
                type="material-community"
                color="#2196F3"
                accessibilityLabel="See group's expenses"
                onPress={navigateToGroupExpenses}
                size={55}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <GroupFooter activeSection="Expenses" />
    </SafeAreaView>
  );
};

export default ExpensesHomeScreen;
