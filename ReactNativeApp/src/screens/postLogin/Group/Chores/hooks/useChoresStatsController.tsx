import {useContext, useState} from 'react';
import {GroupContext} from '../../../../../contexts/GroupContext';
import {Alert} from 'react-native';
import {BASE_URL} from '../../../../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getFormatedDateForRequests} from '../../../../../utils/utils';

const useChoresStatsController = () => {
  const {groupId} = useContext(GroupContext);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

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
          return response.json();
        }
      })
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return {startDate, setStartDate, endDate, setEndDate, fetchChoresStats};
};

export default useChoresStatsController;
