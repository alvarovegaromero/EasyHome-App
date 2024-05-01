import { Button, Text, View } from "react-native";
import useGroupHomeController from "./hooks/useGroupHomeController";

const GroupHomeScreen: React.FunctionComponent = () => {
    const { navigateBack } = useGroupHomeController();

    return (
        <View>
            <Text>Group Home Screen</Text>
            <Button 
                title="Go back to Home"
                onPress={navigateBack}
                accessibilityLabel='Go back to Home button'
                testID='GoBackToHomeButton'
            />
        </View>
    );
};

export default GroupHomeScreen;