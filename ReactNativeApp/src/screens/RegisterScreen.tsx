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
                <View style={stylesRegisterScreen.containerRegisterInputsAndButton}>
                    <View style={stylesRegisterScreen.containerRegisterInputs}>
                        <View style={generalStyles.defaultdefaultContainerTextAndInput}>
                            <Text accessibilityLabel='Username:'>Username:</Text>
                            <TextInput
                                style={generalStyles.defaultInput}
                                value={username}
                                onChangeText={setUsername}
                                accessibilityLabel='Username input field'
                            />
                        </View>
                        <View style={generalStyles.defaultdefaultContainerTextAndInput}>
                            <Text accessibilityLabel='Email:'>Email:</Text>
                            <TextInput
                                style={generalStyles.defaultInput}
                                value={email}
                                onChangeText={setEmail}
                                accessibilityLabel='Email input field'
                            />
                        </View>
                        <View style={generalStyles.defaultdefaultContainerTextAndInput}>
                            <Text accessibilityLabel='Password:'>Password:</Text>
                            <TextInput
                                style={generalStyles.defaultInput}
                                secureTextEntry
                                value={password}
                                onChangeText={setPassword}
                                accessibilityLabel='Password input field'
                            />
                        </View>
                        <View style={generalStyles.defaultdefaultContainerTextAndInput}>
                            <Text accessibilityLabel='Confirm Password:'>Confirm Password:</Text>
                            <TextInput
                                style={generalStyles.defaultInput}
                                secureTextEntry
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                accessibilityLabel='Confirm Password input field'
                            />
                        </View>
                        <View style={generalStyles.defaultdefaultContainerTextAndInput}>
                            <Text accessibilityLabel='First Name (optional):'>First Name (optional):</Text>
                            <TextInput
                                style={generalStyles.defaultInput}
                                value={firstName}
                                onChangeText={setFirstName}
                                accessibilityLabel='First Name input field'
                            />
                        </View>
                        <View style={generalStyles.defaultdefaultContainerTextAndInput}>
                            <Text accessibilityLabel='Last Name (optional):'>Last Name (optional):</Text>
                            <TextInput
                                style={generalStyles.defaultInput}
                                value={lastName}
                                onChangeText={setLastName}
                                accessibilityLabel='Last Name input field'
                            />
                        </View>
                    </View>
                    <View style={generalStyles.defaultContainerButton}>
                        <View style={generalStyles.defaultButton}> 
                            <Button 
                                title="Register" 
                                onPress={handleRegisterSubmit} 
                                accessibilityLabel='Register button'
                            />
                        </View>
                    </View>
                </View>

                <View style={stylesRegisterScreen.containerOtherInfo}>
                    <View style={stylesRegisterScreen.containerLogin}>
                        <Text accessibilityLabel='Do you have an account already? Login instead!'>
                            Do you have an account already? Login instead!
                        </Text>
                        <View style={generalStyles.defaultContainerButton}>
                            <View style={generalStyles.defaultButton}> 
                                <Button title="Login" onPress={() => navigation.navigate('Login' as never)} />
                            </View>
                        </View>
                    </View> 

                    <View style={stylesRegisterScreen.containerResetPassword}>
                        <Text accessibilityLabel="Forgot your password?">
                            Forgot your password?
                        </Text>
                        <View style={generalStyles.defaultContainerButton}>
                            <View style={generalStyles.defaultButton}> 
                                <Button 
                                    title="Reset Password" 
                                    onPress={() => {}} 
                                    accessibilityLabel="Button for redirection to reset password page"
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default RegisterScreen;