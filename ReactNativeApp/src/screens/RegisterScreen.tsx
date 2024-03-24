import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, TextInput, Button, SafeAreaView, ScrollView, Text, GestureResponderEvent, Alert } from 'react-native';
import { BASE_URL } from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegisterScreen = () => {
    const navigation = useNavigation();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const handleRegisterSubmit = (event: GestureResponderEvent) => { 
        event.preventDefault();

        //Validations:
        if (password !== confirmPassword) {
            Alert.alert('Password mismatch', 'Passwords do not match. Please enter matching passwords.');
            throw new Error('Register failed');
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
            if (response.ok) {
                navigation.navigate('Home' as never);
                return response.json();
            } else {
                Alert.alert('Register failed', 'Something went wrong. Please try again.');
                throw new Error('Register failed');
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
                <TextInput
                    placeholder="Username"
                    value={username}
                    onChangeText={setUsername}
                />
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    placeholder="Password"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
                <TextInput
                    placeholder="Confirm Password"
                    secureTextEntry
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />
                <TextInput
                    placeholder="First Name (optional)"
                    value={firstName}
                    onChangeText={setFirstName}
                />
                <TextInput
                    placeholder="Last Name (optional)"
                    value={lastName}
                    onChangeText={setLastName}
                />
                <Button title="Register" onPress={handleRegisterSubmit} />
                <Text>Do you have an account already? Login instead!</Text>
                <Button title="Login" onPress={() => navigation.navigate('Login' as never)} />
            </ScrollView>
        </SafeAreaView>
    );
};

export default RegisterScreen;