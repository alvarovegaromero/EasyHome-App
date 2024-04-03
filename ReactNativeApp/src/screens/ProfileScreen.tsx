import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, Button } from 'react-native';

const ProfileScreen: React.FunctionComponent = () => {
    const navigation = useNavigation();

    
    const handleGoBack = () => {
        navigation.goBack();
    };

    return (
        <View>
            <Text>Username: username</Text>
            <Button title="Go Back" onPress={handleGoBack} /> 
        </View>
    );
};

/* 
            <Text>Email: {email}</Text>
            {firstName && <Text>First Name: {firstName}</Text>}
            {lastName && <Text>Last Name: {lastName}</Text>}"""
            */

export default ProfileScreen;