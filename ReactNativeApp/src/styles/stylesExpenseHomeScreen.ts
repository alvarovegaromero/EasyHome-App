import {StyleSheet} from 'react-native';
import generalStyles from './styles';

const stylesExpenseHomeScreen = StyleSheet.create({
  containerExpensesAndTitle: {},

  containerExpenses: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    height: 300,
  },

  expenseItem: {
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 10,
  },

  expenseDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  expenseName: {
    textAlign: 'left',
    flex: 1,
  },

  expensePayer: {
    textAlign: 'left',
    flex: 1,
  },

  expenseAmount: {
    textAlign: 'left',
    flex: 1,
  },

  expenseDate: {
    textAlign: 'left',
    flex: 1,
  },

  containerButtons: {
    marginTop: 20,
  },

  containerButton: {
    ...generalStyles.defaultContainerButton,
    marginTop: 5,
    marginBottom: 10,
  },
});

export default stylesExpenseHomeScreen;
