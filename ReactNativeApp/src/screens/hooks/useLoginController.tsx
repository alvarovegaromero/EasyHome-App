import { useState } from 'react';
import { Alert, Button, GestureResponderEvent, Image, SafeAreaView, ScrollView, Text, TextInput, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { BASE_URL } from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HomeStackParamList  } from '../../components/types';

const useLoginController = () => {
    const navigation = useNavigation<StackNavigationProp<HomeStackParamList>>();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLoginSubmit = (event: GestureResponderEvent) => { 
       // event.preventDefault();

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

    const navigateRegisterScreen = () => {
        navigation.navigate('RegisterScreen' as never);
    };

    const navigateResetPasswordScreen = () => {
        navigation.navigate('ResetPasswordScreen' as never);
    };

    return { username, setUsername, password, setPassword, handleLoginSubmit, navigateRegisterScreen, navigateResetPasswordScreen };
};

export default useLoginController;
