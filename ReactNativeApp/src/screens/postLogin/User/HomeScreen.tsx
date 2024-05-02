import React from 'react';
import { Button, SafeAreaView, ScrollView, Text, View } from 'react-native';
import useHomeController from './hooks/useHomeController';
import { Group } from './types';
import Dialog from "react-native-dialog";
import generalStyles from '../../../styles/styles';
import stylesHomeScreen from '../../../styles/stylesHomeScreen';


const HomeScreen: React.FunctionComponent = () => { 
    const { username, groups, handleLogout, showDialog, closeDialog, 
        dialogVisible, setJoinCode, joinGroup, navigateGroupHomeScreen, navigateProfileScreen, 
        navigateCreateGroupScreen } = useHomeController();

    return (
        <SafeAreaView style={generalStyles.defaultSafeAreaView}>
            <ScrollView contentContainerStyle={generalStyles.defaultScrollView}>
                <View style={generalStyles.defaultContainerScreen}>

                    <View style={stylesHomeScreen.containerHeaders}>
                        <Text style={generalStyles.defaultHeader}> Hello {username}! </Text>
                        <View></View>
                        <Text> Select the group you want to see: </Text>
                    </View>


                    <View style={stylesHomeScreen.containerGroups}>           
                        {
                            groups.length === 0 ? (
                                <Text> You are not part of any group yet. </Text>
                            ) : (
                                groups.map((group: Group) => (
                                <Button 
                                    key={group.id} 
                                    title={group.name} 
                                    onPress={() => navigateGroupHomeScreen(group.id)}
                                />
                                ))
                            )
                        }
                    </View>


                    <View style={stylesHomeScreen.containerButtons}>
                        <Text> a </Text>
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
                        <Text> b </Text>
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default HomeScreen;