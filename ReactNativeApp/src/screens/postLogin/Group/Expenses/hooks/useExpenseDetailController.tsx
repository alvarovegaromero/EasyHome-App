import {useContext, useEffect, useState} from 'react';
import {ExpenseContext} from '../../../../../contexts/ExpenseContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from '../../../../../config';
import {GroupContext} from '../../../../../contexts/GroupContext';
import {Alert} from 'react-native';
import {DetailedExpense} from '../types';

const useExpenseDetailController = () => {
  const {groupId} = useContext(GroupContext);
  const {expenseId} = useContext(ExpenseContext);

  const [expense, setExpense] = useState<DetailedExpense>();

  useEffect(() => {
    fetchExpenseDetails();
  }, []);

  const fetchExpenseDetails = async () => {
    const token = await AsyncStorage.getItem('token');

    fetch(
      BASE_URL +
        '/api/expense_distribution/' +
        groupId +
        '/expenses/' +
        expenseId,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
      },
    )
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
      .then(data => {
        const transformedData: DetailedExpense = {
          id: data.id,
          name: data.name,
          amount: parseFloat(data.amount),
          date_paid: new Date(data.date_paid),
          paid_by: data.paid_by,
          debtors: data.debtors,
          date_added: new Date(data.date_added),
        };
        setExpense(transformedData);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return {expense};
};

export default useExpenseDetailController;
