import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from '../../../../config';
import {Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useContext, useEffect, useState} from 'react';
import {GroupContext} from '../../../../contexts/GroupContext';
import {UserContext} from '../../../../contexts/UserContext';

const useHomeController = () => {
  const navigation = useNavigation();

  const {groupId, setGroupId, setIsOwner} = useContext(GroupContext);
  const {setId, contextUsername, setContextUsername} = useContext(UserContext);

  const [groups, setGroups] = useState<[] | undefined>(undefined);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [joinCode, setJoinCode] = useState('');

  useEffect(() => {
    fetchGroups();
  }, [groupId]);

  const showDialog = () => {
    setDialogVisible(true);
  };

  const closeDialog = () => {
    setDialogVisible(false);
  };

  const fetchGroups = async () => {
    const token = await AsyncStorage.getItem('token');

    fetch(BASE_URL + '/api/groups', {
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
        setGroups(data.groups);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const handleLogout = async () => {
    const token = await AsyncStorage.getItem('token');

    fetch(BASE_URL + '/api/users/logout', {
      method: 'POST',
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
          AsyncStorage.removeItem('token');
          setContextUsername('');
          setId('');
          navigation.navigate('LoginScreen' as never);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const joinGroup = async () => {
    if (joinCode === '') {
      Alert.alert('Error', 'Join code must be filled');
      console.error('Join group Failed - Join code must be filled');
      return;
    }

    const token = await AsyncStorage.getItem('token');

    fetch(BASE_URL + '/api/groups/join', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({joinCode: joinCode}),
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
        navigateGroupHomeScreen(data.id.toString(), data.owner);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const navigateGroupHomeScreen = (id: string, username: string) => {
    setGroupId(id);

    if (username === contextUsername)
      //todo: added - add test for this
      setIsOwner(true);
    else setIsOwner(false);

    navigation.navigate('GroupHomeScreen' as never);
  };

  const navigateProfileScreen = () => {
    navigation.navigate('ProfileScreen' as never);
  };

  const navigateCreateGroupScreen = () => {
    navigation.navigate('CreateGroupScreen' as never);
  };

  return {
    username: contextUsername,
    groups,
    handleLogout,
    showDialog,
    closeDialog,
    dialogVisible,
    setJoinCode,
    joinGroup,
    navigateGroupHomeScreen,
    navigateProfileScreen,
    navigateCreateGroupScreen,
  };
};

export default useHomeController;
