import {useContext, useState} from 'react';
import {GroupContext} from '../../../../../contexts/GroupContext';
import {Alert} from 'react-native';
import {BASE_URL} from '../../../../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getFormatedDateForRequests} from '../../../../../utils/utils';
import {AssignableTask} from '../types';

const useChoresStatsController = () => {
  const {groupId} = useContext(GroupContext);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [choresInfo, setChoresInfo] = useState<AssignableTask[]>([]);

  const fetchChoresStats = async () => {
    const start_date_formatted = getFormatedDateForRequests(startDate);
    const end_date_formatted = getFormatedDateForRequests(endDate);

    const token = await AsyncStorage.getItem('token');

    fetch(
      BASE_URL +
        '/api/household_chores/' +
        groupId +
        '/tasks/assign/range?start_date=' +
        start_date_formatted +
        '&end_date=' +
        end_date_formatted,
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
          return response.json() as Promise<AssignableTask[]>;
        }
      })
      .then(data => {
        console.log(data);
        setChoresInfo(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const completedTasks = choresInfo.filter(task => task.is_completed).length;
  const uncompletedTasks = choresInfo.filter(task => !task.is_completed).length;

  return {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    fetchChoresStats,
    completedTasks,
    uncompletedTasks,
  };
};

export default useChoresStatsController;
