import {useEffect, useState, useContext} from 'react';
import {Alert} from 'react-native';
import {BASE_URL} from '../../../../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GroupContext} from '../../../../../contexts/GroupContext';
import {User} from '../types';

const useAddExpenseController = () => {
  const {groupId} = useContext(GroupContext);

  const [concept, setConcept] = useState<string>();
  const [amount, setAmount] = useState<string>(); //TODO: change to number
  const [payer, setPayer] = useState<string>();

  const [groupUsers, setGroupUsers] = useState<User[]>([]);

  const handleAmountChange = (value: string) => {
    if (/^\d*\.?\d{0,2}$/.test(value)) {
      setAmount(value);
    }
  };

  useEffect(() => {
    fetchGroupUsersData();
  }, []);

  const fetchGroupUsersData = async () => {
    const token = await AsyncStorage.getItem('token');

    fetch(BASE_URL + '/api/groups/' + groupId + '/users', {
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
      .then((data: {users: User[]}) => {
        setGroupUsers(data.users);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return {
    concept,
    setConcept,
    amount,
    handleAmountChange,
    payer,
    setPayer,
    groupUsers,
  };
};

export default useAddExpenseController;
