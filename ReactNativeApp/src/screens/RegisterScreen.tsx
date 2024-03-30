import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, TextInput, Button, SafeAreaView, ScrollView, Text, GestureResponderEvent, Alert } from 'react-native';
import { BASE_URL } from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import stylesRegisterScreen from '../styles/stylesRegisterScreen';
import generalStyles from '../styles/styles';

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
            <ScrollView style={generalStyles.defaultScrollView}>
                <View>

                    <View>
                        <Text>Username:</Text>
                        <TextInput
                            value={username}
                            onChangeText={setUsername}
                        />
                    </View>
                    <View>
                        <Text>Email:</Text>
                        <TextInput
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>
                    <View>
                        <Text>Password:</Text>
                        <TextInput
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                        />
                    </View>
                    <View>
                        <Text>Confirm Password:</Text>
                        <TextInput
                            secureTextEntry
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                        />
                    </View>
                    <View> 
                        <Text>First Name (optional):</Text>
                        <TextInput
                            value={firstName}
                            onChangeText={setFirstName}
                        />
                    </View>
                    <View>
                        <Text>Last Name (optional):</Text>
                        <TextInput
                            value={lastName}
                            onChangeText={setLastName}
                        />
                    </View>
                    <Button title="Register" onPress={handleRegisterSubmit} />
                </View>

                <View> 
                    <Text>Do you have an account already? Login instead!</Text>
                    <Button title="Login" onPress={() => navigation.navigate('Login' as never)} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default RegisterScreen;