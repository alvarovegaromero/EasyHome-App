import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { Alert, View, Text, Button } from 'react-native';
import { BASE_URL } from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen: React.FunctionComponent = () => {
    const navigation = useNavigation();
    
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');

    useEffect(() => {
        (async () => {
            try {
                const token = await AsyncStorage.getItem('token');

                const response = await fetch(BASE_URL + '/api/users/profile', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${token}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setUsername(data.username);
                    setEmail(data.email);

                    if(data.firstName == "") 
                        setFirstName("No first name provided");
                    else
                        setFirstName(data.firstName);

                    if(data.lastName == "")
                        setLastName("No last name provided");   
                    else
                        setLastName(data.lastName);
                } else {
                    return response.json().then(({ error }) => {
                        Alert.alert(`Error ${response.status}`, error);
                        throw new Error(`${response.status} - ${error}`, );
                    });
                }
            } catch (error) {
                console.error('Error:', error);
            }
        })();
    }, []);

    const handleGoBack = () => {
        navigation.goBack();
    };

    return (
        <View>
            <Text accessibilityLabel='My Profile:'>My Profile: </Text>
            <Text accessibilityLabel={`Username: ${username}`}>Username: {username}</Text>
            <Text accessibilityLabel={`Email: ${email}`}>Email: {email}</Text>
            <Text accessibilityLabel={`First name: ${firstName}`}>First Name: {firstName} </Text>
            <Text accessibilityLabel={`Last name: ${lastName}`}>Last Name: {lastName} </Text>
            <Button accessibilityLabel='Go back button' title="Go Back" onPress={handleGoBack} /> 
        </View>
    );
};

export default ProfileScreen;