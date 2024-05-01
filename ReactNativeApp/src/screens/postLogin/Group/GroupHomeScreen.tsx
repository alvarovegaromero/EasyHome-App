import { Text, View } from "react-native";
import useGroupHomeController from "./hooks/useGroupHomeController";

const GroupHomeScreen: React.FunctionComponent = () => {
    const { } = useGroupHomeController();

    return (
        <View>
            <Text>Group Home Screen</Text>
        </View>
    );
};

export default GroupHomeScreen;