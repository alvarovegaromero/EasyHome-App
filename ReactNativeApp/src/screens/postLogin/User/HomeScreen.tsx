import React from 'react';
import { Button, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
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
                        <Text style={generalStyles.defaultSubHeader}> Select the group you want to see: </Text>
                    </View>

                    <View style={stylesHomeScreen.containerGroups}>
                        <ScrollView >           
                            {
                                groups.length === 0 ? (
                                    <View style={stylesHomeScreen.containerNoGroups}>
                                        <Text style={stylesHomeScreen.textNoGroups}> You are not part of any group yet :( </Text>
                                        <Text style={stylesHomeScreen.textNoGroups}> Join or create a Group to see them here </Text>
                                    </View>
                                ) : (
                                    <>
                                    <Text style={stylesHomeScreen.listTitle}> Your Groups: </Text>
                                    {
                                        groups.map((group: Group) => (
                                            <TouchableOpacity 
                                                key={group.id} 
                                                onPress={() => navigateGroupHomeScreen(group.id)}
                                                style={stylesHomeScreen.listButton}
                                            >
                                                <Text>{group.name}</Text>
                                            </TouchableOpacity>
                                        ))
                                    }
                                </>
                                )
                            }
                        </ScrollView>
                    </View>


                    <View style={stylesHomeScreen.containerButtons}>
                        <View style={stylesHomeScreen.containerButton}>
                            <View style={generalStyles.defaultButton}>
                                <Button
                                    title="Create a Group"
                                    onPress={navigateCreateGroupScreen}
                                    accessibilityLabel='Create a Group button'
                                    testID='CreateGroupButton'
                                />
                            </View>
                        </View>
                        <View style={stylesHomeScreen.containerButton}>
                            <View style={generalStyles.defaultButton}>
                                <Button
                                    title="Join a Group"
                                    onPress={showDialog}
                                    accessibilityLabel='Join a Group button'
                                    testID='JoinGroupButton'
                                />
                            </View>
                        </View>

                        <Dialog.Container visible={dialogVisible}>
                            <Dialog.Title>Join Group</Dialog.Title>
                            <Dialog.Description>
                                Enter the join code for the group you want to join.
                            </Dialog.Description>
                            <Dialog.Input onChangeText={setJoinCode} />
                            <Dialog.Button label="Cancel" onPress={closeDialog} />
                            <Dialog.Button label="Join" onPress={joinGroup} />
                        </Dialog.Container>

                        <View style={stylesHomeScreen.containerButton}>
                            <View style={generalStyles.defaultButton}>
                                <Button 
                                    title="Go to Profile" 
                                    onPress={navigateProfileScreen} 
                                    accessibilityLabel='Go to Profile button'
                                    testID='ProfileButton'
                                />
                            </View>
                        </View>
                        <View style={stylesHomeScreen.containerButton}>
                            <View style={generalStyles.defaultButton}>
                                <Button 
                                    title="Logout" 
                                    onPress={handleLogout} 
                                    accessibilityLabel='Logout button'
                                    testID='LogoutButton'
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default HomeScreen;