import {useNavigation} from '@react-navigation/native';
import {GroupContext} from '../../../../../contexts/GroupContext';
import {useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from '../../../../../config';
import {Alert} from 'react-native';

const useChoresHomeController = () => {
  const navigation = useNavigation();

  const {groupId, isOwner} = useContext(GroupContext);

  const [isActivated, setIsActivated] = useState(true);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchIsActivated();
    });

    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        console.log(data.active);
        setIsActivated(data.active);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const navigateEstablishChores = () => {
    navigation.navigate('EstablishChoresScreen' as never);
  };

  const navigateViewTodaysChores = () => {
    navigation.navigate('TodaysChoresScreen' as never);
  };

  const navigateStats = () => {
    // navigation.navigate('ChoresStatsScreen' as never);
  };

  const navigateGroupHome = () => {
    navigation.navigate('GroupHomeScreen' as never);
  };

  return {
    isOwner,
    isActivated,
    navigateEstablishChores,
    navigateViewTodaysChores,
    navigateStats,
    navigateGroupHome,
  };
};

export default useChoresHomeController;
