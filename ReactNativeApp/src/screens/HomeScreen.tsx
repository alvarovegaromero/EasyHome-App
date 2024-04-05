import React, { useState } from 'react';
import { BASE_URL } from '../config';
import { useNavigation } from '@react-navigation/native';
import { Alert, Button, SafeAreaView, ScrollView, Text } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from './LoginScreen';

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

type Props = {
    route: ProfileScreenRouteProp;
};

const HomeScreen: React.FunctionComponent<Props> = ({route}) => {
    const navigation = useNavigation();
    const username = route.params.username;

    const handleLogout = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
    
            const response = await fetch(BASE_URL+'/api/users/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                },
            });

            if (response.ok) {
                await AsyncStorage.removeItem('token');
                navigation.navigate('Login' as never);
            } else {
                return response.json().then(({ error }) => {
                    Alert.alert(`Error ${response.status}`, error);
                    throw new Error(`${response.status} - ${error}`, );
                });
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <SafeAreaView>
            <ScrollView>
                <Text> Hola {username}, you're logged in!!!! </Text>
                <Button title="Logout" onPress={handleLogout} />
                <Button title="Go to Profile" onPress={() => navigation.navigate('Profile' as never)} />
            </ScrollView>
        </SafeAreaView>
    );
};

export default HomeScreen;