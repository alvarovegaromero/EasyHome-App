import React from 'react';
import { Button, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { MyStackParamsList } from '../../../components/types';
import useHomeController from './hooks/useHomeController';

type props = StackScreenProps<MyStackParamsList, 'HomeScreen'>;
                                                
const HomeScreen: React.FunctionComponent<props> = ({route}: props) => { 
    //we can use also use: {navigation, route} : props
    const username = route.params.username; //Could be done with the context

    const { handleLogout, navigateProfileScreen, navigateCreateGroupScreen } = useHomeController();

    return (
        <SafeAreaView>
            <ScrollView>
                <Text> Hola {username}, you're logged in!!!! </Text>
                <Text> Select the group you want to see: </Text>
                <View>
                    
                </View>
                <Button
                    title="Create a Group"
                    onPress={navigateCreateGroupScreen}
                    accessibilityLabel='Create a Group button'
                    testID='CreateGroupButton'
                />
                <Button
                    title="Join a Group"
                    onPress={() => {}}
                    accessibilityLabel='Join a Group button'
                    testID='JoinGroupButton'
                />
                <Button 
                    title="Go to Profile" 
                    onPress={navigateProfileScreen} 
                    accessibilityLabel='Go to Profile button'
                    testID='ProfileButton'
                />
                <Button 
                    title="Logout" 
                    onPress={handleLogout} 
                    accessibilityLabel='Logout button'
                    testID='LogoutButton'
                />
            </ScrollView>
        </SafeAreaView>
    );
};

export default HomeScreen;