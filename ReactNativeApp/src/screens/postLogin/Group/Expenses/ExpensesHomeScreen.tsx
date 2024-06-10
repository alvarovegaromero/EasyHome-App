import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import useExpensesHomeController from './hooks/useExpensesHomeController';
import generalStyles from '../../../../styles/styles';
import GroupFooter from '../../../../utils/GroupFooter/GroupFooter';

const ExpensesHomeScreen: React.FunctionComponent = () => {
  const {} = useExpensesHomeController();

  return (
    <SafeAreaView style={generalStyles.defaultSafeAreaView}>
      <ScrollView style={generalStyles.defaultScrollView}>
        <View style={generalStyles.defaultContainerScreen}>
          <View style={generalStyles.defaultContainerHeader}>
            <Text style={generalStyles.defaultHeader}>
              Expense Distribution
            </Text>
          </View>
        </View>
      </ScrollView>
      <GroupFooter activeSection="Expenses" />
    </SafeAreaView>
  );
};

export default ExpensesHomeScreen;
