import React from 'react';
import { BASE_URL } from '../config';
import { useNavigation } from '@react-navigation/native';
import { Button, SafeAreaView, ScrollView, Text } from 'react-native';

const HomeScreen: React.FunctionComponent = () => {
    const navigation = useNavigation();

    const handleLogout = async () => {
        try {
            const response = await fetch(BASE_URL+'/users/api/logout', { //URL to be changed when production
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            });

            response.json() //fix structure
            .then(data => {
                console.log(data);
                navigation.navigate('Login' as never); // Navegar a la página de inicio de sesión después del cierre de sesión
            })
            
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <SafeAreaView>
            <ScrollView>
                <Text> Hola </Text>
                <Button title="Logout" onPress={handleLogout} />
            </ScrollView>
        </SafeAreaView>
    );
};

export default HomeScreen;