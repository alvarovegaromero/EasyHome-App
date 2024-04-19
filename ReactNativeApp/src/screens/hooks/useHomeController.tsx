import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../../config';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const useHomeController = () => {
    const navigation = useNavigation();

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
                return response;
        })
        .then(() => {
            AsyncStorage.removeItem('token');
            navigation.navigate('LoginScreen' as never);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    const navigateProfileScreen = () => {
        navigation.navigate('ProfileScreen' as never);
    }; 
    
    return { handleLogout, navigateProfileScreen };

};

export default useHomeController;