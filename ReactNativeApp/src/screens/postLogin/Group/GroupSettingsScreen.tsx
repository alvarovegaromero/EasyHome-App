import { Button, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
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
                    <Button 
                        title="Leave group"
                        onPress={confirmAndLeaveGroup}
                        accessibilityLabel='Leave group button'
                        testID='LeaveGroupButton'
                    />
                    {isOwner && (
                        <Button 
                            title="Delete group"
                            onPress={confirmAndDeleteGroup}
                            accessibilityLabel='Delete group button'
                            testID='DeleteGroupButton'
                        />
                    )}
                    <Button 
                        title="Generate join code"
                        onPress={generateJoinCode}
                        accessibilityLabel='Generate join code button'
                        testID='GenerateJoinCodeButton'
                    />
                    <Button
                        title="Go back to Group Home"
                        onPress={navigateGroupHome}
                        accessibilityLabel='Go back to Group Home button'
                        testID='GoBackToGroupHomeButton'
                    />
                    
                    <View style={stylesGroupSettingsController.containerUsers}>
                        {groupUsers.map((user : User) => (
                            <TouchableOpacity 
                                key={user.id} 
                                onPress={() => console.log('User pressed:', user.username)}
                            >
                                <Text>{user.username}</Text>
                            </TouchableOpacity>
                        ))}   
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
