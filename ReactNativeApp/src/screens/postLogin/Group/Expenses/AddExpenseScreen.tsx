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
import DatePicker from 'react-native-date-picker';
import stylesAddExpenseScreen from '../../../../styles/stylesAddExpenseScreen';

const AddExpenseScreen: React.FunctionComponent = () => {
  const {
    concept,
    setConcept,
    amount,
    handleAmountChange,
    groupUsers,
    payer,
    setPayer,
    selectedUsers,
    handleCheckBoxChange,
    date,
    setDate,
    handleCreateExpenseSubmit,
    navigateExpensesHomeScreen,
  } = useAddExpenseController();

  return (
    <SafeAreaView style={generalStyles.defaultSafeAreaView}>
      <ScrollView style={generalStyles.defaultScrollView}>
        <View style={generalStyles.defaultContainerScreen}>
          <View style={generalStyles.defaultContainerHeader}>
            <Text style={generalStyles.defaultHeader}>Add a Expense:</Text>
          </View>

          <View style={stylesAddExpenseScreen.containerInputs}>
            <View style={stylesAddExpenseScreen.containerInput}>
              <Text accessibilityLabel="Concept">Concept:</Text>
              <TextInput
                style={generalStyles.defaultInput}
                value={concept}
                onChangeText={setConcept}
                accessibilityLabel="Concept of the expense"
                autoCapitalize="none"
                testID="ConceptInput"
              />
            </View>

            <View style={stylesAddExpenseScreen.containerInput}>
              <Text accessibilityLabel="Amount">Amount:</Text>
              <TextInput
                style={generalStyles.defaultInput}
                value={amount}
                onChangeText={handleAmountChange}
                accessibilityLabel="Amount of the expense"
                keyboardType="numeric"
                testID="AmountInput"
              />
            </View>

            <View style={stylesAddExpenseScreen.containerInput}>
              <Text accessibilityLabel="Payer">Payer:</Text>
              <View style={generalStyles.defaultInput}>
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
              </View>
            </View>

            <View style={stylesAddExpenseScreen.containerInput}>
              <Text accessibilityLabel="Debtors">Debtors:</Text>
              <View style={stylesAddExpenseScreen.containerCheckboxes}>
                <ScrollView>
                  {groupUsers.map(user => (
                    <View
                      key={user.id}
                      style={stylesAddExpenseScreen.containerTextAndCheckbox}>
                      <View accessibilityLabel="User Selection Checkbox">
                        <CheckBox
                          value={selectedUsers[user.id]}
                          onValueChange={newValue =>
                            handleCheckBoxChange(user.id, newValue)
                          }
                        />
                      </View>
                      <Text
                        style={stylesAddExpenseScreen.fontSizeCheckbox}
                        accessibilityLabel={`Username: ${user.username}`}>
                        {user.username}
                      </Text>
                    </View>
                  ))}
                </ScrollView>
              </View>
            </View>

            <View style={stylesAddExpenseScreen.containerInput}>
              <Text accessibilityLabel="Date paid">Date paid:</Text>
              <View
                style={stylesAddExpenseScreen.datePickerInput}
                accessibilityLabel="Date Picker">
                <DatePicker
                  mode="date"
                  date={date}
                  onDateChange={setDate}
                  locale="en-GB"
                  testID="DatePicker"
                />
              </View>
            </View>
          </View>

          <View>
            <View style={stylesAddExpenseScreen.containerButton}>
              <View style={generalStyles.defaultButton}>
                <Button
                  title="Create Expense"
                  onPress={handleCreateExpenseSubmit}
                  accessibilityLabel="Create expense button"
                  testID="CreateExpenseButton"
                />
              </View>
            </View>
            <View style={stylesAddExpenseScreen.containerButton}>
              <View style={generalStyles.defaultButton}>
                <Button
                  title="Cancel"
                  onPress={navigateExpensesHomeScreen}
                  accessibilityLabel="Cancel button"
                  testID="CancelButton"
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddExpenseScreen;
