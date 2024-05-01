import React from 'react';
import { Button, SafeAreaView, ScrollView, Text, View } from 'react-native';
import useHomeController from './hooks/useHomeController';
import { Group } from './types';
import Dialog from "react-native-dialog";


const HomeScreen: React.FunctionComponent = () => { 
    const { username, groups, handleLogout, showDialog, closeDialog, 
        dialogVisible, setJoinCode, joinCode, joinGroup, navigateGroupHomeScreen, navigateProfileScreen, 
        navigateCreateGroupScreen } = useHomeController();

    return (
        <SafeAreaView>
            <ScrollView>
                <Text> Hola {username}, you're logged in!!!! </Text>
                <Text> Select the group you want to see: </Text>
                <ScrollView>
                    {groups.map((group: Group) => (
                        <Button 
                            key={group.group_id} 
                            title={group.group_name} 
                            onPress={() => navigateGroupHomeScreen(group.group_id)}
                        />
                    ))}
                </ScrollView>
                <Button
                    title="Create a Group"
                    onPress={navigateCreateGroupScreen}
                    accessibilityLabel='Create a Group button'
                    testID='CreateGroupButton'
                />
                <Button
                    title="Join a Group"
                    onPress={showDialog}
                    accessibilityLabel='Join a Group button'
                    testID='JoinGroupButton'
                />
                <Dialog.Container visible={dialogVisible}>
                    <Dialog.Title>Join Group</Dialog.Title>
                    <Dialog.Description>
                        Enter the join code for the group you want to join.
                    </Dialog.Description>
                    <Dialog.Input onChangeText={setJoinCode} />
                    <Dialog.Button label="Cancel" onPress={closeDialog} />
                    <Dialog.Button label="Join" onPress={joinGroup} />
                </Dialog.Container>
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