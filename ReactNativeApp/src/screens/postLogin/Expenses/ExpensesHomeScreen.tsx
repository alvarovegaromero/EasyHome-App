import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import useExpensesHomeController from './hooks/useExpenseHomeController';
import generalStyles from '../../../styles/styles';

const ExpensesHomeScreen: React.FunctionComponent = () => {
  const {expenses} = useExpensesHomeController();

  return (
    <SafeAreaView style={generalStyles.defaultSafeAreaView}>
      <ScrollView style={generalStyles.defaultScrollView}>
        <View style={generalStyles.defaultContainerScreen}>
          <ScrollView>
            <View>
              <Text style={generalStyles.defaultSubHeader}>Expenses</Text>
              <View>
                {expenses.map((expense, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      console.log(expense.name);
                    }}>
                    <View>
                      <Text>{`Amount: ${expense.amount}`}</Text>
                      <Text>
                        {`Date Paid: ${new Date(expense.date_paid).toLocaleDateString()}`}
                      </Text>
                      <Text>{`ID: ${expense.id}`}</Text>
                      <Text>{`Name: ${expense.name}`}</Text>
                      <Text>{`Paid By: ${expense.paid_by_username}`}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ExpensesHomeScreen;
