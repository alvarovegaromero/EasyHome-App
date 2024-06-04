import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';
import {BASE_URL} from '../../../../../config';
import {Expense, Settlement} from '../types';
import {useEffect, useState, useContext} from 'react';
import {GroupContext} from '../../../../../contexts/GroupContext';
import {useNavigation} from '@react-navigation/native';
import {ExpenseContext} from '../../../../../contexts/ExpenseContext';

const useExpensesHomeController = () => {
  const navigation = useNavigation();

  const {groupId} = useContext(GroupContext);
  const {setExpenseId} = useContext(ExpenseContext);

  const [settlements, setSettlements] = useState<Settlement[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    fetchSettlements();
    fetchExpenses();
  }, []);

  const fetchSettlements = async () => {
    const token = await AsyncStorage.getItem('token');

    fetch(BASE_URL + '/api/expense_distribution/' + groupId + '/settlements', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(({error}) => {
            Alert.alert('Error', error);
            throw new Error(`${response.status} - ${error}`);
          });
        } else {
          return response.json();
        }
      })
      .then((data: Settlement[]) => {
        setSettlements(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const fetchExpenses = async () => {
    const token = await AsyncStorage.getItem('token');

    fetch(BASE_URL + '/api/expense_distribution/' + groupId + '/expenses', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(({error}) => {
            Alert.alert('Error', error);
            throw new Error(`${response.status} - ${error}`);
          });
        } else {
          return response.json();
        }
      })
      .then((data: Expense[]) => {
        const expensesWithDates = data.map(expense => ({
          ...expense,
          date_paid: new Date(expense.date_paid),
        }));
        setExpenses(expensesWithDates);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const navigateDetailExpense = (id: string) => {
    setExpenseId(id);
    navigation.navigate('ExpenseDetailScreen' as never);
  };

  const navigateAddExpense = () => {
    navigation.navigate('AddExpenseScreen' as never);
  };

  const navigateGroupHome = () => {
    navigation.navigate('GroupHomeScreen' as never);
  };

  return {
    settlements,
    expenses,
    navigateDetailExpense,
    navigateAddExpense,
    navigateGroupHome,
  };
};

export default useExpensesHomeController;
