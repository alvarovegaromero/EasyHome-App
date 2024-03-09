import React, { useState } from 'react';
import { Alert, Button, GestureResponderEvent, SafeAreaView, ScrollView, Text, TextInput, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BASE_URL } from '../config';

const LoginScreen: React.FC = () => {
    const navigation = useNavigation();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event: GestureResponderEvent) => { //TODO: Fix structure
        event.preventDefault();

        fetch(BASE_URL+'/users/api/login', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        })
            .then(response => {
                if (response.ok) {
                    navigation.navigate('Home' as never);
                } else {
                    Alert.alert('Login failed', 'Username or password is incorrect.');
                }
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
                <Button title="Login" onPress={handleSubmit} />
            </ScrollView>
        </SafeAreaView>
    );
};

export default LoginScreen;