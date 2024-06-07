import {useContext, useEffect, useState} from 'react';
import {GroupContext} from '../../../../../contexts/GroupContext';
import {Alert} from 'react-native';
import {BASE_URL} from '../../../../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getCurrentDate} from '../../../../../utils/utils';

const useTodaysChoresController = () => {
  const {groupId} = useContext(GroupContext);

  const [assignableTasks, setAssignableTasks] = useState<any[] | undefined>(
    undefined,
  );

  useEffect(() => {
    fetchAssignableTask();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchAssignableTask = async () => {
    const token = await AsyncStorage.getItem('token');

    fetch(
      BASE_URL + '/api/household_chores/' + groupId + '/tasks/assign/today',
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
        console.log(data);
        setAssignableTasks(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return {assignableTasks, currentDate: getCurrentDate()};
};

export default useTodaysChoresController;
