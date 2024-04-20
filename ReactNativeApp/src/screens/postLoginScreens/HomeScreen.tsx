import React from 'react';
import { Button, SafeAreaView, ScrollView, Text } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { MyStackParamsList } from '../../components/types';
import useHomeController from './hooks/useHomeController';

type props = StackScreenProps<MyStackParamsList, 'HomeScreen'>;
                                                
const HomeScreen: React.FunctionComponent<props> = ({route}: props) => { 
    //we can use also use: {navigation, route} : props
    const username = route.params.username;

    const { handleLogout, navigateProfileScreen } = useHomeController();

    return (
        <SafeAreaView>
            <ScrollView>
                <Text> Hola {username}, you're logged in!!!! </Text>
                <Button 
                    title="Logout" 
                    onPress={handleLogout} 
                    accessibilityLabel='Logout button'
                    testID='LogoutButton'
                />
                <Button 
                    title="Go to Profile" 
                    onPress={navigateProfileScreen} 
                    accessibilityLabel='Go to Profile button'
                    testID='ProfileButton'
                />
            </ScrollView>
        </SafeAreaView>
    );
};

export default HomeScreen;