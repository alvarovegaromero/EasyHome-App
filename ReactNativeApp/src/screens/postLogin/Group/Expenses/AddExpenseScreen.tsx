import {SafeAreaView, ScrollView, Text, View, TextInput} from 'react-native';
import generalStyles from '../../../../styles/styles';
import useAddExpenseController from './hooks/useAddExpenseController';
import Picker from 'react-native-picker-select';
import CheckBox from '@react-native-community/checkbox';
import DatePicker from 'react-native-date-picker';
import stylesAddExpenseScreen from '../../../../styles/stylesAddExpenseScreen';
import GroupFooter from '../../../../utils/GroupFooter/GroupFooter';
import {Icon} from '@rneui/themed';
import Header from '../../../../utils/Header/Header';
import ButtonWithIcon from '../../../../utils/ButtonWithIcon/ButtonWithIcon';

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
    dateModalOpen,
    setDateModalOpen,
    handleCreateExpenseSubmit,
    navigateExpensesHomeScreen,
  } = useAddExpenseController();

  return (
    <SafeAreaView style={generalStyles.defaultSafeAreaView}>
      <ScrollView style={generalStyles.defaultScrollView}>
        <Header secctionText="Add Expense" />
        <View style={generalStyles.defaultContainerScreen}>
          <View style={stylesAddExpenseScreen.containerInputs}>
            <View style={stylesAddExpenseScreen.containerInput}>
              <TextInput
                style={generalStyles.defaultInput}
                value={concept}
                onChangeText={setConcept}
                accessibilityLabel="Concept of the expense"
                autoCapitalize="none"
                testID="ConceptInput"
                placeholder="Concept of the expense"
                placeholderTextColor={'#b3b3b3'}
              />
            </View>

            <View style={stylesAddExpenseScreen.containerInput}>
              <TextInput
                style={generalStyles.defaultInput}
                value={amount}
                onChangeText={handleAmountChange}
                accessibilityLabel="Amount of the expense"
                keyboardType="numeric"
                testID="AmountInput"
                placeholder="Price of the expense"
                placeholderTextColor={'#b3b3b3'}
              />
            </View>

            <View style={stylesAddExpenseScreen.containerInput}>
              <View style={generalStyles.defaultInput}>
                <Picker
                  placeholder={{label: 'Select a payer', value: undefined}}
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
              <Text
                accessibilityLabel="Debtors"
                style={stylesAddExpenseScreen.styleTextTitleSection}>
                Debtors:
              </Text>
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

            <View>
              <Text
                accessibilityLabel="Date paid"
                style={stylesAddExpenseScreen.styleTextTitleSection}>
                Date paid: {date.toLocaleDateString('en-GB')}
              </Text>
              <View
                style={stylesAddExpenseScreen.datePickerInput}
                accessibilityLabel="Date Picker">
                <ButtonWithIcon
                  title="SET DATE"
                  onPress={() => setDateModalOpen(true)}
                  accessibilityLabel="Open Date Picker"
                  testID="OpenDatePickerButton"
                  name="calendar"
                />
                <DatePicker
                  mode="date"
                  date={date}
                  onDateChange={setDate}
                  locale="en-GB"
                  testID="DatePicker"
                  modal={true}
                  open={dateModalOpen}
                  onConfirm={date => {
                    setDate(date);
                    setDateModalOpen(false);
                  }}
                  onCancel={() => setDateModalOpen(false)}
                />
              </View>
            </View>
          </View>

          <View style={stylesAddExpenseScreen.containerIcons}>
            <Icon
              name="plus-thick"
              type="material-community"
              reverse
              reverseColor="white"
              color="#2196F3"
              onPress={handleCreateExpenseSubmit}
              accessibilityLabel="Create expense button"
              testID="CreateExpenseButton"
              size={40}
            />
            <Icon
              name="close-thick"
              type="material-community"
              reverse
              reverseColor="white"
              color="#FF7F50"
              onPress={navigateExpensesHomeScreen}
              accessibilityLabel="Cancel button"
              testID="CancelButton"
              size={40}
            />
          </View>
        </View>
      </ScrollView>
      <GroupFooter activeSection="Expenses" />
    </SafeAreaView>
  );
};

export default AddExpenseScreen;
