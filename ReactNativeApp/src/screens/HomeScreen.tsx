import React from 'react';
import { BASE_URL } from '../config';
import { useNavigation } from '@react-navigation/native';
import { Button, SafeAreaView, ScrollView, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen: React.FunctionComponent = () => {
    const navigation = useNavigation();

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
                console.error('Logout failed');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    

    return (
        <SafeAreaView>
            <ScrollView>
                <Text> Hola, you're logged in!!!! </Text>
                <Button title="Logout" onPress={handleLogout} />
            </ScrollView>
        </SafeAreaView>
    );
};

export default HomeScreen;