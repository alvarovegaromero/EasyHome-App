import React from 'react';
import { Button, Image, SafeAreaView, ScrollView, Text, TextInput, View } from 'react-native';
import { APP_VERSION } from '../config';
import stylesLoginScreen from '../styles/stylesLoginScreen';
import generalStyles from '../styles/styles';
import useLoginController from './hooks/useLoginController';

const LoginScreen: React.FunctionComponent = () => {
    const { username, setUsername, password, setPassword, handleLoginSubmit, navigateRegisterScreen, navigateResetPasswordScreen } = useLoginController();

    return (
        <SafeAreaView style={generalStyles.defaultSafeAreaView}>
            <ScrollView contentContainerStyle={generalStyles.defaultScrollView}>
                <View style={stylesLoginScreen.containerInitialImage}> 
                    <Image
                        source={require('../../assets/images/logoWithTextNoBackground.png')} 
                        style={stylesLoginScreen.logo}
                        accessibilityLabel="EasyHome logo"
                        testID='Logo'
                    />
                </View>


                <View style={stylesLoginScreen.containerLoginInputs}>
                    <View style={stylesLoginScreen.containerInputUsername}>
                        <Text accessibilityLabel="Username">Username:</Text>
                        <TextInput
                            style={generalStyles.defaultInput}
                            value={username}
                            onChangeText={text => setUsername(text)}
                            accessibilityLabel="Input for the username"
                            autoCapitalize="none"
                            testID='UsernameInput'
                        />
                    </View> 
                    <View style={stylesLoginScreen.containerInputPassword}>
                        <Text accessibilityLabel='Password'>Password:</Text>
                        <TextInput
                            style={generalStyles.defaultInput}
                            secureTextEntry
                            value={password}
                            onChangeText={text => setPassword(text)}
                            accessibilityLabel="Input for the password"
                            autoCapitalize='none'
                            testID='PasswordInput'
                        />
                    </View>
                    <View style={generalStyles.defaultContainerButton}>
                        <View style={generalStyles.defaultButton}> 
                            <Button 
                                title='Login' 
                                onPress={handleLoginSubmit} 
                                accessibilityLabel="Login"
                                testID='LoginButton'
                            /> 
                        </View>
                    </View>
                </View>


                <View style={stylesLoginScreen.containerOtherInfo}>
                    <View style={stylesLoginScreen.containerRegisterAndResetPassword}>
                        <View style={stylesLoginScreen.containerRegister}>
                            <Text accessibilityLabel="Don't you have an account? Register now!">Don't you have an account? Register now!</Text>
                            <View style={generalStyles.defaultContainerButton}>
                                <View style={generalStyles.defaultButton}> 
                                    <Button 
                                        title="Register" 
                                        onPress={navigateRegisterScreen} 
                                        accessibilityLabel="Button for redirection to register page"
                                        testID='RegisterButton'
                                    />
                                </View>
                            </View>
                        </View>
                        
                        <View style={stylesLoginScreen.containerResetPassword}>
                            <Text accessibilityLabel="Forgot your password?">Forgot your password?</Text>
                            <View style={generalStyles.defaultContainerButton}>
                                <View style={generalStyles.defaultButton}> 
                                    <Button 
                                        title="Reset Password" 
                                        onPress={navigateResetPasswordScreen} 
                                        accessibilityLabel="Button for redirection to reset password page"
                                        testID='ResetPasswordButton'
                                    />
                                </View>
                            </View>
                        </View>
                    </View>     

                    <View style={stylesLoginScreen.containerVersion}>
                        <Text accessibilityLabel={"Version: "+ {APP_VERSION}}> Version: {APP_VERSION} </Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default LoginScreen;