import React, { useState } from 'react';
import { Button, GestureResponderEvent, Text, TextInput, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const LoginPage: React.FC = () => {
    const navigation = useNavigation();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event: GestureResponderEvent) => {
        event.preventDefault();

        fetch('http://10.0.2.2:8000/users/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);

                if (data.success) {
                    navigation.navigate('Home');
                }
            })
            .catch(error => {
                console.error(error);
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