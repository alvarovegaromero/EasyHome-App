import { BASE_URL } from "../../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Alert, GestureResponderEvent } from "react-native";

const useEditProfileController = (initialUsername: string, initialEmail: string, initialFirstName: string, initialLastName: string) => {
    const navigation = useNavigation();

    const [username, setUsername] = useState<string>(initialUsername);
    const [email, setEmail] = useState<string>(initialEmail);
    const [firstName, setFirstName] = useState<string>(initialFirstName);
    const [lastName, setLastName] = useState<string>(initialLastName);

    const handleEditProfileSubmit = async (event: GestureResponderEvent) => {

        if (username === '' || email === '') {
            Alert.alert('Error', 'Username and email must be filled');
            console.error('Edit profile Failed - Username and email must be filled');
            return;
        }

        const token = await AsyncStorage.getItem('token');

        fetch(BASE_URL+'/api/users/profile', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
            },
            body: JSON.stringify({ username, email, firstName, lastName}),
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(({ error }) => {
                    Alert.alert('Error', error);
                    throw new Error(`${response.status} - ${error}`, );
                });
            }
            else{
                navigation.navigate('ProfileScreen' as never); 
                return response.json();
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    const handleGoBack = () => {
        navigation.goBack();
    };

    return { username, setUsername, email, setEmail, firstName, setFirstName, lastName, setLastName, handleEditProfileSubmit, handleGoBack };
}

export default useEditProfileController;