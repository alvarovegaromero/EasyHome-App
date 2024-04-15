import React from 'react';
import { View, Text, Button, SafeAreaView, ScrollView } from 'react-native';
import generalStyles from '../styles/styles';
import stylesProfileScreen from '../styles/stylesProfileScreens';
import useProfileController from './hooks/useProfileController';

const ProfileScreen: React.FunctionComponent = () => {
    const { username, email, firstName, lastName, handleGoBack, navigateEditProfileScreen } = useProfileController();

    return (
        <SafeAreaView style={generalStyles.defaultSafeAreaView}>
            <ScrollView style={generalStyles.defaultScrollView}>
                <View style={stylesProfileScreen.containerProfile}>
                    <Text accessibilityLabel='My Profile:' style={stylesProfileScreen.headerMyProfile}>My Profile: </Text>
                    <Text accessibilityLabel={`Username: ${username}`} style={stylesProfileScreen.textsMyProfile}>Username: {username}</Text>
                    <Text accessibilityLabel={`Email: ${email}`} style={stylesProfileScreen.textsMyProfile}>Email: {email}</Text>
                    <Text
                        accessibilityLabel={`First name: ${firstName ? firstName : 'No name provided'}`}
                        style={stylesProfileScreen.textsMyProfile}
                    >
                        First Name: {firstName ? firstName : <Text style={{ color: '#FF9999' }}>No name provided</Text>}
                    </Text>                    
                    <Text
                    accessibilityLabel={`Last name: ${lastName ? lastName : 'No last name provided'}`}
                    style={stylesProfileScreen.textsMyProfile}
                    >
                    Last Name: {lastName ? lastName : <Text style={{ color: '#FF9999' }}>No last name provided</Text>}
                    </Text>                
                </View>
                <View style={stylesProfileScreen.containerButtonsProfile}>
                    <View style={stylesProfileScreen.containerEditProfileButton}>
                        <Button accessibilityLabel='Edit profile data button' title="Edit profile data" onPress={navigateEditProfileScreen} /> 
                    </View>
                    <View style={stylesProfileScreen.containerGoBackButton}>
                        <Button accessibilityLabel='Go back button' title="Go Back" onPress={handleGoBack} /> 
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default ProfileScreen;