import { Button, Image, SafeAreaView, ScrollView, Text, TextInput, View } from "react-native";
import stylesResetPasswordScreen from "../../styles/stylesResetPasswordScreen"; //reuse styles from login screen
import generalStyles from "../../styles/styles";
import useResetPasswordController from "./hooks/useResetPasswordController";

const ResetPasswordScreen: React.FunctionComponent = () => {
    const { email, setEmail, handleResetPasswordSubmit, navigateLoginScreen, navigateRegisterScreen } = useResetPasswordController();
    
    return (
        <SafeAreaView style={generalStyles.defaultSafeAreaView}>
            <ScrollView contentContainerStyle={generalStyles.defaultScrollView}>
                <View style={stylesResetPasswordScreen.containerInitialImage}> 
                    <Image
                        source={require('../../../assets/images/logoWithTextNoBackground.png')} 
                        style={stylesResetPasswordScreen.logo}
                        accessibilityLabel="EasyHome logo"
                        testID="Logo"
                    />
                </View>

                <View style={stylesResetPasswordScreen.containerInputs}>
                    <Text 
                        accessibilityLabel="Write your email so we can send you an email for resetting your password"
                        style= {stylesResetPasswordScreen.textHeaderResetPassword}
                    > 
                        Write your email so we can send you an email for resetting your password
                    </Text>
                    <View style={stylesResetPasswordScreen.containerInputEmail}>
                        <Text accessibilityLabel="email">Email:</Text>
                        <TextInput
                            style={generalStyles.defaultInput}
                            value={email}
                            onChangeText={setEmail}
                            autoCapitalize="none"
                            accessibilityLabel="Input for the username"
                            testID="EmailInput"
                        />
                    </View> 
                    <View style={generalStyles.defaultContainerButton}>
                        <View style={generalStyles.defaultButton}> 
                            <Button 
                                title='Send email' 
                                onPress={handleResetPasswordSubmit} 
                                accessibilityLabel="Send email to reset password"
                                testID="ResetPasswordButton"
                            /> 
                        </View>
                    </View>
                </View>                
                
                <View style={stylesResetPasswordScreen.containerOtherInfo}>
                    <View style={stylesResetPasswordScreen.containerRegisterAndResetPassword}>
                        <View style={stylesResetPasswordScreen.containerLogin}>
                            <Text accessibilityLabel="Already have an account? Use log in">Already have an account? Use log in</Text>
                            <View style={generalStyles.defaultContainerButton}>
                                <View style={generalStyles.defaultButton}> 
                                    <Button 
                                        title="Login" 
                                        onPress={navigateLoginScreen} 
                                        accessibilityLabel="Button for redirection to login page"
                                        testID="LoginButton"
                                    />
                                </View>
                            </View>
                        </View>
                        
                        <View style={stylesResetPasswordScreen.containerRegister}>
                            <Text accessibilityLabel="Don't you have an account? Register now!">Don't you have an account? Register now!</Text>
                            <View style={generalStyles.defaultContainerButton}>
                                <View style={generalStyles.defaultButton}> 
                                    <Button 
                                        title="Register" 
                                        onPress={navigateRegisterScreen} 
                                        accessibilityLabel="Button for redirection to register page"
                                        testID="RegisterButton"
                                    />
                                </View>
                            </View>
                        </View>
                    </View>   
                </View>   
            </ScrollView>
        </SafeAreaView>
    );
};

export default ResetPasswordScreen;