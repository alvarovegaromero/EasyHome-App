import { useState, useContext } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { BASE_URL } from '../../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HomeStackParamList  } from '../../../components/types';
import { UserContext } from '../../../contexts/UserContext';


const useLoginController = () => {
    const navigation = useNavigation<StackNavigationProp<HomeStackParamList>>();

    const { setId } = useContext(UserContext);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLoginSubmit = () => { 

        if (username === '' || password === '') {
            Alert.alert('Error', 'Username and password must be filled');
            console.error('Login Failed - Username and password must be filled');
            return;
        }

        fetch(BASE_URL+'/api/users/login', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(({ error }) => {
                    Alert.alert('Error', error);
                    throw new Error(`${response.status} - ${error}`, );
                });
            }
            else
                return response.json();
        })
        .then(data => {
            const { token, username, id }: { token: string; username: string, id: string } = data; 
           
            setId(id);
            AsyncStorage.setItem('token', token);

            navigation.navigate('HomeScreen', { username }); 
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    const navigateRegisterScreen = () => {
        navigation.navigate('RegisterScreen' as never);
    };

    const navigateResetPasswordScreen = () => {
        navigation.navigate('ResetPasswordScreen' as never);
    };

    return { username, setUsername, password, setPassword, handleLoginSubmit, navigateRegisterScreen, navigateResetPasswordScreen };
};

export default useLoginController;
