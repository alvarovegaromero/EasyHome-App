import {useContext, useEffect, useState} from 'react';
import {GroupContext} from '../../../../../contexts/GroupContext';
import {Alert} from 'react-native';
import {BASE_URL} from '../../../../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useEstablishChoresController = () => {
  const {groupId} = useContext(GroupContext);

  const [tasks, setTasks] = useState<any[] | undefined>(undefined);

  const [addMode, setAddMode] = useState(false);
  const [addInput, setAddInput] = useState('');
  const [isActivated, setIsActivated] = useState(false); // Same as useChoresHomeController

  useEffect(() => {
    fetchTasks();
    fetchIsActivated();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchTasks = async () => {
    const token = await AsyncStorage.getItem('token');

    fetch(BASE_URL + '/api/household_chores/' + groupId + '/tasks', {
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
      .then(data => {
        setTasks(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const fetchIsActivated = async () => {
    const token = await AsyncStorage.getItem('token');

    fetch(
      BASE_URL + '/api/household_chores/' + groupId + '/tasks/assign/active',
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
        setIsActivated(data.active);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const createTask = async () => {
    if (addInput === '') {
      Alert.alert('Error', 'Title of the new task must be filled');
      console.error('Creation Failed - title of the new task must be filled');
      return;
    }

    const token = await AsyncStorage.getItem('token');

    fetch(BASE_URL + '/api/household_chores/' + groupId + '/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({title: addInput}),
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
        fetchTasks();
        setAddInput('');
        changeToViewMode();
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const confirmAndDeleteTask = (taskId: number) => {
    Alert.alert(
      'Delete task',
      `Are you sure you want to delete this task?\n\nAll the assignable tasks ` +
        `related to this task will be deleted as well.`,
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => deleteTask(taskId),
        },
      ],
    );
  };

  const deleteTask = async (taskId: number) => {
    const token = await AsyncStorage.getItem('token');

    fetch(
      BASE_URL +
        '/api/household_chores/' +
        groupId +
        '/tasks/' +
        taskId.toString(),
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
          fetchTasks();
        }
      })
      .then(() => {
        fetchTasks();
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const confirmAndStartAssignableTasksProcess = () => {
    Alert.alert(
      'Start Assignable Tasks Process',
      'Are you sure you want to start the assignable tasks process?',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => startAssignableTasksProcess(),
        },
      ],
    );
  };

  const startAssignableTasksProcess = async () => {
    const token = await AsyncStorage.getItem('token');

    fetch(
      BASE_URL + '/api/household_chores/' + groupId + '/tasks/start_assignable',
      {
        method: 'POST',
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
      .then(() => {
        setIsActivated(true);
        Alert.alert(
          'Success',
          `Assignable tasks process started.\n\nYou can see it now in the Assignable Tasks screen.`,
        );
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const changeToViewMode = () => {
    setAddMode(false);
  };

  const changeToAddMode = () => {
    setAddMode(true);
  };

  return {
    tasks,
    isActivated,
    addMode,
    addInput,
    setAddInput,
    createTask,
    confirmAndDeleteTask,
    confirmAndStartAssignableTasksProcess,
    changeToViewMode,
    changeToAddMode,
  };
};

export default useEstablishChoresController;
