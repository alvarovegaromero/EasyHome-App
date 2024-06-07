import {useContext, useEffect, useState} from 'react';
import {GroupContext} from '../../../../../contexts/GroupContext';
import {Alert} from 'react-native';
import {BASE_URL} from '../../../../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getFormatedDateForRequests} from '../../../../../utils/utils';
import {AssignableTask, User} from '../types';

const useChoresStatsController = () => {
  const {groupId} = useContext(GroupContext);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [choresInfo, setChoresInfo] = useState<AssignableTask[]>([]);

  const [selectedUserId, setSelectedUserId] = useState<number | undefined>(
    undefined,
  );
  const [groupUsers, setGroupUsers] = useState<User[]>([]);

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
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const fetchChoresStats = async () => {
    const start_date_formatted = getFormatedDateForRequests(startDate);
    const end_date_formatted = getFormatedDateForRequests(endDate);

    const token = await AsyncStorage.getItem('token');

    const url =
      BASE_URL +
      '/api/household_chores/' +
      groupId +
      '/tasks/assign/range?start_date=' +
      start_date_formatted +
      '&end_date=' +
      end_date_formatted +
      '&is_completed=true' +
      (selectedUserId ? '&user_id=' + selectedUserId : '');

    fetch(url, {
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
          return response.json() as Promise<AssignableTask[]>;
        }
      })
      .then(data => {
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
    let color = '#' + Math.floor(Math.random() * 16777215).toString(16);
    color = color.padEnd(7, '0'); // in case doesnt have 6 digits, fill with 0s

    return {
      label,
      value,
      color,
    };
  });

  const totalAssignableTasks = choresInfo.length;

  return {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    groupUsers,
    selectedUserId,
    setSelectedUserId,
    fetchChoresStats,
    pieData,
    totalAssignableTasks,
  };
};

export default useChoresStatsController;
