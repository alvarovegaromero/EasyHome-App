import {useContext, useEffect, useState} from 'react';
import {GroupContext} from '../../../../../contexts/GroupContext';
import {Alert} from 'react-native';
import {BASE_URL} from '../../../../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useEstablishChoresController = () => {
  const {groupId} = useContext(GroupContext);

  const [tasks, setTasks] = useState<any[] | undefined>(undefined);

  const [editMode, setEditMode] = useState(false);
  const [addMode, setAddMode] = useState(false);
  const [addInput, setAddInput] = useState('');

  useEffect(() => {
    fetchTasks();
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
        console.log(data);
        setTasks(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const changeToEditMode = () => {
    setEditMode(true);
  };

  const changeToViewMode = () => {
    setEditMode(false);
    setAddMode(false);
  };

  const changeToAddMode = () => {
    setAddMode(true);
  };

  const createTask = async () => {
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

  return {
    tasks,
    editMode,
    addMode,
    addInput,
    setAddInput,
    createTask,
    changeToEditMode,
    changeToViewMode,
    changeToAddMode,
  };
};

export default useEstablishChoresController;
