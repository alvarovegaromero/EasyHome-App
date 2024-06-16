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
    marginTop: 2.5,
    marginBottom: 30,
    width: '50%',
  },

  containerIcons: {
    flexDirection: 'row',
  },

  styleTextTitleSection: {
    fontSize: 16,
  },
});

export default stylesAddExpenseScreen;
