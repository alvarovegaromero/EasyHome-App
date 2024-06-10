import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';
import {BASE_URL} from '../../../../../config';
import {Expense} from '../types';
import {useEffect, useState, useContext} from 'react';
import {GroupContext} from '../../../../../contexts/GroupContext';
import {useNavigation} from '@react-navigation/native';
import {ExpenseContext} from '../../../../../contexts/ExpenseContext';

const useGroupExpensesController = () => {
  const navigation = useNavigation();

  const {groupId} = useContext(GroupContext);
  const {expenseId, setExpenseId} = useContext(ExpenseContext);

  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    fetchExpenses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expenseId]);

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

  return {
    expenses,
    navigateDetailExpense,
  };
};

export default useGroupExpensesController;
