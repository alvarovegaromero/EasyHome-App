import {useEffect, useState, useContext} from 'react';
import {Alert} from 'react-native';
import {BASE_URL} from '../../../../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GroupContext} from '../../../../../contexts/GroupContext';
import {Expense, User} from '../types';
import {useNavigation} from '@react-navigation/native';
import {ExpenseContext} from '../../../../../contexts/ExpenseContext';

const useAddExpenseController = () => {
  const navigation = useNavigation();

  const {groupId} = useContext(GroupContext);
  const {setExpenseId} = useContext(ExpenseContext);

  const [concept, setConcept] = useState<string>();
  const [amount, setAmount] = useState<string>(); //TODO: change to number
  const [payer, setPayer] = useState<string>();
  const [selectedUsers, setSelectedUsers] = useState<Record<number, boolean>>(
    {},
  );
  const [date, setDate] = useState(new Date());

  const [groupUsers, setGroupUsers] = useState<User[]>([]);

  const handleAmountChange = (value: string) => {
    if (/^\d*\.?\d{0,2}$/.test(value)) {
      setAmount(value);
    }
  };

  const handleCheckBoxChange = (userId: number, newValue: boolean) => {
    setSelectedUsers(prevSelectedUsers => ({
      ...prevSelectedUsers,
      [userId]: newValue,
    }));
  };

  useEffect(() => {
    fetchGroupUsersData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

        const initialSelectedUsers = data.users.reduce(
          (acc, user) => {
            acc[user.id] = true;
            return acc;
          },
          {} as Record<number, boolean>,
        );
        setSelectedUsers(initialSelectedUsers);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const handleCreateExpenseSubmit = async () => {
    if (!concept || !amount || !payer) {
      Alert.alert('Error', 'Concept, amount and payer are required');
      console.error('Error: Concept, amount and payer are required');
      return;
    }

    if (!Object.values(selectedUsers).includes(true)) {
      Alert.alert('Error', 'At least one debtor is required');
      console.error('Error: At least one debtor is required');
      return;
    }

    const debtors = Object.entries(selectedUsers)
      .filter(([, value]) => value)
      .map(([key]) => key);

    const token = await AsyncStorage.getItem('token');

    fetch(BASE_URL + '/api/expense_distribution/' + groupId + '/expenses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({
        name: concept,
        amount: Number(amount),
        paid_by: payer,
        debtors,
        date_paid: date.toISOString().split('T')[0],
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
      .then((data: Expense) => {
        Alert.alert('Success', 'Expense created successfully');
        navigateDetailExpense(String(data.id));
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const navigateDetailExpense = (id: string) => {
    setExpenseId(id);
    navigation.navigate('ExpenseDetailScreen' as never);
  };

  const navigateExpensesHomeScreen = () => {
    navigation.navigate('ExpensesHomeScreen' as never);
  };

  return {
    concept,
    setConcept,
    amount,
    handleAmountChange,
    payer,
    setPayer,
    groupUsers,
    selectedUsers,
    date,
    setDate,
    handleCheckBoxChange,
    handleCreateExpenseSubmit,
    navigateExpensesHomeScreen,
  };
};

export default useAddExpenseController;
