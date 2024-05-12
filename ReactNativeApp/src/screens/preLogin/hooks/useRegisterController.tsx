import { useContext, useState } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { BASE_URL } from '../../../config';
import { validateEmail } from '../../../utils/utils';
import { UserContext } from '../../../contexts/UserContext';

const useRegisterController = () => {
    const navigation = useNavigation();
    
    const { setId, setContextUsername } = useContext(UserContext);

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const handleRegisterSubmit = () => { 

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

        if(!validateEmail(email)){
            Alert.alert('Error', 'Invalid email format');
            console.error('Edit profile Failed - Invalid email format');
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
            else
                return response.json();
        })
        .then(data => {           
            setId(String(data.id));
            setContextUsername(data.username);
            AsyncStorage.setItem('token', data.token);

            navigation.navigate('HomeScreen' as never); 
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    const navigateLoginScreen = () => {
        navigation.navigate('LoginScreen' as never);
    };

    const navigateResetPasswordScreen = () => {
        navigation.navigate('ResetPasswordScreen' as never);
    }; 

    return { username, setUsername, email, setEmail, password, setPassword, confirmPassword, setConfirmPassword, firstName, setFirstName, lastName, setLastName, handleRegisterSubmit, navigateLoginScreen, navigateResetPasswordScreen};
};

export default useRegisterController;
