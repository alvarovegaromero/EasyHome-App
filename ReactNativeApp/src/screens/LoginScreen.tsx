import React, { useState } from 'react';
import { Alert, Button, GestureResponderEvent, Image, SafeAreaView, ScrollView, Text, TextInput, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BASE_URL, APP_VERSION } from '../config';
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
                <View style={stylesLoginScreen.containerInitialImage}> 
                    <Image
                        source={require('../../assets/images/logoWithTextNoBackground.png')} 
                        style={stylesLoginScreen.logo}
                    />
                </View>


                <View style={stylesLoginScreen.containerLoginInputs}>
                    <View style={stylesLoginScreen.containerInputUsername}>
                        <Text>Username:</Text>
                        <TextInput
                            style={generalStyles.defaultInput}
                            value={username}
                            onChangeText={text => setUsername(text)}
                        />
                    </View> 
                    <View style={stylesLoginScreen.containerInputPassword}>
                        <Text>Password:</Text>
                        <TextInput
                            style={generalStyles.defaultInput}
                            secureTextEntry
                            value={password}
                            onChangeText={text => setPassword(text)}
                        />
                    </View>
                    <View style={generalStyles.defaultContainerButton}>
                        <View style={generalStyles.defaultButton}> 
                            <Button title="Login" onPress={handleLoginSubmit}/> 
                        </View>
                    </View>
                </View>


                <View style={stylesLoginScreen.containerOtherInfo}>
                    <View style={stylesLoginScreen.containerRegisterAndResetPassword}>
                        <View style={stylesLoginScreen.containerRegister}>
                            <Text>Don't you have an account? Register now!</Text>
                            <View style={generalStyles.defaultContainerButton}>
                                <View style={generalStyles.defaultButton}> 
                                    <Button title="Register" onPress={() => navigation.navigate('Register' as never)} />
                                </View>
                            </View>
                        </View>
                        
                        <View style={stylesLoginScreen.containerResetPassword}>
                            <Text>Forgot your password?</Text>
                            <View style={generalStyles.defaultContainerButton}>
                                <View style={generalStyles.defaultButton}> 
                                    <Button title="Reset Password" onPress={() => {}} />
                                </View>
                            </View>
                        </View>
                    </View>     

                    <View style={stylesLoginScreen.containerVersion}>
                        <Text> Version: {APP_VERSION} </Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default LoginScreen;