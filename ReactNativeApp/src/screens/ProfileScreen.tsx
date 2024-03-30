import React from 'react';
import { View, Text, Button } from 'react-native';

interface ProfileScreenProps {
    username: string;
    email: string;
    firstName?: string;
    lastName?: string;
    navigation: any; // Replace with the appropriate navigation type
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({
    username,
    email,
    firstName,
    lastName,
    navigation,
}) => {
    const handleGoBack = () => {
        navigation.goBack();
    };

    return (
        <View>
            <Text>Username: {username}</Text>
            <Text>Email: {email}</Text>
            {firstName && <Text>First Name: {firstName}</Text>}
            {lastName && <Text>Last Name: {lastName}</Text>}
            <Button title="Go Back" onPress={handleGoBack} />
        </View>
    );
};

export default ProfileScreen;