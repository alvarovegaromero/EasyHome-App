import React from 'react';
import { View, TextInput, Button, SafeAreaView, ScrollView, Text } from 'react-native';
import stylesRegisterScreen from '../styles/stylesRegisterScreen';
import generalStyles from '../styles/styles';
import useRegisterController from './hooks/useRegisterController';

const RegisterScreen : React.FunctionComponent = () => {
    const { username, setUsername, email, setEmail, password, setPassword, confirmPassword, setConfirmPassword, firstName, setFirstName, lastName, setLastName, handleRegisterSubmit, navigateLoginScreen, navigateResetPasswordScreen } = useRegisterController();

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
                                testID='UsernameInput'
                            />
                        </View>
                        <View style={generalStyles.defaultContainerTextAndInput}>
                            <Text accessibilityLabel='Email:'>Email:</Text>
                            <TextInput
                                style={generalStyles.defaultInput}
                                value={email}
                                onChangeText={setEmail}
                                accessibilityLabel='Email input field'
                                testID='EmailInput'
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
                                testID='PasswordInput'
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
                                testID='ConfirmPasswordInput'
                            />
                        </View>
                        <View style={generalStyles.defaultContainerTextAndInput}>
                            <Text accessibilityLabel='First Name (optional):'>First Name (optional):</Text>
                            <TextInput
                                style={generalStyles.defaultInput}
                                value={firstName}
                                onChangeText={setFirstName}
                                accessibilityLabel='First Name input field'
                                testID='FirstNameInput'
                            />
                        </View>
                        <View style={generalStyles.defaultContainerTextAndInput}>
                            <Text accessibilityLabel='Last Name (optional):'>Last Name (optional):</Text>
                            <TextInput
                                style={generalStyles.defaultInput}
                                value={lastName}
                                onChangeText={setLastName}
                                accessibilityLabel='Last Name input field'
                                testID='LastNameInput'
                            />
                        </View>
                    </View>
                    <View style={generalStyles.defaultContainerButton}>
                        <View style={generalStyles.defaultButton}> 
                            <Button 
                                title="Register" 
                                onPress={handleRegisterSubmit} 
                                accessibilityLabel='Register button'
                                testID='RegisterButton'
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
                                <Button 
                                    title="Login" 
                                    onPress={navigateLoginScreen} 
                                    accessibilityLabel='Button for redirection to login page'
                                    testID='LoginButton' 
                                />
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
                                    onPress={navigateResetPasswordScreen} 
                                    accessibilityLabel="Button for redirection to reset password page"
                                    testID='ResetPasswordButton'
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