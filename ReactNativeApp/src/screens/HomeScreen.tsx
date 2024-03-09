import React from 'react';
import { BASE_URL } from '../config';
import { useNavigation } from '@react-navigation/native';
import { Button, SafeAreaView, ScrollView, Text } from 'react-native';

const HomeScreen: React.FunctionComponent = () => {
    const navigation = useNavigation();

    const handleLogout = async () => { //TODO: Fix structure
        try {
            const response = await fetch(BASE_URL+'/api/users/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            });

            response.json() 
            .then(data => {
                console.log(data);
                navigation.navigate('Login' as never);
            })
            
        } catch (error) {
            console.error(error);
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