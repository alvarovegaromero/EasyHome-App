import React, { useState } from 'react';
import { Alert, Button, GestureResponderEvent, Text, TextInput, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BASE_URL } from './config';

const LoginPage: React.FC = () => {
    const navigation = useNavigation();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event: GestureResponderEvent) => {
        event.preventDefault();

        fetch(BASE_URL+'/users/api/login', { //URL to be changed when production
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        })
            .then(response => {
                if (response.ok) {
                    navigation.navigate('Home');
                } else {
                    Alert.alert('Login failed', 'Username or password is incorrect.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    return (
        <View>
            <View>
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
            </View>
            <Button title="Login" onPress={handleSubmit} />
        </View>
    );
};

export default LoginPage;