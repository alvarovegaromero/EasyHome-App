import { Button, Text, View } from "react-native";
import useGroupHomeController from "./hooks/useGroupHomeController";

const GroupHomeScreen: React.FunctionComponent = () => {
    const { navigateHome } = useGroupHomeController();

    return (
        <View>
            <Text>Group Home Screen</Text>
            <Button 
                title="Go back to Home"
                onPress={navigateHome}
                accessibilityLabel='Go back to Home button'
                testID='GoBackToHomeButton'
            />
        </View>
    );
};

export default GroupHomeScreen;