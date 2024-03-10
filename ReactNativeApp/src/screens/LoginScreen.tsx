import React, { useState } from 'react';
import { Alert, Button, GestureResponderEvent, SafeAreaView, ScrollView, Text, TextInput, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BASE_URL } from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen: React.FC = () => {
    const navigation = useNavigation();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLoginSubmit = (event: GestureResponderEvent) => { 
        event.preventDefault();

        fetch(BASE_URL+'/api/users/login', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        })
        .then(response => {
            if (response.ok) {
                navigation.navigate('Home' as never);
                return response.json();
            } else {
                Alert.alert('Login failed', 'Username or password is incorrect.');
                throw new Error('Login failed');
            }
        })
        .then(data => {
            const token = data.token;
            AsyncStorage.setItem('token', token);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    return (
        <SafeAreaView>
            <ScrollView>
                <Text>Username:</Text>
                <TextInput
                    value={username}
                    onChangeText={text => setUsername(text)}
                />
                <Text>Password:</Text>
                <TextInput
                    secureTextEntry
                    value={password}
                    onChangeText={text => setPassword(text)}
                />
                <Button title="Login" onPress={handleLoginSubmit} />
            </ScrollView>
        </SafeAreaView>
    );
};

export default LoginScreen;