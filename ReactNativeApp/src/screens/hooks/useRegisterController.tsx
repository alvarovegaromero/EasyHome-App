import { useState } from 'react';
import { Alert, GestureResponderEvent } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { BASE_URL } from '../../config';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParamList  } from '../../components/types';

const useRegisterController = () => {
    const navigation = useNavigation<StackNavigationProp<HomeStackParamList>>();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const handleRegisterSubmit = (event: GestureResponderEvent) => { 
        //event.preventDefault();

        //Validations:
        if (username === '' || password === '' || email === '' || confirmPassword === '') {
            Alert.alert('Error', 'Username, email, password and confirmation password must be filled');
            console.error('Register Failed - Username, email, password and confirmation password must be filled');
            return;
        }
        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match. Please enter matching passwords.');
            console.error('Register Failed - Passwords do not match')
            return;
        }

        //Request:
        const requestData = {
            username,
            email,
            password,
            confirmPassword,
            firstName: firstName || undefined,
            lastName: lastName || undefined,
        };

        fetch(BASE_URL+'/api/users/register', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
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
            const { token, username }: { token: string; username: string } = data; 
           
            AsyncStorage.setItem('token', token);

            navigation.navigate('HomeScreen', { username }); 
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    const navigateLoginScreen = () => {
        navigation.navigate('LoginScreen' as never);
    };

    const navigateResetPasswordScreen = () => {
        navigation.navigate('ResetPasswordScreen' as never);
    }; 

    return { username, setUsername, email, setEmail, password, setPassword, confirmPassword, setConfirmPassword, firstName, setFirstName, lastName, setLastName, handleRegisterSubmit, navigateLoginScreen, navigateResetPasswordScreen};
};

export default useRegisterController;

