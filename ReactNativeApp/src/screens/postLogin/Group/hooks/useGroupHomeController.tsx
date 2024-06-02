import {useContext, useEffect, useState} from 'react';
import {GroupContext} from '../../../../contexts/GroupContext';
import {BASE_URL} from '../../../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Group} from '../types';

const useGroupHomeController = () => {
  const navigation = useNavigation();

  const {groupId, setGroupId} = useContext(GroupContext);

  const [groupName, setGroupName] = useState(''); //could be added in groupContext

  useEffect(() => {
    fetchGroupData();
  }); //[]

  const fetchGroupData = async () => {
    const token = await AsyncStorage.getItem('token');

    fetch(BASE_URL + '/api/groups/' + groupId, {
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
      .then((data: Group) => {
        setGroupName(data.name);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const navigateBoard = () => {
    navigation.navigate('GroupBoardScreen' as never);
  };

  const navigateSettings = () => {
    navigation.navigate('GroupSettingsScreen' as never);
  };

  const navigateHome = () => {
    setGroupId('');
    navigation.navigate('HomeScreen' as never);
  };

  const navigateExpenses = () => {
    navigation.navigate('ExpensesHomeScreen' as never);
  };

  return {
    groupName,
    navigateBoard,
    navigateSettings,
    navigateHome,
    navigateExpenses,
  };
};

export default useGroupHomeController;
