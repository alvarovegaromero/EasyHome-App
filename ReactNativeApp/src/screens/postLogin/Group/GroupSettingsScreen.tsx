import { Button, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import generalStyles from "../../../styles/styles";
import useGroupSettingsController from "./hooks/useGroupSettingsController";
import Dialog from "react-native-dialog";
import stylesGroupSettingsController from "../../../styles/stylesGroupSettingsController";
import { User } from "./types";

const GroupSettingsScreen: React.FunctionComponent = () => {
    const {confirmAndLeaveGroup, confirmAndDeleteGroup, generateJoinCode, dialogVisible, 
        closeDialog, joinCode, copyJoinCodeToClipboard, groupUsers, isOwner, navigateGroupHome} = useGroupSettingsController();

    return (
        <SafeAreaView style={generalStyles.defaultSafeAreaView}>
            <ScrollView style={generalStyles.defaultScrollView}>
                <View style={generalStyles.defaultContainerScreen}>
                    
                    <View style={stylesGroupSettingsController.containerUsersPart}>
                        <Text style={generalStyles.defaultHeader}>Members:</Text>
                        <View style={stylesGroupSettingsController.containerUsers}>
                            {groupUsers.map((user : User) => (
                                <TouchableOpacity 
                                    key={user.id} 
                                    onPress={() => console.log('User pressed:', user.username)}
                                    style={stylesGroupSettingsController.listButton}
                                >
                                    <View style={stylesGroupSettingsController.contentListButton}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Text style={stylesGroupSettingsController.textList}>{user.username}</Text>
                                            {user.is_owner && (
                                                <Image 
                                                    source={require('../../../../assets/images/crownIcon.png')} 
                                                    style={stylesGroupSettingsController.ownerCrownIconList}
                                                />
                                            )}
                                        </View>
                                        {isOwner && (
                                            <Image 
                                                source={require('../../../../assets/images/crossIcon.png')} 
                                                style={stylesGroupSettingsController.crossIconList}
                                            />
                                        )}
                                    </View>
                                </TouchableOpacity>
                            ))}   
                        </View>
                    </View>

                    <View style={stylesGroupSettingsController.containerButtons}>
                        <View style={stylesGroupSettingsController.containerButton}>
                            <View style={generalStyles.defaultButton}>
                                <Button 
                                    title="Leave group"
                                    onPress={confirmAndLeaveGroup}
                                    accessibilityLabel='Leave group button'
                                    testID='LeaveGroupButton'
                                />
                            </View>
                        </View>
                        {isOwner && (
                        <View style={stylesGroupSettingsController.containerButton}>
                            <View style={generalStyles.defaultButton}>
                                <Button 
                                    title="Delete group"
                                    onPress={confirmAndDeleteGroup}
                                    accessibilityLabel='Delete group button'
                                    testID='DeleteGroupButton'
                                />
                            </View>
                        </View>
                        )}
                        <View style={stylesGroupSettingsController.containerButton}>
                            <View style={generalStyles.defaultButton}>
                                <Button 
                                    title="Get join code"
                                    onPress={generateJoinCode}
                                    accessibilityLabel='Get join code button'
                                    testID='GetJoinCodeButton'
                                />
                            </View>
                        </View>
                        <View style={stylesGroupSettingsController.containerButton}>
                            <View style={generalStyles.defaultButton}>
                                <Button
                                    title="Go back to Group Home"
                                    onPress={navigateGroupHome}
                                    accessibilityLabel='Go back to Group Home button'
                                    testID='GoBackToGroupHomeButton'
                                />
                            </View>
                        </View>
                    </View>

                    <Dialog.Container visible={dialogVisible}>
                        <Dialog.Title>Join Code</Dialog.Title>
                        <Dialog.Description>
                            {joinCode}
                        </Dialog.Description>
                        <Dialog.Button label="Close" onPress={closeDialog} />
                        <Dialog.Button label="Copy" onPress={copyJoinCodeToClipboard} />
                    </Dialog.Container>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default GroupSettingsScreen;
