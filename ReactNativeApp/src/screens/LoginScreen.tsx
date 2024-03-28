import React, { useState } from 'react';
import { Alert, Button, GestureResponderEvent, SafeAreaView, ScrollView, Text, TextInput, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BASE_URL } from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import stylesLoginScreen from '../styles/stylesLoginScreen';
import generalStyles from '../styles/styles';

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
            if (!response.ok) {
                return response.json().then(({ error }) => {
                    Alert.alert(`Error ${response.status}`, error);
                    throw new Error(`${response.status} - ${error}`, );
                });
            }
            navigation.navigate('Home' as never);
            return response.json();
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
        <SafeAreaView style={generalStyles.defaultSafeAreaView}>
            <ScrollView contentContainerStyle={generalStyles.defaultScrollView}>
                <View style={stylesLoginScreen.container}> 
                    <Text> Foto </Text>
                </View>
                <View style={stylesLoginScreen.container}> 
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
                </View>
                <View style={stylesLoginScreen.container}> 
                    <Text>Don't you have an account? Register now!</Text>
                    <Button title="Register" onPress={() => navigation.navigate('Register' as never)} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default LoginScreen;