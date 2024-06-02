import {
  Button,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TextInput,
} from 'react-native';
import generalStyles from '../../../../styles/styles';
import useAddExpenseController from './hooks/useAddExpenseController';
import Picker from 'react-native-picker-select';
import CheckBox from '@react-native-community/checkbox';

const AddExpenseScreen: React.FunctionComponent = () => {
  const {
    concept,
    setConcept,
    amount,
    handleAmountChange,
    payer,
    setPayer,
    groupUsers,
    selectedUsers,
    handleCheckBoxChange,
  } = useAddExpenseController();

  return (
    <SafeAreaView style={generalStyles.defaultSafeAreaView}>
      <ScrollView style={generalStyles.defaultScrollView}>
        <View style={generalStyles.defaultContainerScreen}>
          <Text>Add Expenses</Text>

          <Text accessibilityLabel="Concept">Concept:</Text>
          <TextInput
            style={generalStyles.defaultInput}
            value={concept}
            onChangeText={setConcept}
            accessibilityLabel="Concept of the expense"
            autoCapitalize="none"
            testID="ConceptInput"
          />

          <Text accessibilityLabel="Amount">Amount:</Text>
          <TextInput
            style={generalStyles.defaultInput}
            value={amount}
            onChangeText={handleAmountChange}
            accessibilityLabel="Amount of the expense"
            keyboardType="numeric"
            testID="AmountInput"
          />

          <Text accessibilityLabel="Payer">Payer:</Text>
          <Picker
            value={payer}
            onValueChange={itemValue => setPayer(itemValue)}
            items={groupUsers.map(payerOption => ({
              label: payerOption.username,
              value: payerOption.id,
            }))}
            textInputProps={{
              accessibilityLabel: 'Payer picker',
              testID: 'PayerPicker',
            }}
          />

          <Text accessibilityLabel="Debtors">Debtors:</Text>
          {groupUsers.map(user => (
            <View key={user.id}>
              <Text>{user.username}</Text>
              <CheckBox
                value={selectedUsers[user.id]}
                onValueChange={newValue =>
                  handleCheckBoxChange(user.id, newValue)
                }
              />
            </View>
          ))}

          <Text accessibilityLabel="Date paid">Date paid:</Text>

          <View>
            <Button title="Create Expense" onPress={() => {}} />
            <Button title="Cancel" onPress={() => {}} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddExpenseScreen;
