import {useContext, useEffect, useState} from 'react';
import {GroupContext} from '../../../../../contexts/GroupContext';
import {Alert} from 'react-native';
import {BASE_URL} from '../../../../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
        setAssignableTasks(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const confirmAndCompleteTask = (taskId: number) => {
    Alert.alert(
      'Complete task',
      `Are you sure you want to set this task as completed by you?\n\n` +
        `You won't be able to undo your action unless you contact with support`,
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => completeAssignableTask(taskId),
        },
      ],
    );
  };

  const completeAssignableTask = async (taskId: number) => {
    const token = await AsyncStorage.getItem('token');

    fetch(
      BASE_URL + '/api/household_chores/' + groupId + '/tasks/assign/' + taskId,
      {
        method: 'PUT',
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
        setAssignableTasks(prevTasks =>
          prevTasks?.map(task => (task.id === data.id ? data : task)),
        );
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return {
    assignableTasks,
    confirmAndCompleteTask,
  };
};

export default useTodaysChoresController;
