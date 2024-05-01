import { BASE_URL } from '../../../../config';
import { StackNavigationProp } from '@react-navigation/stack';
import { EditProfileStackParamList } from '../../../../components/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import { useState, useEffect } from 'react';

const useProfileController = () => {
    const navigation = useNavigation<StackNavigationProp<EditProfileStackParamList>>();

    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');

    useEffect(() => { 
        const unsubscribe = navigation.addListener('focus', () => { // fetch Data everytime the screen is focused
            fetchProfileData(); 
        });
    
        return unsubscribe;
    }, [navigation]);

    const fetchProfileData = () => {    
        AsyncStorage.getItem('token')
        .then(token => {
            return fetch(BASE_URL + '/api/users/profile', {
                method: 'GET',
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
            } else {
                return response.json();
            }
        })
        .then(data => {
            setUsername(data.username);
            setEmail(data.email);
            setFirstName(data.firstName);
            setLastName(data.lastName);
        })
        .catch(error => {
            console.error('Error:', error);
        })
    };

    const navigateEditProfileScreen = () => {
        navigation.navigate('EditProfileScreen', { username, email, firstName, lastName })
    }

    const handleGoBack = () => {
        navigation.navigate('HomeScreen' as never); 
    };

    return { username, email, firstName, lastName, handleGoBack, navigateEditProfileScreen };
};

export default useProfileController;