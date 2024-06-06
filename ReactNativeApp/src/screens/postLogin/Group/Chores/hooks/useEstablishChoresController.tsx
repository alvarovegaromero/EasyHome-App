import {useContext, useEffect, useState} from 'react';
import {GroupContext} from '../../../../../contexts/GroupContext';
import {Alert} from 'react-native';
import {BASE_URL} from '../../../../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useEstablishChoresController = () => {
  const {groupId} = useContext(GroupContext);

  const [editMode, setEditMode] = useState(false);
  const [addMode, setAddMode] = useState(false);
  const [tasks, setTasks] = useState<any[] | undefined>(undefined);

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

  return {
    tasks,
    editMode,
    addMode,
    changeToEditMode,
    changeToViewMode,
    changeToAddMode,
  };
};

export default useEstablishChoresController;
