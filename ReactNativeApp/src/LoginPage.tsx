import React, { useState } from 'react';
import { Button, GestureResponderEvent, Text, TextInput, View } from 'react-native';

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = () => {
        console.log("Username:", username);
        console.log("Password:", password);
        /*event.preventDefault();

        // Send request to localhost:8000/users/api/login with username and password
        fetch('http://localhost:8000/users/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        })
            .then(response => response.json())
            .then(data => {
                // Handle response data
                console.log(data);
            })
            .catch(error => {
                // Handle error
                console.error(error);
            });*/
    };

    return (
        <View>
            <View>
                <Text>Username:</Text>
                <TextInput
                value={username}
                onChangeText={text => setUsername(text)}
                />
            </View>
            <View>
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