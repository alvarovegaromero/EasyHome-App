import {useContext, useEffect, useState} from 'react';
import {ExpenseContext} from '../../../../../contexts/ExpenseContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from '../../../../../config';
import {GroupContext} from '../../../../../contexts/GroupContext';
import {Alert} from 'react-native';
import {DetailedExpense} from '../types';
import {useNavigation} from '@react-navigation/native';
import {UserContext} from '../../../../../contexts/UserContext';

const useExpenseDetailController = () => {
  const navigation = useNavigation();

  const {id} = useContext(UserContext);
  const {groupId, isOwner} = useContext(GroupContext);
  const {expenseId, setExpenseId} = useContext(ExpenseContext);

  const [expense, setExpense] = useState<DetailedExpense>();

  useEffect(() => {
    fetchExpenseDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const confirmAndDeleteExpense = () => {
    Alert.alert(
      'Delete expense',
      'Are you sure you want to delete this expense?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: deleteExpense,
        },
      ],
    );
  };

  const deleteExpense = async () => {
    const token = await AsyncStorage.getItem('token');

    fetch(
      BASE_URL +
        '/api/expense_distribution/' +
        groupId +
        '/expenses/' +
        expenseId,
      {
        method: 'DELETE',
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
          navigateGroupExpensesScreen();
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  /* Using default navigation for going back to GroupExpensesScreen. 
    As expenseId will be also changed if navigating to other expense */
  const navigateGroupExpensesScreen = () => {
    setExpenseId('');
    navigation.navigate('GroupExpensesScreen' as never);
  };

  return {expense, userId: id, isOwner, confirmAndDeleteExpense};
};

export default useExpenseDetailController;
