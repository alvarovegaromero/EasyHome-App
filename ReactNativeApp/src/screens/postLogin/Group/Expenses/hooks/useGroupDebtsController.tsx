import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';
import {BASE_URL} from '../../../../../config';
import {Settlement} from '../types';
import {useEffect, useState, useContext} from 'react';
import {GroupContext} from '../../../../../contexts/GroupContext';
import {UserContext} from '../../../../../contexts/UserContext';

const useGroupDebtsController = () => {
  const {id} = useContext(UserContext);
  const {groupId} = useContext(GroupContext);

  const [settlements, setSettlements] = useState<Settlement[]>([]);

  useEffect(() => {
    fetchSettlements();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const confirmAndSettleDebt = (
    payerId: string,
    receiverId: string,
    amount: number,
  ) => {
    Alert.alert(
      'Confirmation',
      `Are you sure you want to settle the debt of ${amount}€?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => settleDebt(payerId, receiverId, amount),
        },
      ],
    );
  };

  const settleDebt = async (
    payerId: string,
    receiverId: string,
    amount: number,
  ) => {
    const token = await AsyncStorage.getItem('token');

    fetch(BASE_URL + '/api/expense_distribution/' + groupId + '/expenses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({
        name: 'Settlement',
        amount: Number(amount),
        paid_by: payerId,
        debtors: [receiverId],
        date_paid: new Date().toISOString().split('T')[0],
      }),
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
      .then(() => {
        fetchSettlements();
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return {userId: id, settlements, confirmAndSettleDebt};
};

export default useGroupDebtsController;
