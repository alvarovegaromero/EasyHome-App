import {StyleSheet} from 'react-native';
import generalStyles from './styles';

const stylesAddExpenseScreen = StyleSheet.create({
  containerInputs: {
    marginBottom: 10,
  },

  containerInput: {
    marginBottom: 10,
  },

  containerCheckboxes: {
    ...generalStyles.defaultInput,
    height: 135,
  },

  containerTextAndCheckbox: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  fontSizeCheckbox: {
    fontSize: 15,
  },

  datePickerInput: {
    ...generalStyles.defaultInput,
    alignItems: 'center',
  },

  containerIcons: {
    flexDirection: 'row',
  },

  styleTextTitleSection: {
    fontSize: 16,
  },
});

export default stylesAddExpenseScreen;
