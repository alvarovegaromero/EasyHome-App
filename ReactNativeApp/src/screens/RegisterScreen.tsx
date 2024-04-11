import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, TextInput, Button, SafeAreaView, ScrollView, Text, GestureResponderEvent, Alert } from 'react-native';
import { BASE_URL } from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import stylesRegisterScreen from '../styles/stylesRegisterScreen';
import generalStyles from '../styles/styles';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParamList  } from '../components/types';

const RegisterScreen : React.FunctionComponent = () => {
    const navigation = useNavigation<StackNavigationProp<HomeStackParamList>>();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const handleRegisterSubmit = (event: GestureResponderEvent) => { 
        event.preventDefault();

        //Validations:
        if (username === '' || password === '' || email === '' || confirmPassword === '') {
            Alert.alert('Error', 'Username, email, password and confirmation password must be filled');
            console.error('Register Failed - Username, email, password and confirmation password must be filled');
            return;
        }
        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match. Please enter matching passwords.');
            console.error('Register Failed - Passwords do not match')
            return;
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

    return (
        <SafeAreaView style={generalStyles.defaultSafeAreaView}>
            <ScrollView style={generalStyles.defaultScrollView}>
                <View style={stylesRegisterScreen.containerRegisterInputsAndButton}>
                    <View style={stylesRegisterScreen.containerRegisterInputs}>
                        <View style={generalStyles.defaultContainerTextAndInput}>
                            <Text accessibilityLabel='Username:'>Username:</Text>
                            <TextInput
                                style={generalStyles.defaultInput}
                                value={username}
                                onChangeText={setUsername}
                                accessibilityLabel='Username input field'
                            />
                        </View>
                        <View style={generalStyles.defaultContainerTextAndInput}>
                            <Text accessibilityLabel='Email:'>Email:</Text>
                            <TextInput
                                style={generalStyles.defaultInput}
                                value={email}
                                onChangeText={setEmail}
                                accessibilityLabel='Email input field'
                            />
                        </View>
                        <View style={generalStyles.defaultContainerTextAndInput}>
                            <Text accessibilityLabel='Password:'>Password:</Text>
                            <TextInput
                                style={generalStyles.defaultInput}
                                secureTextEntry
                                value={password}
                                onChangeText={setPassword}
                                accessibilityLabel='Password input field'
                            />
                        </View>
                        <View style={generalStyles.defaultContainerTextAndInput}>
                            <Text accessibilityLabel='Confirm Password:'>Confirm Password:</Text>
                            <TextInput
                                style={generalStyles.defaultInput}
                                secureTextEntry
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                accessibilityLabel='Confirm Password input field'
                            />
                        </View>
                        <View style={generalStyles.defaultContainerTextAndInput}>
                            <Text accessibilityLabel='First Name (optional):'>First Name (optional):</Text>
                            <TextInput
                                style={generalStyles.defaultInput}
                                value={firstName}
                                onChangeText={setFirstName}
                                accessibilityLabel='First Name input field'
                            />
                        </View>
                        <View style={generalStyles.defaultContainerTextAndInput}>
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
                                <Button title="Login" onPress={() => navigation.navigate('LoginScreen' as never)} />
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
                                    onPress={() => navigation.navigate('ResetPasswordScreen' as never)} 
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