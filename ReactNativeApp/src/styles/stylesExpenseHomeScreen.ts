import {StyleSheet} from 'react-native';
import generalStyles from './styles';

const stylesExpenseHomeScreen = StyleSheet.create({
  containerSettlementAndButton: {
    marginBottom: 7.5,
    flexDirection: 'row',
  },

  containerSettlementText: {
    flex: 7,
  },

  styleTextSettlement: {
    fontSize: 15,
  },

  containerSettlementButton: {
    flex: 3,
  },

  styleSettlementButtonText: {
    textAlign: 'right',
    color: '#2d2dfc', // blue
  },

  containerExpensesAndTitle: {},

  containerExpenses: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    height: 300,
  },

  expenseItem: {
    height: 50,
    //borderRightColor: 'black',
    //borderRightWidth: 1,
    marginBottom: 10,
  },

  containerTitle: {
    marginLeft: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },

  containerTitleColumn: {
    flex: 1,
    marginBottom: 5,
    marginTop: 3,
    paddingLeft: 2,
    paddingRight: 2,
  },

  styleTitleColumn: {
    fontWeight: 'bold',
    fontSize: 15,
  },

  expenseDetails: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    borderTopWidth: 1,
    borderTopColor: 'black',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  containerExpense: {
    height: 50,
    justifyContent: 'center',
    flex: 1,
  },

  expenseName: {
    marginLeft: 2,
    marginRight: 2,
    padding: 2,
    textAlign: 'left',
  },

  expensePayer: {
    marginLeft: 2,
    marginRight: 2,
    padding: 2,
    textAlign: 'left',
  },

  expenseAmount: {
    marginLeft: 2,
    marginRight: 2,
    padding: 2,
    textAlign: 'left',
  },

  expenseDate: {
    marginLeft: 2,
    marginRight: 2,
    padding: 2,
    textAlign: 'left',
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
