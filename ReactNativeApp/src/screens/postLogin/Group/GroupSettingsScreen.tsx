import { Button, SafeAreaView, ScrollView, Text } from "react-native";
import generalStyles from "../../../styles/styles";
import useGroupSettingsController from "./hooks/useGroupSettingsController";
import Dialog from "react-native-dialog";


const GroupSettingsScreen: React.FunctionComponent = () => {
    const {confirmAndLeaveGroup, confirmAndDeleteGroup, generateJoinCode, dialogVisible, 
        closeDialog, joinCode, copyJoinCodeToClipboard} = useGroupSettingsController();

    return (
        <SafeAreaView style={generalStyles.defaultSafeAreaView}>
            <ScrollView style={generalStyles.defaultScrollView}>
                <Button 
                    title="Leave group"
                    onPress={confirmAndLeaveGroup}
                    accessibilityLabel='Leave group button'
                    testID='LeaveGroupButton'
                />
                <Button 
                    title="Delete group"
                    onPress={confirmAndDeleteGroup}
                    accessibilityLabel='Delete group button'
                    testID='DeleteGroupButton'
                />
                <Button 
                    title="Generate join code"
                    onPress={generateJoinCode}
                    accessibilityLabel='Generate join code button'
                    testID='GenerateJoinCodeButton'
                />
                <Dialog.Container visible={dialogVisible}>
                    <Dialog.Title>Join Code</Dialog.Title>
                    <Dialog.Description>
                        {joinCode}
                    </Dialog.Description>
                    <Dialog.Button label="Close" onPress={closeDialog} />
                    <Dialog.Button label="Copy" onPress={copyJoinCodeToClipboard} />
                </Dialog.Container>
            </ScrollView>
        </SafeAreaView>
    );
};

export default GroupSettingsScreen;
