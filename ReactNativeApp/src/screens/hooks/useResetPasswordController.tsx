import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { BASE_URL } from "../../config";
import { Alert, GestureResponderEvent } from "react-native";
import { validateEmail } from "../../utils/utilHooks";

const useResetPasswordController = () => {
    const navigation = useNavigation();

    const [email, setEmail] = useState('');

    const handleResetPasswordSubmit = () => { 
        
        if(!validateEmail(email)){
            Alert.alert('Error', 'Invalid email format');
            console.error('Edit profile Failed - Invalid email format');
            return;
        }
        
        fetch(BASE_URL+'/api/users/reset-password', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(({ error }) => {
                    Alert.alert('Error', error);
                    throw new Error(`${response.status} - ${error}`, );
                });
            } else {
                Alert.alert('Success', 'Reset password request sent successfully');
                return response.json();
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    const navigateLoginScreen = () => {
        navigation.navigate('LoginScreen' as never);
    }

    const navigateRegisterScreen = () => {
        navigation.navigate('RegisterScreen' as never);
    }

    return { email, setEmail, handleResetPasswordSubmit, navigateLoginScreen, navigateRegisterScreen };
};

export default useResetPasswordController;