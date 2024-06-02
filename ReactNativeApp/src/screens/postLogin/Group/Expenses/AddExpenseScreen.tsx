import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import generalStyles from '../../../../styles/styles';
import useAddExpenseController from './hooks/useAddExpenseController';

const AddExpenseScreen: React.FunctionComponent = () => {
  const {} = useAddExpenseController();

  return (
    <SafeAreaView style={generalStyles.defaultSafeAreaView}>
      <ScrollView style={generalStyles.defaultScrollView}>
        <View>
          <Text>Add Expense Screen</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddExpenseScreen;
