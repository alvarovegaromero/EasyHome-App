import { Button, Text, View } from "react-native";
import useGroupHomeController from "./hooks/useGroupHomeController";
import Dialog from "react-native-dialog";


const GroupHomeScreen: React.FunctionComponent = () => {
    const { confirmAndLeaveGroup, confirmAndDeleteGroup, generateJoinCode, dialogVisible, 
        closeDialog, joinCode, copyJoinCodeToClipboard, navigateHome } = useGroupHomeController();

    return (
        <View>
            <Text>Group Home Screen</Text>
            <Button 
                title="Go back to Home"
                onPress={navigateHome}
                accessibilityLabel='Go back to Home button'
                testID='GoBackToHomeButton'
            />
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
        </View>
    );
};

export default GroupHomeScreen;