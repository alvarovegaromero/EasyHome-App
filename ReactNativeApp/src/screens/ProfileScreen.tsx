import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { Alert, View, Text, Button, SafeAreaView, ScrollView } from 'react-native';
import { BASE_URL } from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import generalStyles from '../styles/styles';
import stylesProfileScreen from '../styles/stylesProfileScreens';
import { StackNavigationProp } from '@react-navigation/stack';
import { EditProfileStackParamList, HomeStackParamList  } from '../components/types';

const ProfileScreen: React.FunctionComponent = () => {
    const navigation = useNavigation<StackNavigationProp<EditProfileStackParamList>>();
    const navigation_back = useNavigation<StackNavigationProp<HomeStackParamList>>();

    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');

    const fetchProfileData = async () => {
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
                setFirstName(data.firstName);
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
    };

    useEffect(() => { 
        const unsubscribe = navigation.addListener('focus', () => { // fetch Data everytime the screen is focused
            fetchProfileData(); 
        });
    
        return unsubscribe;
    }, [navigation]);

    const handleGoBack = () => {
        navigation_back.navigate('HomeScreen', { username }); // send the name because it could have been changed        
    };

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
                        <Button accessibilityLabel='Edit profile data button' title="Edit profile data" onPress={() => {navigation.navigate('EditProfileScreen', { username, email, firstName, lastName })}} /> 
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