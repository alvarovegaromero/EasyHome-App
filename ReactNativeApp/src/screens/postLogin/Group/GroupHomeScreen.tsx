import { Button, Text, View } from "react-native";
import useGroupHomeController from "./hooks/useGroupHomeController";

const GroupHomeScreen: React.FunctionComponent = () => {
    const { confirmAndLeaveGroup, confirmAndDeleteGroup, navigateHome } = useGroupHomeController();

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
        </View>
    );
};

export default GroupHomeScreen;