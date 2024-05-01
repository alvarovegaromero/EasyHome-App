import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../../../../config';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useContext, useEffect, useState } from 'react';
import { GroupContext } from '../../../../contexts/GroupContext';
import { UserContext } from '../../../../contexts/UserContext';


const useHomeController = () => {
    const navigation = useNavigation();

    const { groupId, setGroupId } = useContext(GroupContext);
    const { contextUsername } = useContext(UserContext);

    const [groups, setGroups] = useState([]);
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

        fetch(BASE_URL+'/api/groups', { 
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
            },
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(({ error }) => {
                    Alert.alert('Error', error);
                    throw new Error(`${response.status} - ${error}`);
                });
            }
            else
                return response.json();
        })
        .then(data => {
            setGroups(data.groups);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    const handleLogout = () => {
        AsyncStorage.getItem('token')
        .then(token => {
            return fetch(BASE_URL+'/api/users/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                },
            });
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(({ error }) => {
                    Alert.alert('Error', error);
                    throw new Error(`${response.status} - ${error}`);
                });
            }
            else
                return response.json();
        })
        .then(() => {
            AsyncStorage.removeItem('token');
            navigation.navigate('LoginScreen' as never);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    const joinGroup = async () => {
        console.log("join code: ", joinCode)
        const token = await AsyncStorage.getItem('token');

        fetch(BASE_URL+'/api/groups/join', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
            },
            body: JSON.stringify({ joinCode: joinCode }),
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(({ error }) => {
                    Alert.alert('Error', error);
                    throw new Error(`${response.status} - ${error}`);
                });
            }
            else
                return response.json();
        })
        .then(data => {
            navigateGroupHomeScreen(data.id);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    const navigateGroupHomeScreen = (id : string) => {
        setGroupId(id);
        navigation.navigate('GroupHomeScreen' as never);
    };

    const navigateProfileScreen = () => {
        navigation.navigate('ProfileScreen' as never);
    }; 

    const navigateCreateGroupScreen = () => {
        navigation.navigate('CreateGroupScreen' as never);
    }
    
    return { username: contextUsername, groups, handleLogout, showDialog, closeDialog, 
        dialogVisible, setJoinCode, joinCode, joinGroup, navigateGroupHomeScreen, navigateProfileScreen, 
        navigateCreateGroupScreen };

};

export default useHomeController;