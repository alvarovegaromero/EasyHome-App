import { Button, GestureResponderEvent, Image, SafeAreaView, ScrollView, Text, TextInput, View } from "react-native";
import stylesResetPasswordScreen from "../styles/stylesResetPasswordScreen"; //reuse styles from login screen
import generalStyles from "../styles/styles";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";


const ResetPasswordScreen: React.FunctionComponent = () => {
    const navigation = useNavigation();

    const [email, setEmail] = useState('');

    const handleResetPasswordSubmit = (event: GestureResponderEvent) => { 

    };

    return (
        <SafeAreaView style={generalStyles.defaultSafeAreaView}>
            <ScrollView contentContainerStyle={generalStyles.defaultScrollView}>
                <View style={stylesResetPasswordScreen.containerInitialImage}> 
                    <Image
                        source={require('../../assets/images/logoWithTextNoBackground.png')} 
                        style={stylesResetPasswordScreen.logo}
                        accessibilityLabel="EasyHome logo"
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
                            onChangeText={text => setEmail(text)}
                            accessibilityLabel="Input for the username"
                        />
                    </View> 
                    <View style={generalStyles.defaultContainerButton}>
                        <View style={generalStyles.defaultButton}> 
                            <Button 
                                title='Send email' 
                                onPress={handleResetPasswordSubmit} 
                                accessibilityLabel="Send email to reset password"
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
                                        onPress={() => navigation.navigate('LoginScreen' as never)} 
                                        accessibilityLabel="Button for redirection to login page"
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
                                        onPress={() => navigation.navigate('RegisterScreen' as never)} 
                                        accessibilityLabel="Button for redirection to register page"
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