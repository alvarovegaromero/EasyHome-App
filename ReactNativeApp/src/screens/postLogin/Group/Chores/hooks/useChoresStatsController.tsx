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
        end_date_formatted +
        '&is_completed=' +
        'true',
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

  const taskCounts = choresInfo.reduce(
    (counts, task) => {
      const taskType = task.task.title;

      if (counts[taskType]) {
        counts[taskType]++;
      } else {
        counts[taskType] = 1;
      }

      return counts;
    },
    {} as {[key: string]: number},
  );

  const pieData = Object.entries(taskCounts).map(([label, value]) => {
    console.log('Label:', label);
    return {
      label,
      value,
      color: '#' + Math.floor(Math.random() * 16777215).toString(16),
    };
  });

  const totalAssignableTasks = choresInfo.length;

  return {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    fetchChoresStats,
    pieData,
    totalAssignableTasks,
  };
};

export default useChoresStatsController;
